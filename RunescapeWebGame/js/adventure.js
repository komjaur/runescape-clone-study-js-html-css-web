class Adventure {
  constructor(name, duration, unitTypes) {
    this.name = name;
    this.duration = duration; // ms
    this.unitTypes = unitTypes;
  }
}

const adventures = [
  new Adventure('Forest Patrol', 5000, ['goblin', 'skeleton']),
  new Adventure('Graveyard Run', 6000, ['skeleton']),
  new Adventure('Orc Camp', 7000, ['orc'])
];

let activeAdventure = null;
let adventureInterval = null;
let adventureTimeout = null;
let killsDuringAdventure = {};
let dropsDuringAdventure = [];
function startAdventure(adventure) {
  if (activeAdventure) return;
  activeAdventure = adventure;
  killsDuringAdventure = {};
  dropsDuringAdventure = [];
  document.getElementById('adventureStatus').textContent = `Adventuring in ${adventure.name}...`;
  adventureInterval = setInterval(() => {
    const type = adventure.unitTypes[Math.floor(Math.random() * adventure.unitTypes.length)];
    const unit = createUnit(type);
    if (!unit) return;
    killsDuringAdventure[unit.name] = (killsDuringAdventure[unit.name] || 0) + 1;
    const drop = unit.dropTable.getDrop();
    if (drop) {
      player.inventory.add(drop);
      dropsDuringAdventure.push(drop.name);
    }
  }, 1000);
  adventureTimeout = setTimeout(endAdventure, adventure.duration);
}

function endAdventure() {
  if (!activeAdventure) return;
  clearInterval(adventureInterval);
  clearTimeout(adventureTimeout);
  adventureInterval = null;
  adventureTimeout = null;
  updateInventoryDisplay();
  saveGame();
  let report = `Finished ${activeAdventure.name}! `;
  const killText = Object.entries(killsDuringAdventure)
    .map(([n,c]) => `${c} ${n}`)
    .join(', ');
  if (killText) report += 'Kills: ' + killText + '. ';
  if (dropsDuringAdventure.length) {
    report += 'Loot: ' + dropsDuringAdventure.join(', ');
  }
  document.getElementById('adventureStatus').textContent = report;
  activeAdventure = null;
}
