import {NextRequest, NextResponse} from "next/server"

export async function GET(request:NextRequest) {
    console.log("  OLLAMA agent ROUTE CALLED...");

    const searchParams = request.nextUrl.searchParams;
    const artist = searchParams.get("artist");
    const server = "http://localhost:8585";

    if (!artist) {
        return NextResponse.json(
            { error: "Search question is required" },
            { status: 400 }
        );
    }

    try {
        const url = server+'/agent/run?' +
            `artist=${encodeURIComponent(artist)}`;
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