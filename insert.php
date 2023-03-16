<?php
ini_set('display_errors', '0');
error_reporting(0);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost:3306";
$username = "root";
$password = "MakoChan13!!";
$dbname = "acc_data";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("success" => false, "error" => "Connection failed: " . $conn->connect_error)));
}

// Get the JSON data from the request body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$statement = $data['statement'];

if (empty($statement)) {
    echo json_encode(array("success" => false, "error" => "Invalid input data"));
    exit();
}

$sql = "INSERT INTO accommodation_log (statement) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $statement);

if ($stmt->execute()) {
    echo json_encode(array("success" => true, "statement" => $statement));
} else {
    echo json_encode(array("success" => false, "error" => "Error: " . $stmt->error));
}

$stmt->close();
$conn->close();
?>
