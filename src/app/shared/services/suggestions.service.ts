import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  public baseUrl_1 = 'https://api.spoonacular.com/recipes/';
  public baseUrl_2 = 'https://api.spoonacular.com/recipes/informationBulk?';

  public apiKey = '8319610fbfb04bbb93883d1d8ad1f890';

  // 8319610fbfb04bbb93883d1d8ad1f890
  // 3418ce6d893644b08478660f70b775f4

  constructor(private http: HttpClient) { }

  getIds(id: string): Observable<any> {
    return this.http.get(this.baseUrl_1 + id + '/similar?number=3&apiKey=' + this.apiKey);
  }
  
  getSuggestionsBulk(ids: string): Observable<any> {
    return this.http.get(this.baseUrl_2 + '&apiKey=' + this.apiKey + '&ids=' + ids);
  }

}