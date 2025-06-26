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

window.onload = updateSkillDisplay;
