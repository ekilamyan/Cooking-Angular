import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nutrients } from 'src/app/shared/models/nutrition/nutrients.model';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeSearch } from 'src/app/shared/models/recipe-search.model';
import { RecipeInstructionsService } from 'src/app/shared/services/recipe-instructions.service';
import { CookingData } from '../shared/models/cooking-data.model';
import { CookingDataService } from '../shared/services/cooking-data.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-recipe-instructions-page',
  templateUrl: './recipe-instructions-page.component.html',
  styleUrls: ['./recipe-instructions-page.component.css']
})
export class RecipeInstructionsPageComponent implements OnInit {
  public units = 'Imperial';


  public IngredientsForm: FormGroup;
  public checkedIngredients: string[] = [];


  public searchItem = new RecipeSearch(null);
  public recipe = new Recipe(null);
  public recipeId: string;


  public ingredientCount = 0;
  public cookingData: CookingData;
  public saved = false;
  public count = 0;


  public allIngredeints: string[] = [];
  public nutritionList: Nutrients[] = [];
  public loadingNutritionList = true;


  public originalIngredientList: string[] = [];
  public metricOriginalIngredientList: string[] = [];
  public ingredientList: string[] = [];
  public instructionsList: string[] = [];

  public showSuggestions = false;
  public isLoading = true;


  constructor(private route: ActivatedRoute, private recipeInstructionsService: RecipeInstructionsService, private cookingDataService: CookingDataService) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((param: any) => {
      this.recipeInstructionsService.getRecipeWithId(param.id).subscribe((temp: Recipe) => {
        if (temp) {
          this.recipe = temp;
          console.log(this.recipe);
          this.recipe.id = String(this.recipe.id);
          this.recipeId = this.recipe.id;
          this.showSuggestions = true;

          for(let i = 0; i < this.recipe.extendedIngredients.length; i++) {
            let ingredient =  String(this.recipe.extendedIngredients[i].nameClean);
            let amount = String(this.recipe.extendedIngredients[i].measures.us.amount);
            let unit = String(this.recipe.extendedIngredients[i].measures.us.unitLong);
          }

          this.recipe.image = this.recipe.image.replace('556x370', '636x393');

          for (let i = 0; i < 9; i++) {
            this.recipe.nutrition.nutrients[i].amount = (Math.round(this.recipe.nutrition.nutrients[i].amount * 10) / 10);
            this.nutritionList[i] = this.recipe.nutrition.nutrients[i];
            this.loadingNutritionList = false;
          }


          for (let i = 0; i < this.recipe.extendedIngredients.length; i++) {
            this.originalIngredientList[i] = this.recipe.extendedIngredients[i].original;
            this.ingredientList.push(this.recipe.extendedIngredients[i].nameClean);
          }


          for (let i = 0; i < this.recipe.analyzedInstructions[0].steps.length; i++) {
            this.instructionsList[i] = this.recipe.analyzedInstructions[0].steps[i].step;
          }


          // metric data
          for (let i = 0; i < this.recipe.extendedIngredients.length; i++) {
            let ingredient = (Math.ceil(this.recipe.extendedIngredients[i].measures.metric.amount)).toString()
              + ' ' + this.recipe.extendedIngredients[i].measures.metric.unitLong
              + ' ' + this.recipe.extendedIngredients[i].originalName;
            this.metricOriginalIngredientList.push(ingredient);
          }


          this.ingredientCount = this.ingredientList.length;

          this.isLoading = false;
          
          this.cookingDataService.cookingData.subscribe((cookingData: CookingData) => {
            if (cookingData) {
              this.cookingData = cookingData;
              this.saved = this.checkIfSaved();
            }
          })
        }
      });
    })
  }

  public setupFormIngredients(type: string) {
    let ingredients: Array<string> = [];
    ingredients = this.originalIngredientList;


    for (let i = 0; i < ingredients.length; i++) {
      let formDefault = false;


      if (this.originalIngredientList.includes(ingredients[i])) {
        formDefault = true;
      }


      let temp = new FormControl(formDefault);
      this.IngredientsForm.addControl(type + i, temp);
    }
  }


  printPage() {
    window.print();
  }


  // compareIngredients() {
  //   for (let i = 0; i < Object.keys(this.cookingData.user_ingredients).length; i++) {
  //     for (let j = 0; j < Object.entries(this.cookingData.user_ingredients)[i][1].length; j++) {
  //       this.allIngredeints.push(Object.entries(this.cookingData.user_ingredients)[i][1][j]);
  //     }
  //   }


  //   for(let i = 0; i < this.ingredientList.length; i++){
  //     if(this.allIngredeints.includes(this.ingredientList[i])){
  //       this.count++;
  //       this.overlappingIngredients.push(this.ingredientList[i]);
  //     }
  //   }
  // }


  checkIfSaved() {
    if (this.cookingData.saved_recipes.includes(this.recipe.id)) {
      return true;
    }
    else return false;
  }


  addRemoveRecipe() {
    if (this.cookingData.saved_recipes.includes(this.recipe.id)) {
      let index = this.cookingData.saved_recipes.indexOf(this.recipe.id);
      if (index > -1) {
        this.cookingData.saved_recipes.splice(index, 1);
      }
    } else {
      this.cookingData.saved_recipes.push(this.recipe.id);
    }


    this.cookingDataService.saveCookingData(this.cookingData);
  }


  changeUnits(units: string) {
    if (units == 'Imperial') {
      this.units = 'Metric';
    } else {
      this.units = 'Imperial';
    }
  }


  checkUncheckFilter(i: string) {
    if (this.checkedIngredients.includes(i)) {
      let index = this.checkedIngredients.indexOf(i);
      if (index > -1) {
        this.checkedIngredients.splice(index, 1);
      }
    } else {
      this.checkedIngredients.push(i);
    }
    // console.log(this.checkedIngredients);
  }

  getRecipeId() {
    return this.recipeId;
  }


}