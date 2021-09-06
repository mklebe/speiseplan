import { Component } from '@angular/core';
import { Recipe } from '@angular-nest/api-interfaces';

interface ListedRecipe extends Recipe {
  isHighlighted: boolean;
}
@Component({
  selector: 'angular-nest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  recipeList: ListedRecipe[] = [];
  constructor() {}

  addRecipeToList(res: Recipe) {
    const lr: ListedRecipe = {isHighlighted: false, ... res} 
    this.recipeList.push(lr);
  }

  highlightRecipe(recipe: Recipe): void {
    this.recipeList = this.recipeList.map((r) => {
      return { 
        ...r,
        isHighlighted: r.name === recipe.name
      }
    })
  }
}
