import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CookingData } from 'src/app/shared/models/cooking-data.model';
import { CookingDataService } from 'src/app/shared/services/cooking-data.service';
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
  public added = false;
  public durationInSeconds = 2;

  public cookingData: CookingData;

  ingredientSearchForm = new FormGroup({
    ingredient: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<IngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AutocompleteService,
    private formBuilder: FormBuilder,
    private cookingDataService: CookingDataService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.cookingDataService.cookingData.subscribe((cookingData: CookingData) => {
      if (cookingData) {
        console.log(this.data);
        this.cookingData = cookingData;
        this.sortIngredients();
      }
    });

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

          if (this.data.term == 'Baking') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Baking') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Condiments') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Condiments') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Meats') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Meat') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Produce') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Produce') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Seafood') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Seafood') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Snacks') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Snacks' || temp[i].aisle == 'Sweet Snacks') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Jarred Goods') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'jarredGoods') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Canned and Jarred') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Canned and Jarred') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Spices and Seasonings') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Spices and Seasonings') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }


          else if (this.data.term == 'Dairy') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Dairy' || temp[i].aisle == 'Cheese') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Oil, Vinegar, Salad Dressing') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Oil, Vinegar, Salad Dressing') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Pastas and Rice') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Pastas and Rice') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Frozen & Refrigerated') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Refrigerated' || temp[i].aisle == 'Frozen') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else if (this.data.term == 'Beverages') {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Beverages' || temp[i].aisle == 'Alcoholic Beverages') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

          else {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].aisle == 'Health Foods' || temp[i].aisle == 'Ethnic Foods' || temp[i].aisle == 'Dried Fruits') {
                this.ingredients.push(new PantryIngredient(temp[i]));
              }
            }
          }

        });
      })
  }

  removeIngredient(ingredient: string) {
    if (this.data.term == 'Baking') {
      this.cookingData.user_ingredients.baking.splice(this.cookingData.user_ingredients.baking.indexOf(ingredient), 1);
    } else if (this.data.term == 'Condiments') {
      this.cookingData.user_ingredients.condiments.splice(this.cookingData.user_ingredients.condiments.indexOf(ingredient), 1);
    } else if (this.data.term == 'Meats') {
      this.cookingData.user_ingredients.meats.splice(this.cookingData.user_ingredients.meats.indexOf(ingredient), 1);
    } else if (this.data.term == 'Produce') {
      this.cookingData.user_ingredients.produce.splice(this.cookingData.user_ingredients.produce.indexOf(ingredient), 1);
    } else if (this.data.term == 'Seafood') {
      this.cookingData.user_ingredients.seafood.splice(this.cookingData.user_ingredients.seafood.indexOf(ingredient), 1);
    } else if (this.data.term == 'Snacks') {
      this.cookingData.user_ingredients.snacks.splice(this.cookingData.user_ingredients.snacks.indexOf(ingredient), 1);
    } else if (this.data.term == 'Jarred Goods') {
      this.cookingData.user_ingredients.jarredGoods.splice(this.cookingData.user_ingredients.jarredGoods.indexOf(ingredient), 1);
    } else if (this.data.term == 'Canned and Jarred') {
      this.cookingData.user_ingredients.cannedJarred.splice(this.cookingData.user_ingredients.cannedJarred.indexOf(ingredient), 1);
    } else if (this.data.term == 'Spices and Seasonings') {
      this.cookingData.user_ingredients.spicesSeasonings.splice(this.cookingData.user_ingredients.spicesSeasonings.indexOf(ingredient), 1);
    } else if (this.data.term == 'Dairy') {
      this.cookingData.user_ingredients.dairy.splice(this.cookingData.user_ingredients.dairy.indexOf(ingredient), 1);
    } else if (this.data.term == 'Oil, Vinegar, Salad Dressing') {
      this.cookingData.user_ingredients.oilsDressings.splice(this.cookingData.user_ingredients.oilsDressings.indexOf(ingredient), 1);
    } else if (this.data.term == 'Pastas & Rice') {
      this.cookingData.user_ingredients.pastaRice.splice(this.cookingData.user_ingredients.pastaRice.indexOf(ingredient), 1);
    } else if (this.data.term == 'Frozen & Refrigerated') {
      this.cookingData.user_ingredients.refrigeratedFrozen.splice(this.cookingData.user_ingredients.condiments.indexOf(ingredient), 1);
    } else if (this.data.term == 'Beverages' || this.data.term == 'Alcoholic Beverages') {
      this.cookingData.user_ingredients.drinksBeverages.splice(this.cookingData.user_ingredients.drinksBeverages.indexOf(ingredient), 1);
    } else {
      this.cookingData.user_ingredients.misc.splice(this.cookingData.user_ingredients.misc.indexOf(ingredient), 1);
    }
    this.sortIngredients();

    this.snackBar.open(this.capitalizeFirstLetter(ingredient) + ' removed', 'Dismiss', {
      duration: (this.durationInSeconds + 3) * 1000,
    });

    this.cookingDataService.saveCookingData(this.cookingData);
  }

  addIngredient(ingredient: PantryIngredient) {
    if (ingredient.aisle == 'Baking') {
      if (this.cookingData.user_ingredients.baking.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.baking.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Canned and Jarred') {
      if (this.cookingData.user_ingredients.cannedJarred.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.cannedJarred.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Condiments') {
      if (this.cookingData.user_ingredients.condiments.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.condiments.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Dairy' || ingredient.aisle == 'Cheese') {
      if (this.cookingData.user_ingredients.dairy.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.dairy.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Meat') {
      if (this.cookingData.user_ingredients.meats.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.meats.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Oil, Vinegar, Salad Dressing') {
      if (this.cookingData.user_ingredients.oilsDressings.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.oilsDressings.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Pasta and Rice') {
      if (this.cookingData.user_ingredients.pastaRice.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.pastaRice.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Produce') {
      if (this.cookingData.user_ingredients.produce.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.produce.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Refrigerated' || ingredient.aisle == 'Frozen') {
      if (this.cookingData.user_ingredients.refrigeratedFrozen.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.refrigeratedFrozen.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Seafood') {
      if (this.cookingData.user_ingredients.seafood.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.seafood.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Sweet Snacks' || ingredient.aisle == 'Savory Snacks') {
      if (this.cookingData.user_ingredients.snacks.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.snacks.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Spices and Seasonings') {
      if (this.cookingData.user_ingredients.spicesSeasonings.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.spicesSeasonings.push(ingredient.name);
        this.added = true;
      }
    } else if (ingredient.aisle == 'Jarred Goods') {
      if (this.cookingData.user_ingredients.jarredGoods.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.jarredGoods.push(ingredient.name);
        this.added = true;
      }
    } else {
      if (this.cookingData.user_ingredients.misc.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.misc.push(ingredient.name);
        this.added = true;
      }
      this.sortIngredients();
    }

    // opening dialog box
    if (this.added == true) {
      this.snackBar.open(this.capitalizeFirstLetter(ingredient.name) + ' added', 'Dismiss', {
        duration: (this.durationInSeconds + 3) * 1000,
      });
      this.cookingDataService.saveCookingData(this.cookingData);
    } else {
      this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
        duration: this.durationInSeconds * 1000,
      });
    }
  }

  sortIngredients() {
    this.cookingData.user_ingredients.baking = this.cookingData.user_ingredients.baking.sort();
    this.cookingData.user_ingredients.cannedJarred = this.cookingData.user_ingredients.cannedJarred.sort();
    this.cookingData.user_ingredients.condiments = this.cookingData.user_ingredients.condiments.sort();
    this.cookingData.user_ingredients.dairy = this.cookingData.user_ingredients.dairy.sort();
    this.cookingData.user_ingredients.jarredGoods = this.cookingData.user_ingredients.jarredGoods.sort();
    this.cookingData.user_ingredients.meats = this.cookingData.user_ingredients.meats.sort();
    this.cookingData.user_ingredients.oilsDressings = this.cookingData.user_ingredients.oilsDressings.sort();
    this.cookingData.user_ingredients.pastaRice = this.cookingData.user_ingredients.pastaRice.sort();
    this.cookingData.user_ingredients.produce = this.cookingData.user_ingredients.produce.sort();
    this.cookingData.user_ingredients.refrigeratedFrozen = this.cookingData.user_ingredients.refrigeratedFrozen.sort();
    this.cookingData.user_ingredients.seafood = this.cookingData.user_ingredients.seafood.sort();
    this.cookingData.user_ingredients.snacks = this.cookingData.user_ingredients.snacks.sort()
    this.cookingData.user_ingredients.misc = this.cookingData.user_ingredients.misc.sort();
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}
