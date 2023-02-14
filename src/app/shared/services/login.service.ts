// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { User } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   public durationInSeconds = 5;
//   public user = new BehaviorSubject<User>(null);
//   public url = "https://lbxlgv1fnj.execute-api.us-west-1.amazonaws.com/prod"; 

//   constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {
//     if (localStorage.getItem("user")) {
//       const sessionUser = localStorage.getItem("user");
//       const user = JSON.parse(sessionUser);
//       this.user.next(user)
//     } else {
//       this.user.next(null);
//     }
//   }

//   login(username: string, password: string) {
//     this.checkLogin(username, password).subscribe( (res: any) => {
//       if ('status' in res && res.status === 'Login was successful!') {
//         this.snackBar.open(res.status, 'Dismiss', {
//           duration: this.durationInSeconds * 1000,
//         });
//         const user = <User>res.user;
//         this.user.next(user);
//         localStorage.setItem("user", JSON.stringify(user));
//       } else {
//         this.snackBar.open(res.status + ' Please Try Again', 'Dismiss');
//       }
//     });
//   }

//   checkLogin(username: string, password: string): Observable<any> {
//     const obj = {'email': username, 'password': password};
//     return this.http.post(this.url + '/checkLogin', JSON.stringify(obj));
//   }

//   logout() {
//     localStorage.removeItem("user");
//     this.user.next(null);
//     this.router.navigate(['jumbotron']);
//   }

//   createUser(user: User) {
//     return this.http.put(this.url + '/users', JSON.stringify(user));
//   }
// }
