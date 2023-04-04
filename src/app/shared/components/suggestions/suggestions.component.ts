import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookingData } from '../../models/cooking-data.model';
import { Recipe } from '../../models/recipe.model';
import { CookingDataService } from '../../services/cooking-data.service';
import { PantryService } from '../../services/pantry.service';
import { SuggestionsService } from '../../services/suggestions.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  @Input() public type: string = '';
  @Input() public recipeId: string = '';
  @Input() public numOfResults: number = 0;

  public cookingData: CookingData;
  public userIngredients = '';

  public recipes: Recipe[] = [];
  public ids = '';

  public savedRecipes: Recipe[] = [];
  public savedRecipeIds = '';

  constructor(private myRecipes: PantryService,
    private service: SuggestionsService,
    private cookingDataService: CookingDataService,
    private suggestionsService: SuggestionsService,
    private newRoute: Router) {
  }

  ngOnInit(): void {
    this.recipes = [];

    if (this.type == 'similar') {
      this.service.getIds(this.recipeId, this.numOfResults).subscribe((temp: any[]) => {
        for (let i = 0; i < temp.length; i++) {
          this.ids = this.ids + temp[i].id;
          if (i < temp.length - 1) {
            this.ids = this.ids + ',';
          }
        }
        this.service.getSuggestionsBulk(this.ids).subscribe((temp: any[]) => {
          for (let i = 0; i < temp.length; i++) {
            this.recipes[i] = temp[i];
          }
        });
      });
    } else if (this.type == 'saved') {
      this.cookingDataService.cookingData.subscribe((cookingData: CookingData) => {
        if (cookingData) {
          this.cookingData = cookingData;

          for (let i = 0; i < 3; i++) {
            this.ids = this.ids + this.cookingData.saved_recipes[i];
            if (i < this.cookingData.saved_recipes.length - 1) {
              this.ids = this.ids + ',';
            }
          }

          this.suggestionsService.getSuggestionsBulk(this.ids).subscribe((temp: any[]) => {
            if (temp) {
              for (let i = 0; i < temp.length; i++) {
                this.recipes[i] = temp[i];
              }
            }
          });

        }
      });
    } else if (this.type == 'pantry') {
      this.cookingDataService.cookingData.subscribe((cookingData: CookingData) => {
        if (cookingData) {
          this.cookingData = cookingData;
          for (let i = 0; i < this.cookingData.user_ingredients.baking.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.baking[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.cannedJarred.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.cannedJarred[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.condiments.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.condiments[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.dairy.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.dairy[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.jarredGoods.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.jarredGoods[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.meats.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.meats[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.oilsDressings.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.oilsDressings[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.pastaRice.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.pastaRice[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.produce.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.produce[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.refrigeratedFrozen.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.refrigeratedFrozen[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.seafood.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.seafood[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.snacks.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.snacks[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.spicesSeasonings.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.spicesSeasonings[i] + ',';
          }

          for (let i = 0; i < this.cookingData.user_ingredients.misc.length; i++) {
            this.userIngredients = this.userIngredients + this.cookingData.user_ingredients.misc[i] + ',';
          }

          this.myRecipes.recipesWithPantry(this.userIngredients).subscribe((temp: any) => {
            if (temp) {
              for (let i = 0; i < 3; i++) {
                this.recipes[i] = temp[i];
              }
            }
          });
        }
      });

    } else {
      this.service.getRandomIds(3).subscribe((responce: any) => {
        for (let i = 0; i < responce.recipes.length; i++) {
          this.recipes[i] = responce.recipes[i];
          this.recipes[i].image = responce.recipes[i].image.replace('556x370', '636x393');
        }
      })
    }
  }

  navToRecipeIntructions(id: string) {
    this.newRoute.navigate(['/recipe-instructions'], { queryParams: { id } });
  }
}