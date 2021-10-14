import { Ingredient } from '@angular-nest/model';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from '../search/search.service';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

const dotenv = require('dotenv')
dotenv.config()
const ELASTIC_SEARCH_HOST = process.env.SEARCH_ENGINE_URL

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient]),
    ElasticsearchModule.register({
      node: ELASTIC_SEARCH_HOST,
    }),
  ],
  providers: [IngredientService, SearchService],
  controllers: [IngredientController]
})
export class IngredientModule {}
