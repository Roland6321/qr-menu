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
        // Add click event listener for "Add to cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', event => {
                // Assuming the menu item's name is contained within an element with the class 'menu-item-name'
                const itemName = document.querySelector('.menu-item-name').innerText;
                addItemToCart(itemName);
                showPopupNotification(`"${itemName}" is added to your cart.`);
            });
        });
    
        // Load cart items on the cart page
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
            loadCartItems();
        }
    });
    
    // Function to add item to local storage cart
    function addItemToCart(itemName) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(itemName);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Function to show popup notification
    function showPopupNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'popup-notification';
        notification.innerText = message;
        document.body.appendChild(notification);
        // Automatically hide after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
    
    // Function to load cart items
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = ''; // Clear current content
        cartItems.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.innerText = item;
            cartItemsContainer.appendChild(itemElement);
        });
    }









