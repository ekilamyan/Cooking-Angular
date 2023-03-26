import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IntolerancesDialogComponent } from '../dialogs/intolerances-dialog/intolerances-dialog.component';
import { Router } from '@angular/router';
import { SavedIngredients } from '../shared/models/saved-ingredients.model';
import { User } from '../shared/models/user.model';
import { LoginService } from '../shared/services/login.service';
import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public name = '';
  public lastName ='';
  public email = '';

  public user: User;
  public userIntolerances: string[];
  public userDiets: string[];
  url: string

  diets = ["Gluten Free", "Ketogenic", "Lacto-Vegetarian", "Ovo-Vegetarian", "Paleo", "Pescetarian", "Vegan", "Vegetarian", "Whole 30"];
  intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];

  constructor(private loginService: LoginService, private myUser: UserDataService, public dialog: MatDialog, public router: Router) { 
    
  }

  ngOnInit(): void {
    this.url = this.router.url;
    console.log(this.loginService.user)
    this.name = this.loginService.user.value.first_name;
    this.lastName = this.loginService.user.value.last_name;
    this.email = this.loginService.user.value.email;

    this.myUser.getUserData(this.loginService.user.value.email).subscribe((temp: any) => {
      this.user = new User(temp);
      this.userIntolerances = this.user.saved_intolerances;
      this.userDiets = this.user.user_diets;
      console.log(this.user);
    })
  }

  logout(): void {
    this.loginService.logout();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IntolerancesDialogComponent);
  }

  checkUserData(item: string) {
    if (this.userIntolerances.includes(item) || this.userDiets.includes(item)) {
      return true;
    }
    else{
      return false;
    }
  }
}
