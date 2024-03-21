document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let orderTotal = parseFloat(localStorage.getItem('orderTotal')) || 0;

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear current items
        orders.forEach((order, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <h3>${order.itemName} x${order.quantity}</h3>
                <p>Extras: ${order.extras.map(extra => `${extra.name} ($${extra.cost.toFixed(2)})`).join(', ')}</p>
                <p>Comment: ${order.comment}</p>
                <p>Total: $${order.itemTotal.toFixed(2)}</p>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartTotalSpan.innerText = `$${orderTotal.toFixed(2)}`;
    }

    window.removeItem = (index) => {
        orderTotal -= orders[index].itemTotal;
        orders.splice(index, 1); // Remove the item from the array
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('orderTotal', orderTotal.toString());
        updateCartDisplay(); // Refresh the cart display
    };

    updateCartDisplay();
});
