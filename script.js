document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('cart', JSON.stringify([]));  // Empty the cart on page load
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');
    const counterContainer = document.querySelector('.order-total-counter'); // Counter container
    const urlParams = new URLSearchParams(window.location.search);

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

    // Function to show the cart section
    function showCart() {
        document.getElementById('startMenu').style.display = 'none';
        categories.style.display = 'none';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('cartSection').style.display = 'block';
    }

    // Event listeners for buttons
    startButton.addEventListener('click', showCategories);

    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showMenuItems(index);
        });
    });

    backToCategoriesButtons.forEach(button => {
        button.addEventListener('click', showCategories);
    });

    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', showCart);
    });

    const homeButtons = document.querySelectorAll('.home-btn');
    homeButtons.forEach(button => {
        button.addEventListener('click', showCategories);
    });

    // Check if we're on a menu item page and bind the Add to Cart button click event
    if (document.querySelector('.add-to-cart')) {
        document.querySelector('.add-to-cart').addEventListener('click', function() {
            const itemName = document.querySelector('.menu-item-name').innerText;
            const itemPrice = parseFloat(document.querySelector('.price-value').getAttribute('data-price'));
            const quantity = parseInt(document.querySelector('#quantity').value || 1);
            const comments = document.querySelector('#comment').value;
            let extraIngredients = [];
            document.querySelectorAll('.extra-ingredients-section input[type=checkbox]:checked').forEach(function(checkbox) {
                extraIngredients.push(checkbox.nextElementSibling.innerText);
            });

            const itemDetails = {
                name: itemName,
                price: itemPrice,
                quantity: quantity,
                extraIngredients: extraIngredients,
                comments: comments
            };

            addToCart(itemDetails);
        });
    }

    function addToCart(itemDetails) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(itemDetails);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
    }

    // Display cart items if the cart page is requested
    if (urlParams.get('showCart') === 'true') {
        showCart();
        displayCartItems();
    }

    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = ''; // Clear current cart items
        cart.forEach(item => {
            let itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Extras: ${item.extraIngredients.join(', ')}</p>
                <p>Comments: ${item.comments}</p>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        }
    }
});









