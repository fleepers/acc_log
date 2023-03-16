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
                alert('Error: ' + data.error);
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }
}

function fetchAccommodations() {
    fetch('fetch.php')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = item.statement;
                accommodationList.appendChild(li);
            });
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}

fetchAccommodations();
