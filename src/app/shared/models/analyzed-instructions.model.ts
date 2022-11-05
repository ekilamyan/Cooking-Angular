import { Step } from "./step.model";

export class AnalyzedInstructions {
    name: string;
    steps: Step[];

   constructor(data: any) {
      if(data) {
        this.name = data.name;
        this.steps = [];
      } 
      else {
        this.name = '';
        this.steps = [];
      }
   }
}
