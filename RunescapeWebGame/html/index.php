<?php
session_start();
if(!isset($_SESSION["username"])) {
    header("Location: ../../php/login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" / >
  <meta name="viewport" content="width=device-width,initial-scale=1" / >
  <title>RuneScape-like Web Game</title>
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body>
  <p>Welcome <?php echo htmlspecialchars($_SESSION["username"]); ?> | <a href="../../php/logout.php">Logout</a></p>
  <div id="skillDisplay"></div>
  <button id="trainAttack">Train Attack</button>
  <div id="playerDisplay"></div>
  <div id="goldDisplay"></div>
  <div id="enemyDisplay"></div>
  <div id="inventoryDisplay"></div>
  <div id="equipmentDisplay"></div>
  <button id="equipWeapon">Equip Weapon</button>
  <button id="equipArmor">Equip Armor</button>
  <button id="attackEnemy">Attack Enemy</button>
  <button id="challengeBoss">Fight Troll King</button>

  <button id="forestAdventure">Go on Forest Adventure</button>
  <button id="graveyardAdventure">Explore Graveyard</button>
  <button id="orcAdventure">Raid Orc Camp</button>
  <div id="adventureStatus"></div>

  <div id="shopDisplay"></div>
  <button id="buyBronze">Buy Bronze Dagger</button>
  <button id="sellItem">Sell First Item</button>

  <button id="viewHouse">View House</button>
  <button id="storeFirstItem">Store First Item in House</button>
  <div id="houseDisplay"></div>

  <button id="startQuest">Start Goblin Quest</button>
  <div id="questDisplay"></div>

  <canvas id="gameCanvas" width="800" height="600"></canvas>
  <script>
    const API_BASE = '../../php';
    const USER_ID = <?php echo (int)$_SESSION['user_id']; ?>;
  </script>
  <script src="../js/units.js"></script>
  <script src="../js/skills.js"></script>
  <script src="../js/entities.js"></script>
  <script src="../js/adventure.js"></script>
  <script src="../js/shop.js"></script>
  <script src="../js/quests.js"></script>
  <script src="../js/house.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
