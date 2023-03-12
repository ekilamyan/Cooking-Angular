import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public name = ''
  public lastName =''
  public email = ''

  constructor(private loginService: LoginService) { 
    
  }

  ngOnInit(): void {
    console.log(this.loginService.user)
    this.name = this.loginService.user.value.first_name;
    this.lastName = this.loginService.user.value.last_name;
    this.email = this.loginService.user.value.email;
  }

  logout(): void {
    this.loginService.logout();
  }
}
