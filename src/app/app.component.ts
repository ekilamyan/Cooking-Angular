import { Component } from '@angular/core';
import { User } from './shared/models/user.model';
import { CookingDataService } from './shared/services/cooking-data.service';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cooking-Angular';
  
  constructor(private loginService: LoginService, private cookingDataService: CookingDataService) {
    this.loginService.user.subscribe((user: User) => {
      if (user) {
        this.cookingDataService.getCookingData();
      }
    })
  }

}
