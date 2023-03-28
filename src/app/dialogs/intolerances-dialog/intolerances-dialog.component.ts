import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { CookingDataService } from 'src/app/shared/services/cooking-data.service';
import { CookingData } from 'src/app/shared/models/cooking-data.model';

@Component({
  selector: 'app-intolerances-dialog',
  templateUrl: './intolerances-dialog.component.html',
  styleUrls: ['./intolerances-dialog.component.css']
})
export class IntolerancesDialogComponent implements OnInit {
  public cookingData: CookingData;

  diets = ["Gluten Free", "Ketogenic", "Lacto-Vegetarian", "Ovo-Vegetarian", "Paleo", "Pescetarian", "Vegan", "Vegetarian", "Whole 30"];
  intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];
 
  public user: User;
  public userIntolerances: string[];
  public userDiets: string[];
  url: string


  constructor(private loginService: LoginService, private cookingDataService: CookingDataService, public router: Router) { 
  }

  
  ngOnInit(): void {
    this.url = this.router.url;

    this.cookingDataService.cookingData.subscribe((cookingData: CookingData) => {
      if (cookingData) {
        this.cookingData = cookingData;
      }
    });
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

  addRemoveDiet(item: string) {
    if (this.cookingData.user_diets.includes(item)) {
      let index = this.cookingData.user_diets.indexOf(item);
      if (index > -1) {
        this.cookingData.user_diets.splice(index, 1);
      }
    } else {
      this.cookingData.user_diets.push(item);
    }
  }

  addRemoveIntolerances(item: string) {
    if (this.cookingData.user_intolerances.includes(item)) {
      let index = this.cookingData.user_intolerances.indexOf(item);
      if (index > -1) {
        this.cookingData.user_intolerances.splice(index, 1);
      }
    } else {
      this.cookingData.user_intolerances.push(item);
    }
  }

  saveChanges(){
    this.cookingDataService.saveCookingData(this.cookingData);
  }

}
