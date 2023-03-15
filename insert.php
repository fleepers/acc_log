<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Replace the values with your actual database credentials
$servername = "20.108.51.39";
$username = "root";
$password = "Q2#8CcRFB8H4";
$dbname = "Acc_Data";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("success" => false, "error" => "Connection failed: " . $conn->connect_error)));
}

// Get the input data from the request
$input = json_decode(file_get_contents('php://input'), true);
$statement = $input['statement'];

// Insert the data into the database
$sql = "INSERT INTO accommodation_log (statement) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $statement);

if ($stmt->execute()) {
    echo json_encode(array("success" => true, "statement" => $statement));
} else {
    echo json_encode(array("success" => false, "error" => "Error: " . $sql . "<br>" . $conn->error));
}

$stmt->close();
$conn->close();
?>
