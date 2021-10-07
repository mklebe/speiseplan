import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Recipe } from '@prisma/client';

@Component({
  selector: 'angular-nest-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent  {
  @Input() recipe: Recipe = {
    id: 0,
    name: '',
    // ingredients: []
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

  addIngredientRow(event: MouseEvent) {
    event.preventDefault();
    this.ingredients.push(this.newIngredient());
  }

  removeIngredientRow(event: MouseEvent, index: number): void {
    event.preventDefault();
    this.ingredients.removeAt(index);
  }

  submitForm(): void {
    const recipe: Recipe = {
      id: 0,
      name: this.recipeForm.value.recipeName,
      // ingredients: this.recipeForm.value.ingredients,
    }

    this.submitRecipe.emit(recipe);
    this.recipeForm.reset();
  }

}
