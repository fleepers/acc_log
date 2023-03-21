<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Record Logging</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>

</head>
<body>
    <div id="table-container">
        <?php include 'fetch_data.php'; ?>
    </div>

    <div>
        <textarea id="input-text" placeholder="Enter text data"></textarea>
        <button id="send-btn">Send</button>
        <input type="text" id="filtersearch" placeholder="Search containing text">
        <input type="date" id="filter-date-start">
        <input type="date" id="filter-date-end">
        <input type="checkbox" id="isWhole" name="isWhole" value="isWhole">
        <label for="isWhole">Search for whole word</label><br>
        <button id="filter-update">Update Filters</button>
        <button id="filter-clear">Clear Filters</button>
        <button id="export-xlsx">Export to Spreadsheet</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
