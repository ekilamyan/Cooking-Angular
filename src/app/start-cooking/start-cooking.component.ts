import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FiltersDialogComponent } from '../dialogs/filters-dialog/filters-dialog.component';
import { PantryIngredient } from '../shared/models/pantry-ingredient.model';
import { Recipe } from '../shared/models/recipe.model';
import { User } from '../shared/models/user.model';
import { AutocompleteService } from '../shared/services/autocomplete.service';
import { LoginService } from '../shared/services/login.service';
import { PantryService } from '../shared/services/pantry.service';
import { SuggestionsService } from '../shared/services/suggestions.service';
import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-start-cooking',
  templateUrl: './start-cooking.component.html',
  styleUrls: ['./start-cooking.component.css']
})
export class StartCookingComponent implements OnInit {
  public user: User;
  public userIngredients = '';
  public ingredients: PantryIngredient[] = [];
  public hasRanSearch = false;

  public recipeIds = '';
  public recipesWithMoreInfo: Recipe[] = []
  public recipes: Recipe[] = []

  public filters = [''];
  public filteredRecipes: Recipe[] = [];

  public sortByType: boolean = false

  ingredientSearchForm = new FormGroup({
    ingredient: new FormControl(''),
  });

  public appetizerCategory: Recipe[] = [];
  public beverageCategory: Recipe[] = [];
  public breakfastCategory: Recipe[] = [];
  public dessertCategory: Recipe[] = [];
  public dinnerCategory: Recipe[] = [];
  public lunchCategory: Recipe[] = [];
  public mainCourseCategory: Recipe[] = [];
  public saladCategory: Recipe[] = [];
  public sauceCategory: Recipe[] = [];
  public sideDishCategory: Recipe[] = [];
  public snackCategory: Recipe[] = [];
  public soupCategory: Recipe[] = [];

  constructor(private myRecipes: PantryService, public newRoute: Router, private loginService: LoginService,
    private myUser: UserDataService, private service: AutocompleteService,
    private dialog: MatDialog,
    private suggestionsService: SuggestionsService) {
  }

  ngOnInit(): void {
    this.myUser.getUserData(this.loginService.user.value.email).subscribe((temp: any) => {
      this.user = new User(temp);

      for (let i = 0; i < this.user.user_ingredients.baking.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.baking[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.cannedJarred.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.cannedJarred[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.condiments.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.condiments[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.dairy.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.dairy[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.jarredGoods.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.jarredGoods[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.meats.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.meats[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.oilsDressings.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.oilsDressings[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.pastaRice.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.pastaRice[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.produce.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.produce[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.refrigeratedFrozen.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.refrigeratedFrozen[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.seafood.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.seafood[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.snacks.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.snacks[i] + ',';
      }

      for (let i = 0; i < this.user.user_ingredients.spicesSeasonings.length; i++) {
        this.userIngredients = this.userIngredients + this.user.user_ingredients.spicesSeasonings[i] + ',';
      }

      this.myRecipes.recipesWithPantry(this.userIngredients).subscribe((temp: any) => {
        for (let i = 0; i < temp.length; i++) {
          this.recipes[i] = temp[i];
        }
      });
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

  navToRecipeIntructions(id: string) {
    this.newRoute.navigate(['/recipe-instructions'], { queryParams: { id } });
  }

  sortRecipesByType() {
    for (let i = 0; i < this.recipes.length; i++) {
      this.recipeIds = this.recipeIds + this.recipes[i].id;
      if (i < this.recipes.length - 1) {
        this.recipeIds = this.recipeIds + ',';
      }
    }

    this.suggestionsService.getSuggestionsBulk(this.recipeIds).subscribe((temp: any[]) => {
      // console.log(temp);
      for (let i = 0; i < temp.length; i++) {
        this.recipesWithMoreInfo[i] = temp[i];
        if (this.recipesWithMoreInfo[i].dishTypes[i] == 'appetizer' || this.recipesWithMoreInfo[i].dishTypes[i] == 'finger food') {
          this.appetizerCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'beverage' || this.recipesWithMoreInfo[i].dishTypes[i] == 'drink') {
          this.beverageCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'breakfast' || this.recipesWithMoreInfo[i].dishTypes[i] == 'morning meal') {
          this.breakfastCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'dessert' || this.recipesWithMoreInfo[i].dishTypes[i] == 'bread') {
          this.dessertCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'dinner') {
          this.dinnerCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'lunch') {
          this.lunchCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'main course' || this.recipesWithMoreInfo[i].dishTypes[i] == 'main dish') {
          this.mainCourseCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'sauce' || this.recipesWithMoreInfo[i].dishTypes[i] == 'marinade') {
          this.sauceCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'side dish') {
          this.sideDishCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'salad') {
          this.saladCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'soup') {
          this.soupCategory.push(this.recipesWithMoreInfo[i]);
        }
        else if (this.recipesWithMoreInfo[i].dishTypes[i] == 'snack') {
          this.snackCategory.push(this.recipesWithMoreInfo[i]);
        }
      }

      console.log(this.appetizerCategory);
      console.log(this.beverageCategory);
      console.log(this.breakfastCategory);
      console.log(this.dessertCategory);
      console.log(this.dinnerCategory);
      console.log(this.lunchCategory);
      console.log(this.mainCourseCategory);
      console.log(this.sauceCategory);
      console.log(this.sideDishCategory);
      console.log(this.saladCategory);
      console.log(this.soupCategory);
      console.log(this.snackCategory);
    });

    // console.log(this.recipesWithMoreInfo);
  }

  sortAlphabetically() {
    this.recipes.sort((a, b) => a.title.localeCompare(b.title));
  }

  minimizeMissing() {
    console.log(this.userIngredients);
    this.myRecipes.recipesWithPantryMinimizeMissing(this.userIngredients).subscribe((temp: any) => {
      for (let i = 0; i < temp.length; i++) {
        this.recipes[i] = temp[i];
      }
      console.log(this.recipes);
    });
  }

  maximizeMissing() {
    console.log(this.userIngredients);
    this.myRecipes.recipesWithPantryMaximizeMissing(this.userIngredients).subscribe((temp: any) => {
      for (let i = 0; i < temp.length; i++) {
        this.recipes[i] = temp[i];
      }
      console.log(this.recipes);
    });
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      data: this.filters,
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.applyFilters();
    })
  }

  applyFilters() {
    if (this.filters.length === 0) {
      this.filteredRecipes = this.recipes;
      return;
    }

    const tempRecipies: Recipe[] = [];

    for (let i = 0; i < this.recipes.length; i++) {
      const filtersTag = this.recipes[i].filterTags;

      if (this.hasAllFilterTags(filtersTag)) {
        tempRecipies.push(this.filteredRecipes[i]);
      }
    }

    this.filteredRecipes = tempRecipies;
  }

  hasAllFilterTags(recipeFiltersTag: string[]): boolean {
    for (let i = 0; i < this.filters.length; i++) {
      const filter = this.filters[i];
      console.log(this.filters[i]);
      console.log("check filter: " + filter);

      if (!recipeFiltersTag.includes(filter)) {
        return false;
      }
    }

    return true;
  }

  removeFilter(i: number) {
    if (i > -1) {
      this.filters.splice(i, 1);
    }
  }
  removeAllChips() {
    this.filters = [];
  }

}


