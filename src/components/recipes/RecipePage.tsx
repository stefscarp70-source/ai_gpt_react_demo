import RecipeList from "@/components/recipes/RecipeList";
import { listRecipes } from "@/service/chefService";
import { Recipe } from "@/types/chef";


export default async function RecipePage() {
    //const [recipes, setRecipes] = useState<Recipe[]>([]);    
    
    const recipes: Recipe[] = await listRecipes();

    return (
        <RecipeList recipes={recipes} />
    );
}