async function loadAuctions() {
  const res = await fetch('../php/auction_house.php?action=list');
  const data = await res.json();
  const div = document.getElementById('auctionDisplay');
  if (!div) return;
  if (!data.length) {
    div.textContent = 'No auctions';
    return;
  }
  div.innerHTML = data.map(a => `<div>Id ${a.id}: ${a.item} - ${a.price}g by ${a.seller} <button onclick="buyAuction(${a.id}, ${a.price}, '${a.item}')">Buy</button></div>`).join('');
}

async function sellFirstItem() {
  const item = player.inventory.items[0];
  if (!item) return;
  const price = parseInt(prompt('Set price in gold', '10'), 10);
  if (isNaN(price) || price <= 0) return;
  const form = new FormData();
  form.append('action', 'sell');
  form.append('item', item.name);
  form.append('price', price);
  form.append('seller', player.name);
  await fetch('../php/auction_house.php', { method: 'POST', body: form });
  const idx = player.inventory.items.indexOf(item);
  player.inventory.items.splice(idx, 1);
  updateInventoryDisplay();
  saveGame();
  loadAuctions();
}

async function buyAuction(id, price, itemName) {
  if (player.gold < price) {
    alert('Not enough gold');
    return;
  }
  const form = new FormData();
  form.append('action', 'buy');
  form.append('id', id);
  await fetch('../php/auction_house.php', { method: 'POST', body: form });
  player.addGold(-price);
  player.inventory.add(new Item(itemName));
  updateGoldDisplay();
  updateInventoryDisplay();
  loadAuctions();
  saveGame();
}

