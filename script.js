const accommodationList = document.getElementById('accommodationList');
const accommodationText = document.getElementById('accommodationText');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', sendData);

function sendData() {
    const data = accommodationText.value.trim();

    if (data) {
        // Send data to the server using AJAX, e.g., using the fetch API
        fetch('insert.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ statement: data }),
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
