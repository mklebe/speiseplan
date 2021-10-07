import { 
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { Recipe } from '@prisma/client';
import { Subject } from 'rxjs';

interface ListedRecipe extends Recipe {
  isHighlighted: boolean;
}

@Component({
  selector: 'angular-nest-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

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
