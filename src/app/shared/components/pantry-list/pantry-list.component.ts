import { Component, Input, OnInit } from '@angular/core';
import { AutocompleteService } from 'src/app/shared/services/autocomplete.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientDialogComponent } from 'src/app/dialogs/ingredient-dialog/ingredient-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pantry-list',
  templateUrl: './pantry-list.component.html',
  styleUrls: ['./pantry-list.component.css']
})
export class PantryListComponent implements OnInit {

  @Input() public category: string = '';
  @Input() public ingredients: string[];
  @Input() public color: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ingredients = this.ingredients.sort();
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: {stuff : this.ingredients, category: this.category, color: this.color},
      //width: '700px',
      panelClass: 'custom-modalbox'
    });
  }
  

}
