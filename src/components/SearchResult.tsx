import type { Album } from "@/types/album";
import AlbumCard from "@/components/AlbumCard";
import SearchHistory from "./SearchHistory";
import { SearchHistoryItem } from "@/types/SearchHistoryItem";

type SearchResultProps = {
    searchText: string;
    albums: Album[];
    simpleAnswer: GptResponse | "";
    loading: boolean;
    items: SearchHistoryItem[];
}

export default function SearchResult({
    searchText,
    albums,
    simpleAnswer,
    loading,
    items
}: SearchResultProps) {
    if (!searchText) {
        return null;
    }

    return (
        <div className="mt-s">

        <p className="mt-4 text-gray-600">
            Search text: <strong>{searchText}</strong>
        </p>

        {loading ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
            ) : (
                <>
                { simpleAnswer && (
                <div className="mb-6 rounded-md bg-blue-50 p-4">
                    <p className="font-semibold">AI response</p>
                    <p className="mt-2 text-gray-700"> {simpleAnswer.response} </p>
                    <p className="mt-2 text-gray-700"> {simpleAnswer.totalTokens} tokens </p>
                </div>
                )}

                
                </>            
            )
        }       

        <SearchHistory items={items}            />

        {albums.length === 0 ? (
            <p className="text-gray-500">No albums found.</p>
        ) : (
            <ul className="space-y-3">
            {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
            ))}
            </ul>
        )}

        
        </div>
    );
} 