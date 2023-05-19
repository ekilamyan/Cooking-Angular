import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model'; 
import { CookingDataService } from 'src/app/shared/services/cooking-data.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-code-confirmation-dialog',
  templateUrl: './code-confirmation-dialog.component.html',
  styleUrls: ['./code-confirmation-dialog.component.css']
})



export class CodeConfirmationDialogComponent implements OnInit {
  codeForm = new FormGroup({
    recipe: new FormControl(''),
  });

  constructor(private dialogRef: MatDialogRef<CodeConfirmationDialogComponent>,private loginService: LoginService, private cookingService: CookingDataService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private newRoute: Router) { }

  ngOnInit(): void {
    this.codeForm = this.formBuilder.group({
      code: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])]
    });
  }

  verifyAndLogin(): void {
    const email = this.data.email;
    const password = this.data.password;
    const confirmationCode = this.codeForm.get('code').value;
  
    this.loginService.verifyUser(email, confirmationCode).then((res: any) => {
      this.loginService.login(email, password).then((res: any) => {
        const user = new User(res);
        this.loginService.setCognitoUser(res);
        this.cookingService.initializeCookingData();
        localStorage.setItem("user", JSON.stringify(user));
        this.newRoute.navigate(['/my-pantry']);
        
        this.dialogRef.close();
        
      }, (error: any) => {
        console.log(error);
      });
    }, (error: any) => {
      console.log(error);
    })
  }

}
