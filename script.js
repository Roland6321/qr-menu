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
