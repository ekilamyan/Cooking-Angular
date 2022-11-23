import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeInstructionsService {

  public baseUrl = 'https://api.spoonacular.com/recipes/';
  public apiKey = '3418ce6d893644b08478660f70b775f4';

  // 8319610fbfb04bbb93883d1d8ad1f890
  // 3418ce6d893644b08478660f70b775f4
  // 7c71dbc02a1b4b1b8cc6ce764cef2be7
  // 1b6ab20e881548079dd54b364da82051

  constructor(private http: HttpClient) {
  }

  getRecipeWithId(id: string): Observable<any> {
    return this.http.get(this.baseUrl + id + '/information?apiKey=' + this.apiKey + '&includeNutrition=true');
  }
}