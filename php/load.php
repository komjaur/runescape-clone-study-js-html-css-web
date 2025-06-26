<?php
session_start();
require_once 'db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    exit('Not logged in');
}

$stmt = $pdo->prepare('SELECT data FROM saves WHERE user_id = ?');
$stmt->execute([$_SESSION['user_id']]);
$row = $stmt->fetch();

header('Content-Type: application/json');
if ($row) {
    echo $row['data'];
} else {
    echo 'null';
}
?>
