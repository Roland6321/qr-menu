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
        // Assuming 'menu-items' class is used for all menu item sections
        document.querySelectorAll('.menu-items').forEach(item => item.style.display = 'none');

        // Show the cart section
        document.getElementById('cartSection').style.display = 'block';
    }

    // Add event listener to Cart button(s)
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', showCart);
    });

    // Function to extract the menu item identifier from the URL
    function getMenuItemIdentifier() {
        const pathArray = window.location.pathname.split('/');
        const pageName = pathArray[pathArray.length - 1];
        return pageName.replace('.html', '');
    }

    // Function to add item to cart (store in localStorage)
    function addToCart(itemName) {
        // Retrieve the current cart from localStorage, parse it into an array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Add the new item
        cart.push(itemName);
        
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Event listener for the Add to Cart button
    document.addEventListener('DOMContentLoaded', () => {
        const addToCartButton = document.querySelector('.add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                const menuItemName = getMenuItemIdentifier(); // Get the menu item name from the URL
                addToCart(menuItemName); // Add to cart
                alert(`${menuItemName} added to cart`); // Feedback to user
            });
        }
    });

    // This function is called when the Cart page is loaded to display items in the cart
    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cartItems');
        
        if (cart.length > 0) {
            cartItemsContainer.innerHTML = ''; // Clear the "Your cart is empty" message
            cart.forEach(item => {
                const itemElement = document.createElement('p');
                itemElement.textContent = item;
                cartItemsContainer.appendChild(itemElement);
            });
        }
    }

    // Add this to the DOMContentLoaded event listener in script.js
    if (urlParams.get('showCart') === 'true') {
        showCart();
        displayCartItems(); // Call this function when the cart is to be shown
    }
});







