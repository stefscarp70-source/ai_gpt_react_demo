"use client"

import { TrackListContext } from "@/contexts/TrackListContext";
import TrackListCard from "@/components/TrackListCard";
import { useState } from "react";

type Props = {
    tracks: string[];
};

export default function TrackListSection({ tracks }: Props) {
    const [showNumbers, setShowNumbers] = useState(true);

    return (
        <div className="space-y-3">
            
            <TrackListContext.Provider value={{ showNumbers }}>
                <TrackListCard tracks={tracks} />
            </TrackListContext.Provider>  

            <button
                    type="button"
                    onClick={() => setShowNumbers(!showNumbers)}
                    className="mt-6 rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                >
                    {showNumbers ? "Hide Track Numbers" : "Show Track Numbers"}
            </button>
        
        </div>   
    );
}