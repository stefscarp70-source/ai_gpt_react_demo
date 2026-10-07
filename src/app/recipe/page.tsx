import RecipePage from "@/components/recipes/RecipePage";

export default function RecipeHome() {  
    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-2 text-4xl font-bold text-gray-900">Recipes</h1>
                    <p>List here.</p>
                    <RecipePage />
            </div>
        </main>
    );
}