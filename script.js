document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');
    const menuItemElements = document.querySelectorAll('.menu-item');

    // Function to show the categories page
    function showCategories() {
        categories.style.display = 'block';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('startMenu').style.display = 'none';
    }

    // Function to show menu items for a specific category
    function showMenuItems(index) {
        categories.style.display = 'none';
        document.getElementById('startMenu').style.display = 'none';
        menuItemsSections[index].style.display = 'block';
    }

    // Function to handle menu item click - To be expanded with modal/dropdown functionality
    function handleMenuItemClick(event) {
        // Placeholder functionality: Log clicked item's ID
        console.log(`Clicked on menu item: ${event.currentTarget.id}`);
        // Here you would typically show a modal or dropdown to select extras, quantity, etc.
    }

    startButton.addEventListener('click', () => {
        showCategories();
    });

    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showMenuItems(index);
        });
    });

    backToCategoriesButtons.forEach(button => {
        button.addEventListener('click', () => {
            showCategories();
        });
    });

    menuItemElements.forEach(item => {
        item.addEventListener('click', handleMenuItemClick);
    });
});