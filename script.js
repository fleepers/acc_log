document.getElementById('send-btn').addEventListener('click', sendData);
document.getElementById('input-text').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendData();
    }
});

var intervalId = setInterval(function() {
  console.log("refreshed table")
  refreshTable();
}, 5000);

function sendData() {
    const textData = document.getElementById('input-text').value;
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
      } else {
        console.error('An error occurred');
      }
    };
  
    // Send the request
    xhr.send('textData=' + textData);
    refreshTable();
  }

function refreshTable() {
    fetch('fetch_data.php')
    .then(response => response.text())
    .then(data => {
        document.getElementById('table-container').innerHTML = data;
    })
    .catch(error => {
        console.error('refresh_table Error:', error);
        alert('An error occurred while refreshing the table. Please try again.');
    });
}
