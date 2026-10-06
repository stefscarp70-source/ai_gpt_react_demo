import { OllamaModel } from "./OllamaModel";

export type SearchHistoryItem = {
    answer: string;
    model: OllamaModel;
    tokens: number;
    minutes: string|undefined;
}