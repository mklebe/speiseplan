import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { IngredientModule } from './ingredient.module';
import { IngredientCRUD, IngredientService } from './ingredient.service'
import { INestApplication } from '@nestjs/common';

describe('ingredients', () => {
  let app: INestApplication;
  const ingredientService: IngredientCRUD = { 
    getAll: () => Promise.resolve([]),
    createIngredient: () => Promise.resolve({id: 1, name: 'Cucumber'}),
    updateIngredient: () => Promise.resolve({id: 1, name: 'Cucumber too'}),
    deleteIngredient: () => Promise.resolve({id: 1, name: 'Cucumber too'}),
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [IngredientModule],
    })
      .overrideProvider(IngredientService)
      .useValue(ingredientService)
      .compile()

    app = moduleRef.createNestApplication();
    await app.init()

  });

  it('/GET all ingredients', () => {
    const req = request(app.getHttpServer).get('/ingredient')

    req.expect(200)
    req.expect({data: ingredientService.getAll()})
  })

  afterAll(() => {
    app.close();
  })
});