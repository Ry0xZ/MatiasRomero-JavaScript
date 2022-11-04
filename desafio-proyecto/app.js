const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const modalContenedor = document.getElementsByClassName('modal-carrito')

const botonVaciarCarrito = document.getElementById('vaciar-carrito');

const botonContinuarCompra = document.getElementById('comprar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito');

const precioTotal = document.getElementById('precioTotal');

const botonFiltrar = document.getElementById('filtrar');

const activarFuncion = document.getElementById('activarFuncion')

const totalCompra = document.getElementById('totalProceso')

const formulario = document.getElementById('procesar-pago')


let carrito = [];


document.addEventListener('DOMContentLoaded', async () => {

    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage();
        actualizarCarrito();
    };

    arrayProductos = await obtenerProductos();
    mostrarProductos(arrayProductos)

    if (activarFuncion) {
        document.getElementById('activarFuncion').click(procesarPedido)
    }
});

const obtenerProductos = async () => {

    const response = await fetch('./stock.json');

    const producto = response.json();
    return producto
};


const mostrarProductos = async (arrayProductos) => {

    arrayProductos.forEach((producto) => {

        const {
            id,
            nombre,
            precio,
            descripcion,
            img
        } = producto;

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mt-3" style="width: 18rem;">
        <img src=${img} >
        <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">${descripcion}</p>
        <p class=" card-text precioProducto">Precio:$ ${precio}</p>
        <button id="agregar${id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        </div>
        </div>
        `
        if (contenedorProductos) {
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
        }
    });
}

const filtrarCategoria = async (cat) => {

    const productos = await obtenerProductos();
    let listaFiltrada = [];

    cat == 0 ? mostrarProductos(productos) : listaFiltrada = productos.filter(producto => producto.categoria == cat), mostrarProductos(listaFiltrada);

}

if (botonFiltrar) {
    botonFiltrar.addEventListener('click', () => {

        let selector = document.getElementById("filtroCategoria");
        let valor = selector.value;
        contenedorProductos.innerHTML = ''
        filtrarCategoria(valor);
    })
}


const agregarAlCarrito = async (productoId) => {
    const productos = await obtenerProductos();
    const existe = carrito.some(producto => producto.id === productoId)

    if (existe) {
        const prod = carrito.map(producto => {

            producto.id === productoId && producto.cantidad++;

        })
    } else {
        const item = productos.find((prod) => prod.id === productoId);
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
            if (activarFuncion) {
                document.getElementById('activarFuncion').click(procesarPedido)
            }
        }
    })
};




botonVaciarCarrito.addEventListener('click', () => {
    if (carrito.length != 0) {
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
                if (activarFuncion) {
                    document.getElementById('activarFuncion').click(procesarPedido)
                }
            }
        })
    } else {
        toastr["error"](`El carrito ya se encuentra vacio`, "Carrito");
        toastr.options = {
            "progressBar": true,
            "timeOut": "3000"
        }
    }

});

if (botonContinuarCompra) {
    botonContinuarCompra.addEventListener('click', () => {
        if (carrito.length != 0) {

            location.href = "compra.html"
            procesarPedido()

        } else {
            toastr["error"](`No hay productos en el carrito`, "Carrito");
            toastr.options = {
                "progressBar": true,
                "timeOut": "3000"
            }
        }
    });
}


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
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p class= "text-center text-danger ">¡Aun no agregaste nada!</p>`
    } else {

    }
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

const procesarPedido = () => {
    const listaCompra = document.querySelector('#lista-compra tbody')
    listaCompra.innerHTML = ""

    carrito.forEach((prod) => {

        const {
            id,
            nombre,
            precio,
            cantidad,
            img
        } = prod

        const row = document.createElement('tr')
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}" />
                </td>
                <td>${nombre}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>${precio * cantidad}</td>
`
        listaCompra.appendChild(row)
    })
    totalCompra.innerText = "$ " + carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
}


if (activarFuncion) {
    activarFuncion.addEventListener('click', procesarPedido)
}



const enviarPedido = (e) => {
    e.preventDefault()

    const persona = document.getElementById('persona').value
    const correo = document.getElementById('email.id').value

    if (correo === '' || persona === '') {
        Swal.fire({
            title: "¡Debes completar tu email y nombre!",
            text: "Rellena el formulario",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
    } else if (carrito != 0) {

        const btn = document.getElementById('button');

        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_06l9l6v';

        emailjs.sendForm(serviceID, templateID, formulario)
            .then(() => {
                btn.value = 'Finalizar compra';
                Swal.fire({
                    title: "¡Compra Realizada Correctamente!",
                    text: "Revise su casilla de correo para los detalles del pedido",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                })
            }, (err) => {
                btn.value = 'Finalizar compra';
                alert(JSON.stringify(err));
            });


        setTimeout(() => {
            spinner.classList.remove('d-flex')
            spinner.classList.add('d-none')
            formulario.reset()

            const alertExito = document.createElement('p')
            alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
            alertExito.textContent = 'Compra realizada correctamente'
            formulario.appendChild(alertExito)

            setTimeout(() => {
                alertExito.remove()
            }, 3000)


        }, 3000)
        
        setTimeout(() => {
            carrito.length = 0;
            guardarCarritoStorage(carrito);
            actualizarCarrito();
            if (activarFuncion) {
                document.getElementById('activarFuncion').click(procesarPedido)
            }
        }, 3000)
    } else {
        Swal.fire({
            title: "¡No tienes productos en el carrito!",
            text: "Agrega productos al carrito y luego procesa la compra",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
    }



}

if (formulario) {
    formulario.addEventListener('submit', enviarPedido)
}