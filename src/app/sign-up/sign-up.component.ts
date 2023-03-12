import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { IntolerancesDialogComponent } from '../dialogs/intolerances-dialog/intolerances-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../shared/services/login.service';

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

  public diets = ["Gluten Free", "Ketogenic", "Lacto-Vegetarian", "Ovo-Vegetarian", "Paleo", "Pescetarian", "Vegan", "Vegetarian", "Whole 30"]
  public intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"]

  public selectedDiets = [''];
  public selectedIntolerances = [''];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      name: [''],
      lastname: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']

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

  openDialog(): void {
    const dialogRef = this.dialog.open(IntolerancesDialogComponent, { disableClose: true });
  }
}



