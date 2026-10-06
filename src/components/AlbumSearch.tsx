"use client"

import {useEffect, useRef, useState} from "react";
import SearchResult from "@/components/SearchResult";
//import type { Album } from "@/types/album";
import type { ChefTool } from "@/types/gpt";
import { askChefAgent, askSimple, useOperator } from "@/service/aiService";
import { useRouter } from "next/navigation"
import SearchForm from "@/components/SearchForm";
import SearchTimer, { SearchTimerHandle } from "./SearchTimer";
import { ColorMode, ColorModeContext, useColorMode } from "@/contexts/ColorModeContext";
import { useSearchContext } from "@/contexts/SearchContext";
import { OllamaModel } from "@/types/OllamaModel";
import ChefToolList from "./ChefToolList";
import { ChefToolAction, ApplyState } from "@/types/ChefToolAction";



export default function AlbumSearch() {
    const [searchText, setSearchText] = useState("");    
    const router = useRouter();
    const {colorMode} = useColorMode();
    
    //const [state, dispatch] = useReducer( searchReducer, initialState);
    const {state, dispatch} = useSearchContext();

    const [applyState, setApplyState] = useState<ApplyState>(ApplyState.NOTYET);
    const [toolRunning, setToolRunning] = useState("");
    const timerRef = useRef<SearchTimerHandle>(null);

    const mainClass=`rounded-lg p-6 shadow
            ${
                colorMode === ColorMode.DARK
                ? "bg-gray-800"
                : "bg-white"
            }`;

    useEffect(() => {
        if (searchText.trim()) {
            localStorage.setItem("lastArtist", searchText);
            //console.log("Searching for:", searchText);
        }
    }, [searchText]);
    useEffect(() => {
        const lastArtist = localStorage.getItem("lastArtist");
        if (lastArtist) {
            setSearchText(lastArtist);
        }
    }, []);

    function getToolAction(name: string): ChefToolAction {
        switch (name) {
            case "findFridgeMissingIngredients":
                return ChefToolAction.EXTRACT_FROM_FRIDGE;

            case "buyAtMarket":
                return ChefToolAction.RESTOCK;

            default:
                return ChefToolAction.OTHER;
        }
    }

    
    async function handleSearch(model: OllamaModel, agentic: boolean) {
        console.log("Searching for:", searchText);
        
        let album: boolean = false;

        timerRef.current?.reset()
        timerRef.current?.start();
        dispatch( { type : "SEARCH_START"});

        try {
            if (album) {

            } else {
                
                if (!agentic) {
                    const answer = await askSimple(searchText, model);
                    const secTime = timerRef.current?.stop();
                    dispatch({
                        type: "SEARCH_SUCCESS",
                        answer: answer,
                        item: {
                            answer: answer.response!,
                            model: model,
                            tokens: answer.totalTokens!,
                            minutes: secTime
                        },
                        tools: [],
                        albums: []
                    });
                } else {
                    console.log("model: ", model);
                    const answer = await askChefAgent(searchText, model);
                    const secTime = timerRef.current?.stop();
                    console.log("answer:", answer);
                    dispatch({
                        type: "SEARCH_SUCCESS",
                        answer: answer,
                        tools: answer.tools?.map( to => ({
                                ...to,
                                action: getToolAction(to.name)
                            })),
                        item: {
                            answer: answer.response!,
                            model: model,
                            tokens: answer.totalTokens!,
                            minutes: secTime
                        },    
                        albums: []
                    });
                }
            }
        } catch(error) {
            console.log(error);
            //
            dispatch({
                type: "SEARCH_ERROR",
                error: `Unable to perform search: ${error}`
            })
        }

    }

    async function handleApplyTool(tool: ChefTool) {
        console.log("Applying tool:", tool);
        setToolRunning(tool.name);

        setApplyState(ApplyState.RUNNING);

        //await new Promise(resolve => setTimeout(resolve, 2000));
        
        const resp = await useOperator(tool.action!, tool.ingredientDtos);
        

        setApplyState(ApplyState.COMPLETED);
    }

    return (
      <div className={mainClass}>
        <SearchForm
            searchText={searchText}
            loading={state.loading}
            onSearchTextChange={setSearchText}
            onSubmit={handleSearch}
        />
        <div className="mt-4">
              <button
                type="button"
                onClick={() =>
                    router.push(
                    `/recentalbum?mode=real&artist=${encodeURIComponent(searchText)}`
                )}
                className="rounded-md bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
                > Recent Album
              </button>
              <button
                type="button"
                onClick={() =>
                    router.push(
                    `/recentalbum?mode=mock&artist=${encodeURIComponent(searchText)}`
                )}
                className="rounded-md bg-stone-600 px-5 py-2 font-medium text-white hover:bg-stone-700"
                > Mock
              </button>
              
        </div>

        {state.error && (
            <p className="mt-4 text-red-600">{state.error}</p>
        )}

        <SearchTimer ref={timerRef} />

        {state.tools?.length > 0 && (
            <ChefToolList tools={state.tools} onApply={handleApplyTool} 
                applyState={applyState}
                toolRunning={toolRunning}
            />
        )}

        <SearchResult 
          searchText={searchText} 
          albums={state.albums}
          simpleAnswer={state.simpleAnswer}
          loading={state.loading}
          items={state.history}
        />
          
      </div>
      
    );
}