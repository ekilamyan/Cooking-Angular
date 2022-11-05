export class Nutrients {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;

    constructor(data: any) {
        if (data) {
            this.name = data.name;
            this.amount = data.amount;
            this.unit = data.unit;
            this.percentOfDailyNeeds = data.percentOfDailyNeeds;
        }
        else {
            this.name = '';
            this.amount = 0;
            this.unit = '';
            this.percentOfDailyNeeds = 0;
        }
    }
}
