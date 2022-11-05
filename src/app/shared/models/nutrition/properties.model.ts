export class Properties {
    name: string;
    amount: number;
    unit: string;

    constructor(data: any) {
        if (data) {
            this.name = data.name;
            this.amount = data.amount;
            this.unit = data.unit;
        }
        else {
            this.name = '';
            this.amount = 0;
            this.unit = '';
        }
    }
}
