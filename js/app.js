document.getElementById("tab-inventory").addEventListener("click", () => {
    document.getElementById("inventory-section").classList.remove("hidden");
    document.getElementById("recipes-section").classList.add("hidden");
  });
  
  document.getElementById("tab-recipes").addEventListener("click", () => {
    document.getElementById("inventory-section").classList.add("hidden");
    document.getElementById("recipes-section").classList.remove("hidden");
  });
  