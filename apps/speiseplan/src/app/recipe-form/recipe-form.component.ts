import { Ingredient, Recipe } from '@angular-nest/api-interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'angular-nest-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe: Recipe = {
    name: '',
    ingredients: []
  };

  @Output() submitRecipe = new EventEmitter<Recipe>();

  recipeForm: FormGroup;
  
  constructor( private readonly fb: FormBuilder ) {
    this.recipeForm = this.fb.group({
      recipeName: this.recipe.name,
      ingredients: this.fb.array([
        this.newIngredient()
      ]),
    })
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  newIngredient(): FormGroup {
    return this.fb.group({
      name: '',
    })
  }

  ngOnInit(): void {
  }

  addIngredientRow(event: MouseEvent) {
    event.preventDefault();
    this.ingredients.push(this.newIngredient());
  }

  removeIngredientRow(event: MouseEvent, index: number): void {
    event.preventDefault();
    this.ingredients.removeAt(index);
  }

  submitForm(): void {
    console.log( this.recipeForm.value )
    const recipe: Recipe = {
      name: this.recipeForm.value.recipeName,
      ingredients: this.recipeForm.value.ingredients,
    }

    this.submitRecipe.emit(recipe);
  }

}
