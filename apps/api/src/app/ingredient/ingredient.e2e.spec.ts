import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { IngredientService } from './ingredient.service'
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient, testConfig } from '@angular-nest/model';
import { Repository } from 'typeorm';
import { IngredientController } from './ingredient.controller';
import { SearchService } from '../search/search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import assert = require('assert');

const dotenv = require('dotenv')
dotenv.config()
const ELASTIC_SEARCH_HOST = process.env.SEARCH_ENGINE_URL

describe('ingredients', () => {
  let app: INestApplication;
  let ingredientRepository: Repository<Ingredient>;

  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ... testConfig
        }),
        ElasticsearchModule.register({
          node: ELASTIC_SEARCH_HOST,
        }),
        TypeOrmModule.forFeature([Ingredient]),
      ],
      providers: [IngredientService, SearchService],
      controllers: [IngredientController]
    })
      .compile()


    ingredientRepository = moduleRef.get<Repository<Ingredient>>(getRepositoryToken(Ingredient));
    
    app = moduleRef.createNestApplication();
    await app.init()
  });
  
  beforeEach( async () => {
    await ingredientRepository.clear();
  })
  
  it('/GET all ingredients', async () => {
    return request(app.getHttpServer())
      .get('/ingredient')
      .expect(200)
      .expect([])
  })

  it('/POST an ingredient', () => {
    return request(app.getHttpServer())
      .post('/ingredient')
      .send({name: 'Lauch'})
      .expect(201)
  })

  it('must return a lauch when added lauch', async () => {
    await request(app.getHttpServer())
      .post('/ingredient')
      .send({name: 'Lauch'})

    return request(app.getHttpServer())
      .get('/ingredient')
      .expect(200)
      .then( response => {
        expect(response.body).toHaveLength(1);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({name: 'Lauch'})
          ])
        )
      })
  });

  it('must must update the ingredient "Porree" with "Lauch"', async () => {
    const { id } = await ingredientRepository.save({
      name: 'Poree'
    });

    await request(app.getHttpServer())
      .patch(`/ingredient/${id}`)
      .send({ name: 'Lauch' })
    
    const result = await ingredientRepository.findOne({ id })
    expect(result.name).toBe('Lauch')
  });

  it('must delete Lauch', async () => {
    const { id } = await ingredientRepository.save({
      name: 'Lauch'
    });

    await request(app.getHttpServer())
      .delete(`/ingredient/${id}`)
    
    const result = await ingredientRepository.find({ id })
    expect(result).toHaveLength(0)
  })

  afterAll(() => {
    app.close();
  })
});