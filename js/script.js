import App from './product.js';
import './shoppingListModal.js';
import './menuBAr.js';

// Selectors
const main = document.querySelector('.main');

App.renderAllProducts();

main.addEventListener('click', function (e) {
  const isclickedOnBtns = e.target.closest('.product-buttons');
  const product = e.target.closest('.product');

  // Check if user click on product and product is available
  if (
    !product ||
    product.classList.contains('product--not-available') ||
    isclickedOnBtns
  )
    return;

  App.openModal(product);
});

//Go Up button
const goUpButton = document.getElementById('goUp');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        goUpButton.style.display = 'flex';
    } else {
        goUpButton.style.display = 'none';
    }

    if (scrollTop > lastScrollTop) {
        goUpButton.classList.remove('slide-down');
        goUpButton.classList.add('slide-up');
    } else {
        goUpButton.classList.remove('slide-up');
        goUpButton.classList.add('slide-down');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

goUpButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});