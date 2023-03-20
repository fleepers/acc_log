<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Record Logging</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="table-container">
        <?php include 'fetch_data.php'; ?>
    </div>

    <div>
        <textarea id="input-text" placeholder="Enter text data"></textarea>
        <button id="send-btn">Send</button>
        <input type="text" id="filtersearch" placeholder="Search containing text">
        <button id="filter-update">Update Filters</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
