import { UsMeasurements } from "./us-measurements.model";
import { MetricMeasurements } from "./metric-measurements.model"; 

export class Measurements {
    us: UsMeasurements; 
    metric: MetricMeasurements

    constructor(data: any) {
        if(data) {
            this.us = new UsMeasurements(data.us);
            this.metric = new MetricMeasurements(data.us);
        } else {
            this.us = new UsMeasurements(null);
            this.metric = new MetricMeasurements(null);   
        }
     }
}