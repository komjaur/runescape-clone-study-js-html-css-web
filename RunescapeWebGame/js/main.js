// Main game script wiring together UI and core logic

const player = new Player('Hero');
const goblin = createUnit('goblin');
let currentBoss = createUnit('trollKing');

function saveGame() {
  const data = {
    player: {
      hp: player.hp,
      inventory: player.inventory.items.map(i => i.key),
      equipment: {
        weapon: player.equipment.weapon ? player.equipment.weapon.key : null,
        armor: player.equipment.armor ? player.equipment.armor.key : null
      },
      gold: player.gold
    },
    skills,
    quest: currentQuest ? {
      name: currentQuest.name,
      target: currentQuest.target,
      count: currentQuest.count,
      progress: currentQuest.progress,
      rewardGold: currentQuest.rewardGold,
      completed: currentQuest.completed
    } : null,
    house: {
      trophies: playerHouse.trophies,
      storage: playerHouse.storage.map(i => i.key)
    }
  };
  fetch(`${API_BASE}/save.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ save: data })
  });
}

function loadGame() {
  fetch(`${API_BASE}/load.php`)
    .then(r => r.json())
    .then(data => {
      if (!data) return;
      try {
        player.hp = data.player.hp;
        player.inventory.items = data.player.inventory.map(n => new Item(n));
        if (data.player.equipment) {
          if (data.player.equipment.weapon) player.equip(new Item(data.player.equipment.weapon));
          if (data.player.equipment.armor) player.equip(new Item(data.player.equipment.armor));
        }
        player.gold = data.player.gold || 0;
        for (const [name, info] of Object.entries(data.skills)) {
          if (skills[name]) {
            skills[name].level = info.level;
            skills[name].xp = info.xp;
          }
        }
        if (data.quest) {
          currentQuest = new Quest(data.quest.name, data.quest.target, data.quest.count, data.quest.rewardGold);
          currentQuest.progress = data.quest.progress;
          currentQuest.completed = data.quest.completed;
        }
        if (data.house) {
          playerHouse.trophies = data.house.trophies || [];
          playerHouse.storage = (data.house.storage || []).map(n => new Item(n));
        }
      } catch (e) {
        console.error('Failed to load save', e);
      }
    })
    .catch(e => console.error('Failed to fetch save', e));
}

function updatePlayerDisplay() {
  const div = document.getElementById('playerDisplay');
  if (div) div.textContent = `${player.name} HP: ${player.hp}`;
}

function updateEnemyDisplay() {
  const div = document.getElementById('enemyDisplay');
  if (div) div.textContent = `${goblin.name} HP: ${goblin.hp}`;
}

function updateBossDisplay() {
  const div = document.getElementById('enemyDisplay');
  if (div) div.textContent = `${currentBoss.name} HP: ${currentBoss.hp}`;
}

function updateInventoryDisplay() {
  const div = document.getElementById('inventoryDisplay');
  if (div) div.textContent = 'Inventory: ' + player.inventory.items.map(i => i.name).join(', ');
}

function updateShopDisplay() {
  const div = document.getElementById('shopDisplay');
  if (!div) return;
  div.textContent = 'Shop sells: ' + shop.items.join(', ');
}

function updateGoldDisplay() {
  const div = document.getElementById('goldDisplay');
  if (div) div.textContent = `Gold: ${player.gold}`;
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
    if (typeof currentQuest !== 'undefined' && currentQuest) {
      currentQuest.registerKill(goblin.name);
    }
  } else {
    CombatSystem.attack(goblin, player);
  }
  updatePlayerDisplay();
  updateEnemyDisplay();
  saveGame();
}

function bossRound() {
  if (!player.isAlive() || !currentBoss.isAlive()) return;
  CombatSystem.attack(player, currentBoss);
  if (!currentBoss.isAlive()) {
    const drop = currentBoss.dropTable.getDrop();
    if (drop) {
      player.inventory.add(drop);
      playerHouse.addTrophy(drop.name);
    }
    currentBoss = createUnit('trollKing');
  } else {
    CombatSystem.attack(currentBoss, player);
  }
  updatePlayerDisplay();
  updateBossDisplay();
  saveGame();
}

document.getElementById('attackEnemy').addEventListener('click', combatRound);
document.getElementById('challengeBoss').addEventListener('click', bossRound);

document.getElementById('forestAdventure').addEventListener('click', () => startAdventure(adventures[0]));
document.getElementById('graveyardAdventure').addEventListener('click', () => startAdventure(adventures[1]));
document.getElementById('orcAdventure').addEventListener('click', () => startAdventure(adventures[2]));

document.getElementById('equipWeapon').addEventListener('click', () => {
  const item = player.inventory.items.find(i => i.slot === 'weapon');
  if (item) player.equip(item);
});

document.getElementById('equipArmor').addEventListener('click', () => {
  const item = player.inventory.items.find(i => i.slot === 'armor');
  if (item) player.equip(item);
});

document.getElementById('buyBronze').addEventListener('click', () => {
  shop.buy(player, 'Bronze Dagger');
  updateGoldDisplay();
  });

document.getElementById('sellItem').addEventListener('click', () => {
  const item = player.inventory.items[0];
  if (item) shop.sell(player, item);
  updateGoldDisplay();
  updateInventoryDisplay();
});

document.getElementById('startQuest').addEventListener('click', () => {
  startQuest();
  updateQuestDisplay();
});

window.onload = () => {
  loadGame();
  updateSkillDisplay();
  updatePlayerDisplay();
  updateEnemyDisplay();
  updateInventoryDisplay();
  updateEquipmentDisplay();
  updateGoldDisplay();
  updateShopDisplay();
  const status = document.getElementById('adventureStatus');
  if (status) status.textContent = 'No active adventure';
  updateQuestDisplay();
  updateHouseDisplay();
  updateBossDisplay();
};
