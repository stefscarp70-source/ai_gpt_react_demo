import { Recipe } from "@/types/chef";
import RecipeCard from "./RecipeCard";


type ReciperListProps = {
    recipes: Recipe[];
};

export default function RecipeList({ recipes }: ReciperListProps) {
    return (
        <div className="w-full">
            <div className="rounded-lg bg-white p-4 shadow-md">
                <h2 className="mb-2 text-lg font-semibold">Recipe list</h2>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="px-10 py-2 text-left">
                                Recipe name
                            </th>
                            <th className="px-3 py-2 text-right">
                                Ingredients
                            </th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {recipes.map((recipe) => (
                            <tr key={recipe.recipeName} className="border-b" >
                                <td className="px-10 py-2 text-left">
                                    <RecipeCard recipe={recipe} />
                                </td>

                                <td className="px-3 py-3 text-right">
                                    {recipe.list.length}
                                </td>    
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}