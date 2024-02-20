// Function to handle opening the options modal
function openOptionsModal(itemName) {
    // Existing code to open modal
}

// Function to handle closing the options modal
function closeOptionsModal() {
    // Existing code to close modal
}

// Function to handle submitting the options from the modal
function submitOptions() {
    // Existing code to submit options
}

// Select the start button and attach an event listener to it
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', function() {
    // Hide the welcome screen and show the categories section
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('categorySection').style.display = 'block';
});

// Function to show the menu items for a category
function showMenuItems(categoryId) {
    // Hide the category section
    document.getElementById('categorySection').style.display = 'none';
    // Show the menu section
    document.getElementById('menuSection').style.display = 'block';
    // Logic to filter and display menu items based on categoryId goes here
}

// Attach event listeners to each category container
document.querySelectorAll('.category-container').forEach(function(category) {
    category.addEventListener('click', function() {
        // Call showMenuItems with the id of the clicked category
        showMenuItems(category.id);
    });
});

// Logic for dynamically adding items to cart and updating the summary would go here
