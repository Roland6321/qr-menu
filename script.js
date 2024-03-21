document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');
    const counterContainer = document.querySelector('.order-total-counter'); // Counter container

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

        // Clear the stored total on page refresh to start fresh
    localStorage.setItem('totalCost', '0');
    updateCounterDisplay();

     // Event delegation for dynamically loaded "Add to Cart" buttons
    document.body.addEventListener('click', function(event) {
        if (event.target.matches('.add-to-cart')) {
                handleAddToCart.call(event.target, event);
         }
    });

    function handleAddToCart() {
        // Since this button is directly within the body and not deeply nested,
        // we don't need to use .closest() to find the nearest .menu-item ancestor.
        // Instead, directly query the relevant elements.
        let itemPrice = parseFloat(document.querySelector('.menu-item-price .price-value').getAttribute('data-price'));
        let quantity = parseInt(document.querySelector('.quantity-section input[type="number"]').value || '1');
        let extraCosts = Array.from(document.querySelectorAll('.extra-ingredients-section input[type="checkbox"]:checked'))
                              .reduce((acc, curr) => acc + parseFloat(curr.getAttribute('data-cost')), 0);
        
        let totalCost = parseFloat(localStorage.getItem('totalCost') || '0');
        totalCost += (itemPrice + extraCosts) * quantity;
    
        // Update LocalStorage and the counter
        localStorage.setItem('totalCost', totalCost.toString());
        updateCounterDisplay();
    }

    function updateCounterDisplay() {
        let totalCost = parseFloat(localStorage.getItem('totalCost') || '0');
        document.getElementById('totalCounter').textContent = `$${totalCost.toFixed(2)}`;
    }
});






