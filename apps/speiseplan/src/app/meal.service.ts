import { Ingredient, Recipe } from '@prisma/client'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor( 
    private readonly http: HttpClient,
   ) { }

   getGulasch(): Observable<Recipe[]> {
     return this.http.get<Recipe[]>('/api/gulasch');
   }

   addRecipe( recipe: Recipe ): Observable<Recipe> {
     return this.http.post<Recipe>('/api/recipe', recipe);
   }

   getRecipes(): Observable<Recipe[]> {
     return this.http.get<Recipe[]>('/api/recipe');
   }

   addIngredient( ingredient: Ingredient ): Observable<Ingredient> {
     return this.http.post<Ingredient>('/api/ingredient', ingredient);
   }

   deleteIngredient( ingredient: Ingredient ): Observable<Ingredient> {
     return this.http.delete<Ingredient>(`/api/ingredient/${ingredient.id}`)
   }

   getAllIngredients(): Observable<Ingredient[]> {
     return this.http.get<Ingredient[]>('/api/ingredient');
   }
}
