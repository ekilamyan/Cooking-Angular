import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  public baseUrl_1 = 'https://api.spoonacular.com/recipes/';
  public baseUrl_2 = 'https://api.spoonacular.com/recipes/informationBulk';
  public baseUrl_3 = 'https://api.spoonacular.com/recipes/random';
  public baseUrl_4 = 'https://api.spoonacular.com/recipes/';

  public apiKey = '3418ce6d893644b08478660f70b775f4';
  public apiKey2 = '7c71dbc02a1b4b1b8cc6ce764cef2be7';

  // 8319610fbfb04bbb93883d1d8ad1f890
  // 3418ce6d893644b08478660f70b775f4
  // 7c71dbc02a1b4b1b8cc6ce764cef2be7
  // 1b6ab20e881548079dd54b364da82051

  constructor(private http: HttpClient) {

  }

  getIds(id: string, num: number): Observable<any> {
    return this.http.get(this.baseUrl_1 + id + '/similar?number=' + num + '&apiKey=' + this.apiKey);
  }

  getRandomIds(num: number): Observable<any> {
    return this.http.get(this.baseUrl_3 + '?number=' + num + '&limitLicense=true' + '&apiKey=' + this.apiKey);
  }

  getRandomIdsByCuisine(cuisine: string, num: number): Observable<any> {
    return this.http.get(this.baseUrl_3 + '?number=' + num + '&limitLicense=true' + '&tags=' + cuisine + '&apiKey=' + this.apiKey);
  }

  getSuggestionsBulk(ids: string): Observable<any> {
    return this.http.get(this.baseUrl_2 + '?ids=' + ids + '&apiKey=' + this.apiKey2 );
  }

  getRecipeById(id: string) {
    return this.http.get(this.baseUrl_4 + id + '/information?includeNutrition=false' + '&apiKey=' + this.apiKey2);
  }
}

// public baseUrl_1 = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';
// public baseUrl_2 = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk';
// public baseUrl_3 = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random';
// public baseUrl_4 = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';

// public apiKey = '8319610fbfb04bbb93883d1d8ad1f890';

// public headers = new HttpHeaders()
//   .set('content-type', 'application/octet-stream')
//   .set('X-RapidAPI-Key', '0fe077be1emshd40962bc735f0ccp1ca7dcjsnc61b720bed51')
//   .set('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com');


// constructor(private http: HttpClient) { }

// getIds(id: string, num: number): Observable<any> {
//   return this.http.get(this.baseUrl_1 + id + '/similar?number=' + num , { 'headers': this.headers });
// }

// getRandomIds(num: number): Observable<any> {
//   return this.http.get(this.baseUrl_3 + '?number=' + num , { 'headers': this.headers });
// }

// getRandomIdsByCuisine(cuisine: string, num: number): Observable<any> {
//   return this.http.get(this.baseUrl_3 + '?number=' + num + '&tags=' + cuisine , { 'headers': this.headers });
// }

// getSuggestionsBulk(ids: string): Observable<any> {
//   return this.http.get(this.baseUrl_2 + '?ids=' + ids , { 'headers': this.headers });
// }

// getRecipeById(id: string) {
//   return this.http.get(this.baseUrl_4 + id + '/information?includeNutrition=false', { 'headers': this.headers });
// }