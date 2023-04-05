import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RecipeSearch } from 'src/app/shared/models/recipe-search.model';
import { AutocompleteService } from 'src/app/shared/services/autocomplete.service';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-recipe-search-dialog',
  templateUrl: './recipe-search-dialog.component.html',
  styleUrls: ['./recipe-search-dialog.component.css']
})
export class RecipeSearchDialogComponent implements OnInit {
  public recipes: RecipeSearch[] = [];
  public hasRanSearch = false;

  recipeSearchForm = new FormGroup({
    recipe: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<RecipeSearchDialogComponent>,
    private service: AutocompleteService, 
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private route: Router,
    private searchService: SearchService) {
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


  // passing string to another component 
  navToSearchPage(id: string) {
    // this.route.navigate(['/recipe-search']);
    // console.log ('navToRecipeIntructions called');

    if (this.route.url.includes('search')) {
      this.searchService.lastSearchId.next(id);
    } else {
      this.searchService.lastSearchId.next(id);
      this.route.navigate(['search']);
    }
    
    this.dialogRef.close();
  }

}
