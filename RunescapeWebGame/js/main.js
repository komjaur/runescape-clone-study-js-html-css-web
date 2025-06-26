// Main game script wiring together UI and core logic

const player = new Player('Hero');
const goblin = createUnit('goblin');

function saveGame() {
  const data = {
    player: {
      hp: player.hp,
      inventory: player.inventory.items.map(i => i.key),
      equipment: {
        weapon: player.equipment.weapon ? player.equipment.weapon.key : null,
        armor: player.equipment.armor ? player.equipment.armor.key : null
      }
    },
    skills
  };
  localStorage.setItem('gameSave', JSON.stringify(data));
}

function loadGame() {
  const raw = localStorage.getItem('gameSave');
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    player.hp = data.player.hp;
    player.inventory.items = data.player.inventory.map(n => new Item(n));
    if (data.player.equipment) {
      if (data.player.equipment.weapon) player.equip(new Item(data.player.equipment.weapon));
      if (data.player.equipment.armor) player.equip(new Item(data.player.equipment.armor));
    }
    for (const [name, info] of Object.entries(data.skills)) {
      if (skills[name]) {
        skills[name].level = info.level;
        skills[name].xp = info.xp;
      }
    }
  } catch (e) {
    console.error('Failed to load save', e);
  }
}

function updatePlayerDisplay() {
  const div = document.getElementById('playerDisplay');
  if (div) div.textContent = `${player.name} HP: ${player.hp}`;
}

function updateEnemyDisplay() {
  const div = document.getElementById('enemyDisplay');
  if (div) div.textContent = `${goblin.name} HP: ${goblin.hp}`;
}

function updateInventoryDisplay() {
  const div = document.getElementById('inventoryDisplay');
  if (div) div.textContent = 'Inventory: ' + player.inventory.items.map(i => i.name).join(', ');
}

function updateEquipmentDisplay() {
  const div = document.getElementById('equipmentDisplay');
  if (!div) return;
  const weapon = player.equipment.weapon ? player.equipment.weapon.name : 'None';
  const armor = player.equipment.armor ? player.equipment.armor.name : 'None';
  div.textContent = `Weapon: ${weapon} | Armor: ${armor}`;
}

function combatRound() {
  if (!player.isAlive() || !goblin.isAlive()) return;
  CombatSystem.attack(player, goblin);
  if (!goblin.isAlive()) {
    const drop = goblin.dropTable.getDrop();
    if (drop) player.inventory.add(drop);
  } else {
    CombatSystem.attack(goblin, player);
  }
  updatePlayerDisplay();
  updateEnemyDisplay();
  saveGame();
}

document.getElementById('attackEnemy').addEventListener('click', combatRound);

document.getElementById('forestAdventure').addEventListener('click', () => startAdventure(adventures[0]));
document.getElementById('graveyardAdventure').addEventListener('click', () => startAdventure(adventures[1]));
document.getElementById('orcAdventure').addEventListener('click', () => startAdventure(adventures[2]));
document.getElementById('hauntedAdventure').addEventListener('click', () => startAdventure(adventures[3]));
document.getElementById('towerAdventure').addEventListener('click', () => startAdventure(adventures[4]));

document.getElementById('equipWeapon').addEventListener('click', () => {
  const item = player.inventory.items.find(i => i.slot === 'weapon');
  if (item) player.equip(item);
});

document.getElementById('equipArmor').addEventListener('click', () => {
  const item = player.inventory.items.find(i => i.slot === 'armor');
  if (item) player.equip(item);
});

document.getElementById('unequipWeapon').addEventListener('click', () => {
  player.unequip('weapon');
});

document.getElementById('unequipArmor').addEventListener('click', () => {
  player.unequip('armor');
});

window.onload = () => {
  loadGame();
  updateSkillDisplay();
  updatePlayerDisplay();
  updateEnemyDisplay();
  updateInventoryDisplay();
  updateEquipmentDisplay();
  const status = document.getElementById('adventureStatus');
  if (status) status.textContent = 'No active adventure';
};
