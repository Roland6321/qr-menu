document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    const categories = document.getElementById('categories');

    startButton.addEventListener('click', () => {
        // Hide the start menu and show the user prompt
        startMenu.style.display = 'none';
        categories.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            console.log('Category ' + (index + 1) + ' button clicked');
            // Here you can add functionality to navigate to the category's menu page
        });
    });
});
