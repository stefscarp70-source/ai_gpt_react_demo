"use client"
import { createContext, Dispatch, useContext } from "react";

export enum ColorMode {
    LIGHT = "light",
    DARK = "dark"
}

export type ColorModeState = {
    colorMode: ColorMode;
}

export type ColorModeAction =
    | { type: "TOGGLE_COLOR_MODE" }
    | { type: "SET_COLOR_MODE"; mode: ColorMode; }

export function colorModeReducer(
    state: ColorModeState,
    action: ColorModeAction
): ColorModeState {
    switch(action.type) {
        case "TOGGLE_COLOR_MODE":
            return {
                colorMode:
                    state.colorMode === ColorMode.DARK?
                    ColorMode.LIGHT: ColorMode.DARK
            };
        case "SET_COLOR_MODE":
            return {
                colorMode: action.mode
            };

            default:
                return state;
    } 
}    

type ColorModeContextType = {
    state: ColorModeState;
    dispatch: Dispatch<ColorModeAction>;
};

export const ColorModeContext = 
    createContext<ColorModeContextType | undefined> (undefined);

export function useColorMode() {
    const context = useContext(ColorModeContext);

    if (!context) {
        throw new Error(
            "useColorMode must be used inside ColorModeProvider"
        );
    }

    const {state, dispatch} = context;

    function toggleColorMode() {
        dispatch({
            type: "TOGGLE_COLOR_MODE"
        });
    }

    return {
        colorMode: state.colorMode,
        toggleColorMode
    };
}