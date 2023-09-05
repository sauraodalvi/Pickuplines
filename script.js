let currentLineIndex = 0; // Initialize current pickup line index

function fetchAndDisplayPickupLine() {
    const apiUrl = 'https://qhumpfwstxjrvmlckokr.supabase.co/rest/v1/PickupLine_db?select=*'; // Fetch 10 pickup lines

    // Add the necessary headers
    const headers = new Headers();
    headers.append('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodW1wZndzdHhqcnZtbGNrb2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxMTM4MjQsImV4cCI6MjAwODY4OTgyNH0.xsKV9Sxe-wBlDz7eDc5IbjIEcvk0prg5thGHefcW9Io'); // Replace 'YOUR_API_KEY' with your actual Supabase API key
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodW1wZndzdHhqcnZtbGNrb2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxMTM4MjQsImV4cCI6MjAwODY4OTgyNH0.xsKV9Sxe-wBlDz7eDc5IbjIEcvk0prg5thGHefcW9Io'); // Replace 'YOUR_BEARER_TOKEN' with your actual bearer token

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const pickupLineDiv = document.getElementById('pickup-line');

            if (currentLineIndex < data.length) {
                pickupLineDiv.textContent = data[currentLineIndex].Pickup_line; // Modify this line to match your Supabase response structure
                currentLineIndex++;
            } else {
                pickupLineDiv.textContent = "No more pickup lines available.";
            }

            const copyButton = document.getElementById('copy-button');
            copyButton.textContent = 'Copy'; // Reset the button text
        })
        .catch(error => {
            console.error('Error fetching pickup lines:', error);
        });
}

// Function to copy the pickup line to the clipboard and show "Copied!" temporarily
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

    // Reset the button text after 1 second
    setTimeout(() => {
        copyButton.textContent = 'Copy';
    }, 1000);
}

// Call the fetchAndDisplayPickupLine function when the page loads
window.addEventListener('load', fetchAndDisplayPickupLine);

// Add a click event listener to the "Generate" button
const generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', fetchAndDisplayPickupLine);

// Add a click event listener to the "Copy" button
const copyButton = document.getElementById('copy-button');
copyButton.addEventListener('click', copyPickupLine);
