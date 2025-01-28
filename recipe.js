const apiKey = "YOUR_SPOONACULAR_API_KEY"; // Replace with your Spoonacular API Key
const searchForm = document.getElementById("search-form");
const recipesDiv = document.getElementById("recipes");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ingredients = document.getElementById("ingredients").value;
  const cuisine = document.getElementById("cuisine").value;
  const diet = document.getElementById("diet").value;

  recipesDiv.innerHTML = "";
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${ingredients}&cuisine=${cuisine}&diet=${diet}&number=10`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipesDiv.innerHTML = `<p>Error fetching recipes. Please try again later.</p>`;
  }
});

function displayRecipes(recipes) {
  if (recipes.length === 0) {
    recipesDiv.innerHTML = `<p>No recipes found. Try different filters or ingredients.</p>`;
    return;
  }

  recipes.forEach((recipe) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");

    recipeDiv.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <a href="https://spoonacular.com/recipes/${recipe.title.replaceAll(
        " ",
        "-"
      )}-${recipe.id}" target="_blank">View Recipe</a>
    `;

    recipesDiv.appendChild(recipeDiv);
  });
}
