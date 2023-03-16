<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root";
$password = "MakoChan13!!";
$dbname = "acc_data";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("success" => false, "error" => "Connection failed: " . $conn->connect_error)));
}

$input = json_decode(file_get_contents('php://input'), true);

if ($input === null || !isset($input['statement'])) {
    echo json_encode(array("success" => false, "error" => "Invalid input data"));
    exit();
}

$statement = $input['statement'];

$sql = "INSERT INTO accommodation_log (statement) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $statement);

if ($stmt->execute()) {
    echo json_encode(array("success" => true, "statement" => $statement));
} else {
    echo json_encode(array("success" => false, "error" => "Error executing the statement: " . $stmt->error));
}

$stmt->close();
$conn->close();
?>
