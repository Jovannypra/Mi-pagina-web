// Obtener el contenedor
const contenedor = document.querySelector('.agua');

// Obtener el elemento span dentro del contenedor
const span2 = contenedor.querySelector('span:nth-child(2)');

// Animación utilizando anime.js
anime({
    targets: span2,
    duration: 4000,
    easing: 'easeInOutSine',
    keyframes: [
        { clipPath: 'polygon(0% 45%, 15% 44%, 32% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 60%, 16% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 45%, 15% 44%, 32% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%)' }
    ],
    direction: 'alternate',
    loop: true
});