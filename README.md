# RuneScape Web Game Prototype


This project is a small browser experiment that mimics some of the classic mechanics from RuneScape. It is not a full game, but a starting point for exploring combat, skills and simple adventures using only HTML, CSS and JavaScript.

## Playing the Demo

1. Open `php/login.php` in your web browser and log in with a username.
2. After logging in you will be redirected to the game.
3. Click **Train Attack** to gain experience and level up the Attack skill.
4. Click **Attack Enemy** to fight a goblin. If you win, its loot appears in your inventory.
5. Click **Go on Forest Adventure** to automatically battle monsters for five seconds. The summary lists any kills and items found.
6. Use **Buy Bronze Dagger** to purchase gear from the shop or **Sell First Item** to earn gold.
7. Click **Start Goblin Quest** and defeat goblins to claim a reward.

8. Your progress is automatically saved to MySQL after each action.


Watch the displays on the page update with your current hit points, enemy health, skills and inventory as you interact with the buttons.

## How it Works

The JavaScript code defines simple object-oriented classes for units, items and drop tables. Combat is turn based and very minimal. The adventure system spawns random enemies over a timed interval while collecting their drops. All state exists only in memory while the page is open.

## Code Structure

The logic is split across a few small scripts:

- `skills.js` defines the RuneScape-like skill system.
- `entities.js` contains items, inventories, units and combat helpers.
- `adventure.js` drives the timed adventure encounters.
- `main.js` wires everything together and updates the page.

## Server Setup


The project now includes a small PHP backend for user logins and server-side saving. Configure `php/db.php` with your MySQL credentials and run the SQL in `php/schema.sql` to create the required tables. Start a PHP server and open `php/login.php` to begin. The game automatically calls `php/save.php` and `php/load.php` to persist your progress.


## Recent Improvements

The prototype now includes:

- **Persistent saves** stored in MySQL so your progress is available from any browser.
- **More adventure locations** like the Graveyard and Orc Camp with unique enemies and rewards.
- **Equipment bonuses** that boost stats when you equip weapons or armor.
- **NPC shop** to buy and sell basic gear.
- **Starter quest** to slay goblins for a gold reward.
- **Player housing** to display trophies and store extra items.
- **Troll King boss encounter** with unique crown loot.

### Possible Next Steps

Here are a few ideas for future features:

- Sound effects during combat and leveling.
- Character customization options.
- Expanded crafting professions.
- Player-owned farming plots.
- Clan support for group play.
- Pets that can aid in combat.

## Available Skills

The skill list below mirrors the style of RuneScape and groups skills into categories.
=======
This repository contains a minimal prototype for a RuneScape-like web game. Below is a list of potential skills grouped into categories.

## Skill System Demo

A very simple skill system is implemented in `RunescapeWebGame/js/main.js`. Click the **Train Attack** button on the web page to gain experience and watch the Attack level increase.

## Combat & Inventory Demo

The page also demonstrates a very small combat loop written in an object oriented style. Click **Attack Enemy** to fight a goblin. When the goblin is defeated it drops an item that appears in your inventory display.

## Skill Categories


### Combat & Survival
- Attack
- Defence
- Strength
- Ranged
- Magic
- Hit Points / Vitality
- Stealth
- Faith / Prayer

### Gathering
- Mining
- Woodcutting
- Fishing
- Farming
- Hunting
- Herbalism

### Crafting & Artisan
- Smithing
- Cooking
- Crafting (general)
- Alchemy
- Tailoring / Leatherworking
- Carpentry / Construction
- Fletching (Bow-making)
- Enchanting

### Utility & Exploration
- Agility
- Navigation / Sailing
- Archaeology
- Engineering / Invention
- Summoning / Beast Mastery
- Divination / Insight

