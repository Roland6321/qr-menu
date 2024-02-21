document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    const userPrompt = document.getElementById('userPrompt');

    startButton.addEventListener('click', () => {
        // Hide the start menu and show the user prompt
        startMenu.style.display = 'none';
        userPrompt.style.display = 'block';
    });
});
