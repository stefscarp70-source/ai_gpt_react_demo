import { Recipe } from "@/types/chef";


export async function listRecipes(): Promise<Recipe[]> {
  const response = await fetch(
    "http://localhost:8585/api/tool/recipes",
    {   method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
      }
  );

  if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            "Unable to load recipes, error: " + response.status + " " + errorText
        );
  }

  const data: Recipe[] = await response.json();

  return data;
}