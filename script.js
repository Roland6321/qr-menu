document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    const categories = document.getElementById('categories');

    startButton.addEventListener('click', () => {
        // Hide the start menu and show the user prompt
        startMenu.style.display = 'none';
        categories.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            console.log('Category ' + (index + 1) + ' button clicked');
            // Here you can add functionality to navigate to the category's menu page
        });
    });
});

// Function to show menu items for a selected category
function showMenu(categoryName) {
    // Example: Fetch or define menu items based on the category
    const items = getMenuItemsForCategory(categoryName);
    const menuItems = document.getElementById('menuItems');
    menuItems.innerHTML = ''; // Clear previous items
    items.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item; // Assuming 'item' is a string. Adjust as necessary.
        menuItems.appendChild(li);
    });

    // Set the title for the menu
    document.getElementById('menuTitle').textContent = categoryName + " Menu";
    document.getElementById('menuDisplay').style.display = 'block';
}

// Example placeholder function
function getMenuItemsForCategory(categoryName) {
    // This should be replaced with actual data retrieval logic
    return ['Item 1', 'Item 2']; // Placeholder items
}

function hideMenu() {
    document.getElementById('menuDisplay').style.display = 'none';
}
