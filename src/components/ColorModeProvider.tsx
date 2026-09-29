"use client"

import { ColorMode, ColorModeContext, colorModeReducer } from "@/contexts/ColorModeContext";
import { useReducer, useState } from "react";
import Header from "./Header";

type Props = {
    children: React.ReactNode;
}

const initialState = {
    colorMode: ColorMode.LIGHT
};

export default function ColorModeProvider({
    children
}: Props) {
    //const colorMode = ColorMode.LIGHT;
    //const [colorMode, setColorMode] = useState(ColorMode.LIGHT);
    const [state, dispatch] = useReducer(colorModeReducer, initialState);

    return (
        <ColorModeContext.Provider value={{ state, dispatch }}>
            <Header />
            {children}
        </ColorModeContext.Provider>
    );
}