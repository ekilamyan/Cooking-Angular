export class SavedIngredients {
    sort(arg0: (a: any, b: any) => any) {
      throw new Error('Method not implemented.');
    }
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
    drinksBeverages: string[];
    misc: string[];

    constructor(data: any) {
        if (data) {
            this.baking = data.baking;
            this.cannedJarred = data.cannedJarred;
            this.condiments = data.condiments;
            this.dairy = data.dairy;
            this.jarredGoods = data.jarredGoods;
            this.meats = data.meats;
            this.oilsDressings = data.oilsDressings;
            this.pastaRice = data.pastaRice;
            this.produce = data.produce;
            this.refrigeratedFrozen = data.refrigeratedFrozen;
            this.seafood = data.seafood;
            this.snacks = data.snacks;
            this.spicesSeasonings = data.spicesSeasonings;
            this.drinksBeverages = data.drinksBeverages
            this.misc = data.misc;
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
            this.drinksBeverages = [];
            this.misc = [];
        }
    }
}