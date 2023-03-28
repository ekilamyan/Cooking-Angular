import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PantryService {

  public baseURL1 = 'https://api.spoonacular.com/recipes/';
  public baseURL2 = 'https://api.spoonacular.com/food/ingredients/autocomplete';
  public baseURL3 = 'https://api.spoonacular.com/recipes/findByIngredients'
  public baseURL4 = 'https://api.spoonacular.com/recipes/informationBulk?';
  public baseURL5 = 'https://api.spoonacular.com/recipes/findByIngredients';
  public apiKey = '3418ce6d893644b08478660f70b775f4';

  // 8319610fbfb04bbb93883d1d8ad1f890
  // 3418ce6d893644b08478660f70b775f4
  // 7c71dbc02a1b4b1b8cc6ce764cef2be7
  // 1b6ab20e881548079dd54b364da82051

  constructor(private http: HttpClient) {
  }

  getIngredientAutocomplete(item: string): Observable<any> {
    return this.http.get(this.baseURL2 + '?query=' + item + '&apiKey=' + this.apiKey + '&number=10&metaInformation=true');
  }

  getMyRecipesIds(ingredients: string): Observable<any> {
    return this.http.get(this.baseURL3 + '?ingredients=' + ingredients + '&apiKey=' + this.apiKey + '&number=5&limitLicense=true&ignorePantry=true&ranking=2');
  }

  getRecipesBulk(ids: string): Observable<any> {
    return this.http.get(this.baseURL4 + '&apiKey=' + this.apiKey + '&ids=' + ids);
  }

  recipesWithPantry(ingredients: string): Observable<any> {
    return this.http.get(this.baseURL5 + '?ignorePantry=true&number=20&ingredients=' + ingredients + '&apiKey=' + this.apiKey);
  }

  recipesWithPantryMinimizeMissing(ingredients: string): Observable<any> {
    return this.http.get(this.baseURL5 + '?ignorePantry=true&number=20&ingredients=' + ingredients + '&ranking=2&apiKey=' + this.apiKey);
  }
  
  recipesWithPantryMaximizeMissing(ingredients: string): Observable<any> {
    return this.http.get(this.baseURL5 + '?ignorePantry=true&number=20&ingredients=' + ingredients + '&ranking=1&apiKey=' + this.apiKey);
  }
}