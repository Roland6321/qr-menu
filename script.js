document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');
    const counterContainer = document.querySelector('.order-total-counter'); // Counter container
    const addToCartButton = document.querySelector('.add-to-cart'); // Reference to the Add to Cart button

     // Check URL parameters to see if the cart should be shown
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showCart') === 'true') {
        showCart();
        displayCartItems(); // Ensure this function call is here to display cart items
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

    // Add to Cart button functionality
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const menuItemName = getMenuItemIdentifier(); // Get the menu item name from the URL
            addToCart(menuItemName); // Add to cart
            alert(`${menuItemName} added to cart`); // Feedback to user
        });
    }

    // Function to extract the menu item identifier from the URL
    function getMenuItemIdentifier() {
        const pathArray = window.location.pathname.split('/');
        const pageName = pathArray[pathArray.length - 1];
        return pageName.replace('.html', '');
    }

    // Function to add item to cart (store in localStorage)
    function addToCart(itemName) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(itemName);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to display items in the cart
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
});








