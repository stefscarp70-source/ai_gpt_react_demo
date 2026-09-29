import { ColorMode, useColorMode } from "@/contexts/ColorModeContext";
import { TrackListContext } from "@/contexts/TrackListContext";
import { useContext } from "react";


type TrackListCardProps = {
    tracks: string[];
};

export default function TrackListCard({ tracks }: TrackListCardProps) {
    const { showNumbers } = useContext(TrackListContext);
    const { colorMode} = useColorMode();

    return (
        <div className={
                colorMode === ColorMode.DARK
                    ? "rounded-lg bg-gray-800 p-6 text-white shadow"
                    : "rounded-lg bg-white p-6 text-gray-900 shadow"
            }>
            <h3 className="text-xl font-semibold">
                Track list
            </h3>

            <ul className="mt-4 space-y-2">
                {tracks.map((track, index) => (
                    <li key={index}>
                        {showNumbers && (
                            <span className="mr-2 font-medium">
                                {index + 1}.
                            </span>
                        )}
                        {track}
                    </li>
                ))}
            </ul>
        </div>
    );
}