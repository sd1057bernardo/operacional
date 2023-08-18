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
  
    // Sort the items based on daysLeft in descending order
    items.sort((a, b) => b.daysLeft - a.daysLeft);
  
    items.forEach(function (item) {
      const li = document.createElement('li');
      const daysLeft = item.daysLeft;
  
      let colorClass = '';
  
      if (daysLeft < 0) {
        colorClass = 'expired';
      } else if (daysLeft <= 7) {
        colorClass = 'urgent';
      } else if (daysLeft <= 30) {
        colorClass = 'warning';
      }
  
      li.innerHTML = `<strong>${item.name}</strong> - ${item.date} (Days left: <span class="${colorClass}">${item.daysLeft}</span>)`;
      itemList.appendChild(li);
    });
  } 
  // Initial display of items
  displayItems();
});
