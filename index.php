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

    <div id="inputside">

        <div id="textgen">
            <textarea id="input-text" placeholder="Enter text data"></textarea>
            <button id="send-btn">Send</button>
        </div>

        <div id="filters">
            <p>Filters</p>
            <input type="text" id="filtersearch" placeholder="Search containing text">
            <label>Date start:<input type="date" id="filter-date-start"></label>
            <label>Date end:<input type="date" id="filter-date-end"></label>
            <label><input type="checkbox" id="isWhole" name="isWhole" value="isWhole">Search for whole word</label>
            <button id="filter-update">Update Filters</button>
            <button id="filter-clear">Clear Filters</button>
            <button id="export-xlsx">Export to Spreadsheet</button>
            <div id="whatsgoingon">
                <p id="infotext">test</p>
            </div>
        </div>
        
    </div>

    <script src="script.js"></script>
</body>
</html>
