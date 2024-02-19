function openOptionsModal(itemName) {
    document.getElementById('menuItemName').innerText = itemName;
    document.getElementById('optionsModal').style.display = 'block';
}

function closeOptionsModal() {
    document.getElementById('optionsModal').style.display = 'none';
}

function submitOptions() {
    var itemName = document.getElementById('menuItemName').innerText;
    var extras = document.getElementById('extraOptions').value;
    var comment = document.getElementById('comment').value;
    alert('You ordered ' + itemName + ' with ' + extras + '. Comment: ' + comment);
    closeOptionsModal();
}

document.getElementById('startButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor action
    document.getElementById('menuSection').classList.remove('hidden');
    document.getElementById('menuSection').classList.add('visible');
});


