import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intolerances-dialog',
  templateUrl: './intolerances-dialog.component.html',
  styleUrls: ['./intolerances-dialog.component.css']
})
export class IntolerancesDialogComponent implements OnInit {

  diets = ["Gluten Free", "Ketogenic", "Lacto-Vegetarian", "Ovo-Vegetarian", "Paleo", "Pescetarian", "Vegan", "Vegetarian", "Whole 30"];
  intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];

  constructor() { }

  ngOnInit(): void {
  }

}
