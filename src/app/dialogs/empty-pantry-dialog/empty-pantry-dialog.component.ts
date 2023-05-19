import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-pantry-dialog',
  templateUrl: './empty-pantry-dialog.component.html',
  styleUrls: ['./empty-pantry-dialog.component.css']
})
export class EmptyPantryDialogComponent implements OnInit {

  public dairy = ['Butter', "Cheese", "Eggs", "Milk", "Yogurt"];
  public produce = ["Banana", "Bell Pepper", "Carrot", "Cucumber", "Garlic", "Ginger", "Lettuce", "Lemon", "Onion", "Potato", "Tomato"];
  public meat = ["Beef", "Chicken", "Pork"];
  public spices = ["Cinnamon", "Honey", "Olive Oil", "Pepper", "Salt", "Sugar", "Vanilla Extract"];

  constructor() { }

  ngOnInit(): void {
  }

}
