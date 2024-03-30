document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');
    const counterContainer = document.querySelector('.order-total-counter');
    const urlParams = new URLSearchParams(window.location.search);

    function toggleCounterDisplay(show) {
        if (counterContainer) {
            counterContainer.style.display = show ? 'block' : 'none';
        }
    }

    const isMainPage = startButton !== null && categories !== null;
    toggleCounterDisplay(!isMainPage);

    // Function to update the total cost on navigation or cart update
    function updateTotalOnNav() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalCost = cart.reduce((acc, item) => {
            let itemTotal = item.price * item.quantity;
            let extrasTotal = item.extraIngredients.length * 0.5; // Assuming each extra ingredient costs $0.5
            return acc + itemTotal + extrasTotal;
        }, 0);
        let totalCostContainer = document.getElementById('totalCounter');
        if (totalCostContainer) {
            totalCostContainer.innerText = `$${totalCost.toFixed(2)}`;
        }
    }

    // Wrap show functions to ensure they update the total cost
    function showCategories() {
        if (categories) categories.style.display = 'block';
        menuItemsSections.forEach(item => item.style.display = 'none');
        if (document.getElementById('startMenu')) document.getElementById('startMenu').style.display = 'none';
        if (document.getElementById('cartSection')) document.getElementById('cartSection').style.display = 'none';
        toggleCounterDisplay(true);
        updateTotalOnNav();
    }

    function showMenuItems(index) {
        if (categories) categories.style.display = 'none';
        if (document.getElementById('startMenu')) document.getElementById('startMenu').style.display = 'none';
        if (menuItemsSections[index]) menuItemsSections[index].style.display = 'block';
        toggleCounterDisplay(true);
        updateTotalOnNav();
    }

    function showCart() {
        document.getElementById('startMenu').style.display = 'none';
        if (categories) categories.style.display = 'none';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('cartSection').style.display = 'block';
        displayCartItems();
    }

    // Event listeners
    if (startButton) startButton.addEventListener('click', showCategories);
    categoryButtons.forEach((button, index) => button.addEventListener('click', () => showMenuItems(index)));
    backToCategoriesButtons.forEach(button => button.addEventListener('click', showCategories));
    document.querySelectorAll('.cart-btn').forEach(button => button.addEventListener('click', showCart));
    const homeButtons = document.querySelectorAll('.home-btn');
    homeButtons.forEach(button => button.addEventListener('click', showCategories));

    // Adding items to the cart
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-to-cart')) {
            let itemDetails = {
                name: document.querySelector('.menu-item-name').innerText,
                price: parseFloat(document.querySelector('.price-value').getAttribute('data-price')),
                quantity: parseInt(document.querySelector('#quantity').value || '1'),
                extraIngredients: Array.from(document.querySelectorAll('.extra-ingredients-section input[type=checkbox]:checked')).map(checkbox => checkbox.nextElementSibling.innerText),
                comments: document.querySelector('#comment').value
            };
            addToCart(itemDetails);
        }
    });

    // Modify cart and update display
    function addToCart(itemDetails) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(itemDetails);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
        updateTotalOnNav();
    }

    if (urlParams.get('showCart') === 'true') {
        showCart();
    }

    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Extras: ${item.extraIngredients.join(', ')}</p>
                <p>Comments: ${item.comments}</p>
                <button class="remove-item" data-index="${index}">Remove item</button>
            </div>
        `).join('');
        if (cart.length === 0) cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        else document.querySelectorAll('.remove-item').forEach(button => button.addEventListener('click', function() { removeFromCart(parseInt(this.getAttribute('data-index'))); }));
        updateTotalOnNav();
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }

    // Initial update
    updateTotalOnNav();
});



















