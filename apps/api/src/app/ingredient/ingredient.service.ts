import { Injectable } from '@nestjs/common';
import { Ingredient } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class IngredientService {

  constructor( private readonly prisma: PrismaService ) {}

  getAll(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }
}
