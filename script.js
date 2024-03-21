document.addEventListener('DOMContentLoaded', () => {
    // Initialize orderTotal at the beginning
    let orderTotal = parseFloat(localStorage.getItem('orderTotal')) || 0;
    
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');
    const counterContainer = document.querySelector('.order-total-counter'); // Counter container

    // Update counter function
    function updateCounter(total) {
        const counterContainer = document.querySelector('#totalCounter');
        if (counterContainer) counterContainer.textContent = `$${total.toFixed(2)}`;
    }

    // Call updateCounter at the start to reflect any saved total
    updateCounter(orderTotal);

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

    const cartButtons = document.querySelectorAll('.cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('body'); 
            const itemName = menuItem.querySelector('.menu-item-name').innerText;
            const basePrice = parseFloat(menuItem.querySelector('.price-value').getAttribute('data-price'));
            const quantity = parseInt(menuItem.querySelector('#quantity').value) || 1;
            const extraIngredients = menuItem.querySelectorAll('input[type="checkbox"]:checked');
            let extras = [];
            
            extraIngredients.forEach(ingredient => {
                extras.push({
                    name: ingredient.nextSibling.textContent.trim(),
                    cost: parseFloat(ingredient.getAttribute('data-cost'))
                });
            });
    
            const comment = menuItem.querySelector('#comment').value;
            
            let itemTotal = basePrice;
            extras.forEach(extra => itemTotal += extra.cost);
            itemTotal *= quantity;
    
            orderTotal += itemTotal;
            localStorage.setItem('orderTotal', orderTotal.toString());
    
            // Storing detailed order info
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push({
                itemName,
                basePrice,
                quantity,
                extras,
                comment,
                itemTotal
            });
            localStorage.setItem('orders', JSON.stringify(orders));
    
            updateCounter(orderTotal); // Update the counter with the new total
        });
    });
});






