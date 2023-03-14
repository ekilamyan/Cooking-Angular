export class SavedIngredients {
    baking: string[];
    cannedJarred: string[];
    condiments: string[];
    dairy: string[];
    jarredGoods: string[];
    meats: string[];
    oilsDressings: string[];
    pastaRice: string[];
    produce: string[];
    refrigeratedFrozen: string[];
    seafood: string[];
    snacks: string[];
    spicesSeasonings: string[];
    misc: string[];

    constructor(data: any) {
        if (data) {
            this.baking = data.baking;
            this.cannedJarred = data.cannedJarred;
            this.condiments = data.condiments;
            this.dairy = data.dairy;
            this.jarredGoods = [];
            this.meats = [];
            this.oilsDressings = [];
            this.pastaRice = [];
            this.produce = [];
            this.refrigeratedFrozen = [];
            this.seafood = [];
            this.snacks = [];
            this.spicesSeasonings = [];
            this.misc = [];
        } else {
            this.baking = [];
            this.cannedJarred = [];
            this.condiments = [];
            this.dairy = [];
            this.jarredGoods = [];
            this.meats = [];
            this.oilsDressings = [];
            this.pastaRice = [];
            this.produce = [];
            this.refrigeratedFrozen = [];
            this.seafood = [];
            this.snacks = [];
            this.spicesSeasonings = [];
            this.misc = [];
        }
    }
}