import { Module } from '@nestjs/common';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static'
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientService } from './ingredient/ingredient.service';
import { PrismaService } from './prisma/prisma.service';
import { RecipeService } from './recipe/recipe.service';
import { RecipeController } from './recipe/recipe.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'speiseplan'),
      exclude: ['api'],
    }),
  ],
  controllers: [IngredientController, RecipeController],
  providers: [IngredientService, PrismaService, RecipeService],
})
export class AppModule {}
