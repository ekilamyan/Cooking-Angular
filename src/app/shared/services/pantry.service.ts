import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class PantryService {
  public baseUrl_1 =
    'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete';
  public baseUrl_2 =
    'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk';
  public baseUrl_3 =
    'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients';

  public baseURL5 = 'https://api.spoonacular.com/recipes/findByIngredients';
  public apiKey = '1b6ab20e881548079dd54b364da82051';

  // 8319610fbfb04bbb93883d1d8ad1f890
  // 3418ce6d893644b08478660f70b775f4
  // 7c71dbc02a1b4b1b8cc6ce764cef2be7
  // 1b6ab20e881548079dd54b364da82051

  public headers = new HttpHeaders()
    .set('content-type', 'application/octet-stream')
    .set('X-RapidAPI-Key', '0fe077be1emshd40962bc735f0ccp1ca7dcjsnc61b720bed51')
    .set(
      'X-RapidAPI-Host',
      'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    );

  constructor(private http: HttpClient) {}

  getIngredientAutocomplete(item: string): Observable<any> {
    return this.http.get(
      this.baseUrl_1 + '?query=' + item + '&number=50&metaInformation=true',
      { headers: this.headers }
    );
  }

  getMyRecipesIds(ingredients: string): Observable<any> {
    return this.http.get(
      this.baseUrl_3 + '?ignorePantry=true&ingredients=' + ingredients,
      { headers: this.headers }
    );
  }

  recipesWithPantry(ingredients: string): Observable<any> {
    return this.http.get(
      this.baseURL5 +
        '?ignorePantry=true&number=15&ingredients=' +
        ingredients +
        '&apiKey=' +
        this.apiKey
    );
  }

  recipesWithPantryMinimizeMissing(ingredients: string): Observable<any> {
    return this.http.get(
      this.baseURL5 +
        '?ignorePantry=true&number=20&ingredients=' +
        ingredients +
        '&ranking=2&apiKey=' +
        this.apiKey
    );
  }

  recipesWithPantryMaximizeMissing(ingredients: string): Observable<any> {
    return this.http.get(
      this.baseURL5 +
        '?ignorePantry=true&number=20&ingredients=' +
        ingredients +
        '&ranking=1&apiKey=' +
        this.apiKey
    );
  }
}