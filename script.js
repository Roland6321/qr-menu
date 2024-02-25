document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');

    // Function to show the categories page
    function showCategories() {
        categories.style.display = 'block';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('startMenu').style.display = 'none';
    }

    // Function to show menu items for a specific category
    function showMenuItems(index) {
        categories.style.display = 'none';
        document.getElementById('startMenu').style.display = 'none';
        menuItemsSections[index].style.display = 'block';
    }

    startButton.addEventListener('click', () => {
        showCategories();
    });

    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showMenuItems(index);
        });
    });

    backToCategoriesButtons.forEach(button => {
        button.addEventListener('click', () => {
            showCategories();
        });
    });
});

    // Updated part for displaying item details with additional features
    function displayItemDetailsPopup(itemId) {
        const itemDetails = fetchItemDetails(itemId); // Fetch item details
        
        // Assuming you have a div with the id 'itemDetailsPopup' for the popup content
        const popupElement = document.getElementById('itemDetailsPopup');
        popupElement.innerHTML = `
            <h3>${itemDetails.name}</h3>
            <img src="${itemDetails.image}" alt="${itemDetails.name}">
            <p>${itemDetails.description}</p>
            <p>Price: $${itemDetails.price}</p>
            <label for="extra-ingredients">Choose extra ingredients:</label>
            <select id="extra-ingredients" multiple>
                ${itemDetails.extraIngredients.map(ingredient => `<option value="${ingredient.name}" data-price="${ingredient.price}">${ingredient.name} - $${ingredient.price}</option>`).join('')}
            </select>
            <label for="comments">Comments:</label>
            <input type="text" id="comments" name="comments">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" value="1" min="1">
            <button id="addToBasket">Add to Basket</button>
        `;

        // Display the popup
        popupElement.style.display = 'block';

        // Event listener for the Add to Basket button
        document.getElementById('addToBasket').addEventListener('click', () => addToBasket(itemId));
    }

    // Example function to fetch item details
    function fetchItemDetails(itemId) {
        // This is a simplified example. In a real application, you might fetch this data from a server.
        if (itemId === "sild01") {
            return {
                name: "Rugbrød med Sild - Traditional rye bread with pickled herring",
                image: "url_to_image_of_sild.jpg",
                description: "A detailed description of Rugbrød med Sild...",
                price: 10, // Base price of the item
                extraIngredients: [
                    {name: "Extra Cheese", price: 2},
                    {name: "Bacon", price: 3},
                    // Add more extras as needed
                ]
            };
        } else if (itemId === "kartoffel02") {
            return {
                name: "Rugbrød med Kartoffel - Rye bread with potato and fresh chives",
                image: "url_to_image_of_kartoffel.jpg",
                description: "A detailed description of Rugbrød med Kartoffel...",
                price: 9, // Base price of the item
                extraIngredients: [
                    {name: "Sour Cream", price: 1.5},
                    {name: "Chive", price: 1},
                    // Add more extras as needed
                ]
            };
        }
        // Add more conditions for other items or a default return
    }

    // Function to add item to the basket
    function addToBasket(itemId) {
        const itemDetails = fetchItemDetails(itemId); // Fetch item details again or pass them as an argument
        const quantity = parseInt(document.getElementById('quantity').value);
        const comments = document.getElementById('comments').value;
        const selectedExtras = Array.from(document.getElementById('extra-ingredients').selectedOptions).map(option => ({
            name: option.value,
            price: parseFloat(option.getAttribute('data-price'))
        }));

        const itemTotalPrice = calculateTotalPrice(itemDetails.price, selectedExtras, quantity);

        const basketItem = {
            itemId,
            quantity,
            comments,
            extras: selectedExtras,
            totalPrice: itemTotalPrice
        };

        // Add basketItem to your basket storage/logic here
        console.log('Added to basket:', basketItem);

        // Close the popup or indicate success to the user
        document.getElementById('itemDetailsPopup').style.display = 'none';
    }

    // Calculate the total price for an item, including extras and quantity
    function calculateTotalPrice(basePrice, extras, quantity) {
        const extrasTotalPrice = extras.reduce((total, extra) => total + extra.price, 0);
        return (basePrice + extrasTotalPrice) * quantity;
    }
