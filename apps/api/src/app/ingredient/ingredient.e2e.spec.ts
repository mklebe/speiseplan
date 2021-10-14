import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { IngredientModule } from './ingredient.module';
import { IngredientCRUD, IngredientService } from './ingredient.service'
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testConfig } from '@angular-nest/model';

describe('ingredients', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ... testConfig
        }),
        IngredientModule
      ],
    })
      .compile()

    app = moduleRef.createNestApplication();
    await app.init()

  });

  it('/GET all ingredients', () => {
    const req = request(app.getHttpServer).get('/ingredient')

    req.expect(200)
    req.expect([])
  })

  afterAll(() => {
    app.close();
  })
});