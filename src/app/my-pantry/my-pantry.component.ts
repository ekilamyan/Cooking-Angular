import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PantryIngredient } from 'src/app/shared/models/pantry-ingredient.model';
import { AutocompleteService } from 'src/app/shared/services/autocomplete.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDataService } from '../shared/services/user-data.service';
import { User } from '../shared/models/user.model';
import { LoginService } from '../shared/services/login.service';
import { SavedIngredients } from '../shared/models/saved-ingredients.model';

@Component({
  selector: 'app-my-pantry',
  templateUrl: './my-pantry.component.html',
  styleUrls: ['./my-pantry.component.css']
})

export class MyPantryComponent implements OnInit {
  public ingredients: PantryIngredient[] = [];
  public hasRanSearch = false;
  public user: User;

  public userIngredients: SavedIngredients;

  public durationInSeconds = 2;

  ingredientSearchForm = new FormGroup({
    ingredient: new FormControl(''),
  });

  constructor(private service: AutocompleteService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private myPantry: UserDataService,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.myPantry.getUserData(this.loginService.user.value.email).subscribe((temp: any) => {
      this.user = new User(temp);
      this.userIngredients = this.user.user_ingredients;
      // console.log(this.userIngredients);
      console.log(this.user);
    })

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
    if(ingredient.aisle == 'Baking') {
      this.user.user_ingredients.baking.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Canned and Jarred') {
      this.user.user_ingredients.cannedJarred.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Condiments') {
      this.user.user_ingredients.condiments.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Dairy' || ingredient.aisle == 'Cheese') {
      this.user.user_ingredients.dairy.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Meat') {
      this.user.user_ingredients.meats.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Oil, Vinegar, Salad Dressing') {
      this.user.user_ingredients.oilsDressings.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Pasta and Rice') {
      this.user.user_ingredients.pastaRice.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Produce') {
      this.user.user_ingredients.produce.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Refrigerated' || ingredient.aisle == 'Frozen') {
      this.user.user_ingredients.produce.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Seafood') {
      this.user.user_ingredients.seafood.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Sweet Snacks' || ingredient.aisle == 'Savory Snacks') {
      this.user.user_ingredients.snacks.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Spices and Seasonings') {
      this.user.user_ingredients.spicesSeasonings.push(ingredient.name);
    }
    else if(ingredient.aisle == 'Jarred Goods') {
      this.user.user_ingredients.jarredGoods.push(ingredient.name);
    }
    else{
      this.user.user_ingredients.misc.push(ingredient.name);
    }
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // refreshIngredients() {
  //   this.pantry.sort();
  // }
}

