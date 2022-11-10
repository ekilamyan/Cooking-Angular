import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RecipeSearch } from '../shared/models/recipe-search.model';
import { AutocompleteService } from '../shared/services/autocomplete.service';

@Component({
  selector: 'app-recipe-search-dialog',
  templateUrl: './recipe-search-dialog.component.html',
  styleUrls: ['./recipe-search-dialog.component.css']
})
export class RecipeSearchDialogComponent implements OnInit {
  public recipes: RecipeSearch[] = [];
  public hasRanSearch = false;
  public durationInSeconds = 2;

  recipeSearchForm = new FormGroup({
    recipe: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<RecipeSearchDialogComponent>,
    private service: AutocompleteService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private route: Router) {

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

  navToRecipeIntructions(id: string) {
    this.route.navigate(['/recipe-instructions'], {queryParams:{id}});
    this.dialogRef.close();
  }

}
