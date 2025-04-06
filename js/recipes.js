const recipeForm = document.getElementById("recipe-form");
const recipeNameInput = document.getElementById("recipe-name");

const ingredientNameInput = document.getElementById("recipe-ingredient-name");
const ingredientQtyInput = document.getElementById("recipe-ingredient-quantity");
const addIngredientBtn = document.getElementById("add-ingredient");

const recipeGrid = document.getElementById("recipe-grid");
const addIngredientPanel = document.getElementById("add-ingredient-panel");
const selectedRecipeNameLabel = document.getElementById("selected-recipe-name");

let recipes = [];
let selectedRecipeIndex = null;

recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = recipeNameInput.value.trim().toLowerCase();
  if (!name) return;

  const exists = recipes.some(r => r.name === name);
  if (exists) return;

  recipes.push({
    name: name,
    ingredients: []
  });

  recipeNameInput.value = "";
  renderRecipes();
});

function selectRecipe(index) {
  selectedRecipeIndex = index;
  const recipe = recipes[index];
  selectedRecipeNameLabel.textContent = `Add ingredients to: ${capitalize(recipe.name)}`;
  addIngredientPanel.classList.remove("hidden");
}

addIngredientBtn.addEventListener("click", () => {
  if (selectedRecipeIndex === null) return;

  const name = ingredientNameInput.value.trim().toLowerCase();
  const quantity = parseInt(ingredientQtyInput.value.trim());

  if (!name || isNaN(quantity) || quantity <= 0) return;

  const recipe = recipes[selectedRecipeIndex];
  const existing = recipe.ingredients.find(i => i.name === name);

  if (existing) {
    existing.quantity += quantity;
  } else {
    recipe.ingredients.push({ name, quantity });
  }

  ingredientNameInput.value = "";
  ingredientQtyInput.value = "";
  renderRecipes(); 
});

function renderRecipes() {
  recipeGrid.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "ingredient-card";

    const title = document.createElement("h3");
    title.textContent = capitalize(recipe.name);
    card.appendChild(title);

    let canMake = true;
    let servings = Infinity;

    if (recipe.ingredients.length > 0) {
      const list = document.createElement("ul");
      list.style.listStyle = "none";
      list.style.paddingLeft = "0";

      recipe.ingredients.forEach(ing => {
        const li = document.createElement("li");
        const invItem = inventory.find(i => i.name === ing.name);

        if (!invItem) {
          li.textContent = `❌ ${capitalize(ing.name)} (${ing.quantity} units)`;
          canMake = false;
          servings = 0;
        } else if (invItem.quantity < ing.quantity) {
          li.textContent = `⚠️ ${capitalize(ing.name)} (${invItem.quantity}/${ing.quantity} units)`;
          canMake = false;
          servings = Math.min(servings, Math.floor(invItem.quantity / ing.quantity));
        } else {
          li.textContent = `✅ ${capitalize(ing.name)} (${ing.quantity} units)`;
          servings = Math.min(servings, Math.floor(invItem.quantity / ing.quantity));
        }

        list.appendChild(li);
      });

      card.appendChild(list);
    }

    const servingsDisplay = document.createElement("p");
    servingsDisplay.style.marginTop = "6px";
    servingsDisplay.style.fontWeight = "bold";
    servingsDisplay.textContent = `🥣 Servings possible: ${servings}`;
    card.appendChild(servingsDisplay);

    const status = document.createElement("p");
    status.style.marginTop = "10px";
    status.style.marginBottom = "12px";
    status.style.fontWeight = "bold";
    status.textContent = canMake ? "✅ All ingredients available!" : "❌ Not enough ingredients";
    card.appendChild(status);

    const addBtn = document.createElement("button");
    addBtn.className = "add-button";
    addBtn.textContent = "Add Ingredients";
    addBtn.onclick = () => selectRecipe(index);
    card.appendChild(addBtn);

    recipeGrid.appendChild(card);
  });
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
