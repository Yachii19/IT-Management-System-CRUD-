const headerEl = document.querySelector('.header');
const nameEl = document.querySelector('.name');
const navEls = document.querySelectorAll('.navigation-link');

export function headerScrollEffect() {
   
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 80) {
            headerEl.classList.add('header-scroll');
            nameEl.classList.add('name-scroll');
            navEls.forEach(link => link.classList.add('navigation-scroll'));
        } else if (window.scrollY < 80) {
            headerEl.classList.remove('header-scroll');
            nameEl.classList.remove('name-scroll');
            navEls.forEach(link => link.classList.remove('navigation-scroll'));
        }
    })
};