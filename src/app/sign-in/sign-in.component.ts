import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { LoginService } from '../shared/services/login.service';


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
  

  loginForm = new FormGroup({       /* ask vav if this is correct*/
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private route:Router, private loginService: LoginService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.loginForm.valueChanges.subscribe((changedObj: any) => {
      this.disableBtn = this.loginForm.valid;
      console.log(this.disableBtn);
    });

    this.loginService.user.subscribe ( (user: User) => {
      if (user) {
        this.route.navigate(['/']);
      }
    })
  }

  tryLogin(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    alert(email + password);
    this.loginService.login(email, password);
  }

  logout(): void {
    this.loginService.logout();
  }
}