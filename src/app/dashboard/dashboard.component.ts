import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../shared/models/recipe.model';
import { SearchService } from '../shared/services/search.service';
import { SuggestionsService } from '../shared/services/suggestions.service';
import { CookingData } from '../shared/models/cooking-data.model';
import { CookingDataService } from '../shared/services/cooking-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public categoryImages = ['assets/photos/breakfast.jpg', 'assets/photos/gluten-free.jpg', 'assets/photos/vegan.jpg', 'assets/photos/pizza.jpg', 'assets/photos/smoothie.jpg', 'assets/photos/dessert.jpg'];
  public categoryTitles = ['Breakfast', 'Gluten Free', 'Vegan', 'Pizza', 'Smoothies', 'Desserts'];
  public categoryTitlesForSearching = ['breakfast', 'gluten free', 'vegan', 'pizza', 'smoothie', 'dessert'];

  public recipes: Recipe[] = [];
  public cookingData: CookingData;

  constructor(private suggestions: SuggestionsService, 
    private searchService: SearchService,
    private cookingDataService: CookingDataService, 
    private route: Router,
    public newRoute: Router,) {
  }

  ngOnInit(): void {
    this.cookingDataService.cookingData.subscribe((cookingData: CookingData) => {
      if (cookingData) {
        this.cookingData = cookingData;
      }
    });

    this.suggestions.getRandomIds(1).subscribe((responce: any) => {
      for (let i = 0; i < responce.recipes.length; i++) {
        this.recipes[i] = responce.recipes[i];
        this.recipes[i].image = responce.recipes[i].image.replace('556x370', '636x393');    
      }
    })
  }

  navToRecipeIntructions(id: string) {
    this.newRoute.navigate(['/recipe-instructions'], {queryParams:{id}});
  }

  navToSearchPage(id: string) {
    // this.route.navigate(['/recipe-search']);
    // console.log ('navToRecipeIntructions called');
    if (this.route.url.includes('search')) {
      this.searchService.lastSearchId.next(id);
    } else {
      this.searchService.lastSearchId.next(id);
      this.route.navigate(['search']);
    }
  }

}