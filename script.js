const clientId = "efb2cb7a-c639-4dc2-93db-f85ff21273bf"
const tokenUrl = "https://login.microsoftonline.com/9431e0b9-00a8-40f7-a077-5f0920325f6c/oauth2/v2.0/token";
const authority = "https://login.microsoftonline.com/9431e0b9-00a8-40f7-a077-5f0920325f6c/";
var authtokenfound = "";

const msalConfig = {
  auth: {
    clientId: clientId,
    authority: authority,
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

window.onload = (event) => {
  console.log("page is fully loaded");
  updateFilters("SELECT usersub, text_data, date FROM accommodation_log");
};

document.getElementById('send-btn').addEventListener('click', sendData);
document.getElementById('filter-update').addEventListener('click', inputFilterData);
document.getElementById('filter-clear').addEventListener('click', clearFilterData);
document.getElementById("export-xlsx").addEventListener("click", exportTableToExcel);

function clearFilterData(){
  document.getElementById('filtersearch').value = "";
  document.getElementById('filter-date-start').value = "";
  document.getElementById('filter-date-end').value = "";
  document.getElementById("filter-user").value = "";
  document.getElementById("tablename").selectedIndex = 0;
  inputFilterData();
  document.getElementById('whatsgoingon').style.backgroundColor = "green";
  document.getElementById('whatsgoingon').style.Color = "black";
  document.getElementById('infotext').innerText = "Filters cleared";
}

async function login(){

  const loginRequest = { scopes: ["https://graph.microsoft.com/.default"] };

  try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      const accessToken = loginResponse.accessToken;

      authtokenfound = accessToken;
      //console.log(authtokenfound);
      checkusername(await fetchusername(accessToken));


      } catch (error) {
          console.error(error);
          alert("Log-in failed. Error code: " + error);
      }
}

async function fetchusername(token) {
  // Make the API request and wait
  const response = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // wait again for the response and extract the name
  const data = await response.json();
  const displayName = data.userPrincipalName;

  // Return the display name as a string
  return displayName.split('@')[0];
  }

  async function checkusername(inputString) {
    try {
      // Fetch the users.txt file
      const response = await fetch('users.txt');
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Read the content of the file as text
      const fileContent = await response.text();
  
      // Split the content into an array of lines
      const lines = fileContent.split('\n');
  
      // Iterate over each line to find a match
      let matchFound = false;
      for (const line of lines) {
        if (line.trim() === inputString) {
          console.log(`Username found: ${line}`);
          matchFound = true;
          document.getElementById('loginbox').remove();
          document.getElementById('postlogin').style.visibility = "visible";
          document.getElementById('postlogin').style.pointerEvents = "all";
          break;
        }
      }
  
      // If no match found, throw an error
      if (!matchFound) {
        alert("Access Denied. You are not in the authorized list of staff to use this. If this is an error, please contact itservices@grantham.ac.uk");
        throw new Error('Username not found');
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  

  function inputFilterData() {
    var output = "";
    var searchText = document.getElementById("filtersearch").value;
    var filterDateStart = document.getElementById("filter-date-start").value;
    var filterDateEnd = document.getElementById("filter-date-end").value;
    var filterUser = document.getElementById("filter-user").value;
    var isWholeWord = document.getElementById("isWhole").checked;
    var tableName = document.getElementById("tablename").value;


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
  
    var userFilter = "";
    if (filterUser.length > 0) {
      userFilter = "AND usersub = '" + filterUser + "'";
    }
  
    if (searchText.length > 0) {
      if (isWholeWord) {
        output =
          "SELECT usersub, text_data, date FROM " + tableName + " WHERE text_data = '" +
          searchText +
          "' " +
          dateFilter +
          userFilter +
          ";";
      } else {
        output =
          "SELECT usersub, text_data, date FROM " + tableName + " WHERE text_data LIKE '%" +
          searchText +
          "%' " +
          dateFilter +
          userFilter +
          ";";
      }
    } else {
      output = "SELECT usersub, text_data, date FROM " + tableName + (dateFilter.length > 0 || userFilter.length > 0 ? " WHERE " + dateFilter.slice(4) + " " + userFilter.slice(4) : "") + ";";
    }
  
    console.log(output);
    document.getElementById('whatsgoingon').style.backgroundColor = "green";
    document.getElementById('whatsgoingon').style.Color = "black";
    document.getElementById('infotext').innerText = "Filters updated";
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
      scrollToBottom();
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

async function sendData() {
    const textData = document.getElementById('input-text').value;
    const user = await fetchusername(authtokenfound);

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
          document.getElementById('whatsgoingon').style.backgroundColor = "green";
          document.getElementById('whatsgoingon').style.Color = "black";
          document.getElementById('infotext').innerText = "Log Entered";
          document.getElementById('input-text').value = "";
          refreshTable();        
        } else {
          console.error('An error occurred');
        }

      };
  
      // Send the request
      xhr.send('textData=' + textData + '&usersub=' + user);

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
    { wch: 50, wrapText: true }, // Text Data column
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
  document.getElementById('whatsgoingon').style.backgroundColor = "green";
  document.getElementById('whatsgoingon').style.Color = "black";
  document.getElementById('infotext').innerText = "Spreadsheet Exported";
}


