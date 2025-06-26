<?php
session_start();
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    if ($username !== '') {
        $stmt = $pdo->prepare('SELECT id FROM users WHERE username = ?');
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        if (!$user) {
            $stmt = $pdo->prepare('INSERT INTO users (username) VALUES (?)');
            $stmt->execute([$username]);
            $userId = $pdo->lastInsertId();
        } else {
            $userId = $user['id'];
        }
        $_SESSION['user_id'] = $userId;
        $_SESSION['username'] = $username;
        header('Location: ../RunescapeWebGame/html/index.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
<h1>Login</h1>
<form method="post" action="login.php">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    <button type="submit">Login</button>
</form>
</body>
</html>
