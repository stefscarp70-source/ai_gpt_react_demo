"use client"

import { ColorMode, useColorMode } from "@/contexts/ColorModeContext"
import Link from "next/link";


export default function Header() {
    const {colorMode, toggleColorMode} = useColorMode();

    
    return (
        <header className="mb-6 flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h1 className="text-xl font-bold">
                Simple and Agent Search
            </h1>

            <nav>
                <Link href="/">Search</Link>&nbsp;
                <Link className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700" href="/recipe">Recipes</Link>
            </nav>

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