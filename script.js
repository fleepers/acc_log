const accommodationText = document.getElementById('accommodation-text');
const sendBtn = document.getElementById('send-btn');
const accommodationList = document.getElementById('accommodation-list');

sendBtn.addEventListener('click', sendData);
accommodationText.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendData();
    }
});

function sendData() {
    const data = accommodationText.value.trim();

    if (data) {
        // Send data to the server using AJAX, e.g. using the fetch API
        fetch('insert.php', {
            method: 'POST',
            body: JSON.stringify({ statement: data }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                const li = document.createElement('li');
                li.textContent = data.statement;
                accommodationList.appendChild(li);
                accommodationText.value = '';
            } else {
                alert('Error: Unable to save the data.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
