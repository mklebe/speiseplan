import { Ingredient, Recipe } from '@angular-nest/api-interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

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

  recipeForm: FormGroup = new FormGroup({
    recipeName: new FormControl(this.recipe.name),
    ingredients: new FormArray([])
  })

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(): void {
    const recipe: Recipe = {
      name: this.recipeForm.value.recipeName,
      ingredients: []
    }

    this.submitRecipe.emit(recipe);
  }

}
