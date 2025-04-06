const form = document.getElementById("inventory-form");
const nameInput = document.getElementById("ingredient-name");
const quantityInput = document.getElementById("ingredient-quantity");
const ingredientGrid = document.getElementById("ingredient-grid");

let inventory = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const name = nameInput.value.trim().toLowerCase();
    const quantity = parseInt(quantityInput.value.trim());
  
    if (name === "" || isNaN(quantity) || quantity <= 0) return;
  
    const existingItem = inventory.find(item => item.name === name);
  
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      inventory.push({ name, quantity });
    }
  
    nameInput.value = "";
    quantityInput.value = "";
  
    renderInventory();
  });
  

  function renderInventory() {
    ingredientGrid.innerHTML = "";
    inventory.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "ingredient-card";
  
      // Add button container
      const controls = document.createElement("div");
      controls.className = "ingredient-controls";
  
      const plus = document.createElement("button");
      plus.textContent = "+";
      plus.onclick = () => {
        item.quantity += 1;
        renderInventory();
      };
  
      const minus = document.createElement("button");
      minus.textContent = "–";
      minus.onclick = () => {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          inventory.splice(index, 1); // remove ingredient
        }
        renderInventory();
      };
  
      controls.appendChild(plus);
      controls.appendChild(minus);
      card.appendChild(controls);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "ingredient-delete";
      deleteBtn.textContent = "×"; // multiplication symbol
      deleteBtn.onclick = () => {
        inventory.splice(index, 1);
        renderInventory();
      };
      card.appendChild(deleteBtn);
  
      // Ingredient name
      const title = document.createElement("h3");
      title.textContent = capitalize(item.name);
      card.appendChild(title);
  
      // Quantity
      const quantity = document.createElement("p");
      quantity.textContent = `${item.quantity} units`;
      card.appendChild(quantity);
  
      ingredientGrid.appendChild(card);
    });

    renderRecipes?.();
  }
  
  

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}