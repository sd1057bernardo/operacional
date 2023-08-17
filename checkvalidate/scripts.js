document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('item-form');
  const nameInput = document.getElementById('name');
  const dateInput = document.getElementById('date');
  const itemList = document.getElementById('item-list');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value;
    const date = dateInput.value;
    
    const daysLeft = calculateDaysLeft(date);

    // Retrieve existing items from localStorage or create an empty array
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push({ name, date, daysLeft });

    // Save the updated items array to localStorage
    localStorage.setItem('items', JSON.stringify(items));

    displayItems();

    // Clear input fields
    nameInput.value = '';
    dateInput.value = '';
  });

  function calculateDaysLeft(targetDate) {
    const today = new Date();
    const target = new Date(targetDate);
    const timeDifference = target - today;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
  }

  function displayItems() {
    itemList.innerHTML = '';

    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(function (item) {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.name}</strong> - ${item.date} (Days left: ${item.daysLeft})`;
      itemList.appendChild(li);
    });
  }

  // Initial display of items
  displayItems();
});
