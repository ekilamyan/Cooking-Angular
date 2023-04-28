import { AnalyzedInstructions } from "./analyzed-instructions.model";
import { ExtendedIngredients } from "./extended-ingredients.model";
import { Nutrition } from "./nutrition/nutrition.model";

export class Recipe {
   vegetarian: boolean;
   vegan: boolean;
   glutenFree: Boolean;
   dairyFree: Boolean;
   veryHealthy: Boolean;
   cheap: Boolean;
   veryPopular: Boolean;
   sustainable: Boolean;
   lowFodmap: Boolean;
   weightWatcherSmartPoints: number;
   aggregateLikes: number;
   healthScore: number;
   extendedIngredients: ExtendedIngredients[];
   id: string;
   title: string;
   author: string;
   readyInMinutes: number;
   servings: number;
   sourceUrl: string;
   image: string;
   imageType: string;
   nutrition: Nutrition;
   summary: string;
   cuisines: string[];
   dishTypes: string[];
   diets: string[];
   instructions: string;
   analyzedInstructions: AnalyzedInstructions[];
   filtered: boolean;

   filterTags: string[] = [];

   constructor(data: any) {
      if (data) {
         this.vegetarian = data.vegetarian;
         this.vegan = data.vegan;
         this.glutenFree = data.glutenFree;
         this.dairyFree = data.dairyFree;
         this.veryHealthy = data.veryHealthy;
         this.cheap = data.cheap;
         this.veryPopular = data.veryPopular;
         this.sustainable = data.sustainable;
         this.lowFodmap = data.lowFodmap;
         this.weightWatcherSmartPoints = data.weightWatcherSmartPoints;
         this.aggregateLikes = data.aggregateLikes;
         this.healthScore = data.healthScore;
         this.extendedIngredients = data.extendedIngredients;
         this.id = data.id;
         this.title = data.title;
         this.author = data.author;
         this.readyInMinutes = data.readyInMinutes;
         this.servings = data.servings;
         this.sourceUrl = data.sourceUrl;
         this.image = data.image;
         this.imageType = data.imageType;
         this.nutrition = new Nutrition(data.nutrition);
         this.summary = data.summary;
         this.cuisines = data.cuisines;
         this.dishTypes = [];
         this.diets = []
         this.instructions = data.instructions;
         this.analyzedInstructions = [];
         this.filtered = false;

         for (let i = 0; i < this.cuisines.length; i++) {
            this.filterTags.push(this.cuisines[i]);
         }

         for (let i = 0; i < this.dishTypes.length; i++) {
            this.filterTags.push(this.cuisines[i]);
         }

         for (let i = 0; i < this.diets.length; i++) {
            this.filterTags.push(this.cuisines[i]);
         }

         for (let i = 0; i < this.extendedIngredients.length; i++) {
            this.filterTags.push(this.extendedIngredients[i].nameClean);
         }

         if (this.vegan) {
            this.filterTags.push('Vegan');
         }

         if (this.vegetarian) {
            this.filterTags.push('Vegetarian');
         }
         if (this.glutenFree) {
            this.filterTags.push('Gluten Free');
         }
         if (this.dairyFree) {
            this.filterTags.push('Dairy Free');
         }
      }
      else {
         this.vegetarian = false;
         this.vegan = false;
         this.glutenFree = false;
         this.dairyFree = false;
         this.veryHealthy = false;
         this.cheap = false;
         this.veryPopular = false;
         this.sustainable = false;
         this.lowFodmap = false;
         this.weightWatcherSmartPoints = 0;
         this.aggregateLikes = 0;
         this.healthScore = 0;
         this.extendedIngredients = [];
         this.id = '';
         this.title = '';
         this.author = '';
         this.readyInMinutes = 0;
         this.servings = 0;
         this.sourceUrl = '';
         this.image = '';
         this.imageType = '';
         this.nutrition = new Nutrition(null);
         this.summary = '';
         this.cuisines = [];
         this.dishTypes = [];
         this.diets = []
         this.instructions = '';
         this.analyzedInstructions = [];
         this.filtered = false;
      }
   }
}
