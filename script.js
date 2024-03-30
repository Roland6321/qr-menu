document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');
    const counterContainer = document.querySelector('.order-total-counter');
    const urlParams = new URLSearchParams(window.location.search);

    // Adjusted function to toggle the display of the counter based on page context.
    function toggleCounterDisplay(show) {
        if (counterContainer) { // Check if the container exists to avoid null reference errors.
            counterContainer.style.display = show ? 'block' : 'none';
        }
    }

    // Determine if we are on a main page that requires the counter to be hidden initially.
    const isMainPage = startButton !== null && categories !== null;
    toggleCounterDisplay(!isMainPage); // Show the counter on individual menu item pages by default.

    function showCategories() {
        if (categories) categories.style.display = 'block';
        menuItemsSections.forEach(item => item.style.display = 'none');
        if (document.getElementById('startMenu')) document.getElementById('startMenu').style.display = 'none';
        if (document.getElementById('cartSection')) document.getElementById('cartSection').style.display = 'none';
        toggleCounterDisplay(true);
    }

    function showMenuItems(index) {
        if (categories) categories.style.display = 'none';
        if (document.getElementById('startMenu')) document.getElementById('startMenu').style.display = 'none';
        if (menuItemsSections[index]) menuItemsSections[index].style.display = 'block';
        toggleCounterDisplay(true);
    }

    function showCart() {
        document.getElementById('startMenu').style.display = 'none';
        if (categories) categories.style.display = 'none';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('cartSection').style.display = 'block';
        displayCartItems(); // Ensure cart items are displayed whenever the cart is shown.
    }

    if (startButton) startButton.addEventListener('click', showCategories);
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

    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-to-cart')) {
            const itemName = document.querySelector('.menu-item-name').innerText;
            const itemPrice = parseFloat(document.querySelector('.price-value').getAttribute('data-price'));
            const quantity = parseInt(document.querySelector('#quantity').value || 1);
            const comments = document.querySelector('#comment').value;
            let extraIngredients = [];
            document.querySelectorAll('.extra-ingredients-section input[type=checkbox]:checked').forEach(checkbox => {
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
        }
    });

    function addToCart(itemDetails) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(itemDetails);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
        calculateAndDisplayTotalCost(cart); // Recalculate the total cost after adding an item
    }
    

    if (urlParams.get('showCart') === 'true') {
        showCart();
        displayCartItems();
    }

    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItemsContainer = document.getElementById('cartItems');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
    
            cart.forEach((item, index) => {
                let itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Extras: ${item.extraIngredients.join(', ')}</p>
                    <p>Comments: ${item.comments}</p>
                    <button class="remove-item" data-index="${index}">Remove item</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
    
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            } else {
                calculateAndDisplayTotalCost(cart);
                displaySumTotal(); // Call to display the sum total on the Cart page
            }
        }
    
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                removeFromCart(parseInt(this.getAttribute('data-index')));
            });
        });
    }
    
    function displaySumTotal() {
        let totalCost = document.getElementById('totalCounter').innerText; // Get the total cost
        let cartSection = document.getElementById('cartSection');
        let existingTotalContainer = document.getElementById('cartPageTotalContainer');
    
        if (existingTotalContainer) {
            // If it exists, just update the text
            existingTotalContainer.innerHTML = `<strong>Sum total: ${totalCost}</strong>`;
        } else {
            // If not, create it and append to the cart section
            let cartPageTotalContainer = document.createElement('div');
            cartPageTotalContainer.setAttribute('id', 'cartPageTotalContainer');
            cartPageTotalContainer.style.marginTop = '20px'; // Add a little space above the total for clarity
            cartPageTotalContainer.innerHTML = `<strong>Sum total: ${totalCost}</strong>`;
            cartSection.appendChild(cartPageTotalContainer);
        }
    }   

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }

    function calculateAndDisplayTotalCost(cart) {
        let totalCost = 0;

        cart.forEach(item => {
            let itemTotal = item.price * item.quantity;
            let extrasTotal = item.extraIngredients.length * 0.5; // Assuming each extra ingredient costs $0.5
            itemTotal += extrasTotal;
            totalCost += itemTotal;
        });

        let totalCostContainer = document.getElementById('totalCounter');
        if (totalCostContainer) {
            totalCostContainer.innerText = `$${totalCost.toFixed(2)}`;
        }
    }

    displayCartItems();
});














