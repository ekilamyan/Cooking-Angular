import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { LoginService } from './login.service';
import { BehaviorSubject } from 'rxjs';
import { CookingData } from '../models/cooking-data.model';

@Injectable({
  providedIn: 'root'
})

export class CookingDataService {
  public cookingData = new BehaviorSubject<CookingData>(null);
  url = 'https://0gxlunxx4a.execute-api.us-west-1.amazonaws.com/prod/userdata'

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getCookingData() {
    const token = this.loginService.getJwtToken();
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    this.http.get(this.url, { 'headers': headers }).subscribe({
      next: (res: any) => {
        this.cookingData.next(res);
      }, error: (err: any) => {
        this.cookingData.next(null);
      }
    })
  }

  saveCookingData(cookingData: CookingData) {
    const token = this.loginService.getJwtToken();
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    this.http.put(this.url, JSON.stringify(cookingData), { 'headers': headers }).subscribe({
      next: (res: any) => {
        this.sort(cookingData);
        this.cookingData.next(cookingData);
      }
    })
  }

  sort(cookingData: CookingData) {
    for (let i = 0; i < Object.entries(cookingData.user_ingredients).length; i++) {
      Object.entries(cookingData.user_ingredients)[i][1].sort();
    }
  }
}
