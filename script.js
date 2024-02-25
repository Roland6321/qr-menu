document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const categories = document.getElementById('categories');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItemsSections = document.querySelectorAll('.menu-items');
    const backToCategoriesButtons = document.querySelectorAll('.backToCategories');

    function showCategories() {
        categories.style.display = 'block';
        menuItemsSections.forEach(item => item.style.display = 'none');
        document.getElementById('startMenu').style.display = 'none';
    }

    function showMenuItems(index) {
        categories.style.display = 'none';
        document.getElementById('startMenu').style.display = 'none';
        menuItemsSections[index].style.display = 'block';
    }

    function showMenuItemDetails(itemId) {
        menuItemsSections.forEach(section => section.style.display = 'none');
        document.getElementById(`${itemId}DetailsPage`).style.display = 'block';
    }

    startButton.addEventListener('click', showCategories);

    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', () => showMenuItems(index));
    });

    backToCategoriesButtons.forEach(button => {
        button.addEventListener('click', showCategories);
    });

    document.querySelectorAll('.item-cta').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.closest('.menu-item').getAttribute('data-item-id');
            showMenuItemDetails(itemId);
        });
    });

    document.querySelectorAll('.backToMenu').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.menu-item-details').forEach(detailPage => detailPage.style.display = 'none');
            showCategories(); // or showMenuItems(index) if you want to go back to the specific category
        });
    });
});
