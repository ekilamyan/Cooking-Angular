import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../shared/models/recipe.model';
import { PantryService } from '../shared/services/pantry.service';

@Component({
  selector: 'app-start-cooking',
  templateUrl: './start-cooking.component.html',
  styleUrls: ['./start-cooking.component.css']
})
export class StartCookingComponent implements OnInit {

  public recipeIds = '';
  public pantry = 'salmonfillet,+shrimp,+peanut,+milk,+baby spinach leaves';
  public recipes:Recipe[] = []

  constructor(private myRecipes: PantryService, public newRoute: Router,) {
  }

  ngOnInit(): void {

    this.recipes = [];

    this.myRecipes.getMyRecipesIds(this.pantry).subscribe((temp: any[]) => {
      for (let i = 0; i < temp.length; i++) {
        this.recipeIds = this.recipeIds + temp[i].id;
        if (i < temp.length - 1) {
          this.recipeIds = this.recipeIds + ',';
        }
      }

      this.myRecipes.getRecipesBulk(this.recipeIds).subscribe((temp: any[]) => { 
        for(let i = 0; i < this.recipeIds.length; i++) {
          if (temp[i]) {
            this.recipes[i] = temp[i];
          }
        }
      });
    });

  }

  navToRecipeIntructions(id: string) {
    this.newRoute.navigate(['/recipe-instructions'], { queryParams: { id } });
  }

}


