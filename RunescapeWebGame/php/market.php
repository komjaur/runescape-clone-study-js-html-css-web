<?php
session_start();
require 'db.php';

if (!isset($_SESSION['player_name'])) {
    header('Location: login.php');
    exit;
}
$player = $_SESSION['player_name'];

// Fetch player gold
$stmt = $pdo->prepare('SELECT gold FROM players WHERE name=?');
$stmt->execute([$player]);
$gold = (int)$stmt->fetchColumn();

// Handle selling items
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sell_item'])) {
    $item = trim($_POST['item'] ?? '');
    $price = (int)($_POST['price'] ?? 0);
    if ($item !== '' && $price > 0) {
        $pdo->prepare('INSERT INTO market (seller, item, price) VALUES (?, ?, ?)')
            ->execute([$player, $item, $price]);
    }
}

// Handle buying items
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['buy'])) {
    $id = (int)$_POST['id'];
    $stmt = $pdo->prepare('SELECT seller, item, price FROM market WHERE id=?');
    $stmt->execute([$id]);
    $offer = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($offer && $offer['price'] <= $gold) {
        $pdo->prepare('UPDATE players SET gold = gold - ? WHERE name=?')
            ->execute([$offer['price'], $player]);
        $pdo->prepare('UPDATE players SET gold = gold + ? WHERE name=?')
            ->execute([$offer['price'], $offer['seller']]);
        $pdo->prepare('DELETE FROM market WHERE id=?')->execute([$id]);
    }
}

// Refresh gold
$stmt = $pdo->prepare('SELECT gold FROM players WHERE name=?');
$stmt->execute([$player]);
$gold = (int)$stmt->fetchColumn();

$offers = $pdo->query('SELECT id, seller, item, price FROM market')->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Marketplace</title>
</head>
<body>
<p>Logged in as <?php echo htmlspecialchars($player); ?> - Gold: <?php echo $gold; ?></p>
<h2>Sell Item</h2>
<form method="post">
    <input type="hidden" name="sell_item" value="1">
    <label>Item: <input type="text" name="item" required></label>
    <label>Price: <input type="number" name="price" required min="1"></label>
    <button type="submit">List for Sale</button>
</form>

<h2>Market Listings</h2>
<table border="1">
<tr><th>Item</th><th>Price</th><th>Seller</th><th>Buy</th></tr>
<?php foreach ($offers as $o): ?>
<tr>
<td><?php echo htmlspecialchars($o['item']); ?></td>
<td><?php echo $o['price']; ?></td>
<td><?php echo htmlspecialchars($o['seller']); ?></td>
<td>
<?php if ($o['seller'] !== $player): ?>
<form method="post" style="margin:0;">
    <input type="hidden" name="buy" value="1">
    <input type="hidden" name="id" value="<?php echo $o['id']; ?>">
    <button type="submit">Buy</button>
</form>
<?php endif; ?>
</td>
</tr>
<?php endforeach; ?>
</table>
</body>
</html>
