// Function to fetch and display a pickup line
function fetchPickupLine() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://vinuxd.vercel.app/api/pickup';

    fetch(proxyUrl + apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the content of the 'pickup-line' div with the pickup line
            const pickupLineDiv = document.getElementById('pickup-line');
            pickupLineDiv.textContent = data.pickup;
        })
        .catch(error => {
            console.error('Error fetching or processing pickup line:', error);
        });
}

// Function to copy the pickup line to the clipboard
function copyPickupLine() {
    const pickupLineDiv = document.getElementById('pickup-line');
    const textToCopy = pickupLineDiv.textContent;

    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    const copyButton = document.getElementById('copy-button');
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = 'Copy';
    }, 1000);
}

// Call the fetchPickupLine function when the page loads
window.addEventListener('load', fetchPickupLine);

// Add a click event listener to the "Generate" button
const generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', fetchPickupLine);

// Add a click event listener to the "Copy" button
const copyButton = document.getElementById('copy-button');
copyButton.addEventListener('click', copyPickupLine);
