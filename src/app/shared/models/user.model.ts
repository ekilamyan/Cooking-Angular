import { SavedIngredients } from "./saved-ingredients.model";

export class User {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    saved_recipes: string []; 
    user_diets: string []; 
    user_ingredients: SavedIngredients; 
    saved_intolerances: string []; 

    constructor(data: any) {
        if (data) {
            this.email = data.name;
            this.first_name = data.first_name;
            this.last_name = data.last_name;
            this.saved_recipes = []; 
            this.user_diets = [];
            console.log(data.user_ingredients);
            this.user_ingredients = new SavedIngredients(data.user_ingredients); 
            this.saved_intolerances = []; 
            
        }
        else {
            this.email = '';
            this.password = '';
            this.first_name = '';
            this.last_name = '';
            this.saved_recipes = []; 
            this.user_diets = []; 
            this.user_ingredients = new SavedIngredients(null);
            this.saved_intolerances = []; 
        }
    }
}