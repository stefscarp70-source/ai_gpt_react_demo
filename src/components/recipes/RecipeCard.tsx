"use client";

import { Recipe } from "@/types/chef";
import { useState } from "react";

type RecipeCardProps = {
    recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className="text-blue-500 hover:underline">
                {recipe.recipeName}
            </button>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold">
                                {recipe.name}
                            </h2>
                             <button type="button" onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                                X
                            </button>
                        </div>
                        <h3 className="mt-4 font-semibold">Ingredients</h3>
                        <ul className="mt-2">
                            {recipe.list.map((ingredient, index) => (
                                <li key={index}>{ingredient.quantity}{" "}
                                        {ingredient.unit}{" "}
                                        {ingredient.name}
                                </li>
                            ))}
                        </ul>
                       
                    </div>
                    
                </div>
            )}  
        </>
        
    );
}