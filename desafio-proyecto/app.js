const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciarCarrito = document.getElementById('vaciar-carrito');

const contadorCarrito = document.getElementById('contadorCarrito');

const precioTotal = document.getElementById('precioTotal');

const botonFiltrar = document.getElementById('filtrar');


let carrito = [];

document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage();
        actualizarCarrito();
    };
});

const mostrarProductos = (arrayProductos) => {

    arrayProductos.forEach((producto) => {

        const {
            id,
            nombre,
            precio,
            descripcion,
            img
        } = producto;

        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <img src=${img}>
        <h3>${nombre}</h3>
        <p>${descripcion}</p>
        <p class="precioProducto">Precio:$ ${precio}</p>
        <button id="agregar${id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `

        contenedorProductos.appendChild(div)

        const boton = document.getElementById(`agregar${id}`)
        boton.addEventListener('click', () => {
            agregarAlCarrito(id);
            toastr["success"](`el producto ${nombre} \n se agrego correctamente`, "Carrito");
            toastr.options = {
                "progressBar": true,
                "timeOut": "3000"
            }
        })
    });
}

const filtrarCategoria = (cat) => {

    let listaFiltrada = [];
    cat == 0 ? mostrarProductos(stockProductos) : listaFiltrada = stockProductos.filter(producto => producto.categoria == cat), mostrarProductos(listaFiltrada);

}


botonFiltrar.addEventListener('click', () => {

    let selector = document.getElementById("filtroCategoria");
    let valor = selector.value;
    contenedorProductos.innerHTML = ''
    filtrarCategoria(valor);
})

const agregarAlCarrito = (productoId) => {
    const existe = carrito.some(producto => producto.id === productoId)

    if (existe) {
        const prod = carrito.map(producto => {

            producto.id === productoId && producto.cantidad++;

        })
    } else {
        const item = stockProductos.find((prod) => prod.id === productoId);
        carrito.push(item);
    }
    actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {


    Swal.fire({
        title: 'Esta seguro?',
        text: 'Va a eliminar el producto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#099104',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const item = carrito.find((prod) => prod.id === prodId);
            const indice = carrito.indexOf(item);
            carrito.splice(indice, 1);
            guardarCarritoStorage(carrito);
            actualizarCarrito();
            toastr["success"](`el producto ${item.nombre} \n fue eliminado correctamente`, "Carrito");
            toastr.options = {
                "progressBar": true,
                "timeOut": "3000"
            }
        }
    })
};




botonVaciarCarrito.addEventListener('click', () => {
if (carrito.length != 0){
    Swal.fire({
        title: 'Esta seguro?',
        text: 'Va a eliminar todos los productos del carrito!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#099104',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            guardarCarritoStorage(carrito);
            actualizarCarrito();
            toastr["success"](`los productos fueron eliminados correctamente`, "Carrito");
            toastr.options = {
                "progressBar": true,
                "timeOut": "3000"
            }
        }
    })
}else {
    toastr["error"](`El carrito ya se encuentra vacio`, "Carrito");
    toastr.options = {
        "progressBar": true,
        "timeOut": "3000"
    }
}

});


const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach((prod) => {
        const {
            id: carritoId,
            nombre: carritoNombre,
            precio: carritoPrecio,
            cantidad: carritoCantidad,
            img: carritoImg
        } = prod;

        const div = document.createElement('div')
        div.classname = ('productoEnCarrito')
        div.innerHTML = `
        <img class= "img-carrito" src=${carritoImg}>
        <p>${carritoNombre}</p>
        <p>Precio: $${carritoPrecio}</p>
        <p>Cantidad: <span id="cantidad">${carritoCantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${carritoId})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div);
        guardarCarritoStorage(carrito);
    });
    contadorCarrito.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
}


const guardarCarritoStorage = (carritoDeCompras) => {
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))

}

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
}


mostrarProductos(stockProductos);