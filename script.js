document.addEventListener('DOMContentLoaded', () => {
    // Session-based logic for clearing the cart
    if (!sessionStorage.getItem('sessionTimestamp')) {
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.removeItem('orderComment');
        sessionStorage.setItem('sessionTimestamp', new Date().getTime());
    }

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
        displayCartItems();
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
        if (e.target.classList.contains('quantity-btn')) {
            const quantityDisplay = document.querySelector('.quantity-value');
            let quantity = parseInt(quantityDisplay.textContent, 10);

            if (e.target.classList.contains('increase') && quantityDisplay) {
                quantityDisplay.textContent = quantity + 1;
            } else if (e.target.classList.contains('decrease') && quantity > 1 && quantityDisplay) {
                quantityDisplay.textContent = quantity - 1;
            }
        }

        if (e.target && e.target.classList.contains('add-to-cart')) {
            const itemName = document.querySelector('.menu-item-name').innerText;
            const itemPrice = parseFloat(document.querySelector('.price-value').getAttribute('data-price'));
            // Adjusted to use the new quantity selector
            const quantityDisplay = document.querySelector('.quantity-value');
            const quantity = parseInt(quantityDisplay.textContent, 10);
            let extraIngredients = [];
            document.querySelectorAll('.extra-ingredients-section input[type=checkbox]:checked').forEach(checkbox => {
                extraIngredients.push({
                    name: checkbox.nextElementSibling.innerText,
                    dataCost: parseFloat(checkbox.getAttribute('data-cost'))
                });
            });

            const itemDetails = {
                name: itemName,
                price: itemPrice,
                quantity: quantity,
                extraIngredients: extraIngredients,
            };

            addToCart(itemDetails);
        }
    });

    function addToCart(itemDetails) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(itemDetails);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
        calculateAndDisplayTotalCost();
    }

    if (urlParams.get('showCart') === 'true') {
        showCart();
    }

    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = '';
        
        cart.forEach((item, index) => {
            let itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Extras: ${item.extraIngredients.map(extra => extra.name).join(', ')}</p>
                <p>Comments: ${item.comments}</p>
                <button class="remove-item" data-index="${index}">Remove item</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            calculateAndDisplayTotalCost();
        }

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                removeFromCart(parseInt(this.getAttribute('data-index')));
            });
        });
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }

    function calculateAndDisplayTotalCost() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalCost = 0;
        cart.forEach(item => {
            let itemTotal = item.price * item.quantity;
            let extrasTotal = item.extraIngredients.reduce((total, extra) => total + (extra.dataCost * item.quantity), 0);
            itemTotal += extrasTotal;
            totalCost += itemTotal;
        });

        let totalCostContainer = document.getElementById('totalCounter');
        if (totalCostContainer) {
            totalCostContainer.innerText = `$${totalCost.toFixed(2)}`;
        }

        let totalSumCounter = document.getElementById('totalSumCounter');
        if (totalSumCounter) {
            totalSumCounter.innerText = `Total: $${totalCost.toFixed(2)}`;
        }
    }

    // Ensure counter updates when the page fully loads and on navigating back/forward
    window.onload = calculateAndDisplayTotalCost;
    window.onpageshow = function(event) {
        if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
            calculateAndDisplayTotalCost();
        }
    };

    // Define the contact form fields and buttons
    const dineInButton = document.getElementById('dineInOption');
    const takeAwayButton = document.getElementById('takeAwayOption');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const tableNumberInput = document.getElementById('tableNumber');

    // Initialize buttons to not-selected state
    dineInButton.classList.add('not-selected');
    takeAwayButton.classList.add('not-selected');

    // Function to enable the contact form fields
    function enableContactForm(excludeTableNumber) {
        nameInput.disabled = false;
        phoneInput.disabled = false;
        confirmButton.disabled = false; // Assume confirmButton is correctly selected
        tableNumberInput.disabled = excludeTableNumber ? true : false;
    }

    // Event listeners for dine in and take away buttons
    dineInButton.addEventListener('click', function() {
        enableContactForm(false);
        localStorage.setItem('diningOption', 'dineIn');
        this.classList.add('selected');
        this.classList.remove('not-selected');
        takeAwayButton.classList.remove('selected');
        takeAwayButton.classList.add('not-selected');
    });

    takeAwayButton.addEventListener('click', function() {
        enableContactForm(true);
        localStorage.setItem('diningOption', 'takeAway');
        this.classList.add('selected');
        this.classList.remove('not-selected');
        dineInButton.classList.remove('selected');
        dineInButton.classList.add('not-selected');
    });

    const confirmButton = document.querySelector('.confirm-payment-info');
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            document.getElementById('paymentSection').style.display = 'none';
            document.getElementById('paymentMethodSection').style.display = 'block';
        });
    }

    document.querySelector('.back-to-contact-info')?.addEventListener('click', () => {
        document.getElementById('paymentMethodSection').style.display = 'none';
        document.getElementById('paymentSection').style.display = 'block';
    });

    document.querySelector('.return-to-cart-btn')?.addEventListener('click', function() {
        document.getElementById('paymentSection').style.display = 'none';
        document.getElementById('cartSection').style.display = 'block';
    });

    document.querySelector('.proceed-to-payment-btn')?.addEventListener('click', function() {
        // Save the comment to localStorage
        const orderComment = document.getElementById('orderComment').value;
        localStorage.setItem('orderComment', orderComment);
    
        // Proceed to the payment section
        document.getElementById('cartSection').style.display = 'none';
        document.getElementById('paymentSection').style.display = 'block';
    });

     // PAGE 6 FOR THE API INTEGRATION 
     // Placeholder for future payment processing logic
    document.querySelectorAll('.payment-option').forEach(button => {
        button.addEventListener('click', (e) => {
            // Placeholder for future payment processing logic
            console.log(`${e.target.textContent.trim()} payment option selected.`);
        });
    });
});




























