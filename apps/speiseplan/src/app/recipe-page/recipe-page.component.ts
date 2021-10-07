import { Component, OnInit } from '@angular/core';
import { Recipe } from '@prisma/client';
import { Subject } from 'rxjs';
import { MealService } from '../meal.service';

@Component({
  selector: 'angular-nest-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {

  private foo: Recipe[] = [];
  recipeList: Subject<Recipe[]> = new Subject<Recipe[]>();
  constructor(
    private readonly mealService: MealService
  ) {}

  ngOnInit() {
    this.mealService.getRecipes()
      .subscribe((list) => {
        this.foo = list
        this.recipeList.next(list);
      })
  }

  addRecipeToList(res: Recipe) {
    this.mealService.addRecipe(res)
      .subscribe((r) => {
        this.foo.push(r)
        this.recipeList.next(this.foo);
      })
  }

}
