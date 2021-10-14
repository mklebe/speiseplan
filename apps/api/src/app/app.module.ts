import { Module, OnModuleInit } from '@nestjs/common';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientService } from './ingredient/ingredient.service';
import { RecipeService } from './recipe/recipe.service';
import { RecipeController } from './recipe/recipe.controller';
import { SearchService } from './search/search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { prodConfig, User } from '@angular-nest/model';
import { UsersModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { Connection } from 'typeorm';
import { IngredientModule } from './ingredient/ingredient.module';

const dotenv = require('dotenv')
dotenv.config()
const ELASTIC_SEARCH_HOST = process.env.SEARCH_ENGINE_URL

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'speiseplan'),
      exclude: ['api'],
    }),
    TypeOrmModule.forRoot( {
      ... prodConfig as TypeOrmModuleOptions
    }),
    UsersModule,
    IngredientModule,
  ],
  controllers: [
    // RecipeController,
  ],
  providers: [
    // RecipeService,
    // SearchService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    // private readonly searchService: SearchService,
  ) { }

  async onModuleInit() {
    // await this.searchService.dropIndices();
    // const ingredients = await this.ingredientService.getAll()
    // await this.searchService.bulkAddIngredients(ingredients);
  }
}
