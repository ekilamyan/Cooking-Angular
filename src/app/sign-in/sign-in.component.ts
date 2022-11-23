import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  email: any;
  getErrorMessage() {
    throw new Error('Method not implemented.');
  }
  hide: any;

  constructor() {}

  ngOnInit(): void {}
}
