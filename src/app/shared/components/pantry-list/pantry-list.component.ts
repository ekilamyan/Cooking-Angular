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

  public color = '';
  public title = '';
  public term = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getColor(this.category);
    this.getTitle(this.category);
  }

  getColor(category: string) {
    if (category == 'seafood') {
      this.color = '#bcdbff';
      this.term = 'Seafood'

    } else if (category == 'spicesSeasonings') {
      this.color = '#f8e8fc';
      this.term = 'Spices and Seasonings'

    } else if (category == 'baking') {
      this.color = '#ffe3e3';
      this.term = 'Baking'

    } else if (category == 'cannedJarred') {
      this.color = '#e4fcc7';
      this.term = 'Canned and Jarred'

    } else if (category == 'dairy') {
      this.color = '#dcfaf7';
      this.term = 'Dairy'

    } else if (category == 'meats') {
      this.color = '#ff9c91';
      this.term = 'Meats'

    } else if (category == 'produce') {
      this.color = '#cfffcf';
      this.term = 'Produce'

    } else if (category == 'oilsDressings') {
      this.color = '#fcfcc7';
      this.term = 'Oil, Vinegar, Salad Dressing'

    } else if (category == 'jarredGoods') {
      this.color = '#ffedd4';
      this.term = 'Jarred Goods'

    } else if (category == 'misc') {
      this.color = 'ebebeb';
      this.term = 'Miscellaneous'

    } else if (category == 'refrigeratedFrozen') {
      this.color = '#91c3ff';
      this.term = 'Frozen & Refrigerated'

    } else if (category == 'condiments') {
      this.color = '#fce2c7';
      this.term = 'Condiments'

    } else if (category == 'pastaRice') {
      this.color = '#fcea97';
      this.term = 'Pastas & Rice'

    } else if (category == 'snacks') {
      this.color = '#fc979d';
      this.term = 'Snacks'

    } else if (category == 'drinksBeverages') {
      this.color = '#dab3ff';
      this.term = 'Beverages'

    } else this.color = 'ebebeb';
  }

  getTitle(category: string) {
    if (category == 'seafood') {
      this.title = 'Seafood';
    } else if (category == 'spicesSeasonings') {
      this.title = 'Spices & Seasonings';
    } else if (category == 'baking') {
      this.title = 'Baking';
    } else if (category == 'cannedJarred') {
      this.title = 'Canned & Jarred';
    } else if (category == 'dairy') {
      this.title = 'Dairy';
    } else if (category == 'meats') {
      this.title = 'Meats';
    } else if (category == 'produce') {
      this.title = 'Produce';
    } else if (category == 'oilsDressings') {
      this.title = 'Oils & Dessings';
    } else if (category == 'jarredGoods') {
      this.title = 'Jarred Goods';
    } else if (category == 'misc') {
      this.title = 'Miscellaneous';
    } else if (category == 'refrigeratedFrozen') {
      this.title = 'Refrigerated & Frozen';
    } else if (category == 'condiments') {
      this.title = 'Condiments';
    } else if (category == 'pastaRice') {
      this.title = 'Pastas & Rice';
    } else if (category == 'snacks') {
      this.title = 'Snacks';
    } else if (category == 'drinksBeverages') {
      this.title = 'Beverages';
    } else this.color = 'ebebeb';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: { title: this.title, stuff: this.ingredients.sort(), term: this.term, color: this.color },
      //width: '700px',
      panelClass: 'custom-modalbox'
    });
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}
