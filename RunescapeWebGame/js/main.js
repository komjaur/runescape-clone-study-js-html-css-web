const player = new Player('Hero');
const goblin = createUnit('goblin');

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
document.getElementById('forestAdventure').addEventListener('click', () => startAdventure(adventures[0]));

window.onload = () => {
  updateSkillDisplay();
  updatePlayerDisplay();
  updateEnemyDisplay();
  updateInventoryDisplay();
  const status = document.getElementById('adventureStatus');
  if (status) status.textContent = 'No active adventure';
};
