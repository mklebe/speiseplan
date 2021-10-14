import { Recipe } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeService {

  getAll(): Promise<Recipe[]> {
    return Promise.resolve([]);
  }
}
