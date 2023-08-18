document.addEventListener('DOMContentLoaded', function () {
  const btn1 = document.getElementById('btn1');
  const btn2 = document.getElementById('btn2');
  const btn3 = document.getElementById('btn3');

  btn1.addEventListener('click', function () {
    window.location.href = '/checkvalidate/';
  });

  btn2.addEventListener('click', function () {
    window.location.href = '/imprimirp';
  });

  btn3.addEventListener('click', function () {
    window.location.href = '/imprimirg';
  });
});
