import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  public baseUrl_1 = 'https://api.spoonacular.com/recipes/';
  public baseUrl_2 = 'https://api.spoonacular.com/recipes/informationBulk?';
  public baseUrl_3 = 'https://api.spoonacular.com/recipes/random';
  public baseUrl_4 = 'https://api.spoonacular.com/recipes/findByIngredients';

  public apiKey = '3418ce6d893644b08478660f70b775f4';

  // 8319610fbfb04bbb93883d1d8ad1f890
  // 3418ce6d893644b08478660f70b775f4
  // 7c71dbc02a1b4b1b8cc6ce764cef2be7
  // 1b6ab20e881548079dd54b364da82051

  constructor(private http: HttpClient) { }

  getIds(id: string, num: number): Observable<any> {
    return this.http.get(this.baseUrl_1 + id + '/similar?number='+ num+'&apiKey=' + this.apiKey);
  }

  getRandomIds(num: number): Observable<any> {
    return this.http.get('https://api.spoonacular.com/recipes/random' + '?number='+ num + '&limitLicense=true' +'&apiKey=' + this.apiKey);
  }
  
  getRandomIdsByCuisine(cuisine: string, num: number): Observable<any> {
    return this.http.get('https://api.spoonacular.com/recipes/random' + '?number='+ num + '&limitLicense=true' + '&tags=' + cuisine + '&apiKey=' + this.apiKey);
  }

  getSuggestionsBulk(ids: string): Observable<any> {
    return this.http.get(this.baseUrl_2 + '&apiKey=' + this.apiKey + '&ids=' + ids);
  }
}
