<?php
$dsn = 'mysql:host=localhost;dbname=runescape';
$user = 'username';
$pass = 'password';
$pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
?>
