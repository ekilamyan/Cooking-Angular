import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeInstructionsService {

  public url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';

  constructor(private http: HttpClient) {
  }

  // https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/ 479101 /information

  getRecipeWithId(id: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/octet-stream')
      .set('X-RapidAPI-Key', '0fe077be1emshd40962bc735f0ccp1ca7dcjsnc61b720bed51')
      .set('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com');

    return (this.http.get(this.url + id + '/information?includeNutrition=true', { 'headers': headers }))
  }
}

  // Keys
  // 8319610fbfb04bbb93883d1d8ad1f890
  // 3418ce6d893644b08478660f70b775f4
  // 7c71dbc02a1b4b1b8cc6ce764cef2be7
  // 1b6ab20e881548079dd54b364da82051