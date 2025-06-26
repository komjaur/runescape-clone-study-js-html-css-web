<?php
session_start();
require_once 'db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    exit('Not logged in');
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!$data || !isset($data['save'])) {
    http_response_code(400);
    exit('Invalid data');
}

$save = json_encode($data['save']);
$stmt = $pdo->prepare('INSERT INTO saves (user_id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)');
$stmt->execute([$_SESSION['user_id'], $save]);

echo 'ok';
?>
