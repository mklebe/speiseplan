import { Recipe } from '@angular-nest/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private subject: Subject<Recipe[]>;
  private recipeList: Recipe[]; 

  constructor( 
    private readonly http: HttpClient,
   ) {
      this.subject = new Subject<Recipe[]>();
      this.recipeList = [];
   }

   getGulasch(): Observable<Recipe[]> {
     return this.http.get<Recipe[]>('/api/gulasch');
   }

   addRecipe( recipe: Recipe ): Observable<Recipe> {
     return this.http.post<Recipe>('/api/recipe', recipe);
   }

   getRecipes(): Observable<Recipe[]> {
     return this.http.get<Recipe[]>('/api/recipe');
   }
}
