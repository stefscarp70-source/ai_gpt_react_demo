import { ChefToolAction } from "./ChefToolAction";

export type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
};

export type ChefTool = {
    name: string;
    ingredientDtos: Ingredient[];
    action?: ChefToolAction;
};


export type GptResponse = {
    status: string;
    response?: string;
    tools: ChefTool[];
    steps: number;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
};