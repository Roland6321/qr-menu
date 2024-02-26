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

document.addEventListener('DOMContentLoaded', () => {
    // Consolidate your existing code here

    // Show detail page for Menu Item 1
    document.querySelector('.selectItem1').addEventListener('click', () => {
        document.getElementById('smorrebrodMenu').style.display = 'none';
        document.getElementById('detailPageItem1').style.display = 'block';
    });

    // Show detail page for Menu Item 2
    document.querySelector('.selectItem2').addEventListener('click', () => {
        document.getElementById('smorrebrodMenu').style.display = 'none';
        document.getElementById('detailPageItem2').style.display = 'block';
    });

    // Back to Menu from Detail Page
    document.querySelectorAll('.backToMenu').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.detail-page').forEach(page => {
                page.style.display = 'none'; // Hide all detail pages
            });
            document.getElementById('smorrebrodMenu').style.display = 'block'; // Show the menu items again
        });
    });
});

