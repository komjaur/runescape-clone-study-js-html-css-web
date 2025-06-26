class House {
  constructor() {
    this.trophies = [];
    this.storage = [];
  }

  addTrophy(name) {
    this.trophies.push(name);
    updateHouseDisplay();
    saveGame();
  }

  storeItem(item) {
    if (!item) return;
    this.storage.push(item);
    const idx = player.inventory.items.indexOf(item);
    if (idx >= 0) player.inventory.items.splice(idx, 1);
    updateInventoryDisplay();
    updateHouseDisplay();
    saveGame();
  }
}

const playerHouse = new House();

function updateHouseDisplay() {
  const div = document.getElementById('houseDisplay');
  if (!div) return;
  const trophyText = playerHouse.trophies.length
    ? 'Trophies: ' + playerHouse.trophies.join(', ')
    : 'No trophies yet';
  const storageText = playerHouse.storage.length
    ? 'Storage: ' + playerHouse.storage.map(i => i.name).join(', ')
    : 'Storage empty';
  div.textContent = trophyText + ' | ' + storageText;
}


document.getElementById('viewHouse').addEventListener('click', updateHouseDisplay);

document.getElementById('storeFirstItem').addEventListener('click', () => {
  const item = player.inventory.items[0];
  if (item) playerHouse.storeItem(item);
});
