export class UsMeasurements {
    amount: number;
    unitShort: string;
    unitLong: string;

    constructor(data: any) {
        if(data) {
            this.amount = data.amount;
            this.unitShort = data.unitShort;
            this.unitLong = data.unitLong;
        } else {
            this.amount = 0;
            this.unitShort = '';
            this.unitLong = '';
        }
     }
}