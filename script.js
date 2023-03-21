window.onload = (event) => {
  console.log("page is fully loaded");
  updateFilters("SELECT id, text_data, date FROM accommodation_log");
};

document.getElementById('send-btn').addEventListener('click', sendData);
document.getElementById('filter-update').addEventListener('click', inputFilterData);
document.getElementById('filter-clear').addEventListener('click', clearFilterData);
document.getElementById("export-xlsx").addEventListener("click", exportTableToExcel);
document.getElementById("export-word").addEventListener("click", exportTableToWord);



function clearFilterData(){
  document.getElementById('filtersearch').value = "";
  document.getElementById('filter-date-start').value = "";
  document.getElementById('filter-date-end').value = "";
  inputFilterData();
}

function inputFilterData() {
  var output = "";
  var searchText = document.getElementById("filtersearch").value;
  var filterDateStart = document.getElementById("filter-date-start").value;
  var filterDateEnd = document.getElementById("filter-date-end").value;
  var isWholeWord = document.getElementById("isWhole").checked;

  // Add a day to the end date
  if (filterDateEnd.length > 0) {
    var endDate = new Date(filterDateEnd);
    endDate.setDate(endDate.getDate() + 1);
    filterDateEnd = endDate.toISOString().slice(0, 10);
  }

  var dateFilter = "";
  if (filterDateStart.length > 0 && filterDateEnd.length > 0) {
    dateFilter = "AND date BETWEEN '" + filterDateStart + "' AND '" + filterDateEnd + "'";
  } else if (filterDateStart.length > 0) {
    dateFilter = "AND date >= '" + filterDateStart + "'";
  } else if (filterDateEnd.length > 0) {
    dateFilter = "AND date < '" + filterDateEnd + "'";
  }

  if (searchText.length > 0) {
    if (isWholeWord) {
      output =
        "SELECT id, text_data, date FROM accommodation_log WHERE text_data = '" +
        searchText +
        "' " +
        dateFilter +
        ";";
    } else {
      output =
        "SELECT id, text_data, date FROM accommodation_log WHERE text_data LIKE '%" +
        searchText +
        "%' " +
        dateFilter +
        ";";
    }
  } else {
    output = "SELECT id, text_data, date FROM accommodation_log" + (dateFilter.length > 0 ? " WHERE " + dateFilter.slice(4) : "") + ";";
  }

  console.log(output);
  updateFilters(output);
}

function updateFilters(x) {
  
  // Create XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Define the request
  xhr.open('POST', 'fetch_data.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  // Handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Data sent successfully');
      // Update the table with the new data
      document.getElementById('table-container').innerHTML = xhr.responseText;
    } else {
      console.error('An error occurred');
    }
  };

  // Send the request
  xhr.send('FilterData=' + x);
}

function scrollToBottom() {
  const container = document.getElementById('table-container');
  container.scrollTop = container.scrollHeight;
}

function sendData() {
    const textData = document.getElementById('input-text').value;

    if (document.getElementById('input-text').value.length > 0){
      console.log(textData);
  
      // Create XMLHttpRequest object
      const xhr = new XMLHttpRequest();
  
      // Define the request
      xhr.open('POST', 'save_data.php', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
      // Handle the response
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log('Data sent successfully');
          refreshTable();        
        } else {
          console.error('An error occurred');
        }

      };
  
      // Send the request
      xhr.send('textData=' + textData);

    }
    
  }

function refreshTable() {
    fetch('fetch_data.php')
    .then(response => response.text())
    .then(data => {
        document.getElementById('table-container').innerHTML = data;
        scrollToBottom();
    })
    .catch(error => {
        console.error('refresh_table Error:', error);
        alert('An error occurred while refreshing the table. Please try again.');
    });
}

function exportTableToExcel() {
  const table = document.querySelector("table");
  const ws_name = "Sheet1";
  const wb = XLSX.utils.book_new();

  // Convert the table data to an array of arrays
  const data = [];
  const rows = table.querySelectorAll("tr");

  for (let i = 0; i < rows.length; i++) {
    let rowData = [];
    const cols = rows[i].querySelectorAll("td, th");

    for (let j = 0; j < cols.length; j++) {
      rowData.push(cols[j].textContent);
    }

    data.push(rowData);
  }

  // Convert the array of arrays to a worksheet
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Set the cell types for the 'text_data' and 'date' columns
  for (let i = 1; i < data.length; i++) {
    const textDataCell = ws[XLSX.utils.encode_cell({ c: 1, r: i })];
    textDataCell.t = "s"; // Set the cell type to 'string'
    textDataCell.z = "@"; // Set the cell format to 'Text'
    textDataCell.s = { alignment: { wrapText: true } }; // Enable text wrapping

    const dateCell = ws[XLSX.utils.encode_cell({ c: 2, r: i })];
    dateCell.t = "d"; // Set the cell type to 'date'
    dateCell.z = "yyyy-mm-dd h:mm:ss"; // Set the date format
  }

  // Set the column widths
  ws['!cols'] = [
    { wch: 10 }, // ID column
    { wch: 50 }, // Text Data column
    { wch: 20 }, // Date column
  ];

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, ws_name);

  // Add the '!autofilter' property to enable automatic text wrapping
  ws['!autofilter'] = { ref: "A1:C" + data.length };

  // Generate a downloadable XLSX file
  const wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "table_export.xlsx");
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


