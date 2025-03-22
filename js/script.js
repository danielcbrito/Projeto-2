document.querySelector('.btn-abrir-menu').addEventListener('click', function() {
    document.querySelector('.menu-mobile').classList.toggle('abrir-menu');
    document.querySelector('.overlay-menu').classList.toggle('abrir-menu');
});
document.querySelector('.btn-fechar').addEventListener('click', function() {
    document.querySelector('.menu-mobile').classList.remove('abrir-menu');
    document.querySelector('.overlay-menu').classList.remove('abrir-menu');
});
