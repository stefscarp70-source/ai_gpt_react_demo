//import type {Album} from "@/types/album"
import { ChefToolAction } from "@/types/ChefToolAction";
import { OllamaModel } from "@/types/OllamaModel";
import type { GptResponse, Ingredient } from "@/types/gpt";
import { NextRequest, NextResponse } from "next/server";

/*
type GptResponse = {
  status: string;
  response: string;
  tools: ChefTool;
  steps: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
} */

type OperatorResponse = {
  message: string;
  status: string;
}

export async function askOllama(simple: string, model:OllamaModel): Promise<GptResponse> {
  const response = await fetch(
    `/api/ollama?question=${encodeURIComponent(simple)}&model=${model}`
  );

  if (!response.ok) {
    throw new Error("Unable to query Ollama");
  }

  const data: GptResponse = await response.json();

  return data;
}

export async function askChefAgent(simple: string, model:OllamaModel): Promise<GptResponse> {
  const response = await fetch(
    `/api/agent/chef?question=${encodeURIComponent(simple)}&model=${encodeURIComponent(model)}`
  );

  if (!response.ok) {
    throw new Error("Unable to query Ollama");
  }

  const data: GptResponse = await response.json();

  return data;
}

export async function useOperator(action: ChefToolAction, list:Ingredient[]): Promise<OperatorResponse> {
  const operator: string = action===ChefToolAction.EXTRACT_FROM_FRIDGE? 'extract' : 'restock';

  console.log("useOperator list:", list);
  
  const response = await fetch(`/api/tool/${operator}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(list),
    }); 

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
        "Operator API error:",
        response.status,
        errorText
    );
    throw new Error(
        `Unable to use tool operator: ${response.status} ${errorText}`
    );
  }

  const data = await response.text();

  return NextResponse.json(
    {message: data}
  );
}