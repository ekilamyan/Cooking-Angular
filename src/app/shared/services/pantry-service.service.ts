import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeInstructionsService {

  public baseURL1 = 'https://api.spoonacular.com/recipes/';
  public baseURL2 = 'https://api.spoonacular.com/food/ingredients/autocomplete';
  public apiKey = '3418ce6d893644b08478660f70b775f4';
  
  // 8319610fbfb04bbb93883d1d8ad1f890
  // 3418ce6d893644b08478660f70b775f4

  constructor(private http: HttpClient) {
  }

  getIngredientAutocomplete(item: string): Observable<any> {
    return this.http.get(this.baseURL2 + '?query=' + item + '&apiKey=' + this.apiKey + '&number=10&metaInformation=true');
  }

  // https://api.spoonacular.com/food/ingredients/autocomplete ?query=ste &apiKey=8319610fbfb04bbb93883d1d8ad1f890 &number=10
  // &metaInformation=true
}
