# RuneScape Web Game Prototype

This project is a small browser experiment that mimics some of the classic mechanics from RuneScape. It is not a full game, but a starting point for exploring combat, skills and simple adventures using only HTML, CSS and JavaScript.

## Playing the Demo

1. Open `RunescapeWebGame/html/index.html` in your web browser.
2. Click **Train Attack** to gain experience and level up the Attack skill.
3. Click **Attack Enemy** to fight a goblin. If you win, its loot appears in your inventory.
4. Click **Go on Forest Adventure** to automatically battle monsters for five seconds. The summary lists any kills and items found.

Watch the displays on the page update with your current hit points, enemy health, skills and inventory as you interact with the buttons.

## How it Works

The JavaScript code defines simple object-oriented classes for units, items and drop tables. Combat is turn based and very minimal. The adventure system spawns random enemies over a timed interval while collecting their drops. All state exists only in memory while the page is open.

## Code Structure

The logic is split across a few small scripts:

- `skills.js` defines the RuneScape-like skill system.
- `entities.js` contains items, inventories, units and combat helpers.
- `adventure.js` drives the timed adventure encounters.
- `main.js` wires everything together and updates the page.

## Next Features

Planned improvements for the prototype include:

- **Persistent saves** so your progress survives a page refresh.
- **More adventure locations** that offer different enemy types and rewards.
- **Equipment bonuses** that boost stats when you wear weapons or armor.

## Available Skills

The skill list below mirrors the style of RuneScape and groups skills into categories.

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

## Multiplayer Marketplace (PHP/MySQL)

A small PHP backend lets players log in with just a name and trade items with others.

1. Run a PHP server inside `RunescapeWebGame/php` and open `login.php`.
2. Enter any player name to create an account with 100 gold.
3. After logging in you are redirected to the marketplace to buy or sell items.

### Database Setup

Create a MySQL database called `runescape` and run:

```sql
CREATE TABLE players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) UNIQUE,
  gold INT DEFAULT 100
);

CREATE TABLE market (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seller VARCHAR(255),
  item VARCHAR(255),
  price INT
);
```

Update `php/db.php` with your MySQL credentials and start the server with:

```
php -S localhost:8000
```

Then browse to `http://localhost:8000/login.php` to begin trading.

