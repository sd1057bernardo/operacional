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
  
    let items = JSON.parse(localStorage.getItem('items')) || [];
  
    // Sort the items based on dates in ascending order
    items.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    items.forEach(function (item, index) {
      const li = document.createElement('li');
      const daysLeft = item.daysLeft;
  
      let colorClass = '';
  
      if (daysLeft < 0) {
        colorClass = 'expired';
      } else if (daysLeft <= 7) {
        colorClass = 'urgent';
        li.classList.add('highlight'); // Add a class to highlight the <li> element
      } else if (daysLeft <= 30) {
        colorClass = 'warning';
      }
  
      li.innerHTML = `
        <strong>${item.name}</strong> - ${item.date} (Days left: <span class="${colorClass}">${item.daysLeft}</span>)
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
  
      itemList.appendChild(li);
    });
  
    // Attach event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', handleDelete);
    });
  }

  function handleDelete(event) {
    const index = event.target.getAttribute('data-index');
    let items = JSON.parse(localStorage.getItem('items')) || [];
    
    items.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('items', JSON.stringify(items));
    
    displayItems(); // Refresh the displayed items
  }
    
  // Initial display of items
  displayItems();
});
