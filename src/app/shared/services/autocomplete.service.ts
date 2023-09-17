import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  public baseIngredientUrl = 'https://api.spoonacular.com/food/ingredients/autocomplete';
  public baseRecipeUrl = 'https://api.spoonacular.com/recipes/autocomplete';

  public apiKey = '8319610fbfb04bbb93883d1d8ad1f890';

  // 8319610fbfb04bbb93883d1d8ad1f890
  // 3418ce6d893644b08478660f70b775f4
  // 7c71dbc02a1b4b1b8cc6ce764cef2be7
  // 1b6ab20e881548079dd54b364da82051

  constructor(private http: HttpClient) {
  }

  getIngredientAutocomplete(item: string): Observable<any> {
    return this.http.get(this.baseIngredientUrl + '?query=' + item + '&apiKey=' + this.apiKey + '&number=50&metaInformation=true');
  }

  getRecipeAutocomplete(item: string): Observable<any> {
    return this.http.get(this.baseRecipeUrl + '?query=' + item + '&apiKey=' + this.apiKey + '&number=50&metaInformation=true');
  }

}


  // public baseIngredientUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete';
  // public baseRecipeUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/autocomplete';

  // public headers = new HttpHeaders()
  //   .set('content-type', 'application/octet-stream')
  //   .set('X-RapidAPI-Key', '0fe077be1emshd40962bc735f0ccp1ca7dcjsnc61b720bed51')
  //   .set('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com');


  // constructor(private http: HttpClient) { }

  // getIngredientAutocomplete(item: string): Observable<any> {
  //   return (this.http.get(this.baseIngredientUrl + '?query=' + item + '&number=50&metaInformation=true', { 'headers': this.headers }));
  // }

  // getRecipeAutocomplete(item: string): Observable<any> {
  //   return (this.http.get(this.baseRecipeUrl + '?query=' + item + '&number=50&metaInformation=true', { 'headers': this.headers }));
  // }