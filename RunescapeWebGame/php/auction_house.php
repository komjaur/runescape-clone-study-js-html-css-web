<?php
// Simple auction house script using MySQL
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'runescape';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}
$conn->set_charset('utf8mb4');

$action = $_REQUEST['action'] ?? 'list';

switch ($action) {
    case 'list':
        $result = $conn->query('SELECT id,item,price,seller FROM auctions');
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($rows);
        break;
    case 'sell':
        $item = $_POST['item'] ?? '';
        $price = intval($_POST['price'] ?? 0);
        $seller = $_POST['seller'] ?? 'Anon';
        if ($item && $price > 0) {
            $stmt = $conn->prepare('INSERT INTO auctions (item,price,seller) VALUES (?,?,?)');
            $stmt->bind_param('sis', $item, $price, $seller);
            $stmt->execute();
            echo 'ok';
        }
        break;
    case 'buy':
        $id = intval($_POST['id'] ?? 0);
        if ($id > 0) {
            $conn->query('DELETE FROM auctions WHERE id=' . $id);
            echo 'ok';
        }
        break;
}
