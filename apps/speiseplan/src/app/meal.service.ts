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

   genericApiCall(): Observable<Object> {
     return this.http.get('http://localhost:3000');
   }
}
