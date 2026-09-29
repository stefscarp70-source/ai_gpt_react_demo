"use client"

import { ColorMode, useColorMode } from "@/contexts/ColorModeContext"


export default function Header() {
    const {colorMode, toggleColorMode} = useColorMode();

    
    return (
        <header className="mb-6 flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h1 className="text-xl font-bold">
                Music Search
            </h1>

            <button
                type="button"
                onClick={toggleColorMode}
                className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
                {colorMode === ColorMode.DARK
                    ? "Switch to light"
                    : "Switch to dark"}
            </button>
        </header>
    );
}