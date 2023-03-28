import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { IntolerancesDialogComponent } from '../dialogs/intolerances-dialog/intolerances-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../shared/services/login.service';
import { User } from '../shared/models/user.model';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class SignUpComponent implements OnInit {
  firstFormGroup = new FormGroup({});
  secondFormGroup = new FormGroup({});

  disableBtn = false;
  hide = true;
  isEditable = true;
  public showVerifyButton = false;

  public diets = ["Gluten Free", "Ketogenic", "Lacto-Vegetarian", "Ovo-Vegetarian", "Paleo", "Pescetarian", "Vegan", "Vegetarian", "Whole 30"]
  public intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"]

  public selectedDiets = [''];
  public selectedIntolerances = [''];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private loginService: LoginService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      email: ['edgarkilamyan40@gmail.com'],
      name: ['Edgar'],
      lastname: ['Kilamyan'],
      password: ['Kilamyan123!'],
      confirmPassword: ['Kilamyan123!'],
      confirmationCode: [{value: '', disabled: true}]

      // name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      // lastname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      // email: ['', Validators.compose([Validators.required, Validators.email])],
      // password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      // confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])]
    });

    this.firstFormGroup.valueChanges.subscribe((changedObj: any) => {
      this.disableBtn = this.firstFormGroup.valid;
      console.log(this.disableBtn);
    });
  }

  next() {
    const user = new User(null);
    user.email = <string>this.firstFormGroup.get('email').value;
    user.first_name = <string>this.firstFormGroup.get('name').value;
    user.last_name = <string>this.firstFormGroup.get('lastname').value;
    user.password = <string>this.firstFormGroup.get('password').value;

    this.loginService.createUser(user).then((res: ISignUpResult) => { 
      this.firstFormGroup.get('confirmationCode').enable();
      this.showVerifyButton = true;
      this.snackBar.open('Signup successful - please enter the confirmation code below');
      console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IntolerancesDialogComponent, { disableClose: true });
  }

  verifyAndLogin(): void {
    const email = this.firstFormGroup.get('email').value;
    const password = this.firstFormGroup.get('password').value;
    const confirmationCode = this.firstFormGroup.get('confirmationCode').value;
    this.loginService.verifyUser(email, confirmationCode).then ((res: any) => {
      this.loginService.login(email, password).then ((res: any) => {
        // this.openDialog();
      }, (error: any) => {
        console.log(error);
      });
    }, (error: any) => {
      console.log(error);
    })
  }
}



