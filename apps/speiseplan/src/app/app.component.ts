import { Component, OnInit } from '@angular/core';
import { Recipe } from '@angular-nest/api-interfaces';
import { MealService } from './meal.service';

interface ListedRecipe extends Recipe {
  isHighlighted: boolean;
}
@Component({
  selector: 'angular-nest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  recipeList: ListedRecipe[] = [];
  constructor(
    private readonly mealService: MealService
  ) {}

  ngOnInit() {
    this.mealService.getGulasch()
      .subscribe(( gulasch ) => {
        this.recipeList = gulasch.map((g) => {
          return {
            ...g,
            isHighlighted: false
          }
        })
      })
  }

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
