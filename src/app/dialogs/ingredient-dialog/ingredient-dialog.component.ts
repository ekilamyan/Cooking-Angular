import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PantryIngredient } from '../../shared/models/pantry-ingredient.model';
import { AutocompleteService } from '../../shared/services/autocomplete.service';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.css']
})

export class IngredientDialogComponent implements OnInit {
  public searchCategory = '';
  public ingredients: PantryIngredient[] = [];
  public hasRanSearch = false;
  public durationInSeconds = 2;

  ingredientSearchForm = new FormGroup({
    ingredient: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<IngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AutocompleteService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    // this.myPantry.getUserData(this.loginService.user.value.email).subscribe((temp: any) => {
    //   this.user = new User(temp);
    //   this.userIngredients = this.user.user_ingredients;
    //   // console.log(this.userIngredients);
    //   console.log(this.user);
    // })

    this.refreshIngredients();
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

          if (this.data.category == 'Baking') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'baking') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.category == 'Condiments') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Condiments') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.category == 'Meats') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Meat') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.category == 'Produce') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Produce') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }
          
          else if (this.data.category == 'Seafood') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Seafood') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.category == 'Snacks') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Snacks') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.category == 'Jarred Goods') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'jarredGoods') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.category == 'Canned & Jarred') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Canned and Jarred') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.category == 'Spices & Seasonings') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Spices and Seasonings') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }


          else if (this.data.category == 'Dairy') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Dairy' || temp[i].aisle == 'Cheese') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.category == 'Oils & Dressings') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Oil, Vinegar, Salad Dressing') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.category == 'Pastas & Rice') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Pastas and Rice') {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.category == 'Frozen & Refrigerated') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Refrigerated' || temp[i].aisle == 'Frozen' ) {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }


          else if (this.data.category == 'Miscellaneous') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Health Foods' || temp[i].aisle == 'Ethnic Foods' || temp[i].aisle == 'Sweet Snacks' || temp[i].aisle == 'Dried Fruits' ) {            
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

        });
      })
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  removeIngredient(i: number) {
    this.data.stuff[i] = '';
    if (i !== -1) {
      this.data.stuff.splice(i, 1);
    }
  }

  addIngredient(i: PantryIngredient) {
    if (this.data.stuff.includes(this.capitalizeFirstLetter(i.name))) {
      this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
        duration: this.durationInSeconds * 1000,
      });
    } else {
      this.data.stuff.splice((this.data.stuff.length - 1), 0, this.capitalizeFirstLetter(i.name));
      this.ingredientSearchForm.reset();

      this.snackBar.open(this.capitalizeFirstLetter(i.name) + ' added', 'Dismiss', {
        duration: (this.durationInSeconds + 3) * 1000,
      });
    }

    this.refreshIngredients();
    this.dialogRef.afterClosed().subscribe((res: any) => {
      
    })
  }

  refreshIngredients() {
    this.data.stuff.sort();
  }




  // addIngredient(i: PantryIngredient) {
  //   if (this.pantry.includes(this.capitalizeFirstLetter(i.name))) {
  //     this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
  //       duration: this.durationInSeconds * 1000,
  //     });
  //   } else {
  //     this.pantry.splice((this.pantry.length - 1), 0, this.capitalizeFirstLetter(i.name));
  //     this.refreshIngredients();
  //     this.ingredientSearchForm.reset();

  //     this.snackBar.open(this.capitalizeFirstLetter(i.name) + ' added', 'Dismiss', {
  //       duration: (this.durationInSeconds + 3) * 1000,
  //     });
  //   }
  // }
}
