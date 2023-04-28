import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Amplify, Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { CookingData } from '../models/cooking-data.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public durationInSeconds = 5;
  public user = new BehaviorSubject<User>(null);
  private congitoUser: CognitoUser;
  private cookingData: CookingData;

  public url = "https://lbxlgv1fnj.execute-api.us-west-1.amazonaws.com/prod"; 

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {
    Amplify.configure({
      Auth: {
        region: 'us-west-1',
        userPoolId: 'us-west-1_gboVntmf4',
        userPoolWebClientId: '5ue4le095a0i678ijiqgr719d4'
      }
    });

    Auth.currentAuthenticatedUser().then((res: any) => {
      const user = new User(res);
      user.email = res.attributes.email;
      user.first_name = res.attributes.given_name;
      user.last_name = res.attributes.family_name;
      this.congitoUser = res;
      this.user.next(user);
      // this.cookingDataService.getCookingData();
    }, (error: any) => {
      this.user.next(null);
    })
  }

  login(email: string, password: string) {
    return Auth.signIn(email, password);
  }

  checkLogin(username: string, password: string): Observable<any> {
    const obj = {'email': username, 'password': password};
    return this.http.post(this.url + '/checkLogin', JSON.stringify(obj));
  }

  logout() {
    Auth.signOut();
    this.user.next(null);
    this.router.navigate(['sign-in']);
  }

  createUser(user: User) {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        given_name: user.first_name,
        family_name: user.last_name
      }
    })
  }

  verifyUser(email: string, confirmationCode: string) {
    return Auth.confirmSignUp(email, confirmationCode);
  }

  setCognitoUser(cognitoUser: CognitoUser) {
    this.congitoUser = cognitoUser;
  }

  getJwtToken() {
    return this.congitoUser.getSignInUserSession().getIdToken().getJwtToken();
  }

  setUserCookign(){

  }
}
