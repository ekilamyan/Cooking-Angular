import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


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

  constructor(private route:Router, /*private oginService: LoginService,*/ public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.loginForm.valueChanges.subscribe((changedObj: any) => {
      this.disableBtn = this.loginForm.valid;
      console.log(this.disableBtn);
    });
    // this.loginService.user.subscribe ( (user: User) => {
    //   if (user) {
    //     this.route.navigate(['/']);
    //   }
    // })
  }

  // tryLogin(): void {
  //   const username = this.loginForm.get('username')?.value;
  //   const password = this.loginForm.get('password')?.value;
  //   this.loginService.login(username, password);
  // }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(SettingsDialogComponent, {
  //     width: '1000px',
  //     height: '600px',
  //   });
  // }
}