document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoriesButton = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-items');

    // Function to show only the categories page
    function showCategories() {
        categories.style.display = 'block';
        document.getElementById('startMenu').style.display = 'none';
        menuItems.forEach(item => item.style.display = 'none');
    }

    // Function to show menu items for a specific category
    function showMenuItems(index) {
        categories.style.display = 'none';
        menuItems.forEach((item, idx) => {
            if (index === idx) {
                item.style.display = 'block';
                // Append a back button if not already present
                if (!item.querySelector('.back-btn')) {
                    const backButton = document.createElement('button');
                    backButton.textContent = 'Back';
                    backButton.classList.add('back-btn');
                    backButton.onclick = () => showCategories();
                    item.appendChild(backButton);
                }
            } else {
                item.style.display = 'none';
            }
        });
    }

    startButton.addEventListener('click', () => {
        categories.style.display = 'block';
        document.getElementById('startMenu').style.display = 'none';
    });

    categoriesButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            showMenuItems(index);
        });
    });
});
