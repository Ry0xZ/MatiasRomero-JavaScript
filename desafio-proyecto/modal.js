const contenedorModal = document.getElementsByClassName('modal-contenedor')[0];
const abrirCarrito = document.getElementById('boton-carrito');
const cerrarCarrito = document.getElementById('carritoCerrar');
const modalCarrito = document.getElementsByClassName('modal-carrito')[0];


abrirCarrito.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active');
});

cerrarCarrito.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active');
});

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active');

});
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation();
});