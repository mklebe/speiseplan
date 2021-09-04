export interface Message {
  message: string;
}

export interface Ingredient {
  name: string;
  amount: {
    quantity: number
    unit: string;
  }
}

export interface Recipe {
  name: string;
  ingredients: Array<Ingredient>;
}
