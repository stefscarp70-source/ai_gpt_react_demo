import AlbumCard from "@/components/AlbumCard";
import TrackListCard from "@/components/TrackListCard";
import TrackListSection from "@/components/TrackListSection";
import { TrackListContext } from "@/contexts/TrackListContext";
import type {GptResponse, MusicAnswer} from "@/types/album"
import {SearchMode} from "@/types/music"

type RecentAlbumResponse = {
    album: Album;
}

type PageProps = {
  searchParams: Promise<{
    artist?: string;
    mode?: SearchMode;
}>;
};

async function getRecentAlbum(artist: string): Promise<GptResponse> {
    
    const response = await fetch(
        `http://localhost:8585/agent/run?artist=${encodeURIComponent(artist)}`,

        {
        cache: "no-store",
        }
    );
    
    if (!response.ok) {
        throw new Error(
        `Agent returned HTTP ${response.status}`
        );
    }

    const data: GptResponse = await response.json();

    return data;
}

async function getMock(artist: string): Promise<GptResponse> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const answer: MusicAnswer = {
        albumTitle: "Everything under the sun",
        releaseDate: "2026-10-31",
        trackList: [
            "Rattle the Cage",
            "Bones for the Crows",
            "I Already Know",
            "Leave Me Behind"
        ]
    };

    const resp : GptResponse = {
        status: "SUCCESS",
        answer: answer,
        steps: 3,
        promptTokens: 200,
        completionTokens: 10,
        totalTokens: 210
    };

    if (artist==="Err") {
        throw new Error("Test error");
    } else {
        return resp;
    }

}

export default async function RecentAlbumPage(
    {searchParams}: PageProps
) {
    const params = await searchParams;
    const artist = params.artist ?? "Madonna";
    const mode = params.mode ?? SearchMode.MOCK;
    

    let data: GptResponse;
    if (mode === SearchMode.MOCK) {
        console.log("Using MOCK mode");
        data = await getMock(artist);
    } else {
        data = await getRecentAlbum(artist);
    }    

    if (!data.answer) {
        throw new Error(
            data.response ?? "The agent did not return an album"
        );
    }

    const album = data.answer;
    album.artist = artist; // Add the artist to the album object
    //console.log("album:", album);

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-4xl">

                <h1 className="mb-6 text-4xl font-bold">
                Most Recent Album
                </h1>

                <div className="rounded-lg bg-white p-6 shadow">
                    <AlbumCard album={album} />

                    <TrackListSection tracks={album.trackList} />
                </div>
                
            </div>
        </main>
  );
}