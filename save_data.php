<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "MakoChan13!!";
$dbname = "acc_data";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $text_data = $data["text_data"];
    $date = date("Y-m-d H:i:s");

    $stmt = $conn->prepare("INSERT INTO accommodation_log (text_data, date) VALUES (?, ?)");
    $stmt->bind_param("ss", $text_data, $date);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
