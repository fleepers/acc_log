document.getElementById('send-btn').addEventListener('click', sendData);
document.getElementById('input-text').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendData();
    }
});

function sendData() {
    const textData = document.getElementById('input-text').value;
    console.log(textData);

    if (textData === '') {
        alert('Please enter text data.');
        return;
    }

    fetch('save_data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text_data: textData })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('input-text').value = '';
            refreshTable();
        } else {
            alert('save_data Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
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
