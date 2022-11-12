import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/pantry-ingredients.model';
import { RecipeInstructionsService } from '../../services/recipe-instructions.service';
import { SuggestionsService } from '../../services/suggestions.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  public recipes: Recipe[] = [];
  public id = '715438';
  public ids = '';

  constructor(private service: SuggestionsService, private test: RecipeInstructionsService) {
    this.service.getIds('715538').subscribe((temp: any[]) => {
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
  }

  ngOnInit(): void {
  }

}

