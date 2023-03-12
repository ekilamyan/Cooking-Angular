import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  user = this.loginService.user;
  url = 'https://0gxlunxx4a.execute-api.us-west-1.amazonaws.com/prod/userdata'

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getUserData(email: string) {
    return this.http.get(this.url + '?email=' + email)
  }

  saveUserData() {
    return this.http.put(this.url, JSON.stringify(this.user))
  }
}
