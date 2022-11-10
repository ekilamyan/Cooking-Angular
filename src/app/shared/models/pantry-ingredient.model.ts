export class PantryIngredient {
    id: string;
    name: string;
    aisle: string;
    possibleUnits: string[];     
    
    constructor(data: any) {
        if(data) {
            this.id = data.id;
            this.name = data.name;
            this.aisle = data.aisle;
            this.possibleUnits = []; 
        } else {
            this.id = '';
            this.name = '';
            this.aisle = '';
            this.possibleUnits = []; 
        }
     }
}
