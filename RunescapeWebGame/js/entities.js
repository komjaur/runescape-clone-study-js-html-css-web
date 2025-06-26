const itemDatabase = {
  'Bronze Dagger': { name: 'Bronze Dagger', slot: 'weapon', attack: 1, defence: 0 },
  'Iron Sword': { name: 'Iron Sword', slot: 'weapon', attack: 2, defence: 0 },
  'Leather Armor': { name: 'Leather Armor', slot: 'armor', attack: 0, defence: 1 },
  'Iron Armor': { name: 'Iron Armor', slot: 'armor', attack: 0, defence: 2 },
  'Bones': { name: 'Bones', slot: null, attack: 0, defence: 0 }
};

class Item {
  constructor(key) {
    const data = itemDatabase[key] || { name: key, slot: null, attack: 0, defence: 0 };
    this.key = key;
    this.name = data.name;
    this.slot = data.slot;
    this.attackBonus = data.attack;
    this.defenceBonus = data.defence;
  }
}

class Inventory {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
    updateInventoryDisplay();
    saveGame();
  }
}

class Unit {
  constructor(name, hp = 10, attack = 1, defence = 0) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defence = defence;
    this.equipment = { weapon: null, armor: null };
  }

  isAlive() {
    return this.hp > 0;
  }

  getAttack() {
    let bonus = 0;
    if (this.equipment.weapon) bonus += this.equipment.weapon.attackBonus;
    return this.attack + bonus;
  }

  getDefence() {
    let bonus = 0;
    if (this.equipment.armor) bonus += this.equipment.armor.defenceBonus;
    return this.defence + bonus;
  }
}

function createUnit(type) {
  const data = unitDatabase[type];
  if (!data) return null;
  const u = new Unit(data.name, data.hp, data.attack, data.defence);
  u.dropTable = new DropTable(data.drops);
  return u;
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

  equip(item) {
    if (!item.slot) return;
    if (item.slot === 'weapon') {
      this.equipment.weapon = item;
    } else if (item.slot === 'armor') {
      this.equipment.armor = item;
    }
    updateEquipmentDisplay();
    saveGame();
  }
}

class CombatSystem {
  static attack(attacker, defender) {
    const att = attacker.getAttack ? attacker.getAttack() : attacker.attack;
    const def = defender.getDefence ? defender.getDefence() : defender.defence;
    const damage = Math.max(1, att - def);
    defender.hp -= damage;
    return damage;
  }
}

