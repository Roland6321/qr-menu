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

// Attach event listeners to each category button to show its menu items
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        const menuId = button.getAttribute('data-category');
        // Hide all menu items containers first
        document.querySelectorAll('.menu-items-container').forEach(container => {
            container.style.display = 'none';
        });
        // Show the selected category's menu items
        document.getElementById(menuId).style.display = 'block';
        // Optionally hide the categorySection if you want to show only the menu items
        // document.getElementById('categorySection').style.display = 'none';
    });
});

// Logic for dynamically adding items to cart and updating the summary would go here
