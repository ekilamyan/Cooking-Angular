import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subscribable, Subscription } from 'rxjs';
import { RecipeSearch } from '../shared/models/recipe-search.model';
import { AutocompleteService } from 'src/app/shared/services/autocomplete.service';
import { FiltersDialogComponent } from '../dialogs/filters-dialog/filters-dialog.component';
import { Recipe } from '../shared/models/recipe.model';
import { SuggestionsService } from '../shared/services/suggestions.service';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent implements OnInit {
  public autocompleteRecipes: RecipeSearch[] = [];
  public filters = [''];
  public hasRanSearch = false;
  public id: string = '';
  public searchedWord = '';

  public recipes: Recipe[] = [];
  public ids = '';
  private searchSubscription = new Subscription();

  recipeSearchForm = new FormGroup({
    recipe: new FormControl(''),
  });

  constructor(private service: AutocompleteService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public newRoute: Router,
    private suggestionsService: SuggestionsService,
    private searchService: SearchService) {

    this.route.snapshot
  }

  ngOnInit(): void {


    // public categoryTitles = ['Breakfast', 'Gluten Free', 'Vegan', 'Pizza', 'Smoothies', 'Desserts'];

    /*
    - search Service has a behavior subject called 'last search' which is a global subscribalble variable
    - we set it value using 'this.searchService.lastSearch.next(id);' in dialog
    - after it is used we unsubscribe from it on 'ngOnDestroy' from this file 
    */

    this.id = this.searchService.lastSearchId.value;
    this.searchSubscription = this.searchService.lastSearchId.subscribe((id: string) => {

      this.id = id;
      this.ids = '';
      this.recipes = [];
      this.removeAllChips();
      // console.log(id);

      if (this.id) {
        /* For random recipes with categories */
        if (id == 'breakfast' || id == 'gluten free' || id == 'vegan' || id == 'dessert') {
          this.id = id;
          this.suggestionsService.getRandomIdsByCuisine(this.id, 4).subscribe((temp: any) => {
            for (let i = 0; i < temp.recipes.length; i++) {
              this.recipes[i] = temp.recipes[i];
            }
          });

        } else {
          /* For results from a actual search */
          /* Get list of ids */
          if (id == 'pizza') {
            this.id = '210327';
          }
          else if (id == 'smoothie') {
            this.id = '125319';
          }
          this.suggestionsService.getIds(this.id, 3).subscribe((temp: any[]) => {
            console.log(this.id)
            this.ids = this.id + ',';
            for (let i = 0; i < temp.length; i++) {
              this.ids = this.ids + temp[i].id;
              if (i < temp.length - 1) {
                this.ids = this.ids + ',';
              }
            }
            /* find recipes with list of ids */
            this.suggestionsService.getSuggestionsBulk(this.ids).subscribe((esh: any[]) => {
              for (let i = 0; i < esh.length; i++) {
                this.recipes[i] = esh[i];
              }
              this.searchedWord = this.recipes[0].title;
            });
          });
        }
      }
    })

    this.recipeSearchForm = this.formBuilder.group({
      'recipe': ['']
    });


    this.recipeSearchForm.get('recipe')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe((searchTerm: string) => {
        if (!searchTerm || searchTerm === '') {
          this.searchedWord = searchTerm;
          this.autocompleteRecipes = [];
          return;
        }

        this.service.getRecipeAutocomplete(searchTerm).subscribe((temp: any[]) => {
          this.autocompleteRecipes = [];
          for (let i = 0; i < temp.length; i++) {
            this.autocompleteRecipes.push(new RecipeSearch(temp[i]));
          }
        });
      })
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      data: this.filters,
      panelClass: 'custom-modalbox'
    });
  }

  removeFilter(i: number) {
    if (i > -1) {
      this.filters.splice(i, 1);
    }
  }
  removeAllChips() {
    this.filters = [];
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  changeResults(id: string) {
    this.searchService.lastSearchId.next(id);
  }

  navToRecipeIntructions(id: string) {
    this.newRoute.navigate(['/recipe-instructions'], { queryParams: { id } });
  }

  /*
  filterRecipe(recipe: Recipe) {
    // cuisines
    // dishTypes
    // diets
    if (this.filters.length < 1){
      return recipe.filtered
    } else {
      
      if (recipe.cuisines.length < 1) {
        return recipe.filtered;
      } 
      else {
        for (let i = 0; i < this.filters.length && !recipe.filtered; i++) {
          if (recipe.cuisines.includes(this.filters[i])) {
            recipe.filtered = true;
          }
        }
      }



      if(recipe.dishTypes.length < 1) {
        return recipe.filtered;
      }
      if(recipe.diets.length < 1) {
        return recipe.filtered;
      }
    }


    for(let i = 0; i < this.filters.length && recipe.filtered; i++) {

    }
    recipe.cuisines.includes('');
    recipe.filtered = true
  }
    */


}

/*
public cuisineMap = new Map ([
  ['African', false],
  ['American', false],
  ['British',false],
  ['Cajun',false],
  ['Caribbean',false],
  ['Chinese',false],
  ['European',false],
  ['French',false],
  ['German',false],
  ['Greek',false],
  ['Indian',false],
  ['Irish',false],
  ['Italian',false],
  ['Japanese',false],
  ['Jewish',false],
  ['Korean',false],
  ['Latin American',false],
  ['Mediterranean',false],
  ['Mexican',false],
  ['Middle Eastern',false],
  ['Southern',false],
  ['Spanish',false],
  ['Thai',false],
  ['Vietnamese',false],
]);

*/