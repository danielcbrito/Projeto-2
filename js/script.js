document.querySelector('.btn-abrir-menu').addEventListener('click', function() {
    document.querySelector('.menu-mobile').classList.toggle('abrir-menu');
    document.querySelector('.overlay-menu').classList.toggle('abrir-menu');
});
document.querySelector('.btn-fechar').addEventListener('click', function() {
    document.querySelector('.menu-mobile').classList.remove('abrir-menu');
    document.querySelector('.overlay-menu').classList.remove('abrir-menu');
});

document.querySelector('.btn-abrir-menu').addEventListener('click', function() {
    document.querySelector('.menu-mobile').classList.toggle('abrir-menu');
    document.querySelector('.overlay-menu').classList.toggle('abrir-menu');
});
document.querySelector('.btn-fechar').addEventListener('click', function() {
    document.querySelector('.menu-mobile').classList.remove('abrir-menu');
    document.querySelector('.overlay-menu').classList.remove('abrir-menu');
});

document.addEventListener('DOMContentLoaded', function() {
    const btnMenu = document.getElementById('btn-menu');
    const menuMobile = document.getElementById('menu-mobile');
    const overlayMenu = document.getElementById('overlay-menu');
    const btnFecharMenu = document.querySelector('.btn-fechar-menu'); // Seleciona pela classe

    function toggleMenu() {
        menuMobile.classList.toggle('abrir');
        overlayMenu.classList.toggle('abrir');
        document.body.classList.toggle('menu-aberto'); // Adiciona ou remove classe no body
    }

    btnMenu.addEventListener('click', toggleMenu);

    overlayMenu.addEventListener('click', toggleMenu);

    btnFecharMenu.addEventListener('click', toggleMenu);
});