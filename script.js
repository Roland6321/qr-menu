document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');
    const counterContainer = document.querySelector('.order-total-counter');
    const urlParams = new URLSearchParams(window.location.search);

    function toggleCounterDisplay(show) {
        counterContainer.style.display = show ? 'block' : 'none';
    }

    const isMainPage = startButton !== null && categories !== null;
    toggleCounterDisplay(!isMainPage);

    // Moved calculateAndDisplayTotalCost definition to the top for clarity
    function calculateAndDisplayTotalCost() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCost = cart.reduce((total, item) => {
            return total + (item.price * item.quantity) + (item.extraIngredients.length * 0.5);
        }, 0);

        const totalCostContainer = document.getElementById('totalCounter');
        totalCostContainer.innerText = `$${totalCost.toFixed(2)}`;
    }

    // Call this function to update the counter whenever the user navigates
    function updateTotalOnNav() {
        calculateAndDisplayTotalCost();
    }

    // Ensures the functions are now calling updateTotalOnNav to refresh the total
    function showCategories() {
        categories.style.display = 'block';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('startMenu').style.display = 'none';
        document.getElementById('cartSection').style.display = 'none';
        toggleCounterDisplay(true);
        updateTotalOnNav(); // Ensure the counter updates here
    }

    function showMenuItems(index) {
        categories.style.display = 'none';
        document.getElementById('startMenu').style.display = 'none';
        menuItemsSections[index].style.display = 'block';
        toggleCounterDisplay(true);
        updateTotalOnNav(); // And here
    }

    function showCart() {
        document.getElementById('startMenu').style.display = 'none';
        categories.style.display = 'none';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('cartSection').style.display = 'block';
        displayCartItems(); // This already updates the counter via displayCartItems
    }

    // Simplifying the event listeners to attach navigation functions directly
    startButton.addEventListener('click', showCategories);
    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', () => showMenuItems(index));
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

    // This logic remains largely unchanged
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-to-cart')) {
            const itemName = e.target.closest('.menu-item').querySelector('.menu-item-name').innerText;
            const itemPrice = parseFloat(e.target.closest('.menu-item').querySelector('.price-value').getAttribute('data-price'));
            const quantity = parseInt(e.target.closest('.menu-item').querySelector('#quantity').value || '1');
            const comments = e.target.closest('.menu-item').querySelector('#comment').value;
            const extraIngredients = Array.from(e.target.closest('.menu-item').querySelectorAll('.extra-ingredients-section input[type=checkbox]:checked')).map(checkbox => checkbox.nextElementSibling.innerText);

            const itemDetails = { name: itemName, price: itemPrice, quantity, extraIngredients, comments };
            addToCart(itemDetails);
        }
    });

    function addToCart(itemDetails) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(itemDetails);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
        updateTotalOnNav(); // Ensure counter updates immediately after adding an item
    }

    if (urlParams.get('showCart') === 'true') showCart();

    // Integrated directly into displayCartItems
    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cartItems');
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

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        }
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                removeFromCart(parseInt(this.getAttribute('data-index')));
            });
        });
        updateTotalOnNav(); // Updates the counter as part of cart display
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems(); // This also updates the counter
    }

    // Called on page load and after every cart update
    updateTotalOnNav();
});




















