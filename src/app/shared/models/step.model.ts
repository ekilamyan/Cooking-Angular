export class Step {
    number: number;
    step: string;
 
     constructor(data: any) {
        if(data) {
         this.number = data.number;
         this.step = data.step;
 
        } else {
         this.number = 0;
         this.step = '';
        }
     }
 }
 