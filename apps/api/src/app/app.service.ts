import { Injectable } from '@nestjs/common';
import { Message, Recipe } from '@angular-nest/api-interfaces';


@Injectable()
export class AppService {
  private recipes: Array<Recipe>
  getData(): Message {
    return { message: 'Welcome to api, Matze!' };
  }

  getRecipes(): Promise<Recipe[]> {
    return Promise.resolve(this.recipes);
  }

  addRecipe( recipe: Recipe ): Promise<void> {
    this.recipes.push( recipe );
    return Promise.resolve();
  }
}
