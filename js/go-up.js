
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