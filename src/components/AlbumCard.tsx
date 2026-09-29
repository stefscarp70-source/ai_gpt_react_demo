import type { Album } from "@/types/album";

type AlbumCardProps = {
    album: Album;
};

export default function AlbumCard ({album}: AlbumCardProps) {
    return (
        
        <div className="mt-4 font-semibold"><h2>{album.albumTitle}</h2>
            <div className="text-gray-500">{album.artist}</div>
            <div className="text-sm text-gray-400">
                {new Date(album.releaseDate).toLocaleDateString("it-IT")}
            </div>
        </div>
    )
}