import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PantryIngredient } from 'src/app/shared/models/pantry-ingredient.model';
import { AutocompleteService } from 'src/app/shared/services/autocomplete.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookingDataService } from '../shared/services/cooking-data.service';
import { LoginService } from '../shared/services/login.service';
import { CookingData } from '../shared/models/cooking-data.model';

@Component({
  selector: 'app-my-pantry',
  templateUrl: './my-pantry.component.html',
  styleUrls: ['./my-pantry.component.css']
})

export class MyPantryComponent implements OnInit {
  public ingredients: PantryIngredient[] = [];
  public hasRanSearch = false;
  public cookingData: CookingData;

  public indexOne: any[] = [];
  public indexTwo: any[] = [];
  public indexThree: any[] = [];

  public durationInSeconds = 2;

  public count = 1;

  ingredientSearchForm = new FormGroup({
    ingredient: new FormControl(''),
  });

  constructor(private service: AutocompleteService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private cookingDataService: CookingDataService,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.cookingDataService.cookingData.subscribe((cookingData: CookingData) => {
      if (cookingData) {
        this.cookingData = cookingData;

        for (let i = 0; i < Object.keys(this.cookingData.user_ingredients).length; i++) {

          if (this.count == 1 && Object.entries(this.cookingData.user_ingredients)[i]) {
            this.indexOne.push(Object.entries(this.cookingData.user_ingredients)[i]);
            this.count++;
          }
          else if (this.count == 2 && Object.entries(this.cookingData.user_ingredients)[i]) {
            this.indexTwo.push(Object.entries(this.cookingData.user_ingredients)[i]);
            this.count++;
          }
          else if (this.count == 3 && Object.entries(this.cookingData.user_ingredients)[i]) {
            this.indexThree.push(Object.entries(this.cookingData.user_ingredients)[i]);
            this.count = 1;
          }
        }
        console.log(this.indexOne);
        console.log(this.indexTwo);
        console.log(this.indexThree);
      }
    });

    // this.refreshIngredients();
    this.ingredientSearchForm = this.formBuilder.group({
      'ingredient': ['']
    });

    this.ingredientSearchForm.get('ingredient')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()).subscribe((searchTerm: string) => {
        if (!searchTerm || searchTerm === '') {
          this.ingredients = [];
          return;
        }

        this.service.getIngredientAutocomplete(searchTerm).subscribe((temp: any[]) => {
          this.ingredients = [];
          this.hasRanSearch = true;
          for (let i = 0; i < temp.length; i++) {
            this.ingredients.push(new PantryIngredient(temp[i]));
            console.log(temp[i]);
          }
        });
      })
  }

  addIngredient(ingredient: PantryIngredient) {
    if (ingredient.aisle == 'Baking') {
      if (this.cookingData.user_ingredients.baking.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.baking.push(ingredient.name);
        this.cookingData.user_ingredients.baking.sort();
      }
    }
    else if (ingredient.aisle == 'Canned and Jarred') {
      if (this.cookingData.user_ingredients.cannedJarred.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.cannedJarred.push(ingredient.name);
        this.cookingData.user_ingredients.cannedJarred.sort();
      }
    }
    else if (ingredient.aisle == 'Condiments') {
      if (this.cookingData.user_ingredients.condiments.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.condiments.push(ingredient.name);
        this.cookingData.user_ingredients.condiments.sort();
      }
    }
    else if (ingredient.aisle == 'Dairy' || ingredient.aisle == 'Cheese') {
      if (this.cookingData.user_ingredients.dairy.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.dairy.push(ingredient.name);
        this.cookingData.user_ingredients.dairy.sort();
      }
    }
    else if (ingredient.aisle == 'Meat') {
      if (this.cookingData.user_ingredients.meats.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.meats.push(ingredient.name);
        this.cookingData.user_ingredients.meats.sort();
      }
    }
    else if (ingredient.aisle == 'Oil, Vinegar, Salad Dressing') {
      if (this.cookingData.user_ingredients.oilsDressings.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.oilsDressings.push(ingredient.name);
        this.cookingData.user_ingredients.oilsDressings.sort();
      }
    }
    else if (ingredient.aisle == 'Pasta and Rice') {
      if (this.cookingData.user_ingredients.pastaRice.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.pastaRice.push(ingredient.name);
        this.cookingData.user_ingredients.pastaRice.sort();
      }
    }
    else if (ingredient.aisle == 'Produce') {
      if (this.cookingData.user_ingredients.produce.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.produce.push(ingredient.name);
        this.cookingData.user_ingredients.produce.sort();
      }
    }
    else if (ingredient.aisle == 'Refrigerated' || ingredient.aisle == 'Frozen') {
      if (this.cookingData.user_ingredients.refrigeratedFrozen.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.refrigeratedFrozen.push(ingredient.name);
        this.cookingData.user_ingredients.refrigeratedFrozen.sort();
      }
    }
    else if (ingredient.aisle == 'Seafood') {
      if (this.cookingData.user_ingredients.seafood.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.seafood.push(ingredient.name);
        this.cookingData.user_ingredients.seafood.sort();
      }
    }
    else if (ingredient.aisle == 'Sweet Snacks' || ingredient.aisle == 'Savory Snacks') {
      if (this.cookingData.user_ingredients.snacks.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.snacks.push(ingredient.name);
        this.cookingData.user_ingredients.snacks.sort();
      }
    }
    else if (ingredient.aisle == 'Spices and Seasonings') {
      if (this.cookingData.user_ingredients.spicesSeasonings.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.spicesSeasonings.push(ingredient.name);
        this.cookingData.user_ingredients.spicesSeasonings.sort();
      }
    }
    else if (ingredient.aisle == 'Jarred Goods') {
      if (this.cookingData.user_ingredients.jarredGoods.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.jarredGoods.push(ingredient.name);
        this.cookingData.user_ingredients.jarredGoods.sort();
      }
    }
    else {
      if (this.cookingData.user_ingredients.misc.includes(ingredient.name)) {
        this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
          duration: this.durationInSeconds * 1000,
        });
      } else {
        this.cookingData.user_ingredients.misc.push(ingredient.name);
        this.cookingData.user_ingredients.misc.sort();
      }
    }

    this.cookingDataService.saveCookingData(this.cookingData);
  }

  getColor(category: string) {
    if (category == 'seafood') {
      return '#bcdbff';
    } else if (category == 'spicesSeasonings') {
      return '#f8e8fc';
    } else if (category == 'baking') {
      return '#ffe3e3';
    } else if (category == 'cannedJarred') {
      return '#e4fcc7';
    } else if (category == 'dairy') {
      return '#f5fffe';
    } else if (category == 'meats') {
      return '#ff9c91';
    } else if (category == 'produce') {
      return '#cfffcf';
    } else if (category == 'oilsDressings') {
      return '#fcfcc7';
    } else if (category == 'jarredGoods') {
      return '#ffedd4';
    } else if (category == 'misc') {
      return 'ebebeb';
    } else if (category == 'refrigeratedFrozen') {
      return '#91c3ff';
    } else if (category == 'condiments') {
      return '#fce2c7';
    } else if (category == 'pastaRice') {
      return '#fcea97';
    } else if (category == 'snacks') {
      return '#fc979d';
    } else return 'ebebeb';
  }

  getIngredients(category: string) {
    if (category == 'seafood') {
      return this.cookingData.user_ingredients.seafood;
    } else if (category == 'spicesSeasonings') {
      return this.cookingData.user_ingredients.spicesSeasonings;
    } else if (category == 'baking') {
      return this.cookingData.user_ingredients.baking;
    } else if (category == 'cannedJarred') {
      return this.cookingData.user_ingredients.cannedJarred;
    } else if (category == 'dairy') {
      return this.cookingData.user_ingredients.dairy;
    } else if (category == 'meats') {
      return this.cookingData.user_ingredients.meats;
    } else if (category == 'produce') {
      return this.cookingData.user_ingredients.produce;
    } else if (category == 'oilsDressings') {
      return this.cookingData.user_ingredients.oilsDressings;
    } else if (category == 'jarredGoods') {
      return this.cookingData.user_ingredients.jarredGoods;
    } else if (category == 'misc') {
      return this.cookingData.user_ingredients.misc;
    } else if (category == 'refrigeratedFrozen') {
      return this.cookingData.user_ingredients.refrigeratedFrozen;
    } else if (category == 'condiments') {
      return this.cookingData.user_ingredients.condiments;
    } else if (category == 'pastaRice') {
      return this.cookingData.user_ingredients.pastaRice;
    } else if (category == 'snacks') {
      return this.cookingData.user_ingredients.snacks;
    } else return null;
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // refreshIngredients() {
  //   this.pantry.sort();
  // }
}


// indexOne, indexTwo, IndexThree: any;

// for (let i = 0; i < this.total_cards; i++) {
//   indexOne.append()
// }

