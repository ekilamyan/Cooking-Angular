import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['./filters-dialog.component.css'],
})

export class FiltersDialogComponent implements OnInit {
  public checkedFilters: Array<string> = [];

  public filtersForm: FormGroup;
  public cuisines = ["African", "American", "British", "Cajun", "Caribbean",
    "Chinese", "European", "French", "German", "Greek", "Indian",
    "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American",
    "Mediterranean", "Mexican", "Middle Eastern", "Southern", "Spanish",
    "Thai", "Vietnamese"];

  public diets = ["Gluten Free", "Ketogenic", "Lacto-Vegetarian", "Ovo-Vegetarian", "Paleo", "Pescetarian", "Vegan", "Vegetarian", "Whole 30"]

  public intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"]

  public mealTypes = ["Appetizers", "Beverages", "Breakfast", "Dessert", "Dinner", "Lunch", "Main Dishes", "Sauces & Rubs", "Side Dishes", "Salad", "Soup", "Snack"]

  public durationInSeconds = 2;
  public activated = false;

  constructor(public dialogRef: MatDialogRef<FiltersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar) {
    this.filtersForm = new FormGroup({});
    this.checkedFilters = <string[]>data;

    this.setupFormFilters('cuisines');
    this.setupFormFilters('diets');
    this.setupFormFilters('intolerances');
    this.setupFormFilters('mealTypes');
  }

  public setupFormFilters(type: string) {
    let filters: Array<string> = [];

    switch (type) {
      case 'cuisines':
        filters = this.cuisines;
        break;
      case 'diets':
        filters = this.diets;
        break;
      case 'intolerances':
        filters = this.intolerances;
        break;
      case 'mealTypes':
        filters = this.mealTypes;10
        break;
      default:
        break;
    }

    for (let i = 0; i < filters.length; i++) {
      let formDefault = false;

      if (this.checkedFilters.includes(filters[i])) {
        formDefault = true;
      }

      let temp = new FormControl(formDefault);
      this.filtersForm.addControl(type + i, temp);
    }
  }

  ngOnInit(): void {

  }

  addRemoveFilter(i: string) {
    if (this.data.includes(i)) {
      let index = this.data.indexOf(i);
      if (index > -1) {
        this.data.splice(index, 1);
      }
    } else {
      this.data.push(i);
    }
  }
}
