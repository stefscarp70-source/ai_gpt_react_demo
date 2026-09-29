import { Client } from "undici";
import {NextRequest, NextResponse} from "next/server"

export async function GET(request:NextRequest) {
    console.log("  CHEF agent ROUTE called...");

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("question");
    const model = searchParams.get("model");
    const server = "http://localhost:8585";

    if (!query) {
        return NextResponse.json(
            { error: "Search question is required" },
            { status: 400 }
        );
    }

    const apimodel = model==='LLAMA3'? 'llama':'qwen'

    /*
    return NextResponse.json(
        {
            status": "SUCCESS",
            answer": null,
            response": "The task is complete. The user has all required ingredients for minestrone for 3 people as confirmed by the fridge check. No further action is needed.",
            tools: [
                {
                    name: "getRecipeIngredients",
                    ingredients: [],
                    args: null
                },
                {
                    name: 'findFridgeMissingIngredients',
                    ingredients: [
                        {
                            name: "stelline",
                            quantity: 100,
                            unit: "g"
                        },
                        {
                            name: "verdure",
                            quantity: 100,
                            unit: "g"
                        }
                    ],
                    args: null
                }
            ],

            steps: 3,
            totalCost: null,
            totalTokens: 2574
        }
    ); */

    //Carbonara
    /*
    return NextResponse.json(
        {
            status: "SUCCESS",
            answer: null,
            response: "The task is now complete because all required ingredients for carbonara for 3 people are available after purchasing the missing penne. The market purchase of penne (1kg) covers the required 100g, and guanciale was already present in the fridge as indicated by the previous tool response. No further actions are needed.",
            tools: [
                {
                    name: "getRecipeIngredients",
                    ingredientDtos: [],
                    args: null
                },
                {
                    name: 'findFridgeMissingIngredients',
                    ingredientDtos: [
                        {
                            name: "spaghetti",
                            quantity: 240,
                            unit: "g"
                        },
                        {
                            name: "guanciale",
                            quantity: 120,
                            unit: "g"
                        },
                        {
                            name: "uova",
                            quantity: 3,
                            unit: "piece"
                        },
                        {
                            name: "pecorino romano",
                            quantity: 60,
                            unit: "g"
                        }
                    ],
                    args: null
                },
                {
                    name: 'buyAtMarket',
                    ingredientDtos: [
                        {
                            name: "uova",
                            quantity: 2,
                            unit: "piece"
                        }
                    ],
                    args: null
                }
            ],

            steps: 4,
            totalCost: 4.5,
            totalTokens: 4574            
        }
    );   
    */

    const client = new Client(server, {
        headersTimeout: 600_000,
        bodyTimeout: 600_000,
    });

    try {
        let args = `q=${encodeURIComponent(query)}`;
        if (model!=='LLAMA3') {
            args += `&model=${model}`;
        }
        const url = server+`/agent/${apimodel}/chef?` + args;
        const response = await fetch(url,
            {
                dispatcher: client,
                signal: AbortSignal.timeout(600_000), // 10 minuti
            }
        );
        
        if (!response.ok) {
            return NextResponse.json(
                { error: "Ollama API chef agent service error" },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        console.log("data:", data);

        
        return NextResponse.json(data);

        /*
        const text = await response.text();
        console.log("response:", response);
        
        return NextResponse.json(
            {
                status: response.status,
                response: text,
                totalTokens: -1
            }
        ); */

    } catch (error) {
        console.log("Next error:", error);
        return NextResponse.json(
            { error: "Unable to query Ollama" },
            { status: 500 }
        );
    }
}