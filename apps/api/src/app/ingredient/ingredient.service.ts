import { Injectable } from '@nestjs/common';
import { Ingredient } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';

export interface IngredientCRUD {
  getAll: () => Promise<Ingredient[]>,
  createIngredient: (Ingredient) => Promise<Ingredient>,
  updateIngredient: (number, Ingredient) => Promise<Ingredient>,
  deleteIngredient: (number) => Promise<Ingredient>
}


@Injectable()
export class IngredientService implements IngredientCRUD {

  constructor( private readonly prisma: PrismaService ) {}

  getAll(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }

  createIngredient( ingredient: Ingredient ): Promise<Ingredient> {
    return this.prisma.ingredient.create( { data: {
      name: ingredient.name
    }} );
  }

  updateIngredient(id: number, ingredient: Ingredient): Promise<Ingredient> {
    return  this.prisma.ingredient.update( {where: {id}, data: ingredient} );
  }

  deleteIngredient( id: number ): Promise<Ingredient> {
    return this.prisma.ingredient.delete({ where: { id } });
  }
}
