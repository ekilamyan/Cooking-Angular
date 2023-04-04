import { Measurements } from "./measurements/measurements.model";

export class ExtendedIngredients {
    id: String;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    amount: number;
    unit: string;
    meta: string[];
    measurement: Measurements

    constructor(data: any) {
       if(data) {
            this.id = data.id;
            this.aisle = data.aisle;
            this.image = data.image;
            this.consistency = data.consistency;
            this.name = data.name;
            this.nameClean = data.nameClean;
            this.original = data.original;
            this.amount = data.amount;
            this.unit = data.unit;
            this.meta = [];
            this.measurement = new Measurements(data.measures);
       } else {
            this.id = '';
            this.aisle = '';
            this.image = '';
            this.consistency = '';
            this.name = '';
            this.nameClean = '';
            this.original = '';
            this.amount = 0;
            this.unit = '';
            this.meta = [];
            this.measurement = new Measurements(null);
       }
    }
}