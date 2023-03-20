<?php
$servername = "localhost";
$username = "root";
$password = "MakoChan13!!";
$dbname = "acc_data";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['FilterData'])) {
    $sql = $_POST['FilterData'];
    error_log("Received: " . $sql);
  } else {
    $sql = "SELECT id, text_data, date FROM accommodation_log";
  }

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>ID</th><th>Text Data</th><th>Date</th></tr>";

    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["id"] . "</td><td>" . $row["text_data"] . "</td><td>" . $row["date"] . "</td></tr>";
    }

    echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>
