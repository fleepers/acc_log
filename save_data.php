<?php
$servername = "localhost";
$username = "root";
$password = "MakoChan13!!";
$dbname = "acc_data";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Retrieve text data from the POST request
if (isset($_POST['textData'])) {
    $textData = $_POST['textData'];
    error_log("Received textData: " . $textData);
  } else {
    error_log("textData not set in the POST request");
    die("Missing textData");
  }

// Get the current date
$date = date('Y-m-d H:i:s');

// Prepare an SQL statement
$stmt = $conn->prepare("INSERT INTO accommodation_log (text_data, date) VALUES (?, ?)");

// Bind parameters
$stmt->bind_param("ss", $textData, $date);

// Execute the prepared statement
if ($stmt->execute()) {
  echo "New record created successfully";
} else {
  echo "Error: " . $stmt->error;
}

// Close the prepared statement and the connection
$stmt->close();
$conn->close();
?>
