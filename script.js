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

document.addEventListener('DOMContentLoaded', function() {
    // Function to clear existing extra ingredients
    function clearExtraIngredients() {
        const extraIngredientsDiv = document.getElementById('extraIngredients');
        extraIngredientsDiv.innerHTML = ''; // Clear existing content
    }

    // Function to add extra ingredient checkboxes dynamically
    function addExtraIngredient(name, price, id) {
        const extraIngredientsDiv = document.getElementById('extraIngredients');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.name = 'extraIngredient';
        checkbox.value = name;

        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = `${name} - ${price}`;

        extraIngredientsDiv.appendChild(checkbox);
        extraIngredientsDiv.appendChild(label);
        extraIngredientsDiv.appendChild(document.createElement('br'));
    }

    // Example item details (you would replace these with your actual item details)
    const items = {
        rugbrodMedSild: {
            name: 'Rugbrød med Sild',
            image: 'path/to/sild-image.jpg',
            description: 'Traditional rye bread with pickled herring.',
            extras: [
                {id: 'extra1', name: 'Extra Herring', price: '$2.00'},
                {id: 'extra2', name: 'Extra Rye Bread', price: '$1.50'}
            ]
        },
        rugbrodMedKartoffel: {
            name: 'Rugbrød med Kartoffel',
            image: 'path/to/kartoffel-image.jpg',
            description: 'Rye bread with potato and fresh chives.',
            extras: [
                {id: 'extra3', name: 'Extra Potato', price: '$2.00'},
                {id: 'extra4', name: 'Extra Chives', price: '$1.50'}
            ]
        }
    };

    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('id');
    const item = items[itemId];

    if (item) {
        document.getElementById('itemName').textContent = item.name;
        document.getElementById('itemImage').src = item.image;
        document.getElementById('itemImage').alt = item.name;
        document.getElementById('itemDescription').textContent = item.description;
        
        clearExtraIngredients(); // Clear any previously added extra ingredients
        item.extras.forEach(extra => addExtraIngredient(extra.name, extra.price, extra.id));
    }
});
