const recipeForm = document.getElementById("recipe-form");
const recipeNameInput = document.getElementById("recipe-name");
const recipeQuantityInput = document.getElementById("recipe-quantity");
const recipeGrid = document.getElementById("recipe-grid");

let recipes = [];

recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = recipeNameInput.value.trim().toLowerCase();
  const quantity = parseInt(recipeQuantityInput.value.trim());

  if (name === "" || isNaN(quantity) || quantity <= 0) return;

  const existingRecipe = recipes.find(recipe => recipe.name === name);

  if (existingRecipe) {
    existingRecipe.quantity += quantity;
  } else {
    recipes.push({ name, quantity });
  }

  recipeNameInput.value = "";
  recipeQuantityInput.value = "";

  renderRecipes();
});

function renderRecipes() {
  recipeGrid.innerHTML = "";
  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "ingredient-card"; // same style class

    const title = document.createElement("h3");
    title.textContent = capitalize(recipe.name);

    const quantity = document.createElement("p");
    quantity.textContent = `${recipe.quantity} units`;

    card.appendChild(title);
    card.appendChild(quantity);
    recipeGrid.appendChild(card);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
