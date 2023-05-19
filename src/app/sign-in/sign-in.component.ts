import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { LoginService } from '../shared/services/login.service';
import { CognitoUser } from 'amazon-cognito-identity-js';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})

export class SignInComponent implements OnInit {
  hide = true;
  disableBtn = false;

  public username = '';
  public password = '';


  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private route: Router, private loginService: LoginService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe((changedObj: any) => {
      this.disableBtn = this.loginForm.valid;
      console.log(this.disableBtn);
    });

    this.loginService.user.subscribe((user: User) => {
      if (user) {
        this.route.navigate(['/']);
      }
    })
  }

  tryLogin(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.loginService.login(email, password).then((res: any) => {
      const user = new User(res);
      user.email = res.attributes.email;
      user.first_name = res.attributes.given_name;
      user.last_name = res.attributes.family_name;
      this.loginService.setCognitoUser(res);
      this.loginService.user.next(user);
      localStorage.setItem("user", JSON.stringify(user));
    }, (error: any) => {
      this.snackBar.open('Invalid email or password', 'Dismiss', {
        duration: 10 * 1000,
      });
    });
  }

  logout(): void {
    this.loginService.logout();
  }
}