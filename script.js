document.addEventListener('DOMContentLoaded', function () {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
  
    btn1.addEventListener('click', function () {
      animateButton(btn1);
    });
  
    btn2.addEventListener('click', function () {
      animateButton(btn2);
    });
  
    btn3.addEventListener('click', function () {
      animateButton(btn3);
    });
  
    function animateButton(button) {
      button.classList.add('animated');
  
      setTimeout(() => {
        button.classList.remove('animated');
      }, 1000);
    }
  });
  