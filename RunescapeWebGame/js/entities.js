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
}

class CombatSystem {
  static attack(attacker, defender) {
    const damage = Math.max(1, attacker.attack - defender.defence);
    defender.hp -= damage;
    return damage;
  }
}

