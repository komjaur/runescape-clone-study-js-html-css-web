class Quest {
  constructor(name, target, count, rewardGold) {
    this.name = name;
    this.target = target; // enemy name to kill
    this.count = count;
    this.progress = 0;
    this.rewardGold = rewardGold;
    this.completed = false;
  }

  registerKill(name) {
    if (this.completed) return;
    if (name === this.target) {
      this.progress++;
      updateQuestDisplay();
      if (this.progress >= this.count) {
        this.completed = true;
        player.addGold(this.rewardGold);
        updateQuestDisplay();
      }
      saveGame();
    }
  }
}

let currentQuest = null;

function startQuest() {
  if (currentQuest) return;
  currentQuest = new Quest('Cull Goblins', 'Goblin', 3, 10);
  updateQuestDisplay();
  saveGame();
}

function updateQuestDisplay() {
  const div = document.getElementById('questDisplay');
  if (!div) return;
  if (!currentQuest) {
    div.textContent = 'No active quest';
    return;
  }
  const q = currentQuest;
  if (q.completed) {
    div.textContent = `${q.name} completed! Reward: ${q.rewardGold} gold`;
  } else {
    div.textContent = `${q.name}: ${q.progress}/${q.count} ${q.target}s defeated`;
  }
}
