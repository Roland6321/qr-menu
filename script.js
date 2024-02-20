// Function to handle opening the options modal
function openOptionsModal(itemName) {
    // Your existing code to open modal
}

// Function to handle closing the options modal
function closeOptionsModal() {
    // Your existing code to close modal
}

// Function to handle submitting the options from the modal
function submitOptions() {
    // Your existing code to submit options
}

// Select the start button and attach an event listener to it
document.getElementById('startButton').addEventListener('click', function() {
    // Hide the welcome screen and show the categories section
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('categorySection').style.display = 'block';
});

// Since each category already contains the menu items within the categorySection
// We will bind the openOptionsModal directly to each menu item button
// Therefore, no need for a separate showMenuItems function

// Logic for dynamically adding items to cart and updating the summary would go here
