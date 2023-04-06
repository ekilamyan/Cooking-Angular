import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IntolerancesDialogComponent } from '../dialogs/intolerances-dialog/intolerances-dialog.component';
import { LoginService } from '../shared/services/login.service';
import { CookingDataService } from '../shared/services/cooking-data.service';
import { CookingData } from '../shared/models/cooking-data.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public name = '';
  public lastName = '';
  public email = '';

  public cookingData: CookingData;
  public userIntolerances: string[];
  public userDiets: string[];
  url: string

  diets = ["Gluten Free", "Ketogenic", "Lacto-Vegetarian", "Ovo-Vegetarian", "Paleo", "Pescetarian", "Vegan", "Vegetarian", "Whole 30"];
  intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];

  constructor(private loginService: LoginService, private cookingDataService: CookingDataService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.name = this.loginService.user.value.first_name;
    this.lastName = this.loginService.user.value.last_name;
    this.email = this.loginService.user.value.email;

    this.cookingDataService.cookingData.subscribe((cookingData: CookingData) => {
      if (cookingData) {
        this.cookingData = cookingData;
      }
    });
  }

  logout(): void {
    this.loginService.logout();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IntolerancesDialogComponent);
  }

  checkIntolerancesData(item: string) {
    if (this.cookingData.user_intolerances) {
      if (this.cookingData.user_intolerances.includes(item)) {
        return true;
      }
      else return false;
    }
    else return false;
  }

  checkDietsData(item: string) {
    if (this.cookingData.user_diets) {
      if (this.cookingData.user_diets.includes(item)) {
        return true;
      }
      else return false;
    }
    else return false;
  }

  setUnits(unit: string) {
    this.cookingData.user_units = unit;
    this.cookingDataService.saveCookingData(this.cookingData);
  }

}
