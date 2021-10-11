import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Recipe, Ingredient } from '@prisma/client';
import { debounceTime, distinctUntilChanged, skipUntil, skipWhile } from 'rxjs';
import { MealService } from '../meal.service';

@Component({
  selector: 'angular-nest-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe: Recipe = {
    id: 0,
    name: '',
  };

  @Output() submitRecipe = new EventEmitter<Recipe>();

  ingredients: Ingredient[] = [];
  inrgedientSuggestion: Ingredient[] = [];
  ingredientInput: FormControl = new FormControl();

  recipeForm: FormGroup;
  
  constructor( 
    private readonly fb: FormBuilder,
    private readonly mealService: MealService,
  ) {
    this.recipeForm = this.fb.group({
      recipeName: this.recipe.name,
      ingredientName: this.ingredientInput,
    })
  }
  ngOnInit(): void {
    this.ingredientInput.valueChanges
      .pipe( debounceTime(200) )
      .subscribe( query => {
        this.mealService.searchIngredient(query)
          .subscribe((result) => {
            this.inrgedientSuggestion = result;
          })
      })
  }


  submitForm(): void {
    const recipe: Recipe = {
      id: 0,
      name: this.recipeForm.value.recipeName,
    }

    this.submitRecipe.emit(recipe);
    this.recipeForm.reset();
  }

  addIngredient(ing: Ingredient): void {
    this.ingredients.push(ing)
  }

  removeIngredient(ing: Ingredient): void {
    this.ingredients = this.ingredients.filter( i => i.id !== ing.id);
  }



}
