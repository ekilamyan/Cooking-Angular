import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IngredientDialogComponent } from '../dialogs/ingredient-dialog/ingredient-dialog.component';
import { PantryIngredient } from 'src/app/shared/models/pantry-ingredient.model';
import { AutocompleteService } from 'src/app/shared/services/autocomplete.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDataService } from '../shared/services/user-data.service';
import { User } from '../shared/models/user.model';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-my-pantry',
  templateUrl: './my-pantry.component.html',
  styleUrls: ['./my-pantry.component.css']
})

export class MyPantryComponent implements OnInit {

  public pantry: string[] = ["Trout", "Salmon", "Shrimp", "Halibut", "Whitening", "Albacore", "Sea Urchin", "Caviar"];
  public ingredients: PantryIngredient[] = [];
  public hasRanSearch = false;
  public user: User;

  public durationInSeconds = 2;

  ingredientSearchForm = new FormGroup({
    ingredient: new FormControl(''),
  });

  constructor(private service: AutocompleteService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private myPantry: UserDataService,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.myPantry.getUserData(this.loginService.user.value.email).subscribe((temp: any) => {
      console.log(temp);
      this.user = new User(temp);
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
            if (temp[i].aisle == 'Seafood' || temp[i].aisle == 'Canned and Jarred') {   // Fix parammeter based on category
              this.ingredients.push(new PantryIngredient(temp[i]));
            }
          }
        });
      })
  }

  addIngredient(i: PantryIngredient) {
    if (this.pantry.includes(this.capitalizeFirstLetter(i.name))) {
      this.snackBar.open('Ingredient already in pantry', 'Dismiss', {
        duration: this.durationInSeconds * 1000,
      });
    } else {
      this.pantry.splice((this.pantry.length - 1), 0, this.capitalizeFirstLetter(i.name));
      this.refreshIngredients();
      this.ingredientSearchForm.reset();

      this.snackBar.open(this.capitalizeFirstLetter(i.name) + ' added', 'Dismiss', {
        duration: (this.durationInSeconds + 3) * 1000,
      });
    }
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  refreshIngredients() {
    this.pantry.sort();
  }

  // Functions that need to be fixed when working on the backend
  openDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: this.pantry,
      //width: '700px',
      panelClass: 'custom-modalbox'
    });
  }
}

