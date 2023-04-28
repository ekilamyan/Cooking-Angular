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
  public filteredRecipes: Recipe[] = [];
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
    - search Service has a behavior subject called 'last search' which is a global subscribe-alble variable
    - we set its value using 'this.searchService.lastSearch.next(id);' in dialog
    - after it is used we unsubscribe from it on 'ngOnDestroy' from this file 
    */

    this.id = this.searchService.lastSearchId.value;
    this.searchSubscription = this.searchService.lastSearchId.subscribe((id: string) => {

      console.log(this.id);

      this.id = id;
      this.ids = '';
      this.recipes = [];
      this.filteredRecipes = [];
      this.removeAllChips();
      // console.log(id);

      // if (this.id.length < 1) {
      //   this.newRoute.navigate(['/dashboard'])
      // }

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
          this.suggestionsService.getIds(this.id, 20).subscribe((temp: any[]) => {
            this.ids = this.id + ',';
            for (let i = 0; i < temp.length; i++) {
              this.ids = this.ids + temp[i].id;
              if (i < temp.length - 1) {
                this.ids = this.ids + ',';
              }
            }
            /* find recipes with list of ids */
            this.suggestionsService.getSuggestionsBulk(this.ids).subscribe((res: any[]) => {
              for (let i = 0; i < res.length; i++) {
                this.recipes[i] = new Recipe(res[i]);
              }
              this.searchedWord = this.recipes[0].title;
              this.applyFilters();
              console.log(this.filteredRecipes);
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
      console.log(i);
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
    this.applyFilters();
  }

  removeAllChips() {
    this.filters = [];
    this.applyFilters();
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  navToRecipeIntructions(id: string) {
    this.newRoute.navigate(['/recipe-instructions'], { queryParams: { id } });
  }

  removeRecipe(recipe: Recipe) {
    console.log("remove receipe alled");
    return true;
  }

  changeResults(id: string) {
    this.searchService.lastSearchId.next(id);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}