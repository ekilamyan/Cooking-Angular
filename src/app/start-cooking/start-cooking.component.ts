
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
import { PantryService } from '../shared/services/pantry.service';
import { SuggestionsService } from '../shared/services/suggestions.service';
import { CookingDataService } from '../shared/services/cooking-data.service';
import { CookingData } from '../shared/models/cooking-data.model';

@Component({
  selector: 'app-start-cooking',
  templateUrl: './start-cooking.component.html',
  styleUrls: ['./start-cooking.component.css'],
})
export class StartCookingComponent implements OnInit {
  public cookingData: CookingData;
  public user: User;
  public allUserIngredients = '';
  public ingredients: PantryIngredient[] = [];
  public hasRanSearch = false;

  public recipeIds = '';
  public savedRecipeIds = '';

  public recipesWithMoreInfo: Recipe[] = [];
  public savedRecipes: Recipe[] = [];
  public tempRecipes: Recipe[] = [];
  public pantryRecipes: Recipe[] = [];

  public filters = [''];
  public filteredRecipes: Recipe[] = [];
  public filteredIngredients: string[] = [];

  public sortByType: string = 'AZ';

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
  public miscCategory: Recipe[] = [];

  public isLoading: boolean = true;
  public savedIsLoading: boolean = true;

  public searchLoading: boolean = true;
  public searchTermLength = 0;

  constructor(
    private pantryService: PantryService,
    private newRoute: Router,
    private cookingDataService: CookingDataService,
    private service: AutocompleteService,
    private dialog: MatDialog,
    private suggestionsService: SuggestionsService
  ) { }

  ngOnInit(): void {
    this.filters = [];
    this.getPantryRecipes();
    this.applyFilters();
  }

  getPantryRecipes() {
    this.cookingDataService.cookingData.subscribe((cookingData: CookingData) => {
      if (cookingData) {
        this.cookingData = cookingData;
        this.getAllUserIngredients();
        // console.log(this.allUserIngredients);

        this.pantryService.recipesWithPantry(this.allUserIngredients).subscribe((res: Recipe[]) => {
          if (res) {
            this.tempRecipes = res;
          }
          // console.log(this.tempRecipes);
          for (let i = 0; i < this.tempRecipes.length; i++) {
            if (this.tempRecipes[i].image.length > 0) {
              this.recipeIds = this.recipeIds + this.tempRecipes[i].id + ',';
            } else {
              continue;
            }
          }

          this.suggestionsService.getSuggestionsBulk(this.recipeIds).subscribe((temp: Recipe[]) => {
            if (temp) {
              for (let i = 0; i < temp.length; i++) {
                this.pantryRecipes[i] = new Recipe(temp[i]);
              }
            }
            this.isLoading = false;
          });
          this.sortRecipesByType();
        });

        if (this.cookingData.saved_recipes.length > 0) {
          for (let i = 0; i < this.cookingData.saved_recipes.length; i++) {
            this.savedRecipeIds =
              this.savedRecipeIds + this.cookingData.saved_recipes[i];
            if (i < this.cookingData.saved_recipes.length - 1) {
              this.savedRecipeIds = this.savedRecipeIds + ',';
            }
          }

          this.suggestionsService.getSuggestionsBulk(this.savedRecipeIds).subscribe((temp: any[]) => {
            if (temp) {
              for (let i = 0; i < temp.length; i++) {
                this.savedRecipes[i] = temp[i];
              }
            }
            this.savedIsLoading = false;
          });
        }
      }
    }
    );

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

  getAllUserIngredients() {
    for (let i = 0; i < this.cookingData.user_ingredients.meats.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.meats[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.dairy.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.dairy[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.baking.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.baking[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.cannedJarred.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.cannedJarred[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.condiments.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.condiments[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.jarredGoods.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.jarredGoods[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.oilsDressings.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.oilsDressings[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.pastaRice.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.pastaRice[i] + ',';
    }
    for (let i = 0; i < this.cookingData.user_ingredients.produce.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.produce[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.refrigeratedFrozen.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.refrigeratedFrozen[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.seafood.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.seafood[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.snacks.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.snacks[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.spicesSeasonings.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.spicesSeasonings[i] + ',';
    }

    for (let i = 0; i < this.cookingData.user_ingredients.misc.length; i++) {
      this.allUserIngredients = this.allUserIngredients + this.cookingData.user_ingredients.misc[i] + ',';
    }
    // console.log(this.allUserIngredients);
  }

  sortRecipesByType() {
    console.log("called");
    console.log(this.recipeIds);

    this.suggestionsService.getSuggestionsBulk(this.recipeIds).subscribe((temp: any[]) => {
      console.log(this.recipesWithMoreInfo);
      if (temp) {
        for (let i = 0; i < temp.length; i++) {
          this.recipesWithMoreInfo[i] = temp[i];

          if (this.recipesWithMoreInfo[i].dishTypes.includes('appetizer') || this.recipesWithMoreInfo[i].dishTypes[0] == 'finger food') {
            this.appetizerCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes[0] == 'beverage' || this.recipesWithMoreInfo[i].dishTypes[0] == 'drink') {
            this.beverageCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes.includes('breakfast') || this.recipesWithMoreInfo[0].dishTypes.includes('morning meal')) {
            this.breakfastCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes[0] == 'dessert' || this.recipesWithMoreInfo[i].dishTypes[0] == 'bread') {
            this.dessertCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes[0] == 'dinner') {
            this.dinnerCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes[0] == 'lunch') {
            this.lunchCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes[0] == 'main course' || this.recipesWithMoreInfo[i].dishTypes[0] == 'main dish') {
            this.mainCourseCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes[0] == 'sauce' || this.recipesWithMoreInfo[i].dishTypes[0] == 'marinade') {
            this.sauceCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes[0] == 'side dish') {
            this.sideDishCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes[0] == 'salad') {
            this.saladCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes[0] == 'soup') {
            this.soupCategory.push(this.recipesWithMoreInfo[i]);
          }
          else if (this.recipesWithMoreInfo[i].dishTypes[0] == 'snack') {
            this.snackCategory.push(this.recipesWithMoreInfo[i]);
          } else {
            this.miscCategory.push(this.recipesWithMoreInfo[i]);
          }
        }
        this.appetizerCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.beverageCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.breakfastCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.dessertCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.dinnerCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.lunchCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.mainCourseCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.sauceCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.sideDishCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.saladCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.soupCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.snackCategory.sort((a, b) => a.title.localeCompare(b.title));
        this.miscCategory.sort((a, b) => a.title.localeCompare(b.title));
      }
    });
  }

  changeSortingType() {
    this.sortByType = 'type';
  }


  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  navToRecipeIntructions(id: string) {
    this.newRoute.navigate(['/recipe-instructions'], { queryParams: { id } });
    window.scrollTo(0, 0);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      data: this.filters,
      panelClass: 'custom-modalbox',
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.applyFilters();
    });
  }

  applyFilters() {
    console.log(this.filters);
    if (this.filters.length === 0) {
      this.filteredRecipes = this.pantryRecipes;
      return;
    }

    const tempRecipies: Recipe[] = [];

    for (let i = 0; i < this.pantryRecipes.length; i++) {
      const filtersTag = this.pantryRecipes[i].filterTags;

      if (this.hasAllFilterTags(filtersTag)) {
        tempRecipies.push(this.filteredRecipes[i]);
      }
    }

    this.filteredRecipes = tempRecipies;
  }

  hasAllFilterTags(recipeFiltersTag: string[]): boolean {
    for (let i = 0; i < this.filters.length; i++) {
      const filter = this.filters[i];
      if (!recipeFiltersTag.includes(filter)) {
        return false;
      }
    }
    return true;
  }

  addfilter(filter: string) {
    this.filters.push(filter);
    this.applyFilters();
  }

  removeFilter(i: number) {
    if (i > -1) {
      this.filters.splice(i, 1);
    }
    this.applyFilters();
  }

  removeAllChips() {
    this.filters = [];
    this.applyFilters();
  }

  sortAlphabetically() {
    this.pantryRecipes.sort((a, b) => a.title.localeCompare(b.title));
    this.sortByType = 'AZ';
  }

}