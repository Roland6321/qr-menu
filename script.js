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

    toggleCounterDisplay(false);

    function showCategories() {
        categories.style.display = 'block';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('startMenu').style.display = 'none';
        document.getElementById('cartSection').style.display = 'none';
        toggleCounterDisplay(true);
    }

    function showMenuItems(index) {
        categories.style.display = 'none';
        document.getElementById('startMenu').style.display = 'none';
        menuItemsSections[index].style.display = 'block';
        toggleCounterDisplay(true);
    }

    function showCart() {
        document.getElementById('startMenu').style.display = 'none';
        categories.style.display = 'none';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('cartSection').style.display = 'block';
        displayCartItems(); // Ensure cart items are displayed whenever the cart is shown.
    }

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

    // Handle add to cart action
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-to-cart')) {
            const itemName = document.querySelector('.menu-item-name').innerText;
            const itemPrice = parseFloat(document.querySelector('.price-value').getAttribute('data-price'));
            const quantity = parseInt(document.querySelector('#quantity').value || 1);
            const comments = document.querySelector('#comment').value;
            let extraIngredients = [];
            document.querySelectorAll('.extra-ingredients-section input[type=checkbox]:checked').forEach(checkbox => {
                const extraCost = checkbox.getAttribute('data-cost');
                const extraName = checkbox.nextElementSibling.innerText;
                extraIngredients.push({name: extraName, cost: extraCost});
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
    }

    if (urlParams.get('showCart') === 'true') {
        showCart();
        displayCartItems();
    }

    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItemsContainer = document.getElementById('cartItems');
        let totalAmount = 0;

        cartItemsContainer.innerHTML = '';

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            item.extraIngredients.forEach(extra => {
                itemTotal += parseFloat(extra.cost) * item.quantity;
            });

            let itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Extras: ${item.extraIngredients.map(ing => ing.name).join(', ')}</p>
                <p>Comments: ${item.comments}</p>
                <button class="remove-item" data-index="${index}">Remove item</button>
            `;
            cartItemsContainer.appendChild(itemElement);

            totalAmount += itemTotal;
        });

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            document.getElementById('totalCounter').textContent = `$${totalAmount.toFixed(2)}`;
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
        displayCartItems(); // This will recalculate and update the total
    }

    displayCartItems(); // Automatically display cart items on page load
});











