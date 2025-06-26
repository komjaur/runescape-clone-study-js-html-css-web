class Shop {
  constructor(items = []) {
    // items is array of item keys
    this.items = items;
  }

  buy(player, itemKey) {
    const data = itemDatabase[itemKey];
    if (!data) return;
    if (player.spendGold(data.price)) {
      player.inventory.add(new Item(itemKey));
    }
  }

  sell(player, item) {
    if (!item) return;
    const price = item.price ? Math.floor(item.price / 2) : 0;
    player.addGold(price);
    const idx = player.inventory.items.indexOf(item);
    if (idx >= 0) player.inventory.items.splice(idx, 1);
    updateInventoryDisplay();
    saveGame();
  }
}

const shop = new Shop(['Bronze Dagger', 'Iron Sword', 'Leather Armor', 'Iron Ore']);
