<?php
header('Content-Type: text/plain');
$dsn = 'mysql:host=localhost;dbname=users;charset=utf8mb4';
$dbUser = 'leo_admin';
$dbPass = 'mM7631198';

try {
    $pdo = new PDO($dsn, $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    // Avoid exposing details
    http_response_code(500);
    echo "Database connection failed";
    exit;
}

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if ($username === '' || $password === '') {
    echo "Invalid username or password";
    exit;
}

$stmt = $pdo->prepare('SELECT username, password, role FROM users WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user) {
    echo "User not found";
    exit;
}

if (password_verify($password, $user['password'])) {
    $safeUser = htmlspecialchars($user['username'], ENT_QUOTES, 'UTF-8');
    $safeRole = htmlspecialchars($user['role'], ENT_QUOTES, 'UTF-8');
    echo "Login successful. Welcome {$safeUser} (Role: {$safeRole})";
} else {
    echo "Invalid username or password";
}

