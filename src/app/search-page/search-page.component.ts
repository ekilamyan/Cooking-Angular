import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RecipeSearchDialogComponent } from '../recipe-search-dialog/recipe-search-dialog.component';
import { RecipeSearch } from '../shared/models/recipe-search.model';
import { AutocompleteService } from '../shared/services/autocomplete.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  public recipes: RecipeSearch[] = [];
  public hasRanSearch = false;

  recipeSearchForm = new FormGroup({
    recipe: new FormControl(''),
  });

  constructor(private service: AutocompleteService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private route: Router) {

  }

  ngOnInit(): void {
    // this.refreshIngredients();
    this.recipeSearchForm = this.formBuilder.group({
      'recipe': ['']
    });

    this.recipeSearchForm.get('recipe')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe((searchTerm: string) => {
        if (!searchTerm || searchTerm === '') {
          this.recipes = [];
          return;
        }

        this.service.getRecipeAutocomplete(searchTerm).subscribe((temp: any[]) => {
          this.recipes = [];
          this.hasRanSearch = true;
          for (let i = 0; i < temp.length; i++) {
            this.recipes.push(new RecipeSearch(temp[i]));
          }
        });
      })
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
