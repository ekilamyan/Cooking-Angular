import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PantryIngredient } from '../shared/models/pantry-ingredient.model';
import { AutocompleteService } from '../shared/services/autocomplete.service';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.css']
})

export class IngredientDialogComponent implements OnInit {
  public ingredients: PantryIngredient[] = [];
  public hasRanSearch = false;
  public durationInSeconds = 2;

  ingredientSearchForm = new FormGroup({
    ingredient: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<IngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AutocompleteService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    // this.refreshIngredients();
    this.ingredientSearchForm = this.formBuilder.group({
      'ingredient': ['']
    });

    this.ingredientSearchForm.get('ingredient')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe((searchTerm: string) => {
        if (!searchTerm || searchTerm === '') {
          this.ingredients = [];
          return;
        }

        this.service.getIngredientAutocomplete(searchTerm).subscribe((temp: any[]) => {
          this.ingredients = [];
          this.hasRanSearch = true;
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].aisle == 'Seafood' || temp[i].aisle == 'Canned and Jarred') {            // Fix parammeter based on category
              this.ingredients.push(new PantryIngredient(temp[i]));
            }
          }
        });
      })
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  removeIngredient(i: number) {
    this.data[i] = '';
    if (i !== -1) {
      this.data.splice(i, 1);

      this.snackBar.open(this.capitalizeFirstLetter(this.data[i]) + ' Removed', 'Dismiss', {
        duration: (this.durationInSeconds + 3) * 1000,
      });
    }
  }

  addIngredient(i: PantryIngredient) {
    if (this.data.includes(this.capitalizeFirstLetter(i.name))) {
      this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
        duration: this.durationInSeconds * 1000,
      });
    } else {
      this.data.splice((this.data.length - 1), 0, this.capitalizeFirstLetter(i.name));
      this.refreshIngredients();
      this.ingredientSearchForm.reset();

      this.snackBar.open(this.capitalizeFirstLetter(i.name) + ' added', 'Dismiss', {
        duration: (this.durationInSeconds + 3) * 1000,
      });
    }
  }

  refreshIngredients() {
    this.data.sort();
  }
}
