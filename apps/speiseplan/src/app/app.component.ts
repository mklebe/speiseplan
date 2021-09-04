import { Component } from '@angular/core';
import { Recipe } from '@angular-nest/api-interfaces';

@Component({
  selector: 'angular-nest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  recipeList: Recipe[] = [];
  constructor() {}

  addRecipeToList(res: Recipe) {
    this.recipeList.push(res);
  }
}
