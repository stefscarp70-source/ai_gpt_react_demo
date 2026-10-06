import AlbumSearch from "@/components/AlbumSearch";
import { SearchProvider } from "@/contexts/SearchContext";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          LLM Search
        </h1>

        <p className="mb-8 text-gray-600">
          Search for your favorite albums
        </p>

        <SearchProvider>
          <AlbumSearch />
        </SearchProvider>
        
      </div>  
    </main>
  );
}