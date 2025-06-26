// Simple RuneScape-like skill system demonstration

const skills = {
  Attack: { level: 1, xp: 0 },
  Defence: { level: 1, xp: 0 },
  Strength: { level: 1, xp: 0 },
  Ranged: { level: 1, xp: 0 },
  Magic: { level: 1, xp: 0 },
  Hitpoints: { level: 1, xp: 0 },
  Stealth: { level: 1, xp: 0 },
  Faith: { level: 1, xp: 0 },
  Mining: { level: 1, xp: 0 },
  Woodcutting: { level: 1, xp: 0 },
  Fishing: { level: 1, xp: 0 },
  Farming: { level: 1, xp: 0 },
  Hunting: { level: 1, xp: 0 },
  Herbalism: { level: 1, xp: 0 },
  Smithing: { level: 1, xp: 0 },
  Cooking: { level: 1, xp: 0 },
  Crafting: { level: 1, xp: 0 },
  Alchemy: { level: 1, xp: 0 },
  Tailoring: { level: 1, xp: 0 },
  Carpentry: { level: 1, xp: 0 },
  Fletching: { level: 1, xp: 0 },
  Enchanting: { level: 1, xp: 0 },
  Agility: { level: 1, xp: 0 },
  Navigation: { level: 1, xp: 0 },
  Archaeology: { level: 1, xp: 0 },
  Engineering: { level: 1, xp: 0 },
  Summoning: { level: 1, xp: 0 },
  Divination: { level: 1, xp: 0 }
};

function xpForLevel(level) {
  return level * level * 100; // simple formula
}

function addExperience(skill, amount) {
  const data = skills[skill];
  if (!data) return;
  data.xp += amount;
  while (data.xp >= xpForLevel(data.level)) {
    data.xp -= xpForLevel(data.level);
    data.level++;
    console.log(`${skill} leveled up to ${data.level}!`);
  }
  updateSkillDisplay();
}

function updateSkillDisplay() {
  const display = document.getElementById('skillDisplay');
  if (!display) return;
  display.innerHTML = '';
  for (const [name, info] of Object.entries(skills)) {
    const div = document.createElement('div');
    div.textContent = `${name}: lvl ${info.level} (${info.xp}/${xpForLevel(info.level)} xp)`;
    display.appendChild(div);
  }
}

document.getElementById('trainAttack').addEventListener('click', () => {
  addExperience('Attack', 50);
});

class Item {
  constructor(name) {
    this.name = name;
  }
}

class Inventory {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
    updateInventoryDisplay();
  }
}

class Unit {
  constructor(name, hp = 10, attack = 1, defence = 0) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defence = defence;
  }

  isAlive() {
    return this.hp > 0;
  }
}

class DropTable {
  constructor(items = []) {
    this.items = items;
  }

  getDrop() {
    if (this.items.length === 0) return null;
    const idx = Math.floor(Math.random() * this.items.length);
    return new Item(this.items[idx]);
  }
}

class Player extends Unit {
  constructor(name) {
    super(name, 20, 3, 1);
    this.inventory = new Inventory();
  }
}

class CombatSystem {
  static attack(attacker, defender) {
    const damage = Math.max(1, attacker.attack - defender.defence);
    defender.hp -= damage;
    return damage;
  }
}

const player = new Player('Hero');
const goblin = new Unit('Goblin', 10, 2, 0);
goblin.dropTable = new DropTable(['Bronze Dagger', 'Bones']);

function updatePlayerDisplay() {
  const div = document.getElementById('playerDisplay');
  if (div) {
    div.textContent = `${player.name} HP: ${player.hp}`;
  }
}

function updateEnemyDisplay() {
  const div = document.getElementById('enemyDisplay');
  if (div) {
    div.textContent = `${goblin.name} HP: ${goblin.hp}`;
  }
}

function updateInventoryDisplay() {
  const div = document.getElementById('inventoryDisplay');
  if (div) {
    div.textContent = 'Inventory: ' + player.inventory.items.map(i => i.name).join(', ');
  }
}

function combatRound() {
  if (!player.isAlive() || !goblin.isAlive()) return;
  CombatSystem.attack(player, goblin);
  if (!goblin.isAlive()) {
    const drop = goblin.dropTable.getDrop();
    if (drop) {
      player.inventory.add(drop);
    }
  } else {
    CombatSystem.attack(goblin, player);
  }
  updatePlayerDisplay();
  updateEnemyDisplay();
}

document.getElementById('attackEnemy').addEventListener('click', combatRound);

window.onload = () => {
  updateSkillDisplay();
  updatePlayerDisplay();
  updateEnemyDisplay();
  updateInventoryDisplay();
};
