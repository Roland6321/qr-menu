document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');
    const counterContainer = document.querySelector('.order-total-counter'); // Counter container
    const addToCartButton = document.querySelector('.add-to-cart');
    if(addToCartButton) {
        addToCartButton.addEventListener('click', handleAddToCart);
    }

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

    // Load cart from localStorage and render on the cart page
    function renderCart() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.getElementById('cartItems');

        // Clear existing cart contents
        cartContainer.innerHTML = '';

        // Check if cart is empty
        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        // Generate HTML for cart items
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <h3>${item.name} x${item.quantity}</h3>
                <p>Price: $${item.finalPrice}</p>
                <p>Comment: ${item.comment || "None"}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });
    }

    // Add item to cart
    function addToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart');
    }

    // Remove item from cart
    window.removeFromCart = (index) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    // Initial render of the cart
    if (window.location.search.includes('showCart=true')) {
        renderCart();
    }

    // Reset cart on page refresh
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('cart');
    });
});





