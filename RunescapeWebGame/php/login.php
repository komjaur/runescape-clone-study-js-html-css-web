<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    if ($name !== '') {
        $stmt = $pdo->prepare('SELECT id FROM players WHERE name=?');
        $stmt->execute([$name]);
        if (!$stmt->fetch()) {
            $pdo->prepare('INSERT INTO players (name, gold) VALUES (?, 100)')
                ->execute([$name]);
        }
        $_SESSION['player_name'] = $name;
        header('Location: market.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
<form method="post">
    <label>Player Name: <input type="text" name="name" required></label>
    <button type="submit">Enter</button>
</form>
</body>
</html>
