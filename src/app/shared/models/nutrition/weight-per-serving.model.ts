export class WeightPerServing {
    amount: number;
    unit: string;

    constructor(data: any) {
        if (data) {
            this.amount = data.amount;
            this.unit = data.unit;
        }
        else {
            this.amount = 0;
            this.unit = '';
        }
    }
}