<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accommodation Record (1.1)</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
    <script type="text/javascript" src="https://alcdn.msauth.net/browser/2.14.2/js/msal-browser.min.js"></script>

</head>
<body>

    <div id="loginbox">
        <button id="login-btn" onclick="login()">Login</button>
    </div>

    <div id="postlogin">

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
            <input type="text" id="filter-user" placeholder="Filter by username (eg. tteven, staylor)">
            <input type="text" id="filtersearch" placeholder="Search containing text">
            <label>Date start:<input type="date" id="filter-date-start"></label>
            <label>Date end:<input type="date" id="filter-date-end"></label>
            <select id="tablename">
                <option selected>accommodation_log</option>
                <option>acc_202223</option>
            </select>
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
