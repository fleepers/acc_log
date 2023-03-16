<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";
$password = "MakoChan13!!";
$dbname = "acc_data";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("success" => false, "error" => "Connection failed: " . $conn->connect_error)));
}

$sql = "SELECT * FROM accommodation_log";
$result = $conn->query($sql);

$accommodations = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $accommodations[] = array("id" => $row["id"], "statement" => $row["statement"]);
    }
}

echo json_encode($accommodations);

$conn->close();
?>
