import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'app-intolerances-dialog',
  templateUrl: './intolerances-dialog.component.html',
  styleUrls: ['./intolerances-dialog.component.css']
})
export class IntolerancesDialogComponent implements OnInit {

  diets = ["Gluten Free", "Ketogenic", "Lacto-Vegetarian", "Ovo-Vegetarian", "Paleo", "Pescetarian", "Vegan", "Vegetarian", "Whole 30"];
  intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];
 
  public user: User;
  public userIntolerances: string[];
  public userDiets: string[];
  url: string


  constructor(private loginService: LoginService, private myUser: UserDataService, public router: Router) { 
   
  }

  ngOnInit(): void {
    this.url = this.router.url;
    
    this.myUser.getUserData(this.loginService.user.value.email).subscribe((temp: any) => {
      this.user = new User(temp);
      console.log(this.user);
      this.userIntolerances = this.user.saved_intolerances;
      this.userDiets = this.user.user_diets;
    })
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
