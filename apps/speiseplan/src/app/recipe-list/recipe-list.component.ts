import { Recipe } from '@angular-nest/api-interfaces';
import { 
  Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { MealService } from '../meal.service';

interface ListedRecipe extends Recipe {
  isHighlighted: boolean;
}

@Component({
  selector: 'angular-nest-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  renderedList: ListedRecipe[] = [];
  // recipeListSubscription: Subscription

  @Input() recipeList: Subject<Recipe[]> = new Subject()
  @Output() removeRecipe = new EventEmitter<Recipe>()

  constructor() {
    this.recipeList.subscribe((list) => {
      this.renderedList = list.map(( r ) => {
        return {
          ...r,
          isHighlighted: false,
        }
      })
    })
  }
  ngOnInit(): void {
    this.recipeList.subscribe((list) => {
      this.renderedList = list.map(( r ) => {
        return {
          ...r,
          isHighlighted: false,
        }
      })
    })
  }

  ngOnDestroy(): void {
    // this.recipeListSubscription.unsubscribe()
  }

  removeRecipeFromList(r: Recipe): void {
    this.removeRecipe.emit(r);
  }

  highlightRecipe(recipe: Recipe): void {
    this.renderedList = this.renderedList.map((r) => {
      return { 
        ...r,
        isHighlighted: r.name === recipe.name
      }
    })
  }

}
