import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nutrients } from 'src/app/shared/models/nutrition/nutrients.model';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeSearch } from 'src/app/shared/models/recipe-search.model';
import { RecipeInstructionsService } from 'src/app/shared/services/recipe-instructions.service';

@Component({
  selector: 'app-recipe-instructions-page',
  templateUrl: './recipe-instructions-page.component.html',
  styleUrls: ['./recipe-instructions-page.component.css']
})
export class RecipeInstructionsPageComponent implements OnInit {

  public searchItem = new RecipeSearch(null);
  public recipe = new Recipe(null);

  public ingredientCount = 0;

  public nutritionList: Nutrients[] = [];
  public ingredientList: string[] = [];
  public instructionsList: string[] = [];

  constructor(private route: ActivatedRoute, private test: RecipeInstructionsService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param: any) => {
      this.test.getRecipeWithId(param.id).subscribe((temp: Recipe) => {  // 
        this.recipe = temp;

        //console.log(this.recipe);

        this.recipe.image = this.recipe.image.replace('556x370', '636x393');

        for (let i = 0; i < 9; i++) {
          this.recipe.nutrition.nutrients[i].amount = (Math.round(this.recipe.nutrition.nutrients[i].amount * 10) / 10);
          this.nutritionList[i] = this.recipe.nutrition.nutrients[i];
        }

        for (let i = 0; i < this.recipe.extendedIngredients.length; i++) {
          this.ingredientList[i] = this.recipe.extendedIngredients[i].original;
        }

        for (let i = 0; i < this.recipe.analyzedInstructions[0].steps.length; i++) {
          this.instructionsList[i] = this.recipe.analyzedInstructions[0].steps[i].step;
        }

        this.ingredientCount = this.ingredientList.length;

      });
    })
  }

  printPage() {
    window.print();
  }

}
