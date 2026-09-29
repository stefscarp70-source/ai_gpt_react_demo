import { Ingredient } from "@/types/gpt";
import {NextRequest, NextResponse} from "next/server"

export async function POST(
    request:NextRequest,
    { params }: { params: Promise<{ operator: string }> }
) {
    const { operator } = await params;
    console.log("  applying operator "+operator+"...");
    //console.log("erquest:", request);

    const list: Ingredient[] = await request.json();

    const server = "http://localhost:8585";

    if (!list) {
        return NextResponse.json(
            { error: "Ingredient list is mandatory" },
            { status: 400 }
        );
    }

    
    try {
        const url = server+`/api/tool/${operator}`;
        const response = await fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(list),
            }
        );
        
        if (!response.ok) {
            return NextResponse.json(
                { error: "Operator service error",
                    data: response
                 },                    
                { status: response.status }
            );
        }

        /*
        const raw = await response.text();

        console.log("Backend raw response:", raw);
        */
        
        const data = await response.json();
        
        console.log("  Operator result:", data);

        return NextResponse.json(data);
        
    } catch (error) {
        console.log("Next error:", error);
        return NextResponse.json(
            { error: "Unable to query Ollama" },
            { status: 500 }
        );
    }
}