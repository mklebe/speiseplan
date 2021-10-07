import { Component, OnInit } from '@angular/core';
import { Recipe } from '@angular-nest/api-interfaces';
import { MealService } from './meal.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'angular-nest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent { }
