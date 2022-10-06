const contenedorProductos =  document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciarCarrito = document.getElementById('vaciar-carrito');

const contadorCarrito = document.getElementById('contadorCarrito');

const precioTotal = document.getElementById('precioTotal');

const botonFiltrar = document.getElementById('filtrar');


let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    
    
    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage();
        actualizarCarrito ();
    };
});

const mostrarProductos = (arrayProductos) =>{
    
    arrayProductos.forEach((producto) => {
        
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <img src=${producto.img}>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precioProducto">Precio:$ ${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        
        contenedorProductos.appendChild(div)
        
        const boton = document.getElementById(`agregar${producto.id}`)
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
        })
    });
}

const filtrarCategoria = (cat) =>{

if (cat == 0) {

    mostrarProductos(stockProductos);

} else {

    let listaFiltrada = stockProductos.filter(producto => producto.categoria == cat );
    mostrarProductos(listaFiltrada);
}
}


botonFiltrar.addEventListener ('click', () => {

    let selector = document.getElementById("filtroCategoria");
    let valor = selector.value;
    contenedorProductos.innerHTML = ''
    filtrarCategoria(valor);
})

const agregarAlCarrito = (productoId) => {
    const existe = carrito.some(producto => producto.id === productoId)

    if (existe) {
        const prod = carrito.map(producto =>{
            if (producto.id === productoId) {
                producto.cantidad++
            }
        })
    } else {
        const item =  stockProductos.find((prod) => prod.id === productoId);
        carrito.push(item);
    }
    actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice,1);
    guardarCarritoStorage(carrito);
    actualizarCarrito();

};

botonVaciarCarrito.addEventListener('click', () => {
    carrito.length = 0;
    guardarCarritoStorage(carrito);
    actualizarCarrito();
});


const actualizarCarrito = () => {
    contenedorCarrito.innerHTML ="";

    carrito.forEach ((prod) => {
        const div = document.createElement('div')
        div.classname = ('productoEnCarrito')
        div.innerHTML = `
        <img class= "img-carrito" src=${prod.img}>
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div);
        guardarCarritoStorage(carrito);
    });
    contadorCarrito.innerText =  carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.precio * prod.cantidad, 0);
}


const guardarCarritoStorage = (carritoDeCompras) => {
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))

}

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
}



mostrarProductos(stockProductos);