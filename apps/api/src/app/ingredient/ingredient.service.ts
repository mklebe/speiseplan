import { Ingredient } from '@angular-nest/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface IngredientCRUD {
  getAll: () => Promise<Ingredient[]>,
  createIngredient: (Ingredient) => Promise<Ingredient>,
  updateIngredient: (number, Ingredient) => Promise<Ingredient>,
  deleteIngredient: (number) => Promise<Ingredient>
}


@Injectable()
export class IngredientService implements IngredientCRUD {

  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  getAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  createIngredient( ingredient: Ingredient ): Promise<Ingredient> {
    return Promise.resolve( ingredient )
    // return this.prisma.ingredient.create( { data: {
    //   name: ingredient.name
    // }} );
  }

  updateIngredient(id: number, ingredient: Ingredient): Promise<Ingredient> {
    return Promise.resolve(ingredient)
    // return  this.prisma.ingredient.update( {where: {id}, data: ingredient} );
  }

  deleteIngredient( id: number ): Promise<Ingredient> {
    return Promise.resolve({id: 0, name: ''})
    // return this.prisma.ingredient.delete({ where: { id } });
  }
}
