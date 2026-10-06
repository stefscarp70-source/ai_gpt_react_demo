"use client"

import { ChefTool, GptResponse } from "@/types/gpt";
import { SearchHistoryItem } from "@/types/SearchHistoryItem";
import React, { useContext, useReducer } from "react";

export type SearchState = {
    loading: boolean;
    error: string;
    simpleAnswer: GptResponse|string;
    history: SearchHistoryItem[];
    tools: ChefTool[];
    albums: Album[];
}

export type SearchAction = 
    | {type: "SEARCH_START"}
    | {
        type: "SEARCH_SUCCESS";
        answer: GptResponse|string;
        tools: ChefTool[];
        albums: Album[];
        item: SearchHistoryItem;
    }
    | {
        type: "SEARCH_ERROR";
        error: string;
    };

type SearchContextType = {
    state: SearchState;
    dispatch: React.Dispatch<SearchAction>;
}

const SearchContext = React.createContext<SearchContextType | undefined>(undefined);

function searchReducer(
    state: SearchState,
    action: SearchAction
): SearchState     {
    switch(action.type) {
        case "SEARCH_START":
            return {
                ...state,
                loading: true,
                error: "",
                simpleAnswer: ""
            };
        case "SEARCH_SUCCESS": 
            return {
                ...state,
                loading: false,
                simpleAnswer: action.answer,
                history: [ action.item, ...state.history ],
                tools: action.tools,
                albums: action.albums
            };
        case "SEARCH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

const initialState: SearchState = {
        loading: false,
        error: "",
        simpleAnswer: "",
        history: [],
        tools: [],
        albums: []
};


export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(
        searchReducer,
        initialState
    );

    return (
        <SearchContext.Provider value={{ state, dispatch }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearchContext() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearchContext must be used within a SearchProvider");
    }
    return context;
}