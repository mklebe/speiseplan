import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AddIngredientFormComponent } from './add-ingredient-form/add-ingredient-form.component';
import { IngredientPageComponent } from './ingredient-page/ingredient-page.component';
import { HomeComponent } from './home/home.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ingredient', component: IngredientPageComponent},
  {path: 'recipe', component: RecipePageComponent},
]

@NgModule({
  declarations: [AppComponent, RecipeFormComponent, RecipeListComponent, AddIngredientFormComponent, IngredientPageComponent, HomeComponent, RecipePageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot( appRoutes )
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
