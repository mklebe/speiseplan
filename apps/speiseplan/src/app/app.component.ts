import { Component, OnInit } from '@angular/core';
import { Recipe } from '@angular-nest/api-interfaces';
import { MealService } from './meal.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'angular-nest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
