export class RecipeSearch {
    id: string;
    title: string;
    imageType: string; 
    
    constructor(data: any) {
        if(data) {
            this.id = data.id;
            this.title = data.title;
            this.imageType = data.imageType;
        } else {
            this.id = '';
            this.title = '';
            this.imageType = '';
        }
     }
}
