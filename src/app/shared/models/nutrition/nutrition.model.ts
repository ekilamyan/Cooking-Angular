import { CaloricBreakdown } from "./caloric-breakdown.model";
import { Flavonoids } from "./flavonoids.model";
import { Nutrients } from "./nutrients.model";
import { Properties } from "./properties.model";
import { WeightPerServing } from "./weight-per-serving.model";

export class Nutrition {

    nutrients: Nutrients[];
    properties: Properties[];
    flavonoids: Flavonoids[];
    caloricBreakdown: CaloricBreakdown;
    weightPerServing: WeightPerServing;

    constructor(data: any) {
        if(data) {
            this.nutrients = [];
            this.properties = [];
            this.flavonoids = [];
            this.caloricBreakdown = new CaloricBreakdown(data.caloricBreakdown);
            this.weightPerServing = new WeightPerServing(data.weightPerServing);
        } else {
            this.nutrients = [];
            this.properties = [];
            this.flavonoids = [];
            this.caloricBreakdown = new CaloricBreakdown(null);
            this.weightPerServing = new WeightPerServing(null);
        }
    }
}
