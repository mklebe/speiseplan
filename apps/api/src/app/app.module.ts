import { Module } from '@nestjs/common';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientService } from './ingredient/ingredient.service';
import { PrismaService } from './prisma/prisma.service';
import { RecipeService } from './recipe/recipe.service';
import { RecipeController } from './recipe/recipe.controller';
import { SearchService } from './search/search.service';
import {ElasticsearchModule} from '@nestjs/elasticsearch'

const dotenv = require('dotenv')
const ELASTIC_SEARCH_HOST = process.env.SEARCHBOX_URL
dotenv.config()

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'speiseplan'),
      exclude: ['api'],
    }),
    ElasticsearchModule.register({
      node: ELASTIC_SEARCH_HOST,
    }),
  ],
  controllers: [IngredientController, RecipeController],
  providers: [IngredientService, PrismaService, RecipeService, SearchService],
})
export class AppModule {}
