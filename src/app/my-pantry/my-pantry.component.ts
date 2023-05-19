import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PantryIngredient } from 'src/app/shared/models/pantry-ingredient.model';
import { AutocompleteService } from 'src/app/shared/services/autocomplete.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookingDataService } from '../shared/services/cooking-data.service';
import { LoginService } from '../shared/services/login.service';
import { CookingData } from '../shared/models/cooking-data.model';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { EmptyPantryDialogComponent } from '../dialogs/empty-pantry-dialog/empty-pantry-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  public ingredientArrays: any[];

  public added: boolean;
  public blank = false;
  public ingredientcount = 0;
  public durationInSeconds = 3;

  public isLoading: boolean = true;
  public searchLoading: boolean = true;

  public count = 1;

  ingredientSearchForm = new FormGroup({
    ingredient: new FormControl(''),
  });

  constructor(private service: AutocompleteService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private cookingDataService: CookingDataService,
    private loginService: LoginService,
    private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.cookingDataService.cookingData.subscribe((cookingData: CookingData) => {
      if (cookingData) {
        this.cookingData = cookingData;
        this.ingredientcount = 0;

        console.log(cookingData.user_ingredients);

        this.sortIngredients();

        this.indexOne = [];
        this.indexTwo = [];
        this.indexThree = [];

        this.count = 1;

        // console.log(Object.entries(this.cookingData.user_ingredients).sort());

        this.ingredientArrays = Object.entries(this.cookingData.user_ingredients).sort();

        for (let i = 0; i < this.ingredientArrays.length; i++) {
          if (this.ingredientArrays[i][1].length > 0) {
            this.ingredientcount++;
          }
        }
        console.log(this.ingredientcount);

        if (this.ingredientcount > 0) {
          let misc;
          this.blank = true;
          for (let i = 0; i < this.ingredientArrays.length; i++) {
            if (
              this.ingredientArrays[i][0] == 'misc' &&
              this.ingredientArrays[i][1].length > 0
            ) {
              misc = this.ingredientArrays[i];
              this.count++;
            } else if (
              this.count == 1 &&
              this.ingredientArrays[i] &&
              this.ingredientArrays[i][1].length > 0
            ) {
              this.indexOne.push(this.ingredientArrays[i]);
              this.count++;
            } else if (
              this.count == 2 &&
              this.ingredientArrays[i] &&
              this.ingredientArrays[i][1].length > 0
            ) {
              this.indexTwo.push(this.ingredientArrays[i]);
              this.count++;
            } else if (
              this.count == 3 &&
              this.ingredientArrays[i] &&
              this.ingredientArrays[i][1].length > 0
            ) {
              this.indexThree.push(this.ingredientArrays[i]);
              this.count = 1;
            }
          }

          this.indexThree.push(misc);

        } else {
          this.blank = false
          // this.openDialog();
        }
      }
    });

    // this.refreshIngredients();
    this.ingredientSearchForm = this.formBuilder.group({
      'ingredient': ['']
    });

    this.ingredientSearchForm.get('ingredient')
      ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((searchTerm: string) => {
        this.searchLoading = true;
        this.hasRanSearch = false;

        if (!searchTerm || searchTerm === '') {
          this.ingredients = [];
          return;
        }

        // this.searchTermLength = this.ingredients.length;

        this.service.getIngredientAutocomplete(searchTerm).subscribe((temp: any[]) => {
            this.ingredients = [];
            this.hasRanSearch = true;
            for (let i = 0; i < temp.length; i++) {
              this.ingredients.push(new PantryIngredient(temp[i]));
              console.log(this.ingredients);
              // console.log(temp[i]);
            }
          });
      });
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
    } else if (ingredient.aisle == 'Milk, Eggs, Other Dairy' || ingredient.aisle == 'Cheese') {
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
    } else if (ingredient.aisle == 'Jarred Goods' || ingredient.aisle == 'Nut butters, Jams, and Honey') {
      if (this.cookingData.user_ingredients.jarredGoods.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.jarredGoods.push(ingredient.name);
        this.added = true;
      }

    } else if (ingredient.aisle == 'Beverages' || ingredient.aisle == 'Alcoholic Beverages') {
      if (this.cookingData.user_ingredients.drinksBeverages.includes(ingredient.name)) {
        this.added = false;
      } else {
        this.cookingData.user_ingredients.drinksBeverages.push(ingredient.name);
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

    } else {
      this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
        duration: this.durationInSeconds * 1000,
      });
    }

    this.cookingDataService.saveCookingData(this.cookingData);
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
    this.cookingData.user_ingredients.drinksBeverages = this.cookingData.user_ingredients.drinksBeverages.sort();
    this.cookingData.user_ingredients.misc = this.cookingData.user_ingredients.misc.sort();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmptyPantryDialogComponent, { panelClass: 'custom-modalbox',  } ); //disableClose: true

    // dialogRef.afterClosed().subscribe((res: any) => {
    // });
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
