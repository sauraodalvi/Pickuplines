let pickupLines = []; // Initialize an array to store pickup lines
let currentIndex = 0; // Initialize the current index
let isFetching = false; // Track if an API call is in progress
const pickupLinesPerPage = 20; // Number of pickup lines per API call

function fetchPickupLines() {
    if (isFetching) {
        return; // Prevent multiple API calls while one is in progress
    }

    // Generate a random offset to fetch different sets of pickup lines
    const randomOffset = Math.floor(Math.random() * 1352); // Assuming there are 1372 pickup lines
        
            const apiUrl = `https://qhumpfwstxjrvmlckokr.supabase.co/rest/v1/PickupLine_db?select=*&limit=${pickupLinesPerPage}`; // Fetch 20 pickup lines
        
            // Add the necessary headers
            const headers = new Headers();
            headers.append('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodW1wZndzdHhqcnZtbGNrb2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxMTM4MjQsImV4cCI6MjAwODY4OTgyNH0.xsKV9Sxe-wBlDz7eDc5IbjIEcvk0prg5thGHefcW9Io'); // Replace 'YOUR_API_KEY' with your actual Supabase API key
            headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodW1wZndzdHhqcnZtbGNrb2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxMTM4MjQsImV4cCI6MjAwODY4OTgyNH0.xsKV9Sxe-wBlDz7eDc5IbjIEcvk0prg5thGHefcW9Io'); // Replace 'YOUR_BEARER_TOKEN' with your actual bearer token
        
            const requestOptions = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            };
        
            isFetching = true; // Set to true to indicate an API call is in progress
        
            fetch(apiUrl, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    pickupLines = shuffle(data); // Shuffle the fetched pickup lines
                    currentIndex = 0; // Reset the current index
                    showNextPickupLine(); // Display the first pickup line
                    isFetching = false; // Set to false to allow the next API call
                })
                .catch(error => {
                    console.error('Error fetching pickup lines:', error);
                    isFetching = false; // Set to false in case of an error
                });
        }
        
        function showNextPickupLine() {
            if (currentIndex < pickupLines.length) {
                const pickupLineDiv = document.getElementById('pickup-line');
                pickupLineDiv.textContent = pickupLines[currentIndex].Pickup_line; // Modify this line to match your Supabase response structure
                currentIndex++;
            } else {
                // If all pickup lines have been viewed, make another API call to fetch more pickup lines
                fetchPickupLines();
            }
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
        
        // Shuffle function to randomize pickup lines
        function shuffle(array) {
            let currentIndex = array.length, randomIndex, temporaryValue;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        
        // Call the fetchPickupLines function when the page loads
        window.addEventListener('load', fetchPickupLines);
        
        // Add a click event listener to the "Generate" button
        const generateButton = document.getElementById('generate-button');
        generateButton.addEventListener('click', showNextPickupLine);
        
        // Add a click event listener to the "Copy" button
        const copyButton = document.getElementById('copy-button');
        copyButton.addEventListener('click', copyPickupLine);
