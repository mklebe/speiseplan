import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [],
  providers: [IngredientService],
  controllers: [IngredientController]
})
export class IngredientModule {}
