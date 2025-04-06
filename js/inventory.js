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
    inventory.forEach((item) => {
      const card = document.createElement("div");
      card.className = "ingredient-card";
  
      const title = document.createElement("h3");
      title.textContent = capitalize(item.name);
  
      const quantity = document.createElement("p");
      quantity.textContent = `${item.quantity} units`;
  
      card.appendChild(title);
      card.appendChild(quantity);
      ingredientGrid.appendChild(card);
    });
  }
  

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
