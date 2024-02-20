// Function to switch between sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.style.display = 'none';
    });
  
    // Show the requested section
    document.getElementById(sectionId).style.display = 'block';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the start button
    document.getElementById('startButton').addEventListener('click', () => {
      showSection('categorySection');
    });
  
    // Event listeners for category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
      button.addEventListener('click', () => {
        const menuId = button.getAttribute('data-category');
        showSection(menuId); // Show the menu items for the clicked category
      });
    });
  
    // Initial setup to show welcome screen
    showSection('welcomeScreen');
  });
  