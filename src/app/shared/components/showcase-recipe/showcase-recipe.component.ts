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

  public recipe: Recipe;
  public ids = [ "632250", "884162", "1697589", "636558", "638174", "729530", "1063645",
    "655890", "643559", "641395", "639631", "639893", "662581", "652423", "663942", "716364",
    "635417", "659934", "638808", "764752", "638604", "665185", "633068", "651757", "661071",
    "632252", "638940", "663680", "637014", "654028", "662859", "1600767", "645384", "635067",
    "663950", "658498", "636732", "715467", "715527", "633955", "663858", "658665", "663587",
    "633399", "657377", "639778"
  ]

  constructor(private suggestions: SuggestionsService, public newRoute: Router) { }

  public isLoading: boolean = true;

  ngOnInit(): void {
    console.log(this.getRandomNumber());
    this.getShowcaseRecipe();
  }

  getShowcaseRecipe() {
    let length = 0;
    this.suggestions.getRecipeById(this.ids[this.getRandomNumber()]).subscribe((responce: any) => {
      if (responce) {
        this.recipe = responce;
        this.recipe.image = responce.image.replace('556x370', '636x393');
        this.isLoading = false;
      }
    });
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 23);
  }

  navToRecipeIntructions(id: string) {
    this.newRoute.navigate(['/recipe-instructions'], { queryParams: { id } });
    window.scrollTo(0, 0);
  }

}
