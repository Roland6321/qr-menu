document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');
    const counterContainer = document.querySelector('.order-total-counter'); // Counter container

    // Check URL parameters to see if the cart should be shown
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showCart') === 'true') {
        showCart();
    }

    // Function to toggle counter display
    function toggleCounterDisplay(show) {
        counterContainer.style.display = show ? 'block' : 'none';
    }

    // Initially hide the counter
    toggleCounterDisplay(false);

    // Function to show the categories page and ensure the counter is shown
    function showCategories() {
        categories.style.display = 'block';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('startMenu').style.display = 'none';
        toggleCounterDisplay(true);
    }

    // Function to show menu items for a specific category
    function showMenuItems(index) {
        categories.style.display = 'none';
        document.getElementById('startMenu').style.display = 'none';
        menuItemsSections[index].style.display = 'block';
        toggleCounterDisplay(true); // Ensure the counter is visible when viewing menu items
    }

    startButton.addEventListener('click', showCategories);

    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showMenuItems(index);
        });
    });

    backToCategoriesButtons.forEach(button => {
        button.addEventListener('click', showCategories);
    });

    const homeButtons = document.querySelectorAll('.home-btn');
    homeButtons.forEach(button => {
        button.addEventListener('click', showCategories);
    });

    // Function to show the cart section
    function showCart() {
        // Hide all sections that should not be visible when the cart is shown
        document.getElementById('startMenu').style.display = 'none';
        document.getElementById('categories').style.display = 'none';
        document.querySelectorAll('.menu-items').forEach(item => item.style.display = 'none');

        // Show the cart section
        document.getElementById('cartSection').style.display = 'block';
    }

    // Add event listener to Cart button(s)
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', showCart);
    });

    // Updated Quantity Selector Logic
    const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
    const increaseButtons = document.querySelectorAll('.quantity-btn.increase');

    decreaseButtons.forEach((button) => {
        button.addEventListener('click', function() {
            const quantityValue = button.nextElementSibling; // Assuming the quantity value span is immediately after the decrease button
            let currentValue = parseInt(quantityValue.textContent, 10);
            if (currentValue > 0) {
                currentValue--;
                quantityValue.textContent = currentValue.toString();
            }
        });
    });

    increaseButtons.forEach((button) => {
        button.addEventListener('click', function() {
            const quantityValue = button.previousElementSibling; // Assuming the quantity value span is immediately before the increase button
            let currentValue = parseInt(quantityValue.textContent, 10);
            if (currentValue < 25) {
                currentValue++;
                quantityValue.textContent = currentValue.toString();
            }
        });
    });
});







