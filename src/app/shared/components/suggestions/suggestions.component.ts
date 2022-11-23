import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeInstructionsService } from '../../services/recipe-instructions.service';
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

  public recipes: Recipe[] = [];
  public ids = '';

  constructor(private service: SuggestionsService, 
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
        this.service.getSuggestionsBulk(this.ids).subscribe((esh: any[]) => {
          for (let i = 0; i < esh.length; i++) {
            this.recipes[i] = esh[i];
          }
        });
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
    this.newRoute.navigate(['/recipe-instructions'], {queryParams:{id}});
  }


}

