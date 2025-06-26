const recipes = {
  'Iron Bar': { requires: ['Iron Ore'] },
  'Iron Sword': { requires: ['Iron Bar'] }
};

function craft(itemKey) {
  const recipe = recipes[itemKey];
  if (!recipe) return;
  for (const req of recipe.requires) {
    const idx = player.inventory.items.findIndex(i => i.key === req);
    if (idx === -1) return; // missing requirement
  }
  for (const req of recipe.requires) {
    const idx = player.inventory.items.findIndex(i => i.key === req);
    player.inventory.items.splice(idx, 1);
  }
  player.inventory.add(new Item(itemKey));
  addExperience('Smithing', 25);
  updateInventoryDisplay();
  saveGame();
}

function updateCraftingDisplay() {
  const div = document.getElementById('craftingDisplay');
  if (!div) return;
  div.textContent = 'Recipes: ' + Object.keys(recipes).join(', ');
}

