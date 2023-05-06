import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { SuggestionsService } from '../../services/suggestions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showcase-recipe',
  templateUrl: './showcase-recipe.component.html',
  styleUrls: ['./showcase-recipe.component.css']
})
export class ShowcaseRecipeComponent implements OnInit {

  public recipes: Recipe[] = [];
  public isLoading: boolean = true;

  constructor(private suggestions: SuggestionsService, public newRoute: Router) { }

  ngOnInit(): void {
    this.getShowcaseRecipe();
  }

  getShowcaseRecipe() {
    let length = 0;
    //  do {
    this.suggestions.getRandomIds(1).subscribe((responce: any) => {
      if (responce) {
        console.log(responce);
        this.recipes[0] = responce.recipes[0];
        this.recipes[0].image = responce.recipes[0].image.replace(
          '556x370',
          '636x393'
        );
        length = this.recipes[0].title.length;

        console.log(length);
        this.isLoading = false;
      }
    });
    //  } while(length > 45);
  }

  navToRecipeIntructions(id: string) {
    this.newRoute.navigate(['/recipe-instructions'], { queryParams: { id } });
  }

}
