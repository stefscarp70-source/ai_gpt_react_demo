"use client"

import { createContext } from "react";


type TrackListContextType = {
    showNumbers: boolean;
};

export const TrackListContext = createContext<TrackListContextType>({
    showNumbers: true,
});