import { SavedIngredients } from "./saved-ingredients.model";

export class CookingData {
    saved_recipes: string []; 
    user_diets: string []; 
    user_ingredients: SavedIngredients; 
    raw_user_ingredients: string []; 
    user_intolerances: string [];
    user_units: string;

    constructor(data: any) {
        if (data) {
            this.saved_recipes = data.saved_recipes; 
            this.user_diets = data.user_diets;
            this.user_ingredients = new SavedIngredients(data.user_ingredients);
            this.user_intolerances = data.user_intolerances; 
            this.user_units = data.user_units
        } else {
            this.saved_recipes = []; 
            this.user_diets = []; 
            this.user_ingredients = new SavedIngredients(null);
            this.user_intolerances = [];     
        }
    }
}

