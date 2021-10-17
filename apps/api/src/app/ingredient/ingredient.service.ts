import { Ingredient } from '@angular-nest/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {

  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  getAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  createIngredient( ingredient: Ingredient ): Promise<Ingredient> {
    const tempIngredient = {... ingredient}
    delete tempIngredient.id

    return this.ingredientRepository.save( tempIngredient );
  }

  updateIngredient(id: number, ingredient: Ingredient): Promise<Ingredient> {
    return  this.ingredientRepository.save({
      ...ingredient,
      id,
    });
  }

  async deleteIngredient( id: number ): Promise<void> {
    await this.ingredientRepository.delete({ id })
  }
}
