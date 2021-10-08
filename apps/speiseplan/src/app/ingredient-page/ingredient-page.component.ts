import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from '@prisma/client';
import { MealService } from '../meal.service';

@Component({
  selector: 'angular-nest-ingredient-page',
  templateUrl: './ingredient-page.component.html',
  styleUrls: ['./ingredient-page.component.scss']
})
export class IngredientPageComponent implements OnInit {
  public ingredientList: Ingredient[] = [];

  ingredientForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly mealService: MealService,
  ) {
    this.ingredientForm = this.fb.group({
      name: ''
    });
  }

  formSubmit(): void {
    this.mealService.addIngredient({
      id: 0,
      name: this.ingredientForm.value.name,
    }).subscribe(( ingredient ) => {
      this.ingredientList.push(ingredient)
      this.ingredientForm.reset();
    })
  }

  ngOnInit(): void {
    this.mealService.getAllIngredients().subscribe(( ingredients ) => {
      this.ingredientList = ingredients;
    })
  }

  deleteIngredient(ingredient: Ingredient): void {
    this.mealService.deleteIngredient(ingredient).subscribe(( ingredient ) => {
      this.ingredientList = this.ingredientList.filter( current => current.id !== ingredient.id);
    });
  }

}
