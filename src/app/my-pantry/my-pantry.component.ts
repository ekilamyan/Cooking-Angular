import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';
import { PantryIngredient } from 'src/app/shared/models/pantry-ingredient.model';
import { AutocompleteService } from 'src/app/shared/services/autocomplete.service';

@Component({
  selector: 'app-my-pantry',
  templateUrl: './my-pantry.component.html',
  styleUrls: ['./my-pantry.component.css']
})
export class MyPantryComponent implements OnInit {

  public pantry: string[] = ["Trout", "Salmon", "Shrimp", "Halibut", "Whitening", "Albacore", "Sea Urchin", "Caviar"];
  public ingredients: PantryIngredient[] = [];
  public hasRanSearch = false;


  ingredientSearchForm = new FormGroup({
    ingredient: new FormControl(''),
  });

  constructor(private service: AutocompleteService, 
    private formBuilder: FormBuilder, 
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.refreshIngredients();
    this.ingredientSearchForm = this.formBuilder.group({
      'ingredient': ['']
    });

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

