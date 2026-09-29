import {NextRequest, NextResponse} from "next/server"

export async function GET(request:NextRequest) {
    console.log("========== OLLAMA ROUTE CALLED ==========");

    const searchParams = request.nextUrl.searchParams;
    const question = searchParams.get("question");
    const server = "http://localhost:8585";

    if (!question) {
        return NextResponse.json(
            { error: "Search question is required" },
            { status: 400 }
        );
    }

    try {
        const url = server+'/api/ollama?' +
            `question=${encodeURIComponent(question)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            return NextResponse.json(
                { error: "Ollama API service error" },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        console.log("Next error:", error);
        return NextResponse.json(
            { error: "Unable to query Ollama" },
            { status: 500 }
        );
    }
}