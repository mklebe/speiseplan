import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [PrismaService],
  providers: [IngredientService],
  controllers: [IngredientController]
})
export class IngredientModule {}
