class Producto {
    constructor(id, nombre, precio, categoria) {
        this.id = id,
            this.nombre = nombre,
            this.precio = Number(precio),
            this.categoria = categoria
    }
}

const arrayProductos = [];

const producto1 = new Producto(1, 'Samsung F24T35 led 24', 55230, 'Monitor');
const producto2 = new Producto(7, 'Logitech G Series Lightspeed G502 negro', 14049, 'Mouse');
const producto3 = new Producto(6, 'Logitech Serie G Prodigy G213 QWERTY RGB', 9390, 'Teclado');
const producto4 = new Producto(2, 'Philips V 193V5LHSB2 LCD 18.5', 32499, 'Monitor');
const producto5 = new Producto(8, 'Razer DeathAdder Essential negro', 5994, 'Mouse');
const producto6 = new Producto(3, 'Samsung Odyssey G3 F24G35T LCD 24', 60300, 'Monitor');
const producto7 = new Producto(4, 'HyperX Alloy Origins 60 QWERTY RGB', 13199, 'Teclado');
const producto8 = new Producto(5, 'Redragon Shrapnel K589RGB QWERTY RGB', 9799, 'Teclado');
const producto9 = new Producto(9, 'Redragon Griffin M607 blanco', 2899, 'Mouse');

arrayProductos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9);



const monitores = arrayProductos.filter(producto => producto.categoria.includes('Monitor'));
const mouses = arrayProductos.filter(producto => producto.categoria.includes('Mouse'));
const teclados = arrayProductos.filter(producto => producto.categoria.includes('Teclado'));




const saludar = () => {
    alert("Hola bienvenido/a a RxStore");
    let nombre = prompt("Ingrese su nombre de usuario");
    while (nombre === "") {
        nombre = prompt("Ingrese su nombre de usuario");
    }
    alert("Bienvenido/a " + nombre);
}


const mostrarListaMonitores = () => {
    const array = [];
    monitores.forEach((producto, i) => array.push((i + 1) + ' ' + producto.nombre + '  $' + producto.precio));
    alert('Lista de Mouses: ' + '\n' + array.join('\n'));
}

const mostrarListaMouses = () => {
    const array = [];
    mouses.forEach((producto, i) => array.push((i + 1) + ' ' + producto.nombre + '  $' + producto.precio));
    alert('Lista de Mouses: ' + '\n' + array.join('\n'));
}

const mostrarListaTeclados = () => {
    const array = [];
    teclados.forEach((producto, i) => array.push((i + 1) + ' ' + producto.nombre + '  $' + producto.precio));
    alert('Lista de Teclados: ' + '\n' + array.join('\n'));
}




const mostrarCategorias = () => {
    let productoId;
    do {
        productoId = prompt("Que Producto desea adquirir? : \n(1) Monitor\n(2) Teclado\n(3 ) Mouse")
    } while (productoId != 1 && productoId != 2 && productoId != 3)

    switch (productoId) {
        case "1":
            return "Monitor";
        case "2":
            return "Teclado";
        case "3":
            return "Mouse";
    }
}

const procesarCompra = () => {

    let productoElegido;
    let categoria = mostrarCategorias();

    if (categoria === "Monitor") {
        mostrarListaMonitores();
        productoElegido = seleccionarProducto(monitores);
    } else if (categoria === "Teclado") {
        mostrarListaTeclados();
        productoElegido = seleccionarProducto(teclados);
    } else {
        mostrarListaMouses();
        productoElegido = seleccionarProducto(mouses);
    }
    let divisa = seleccionarDivisas();
    let precioFinal = calcularEnvio(Math.round(validarDivisa(divisa, productoElegido.precio)), divisa);
    cobrarProducto(productoElegido.nombre, precioFinal, divisa);
}


const seleccionarProducto = (productos) => {
    let numero = Number(prompt("Que Producto desea adquirir?"));
    let productoElegido = productos[numero - 1]
    alert("Usted eligio: " + '\n' + productoElegido.nombre + '  $' + productoElegido.precio)
    return productoElegido
}

const seleccionarDivisas = () => {
    let divisa;
    do {
        divisa = prompt("Con que tipo de moneda desea abonar? : \n(1) Dolares\n(2) Pesos")
    } while (divisa != 1 && divisa != 2)
    return divisa;
}

const validarDivisa = (valorDivisa, precio) => {
    switch (valorDivisa) {
        case "1":
            return (precio / 290);
        default:
            return precio;
    }
}

const calcularEnvio = (total, divisa) => {
    let confirmacion = confirm("¿Querés envío a domicilio?");
    switch (divisa) {
        case "2":
            if (confirmacion && total >= 4000) {
                alert("Tenés envio gratis. El total de tu compra es $" + total);
            } else if (confirmacion && total < 4000 && total != 0) {
                total = total + 700;
                alert("El envío cuesta $700. El total de tu compra es $" + total);
            } else {
                alert("El total de tu compra es $" + total);
            }
            return total;
        case "1":
            if (confirmacion && total >= 14) {
                alert("Tenés envio gratis. El total de tu compra es US$" + total);
            } else if (confirmacion && total < 14 && total != 0) {
                total = total + 2;
                alert("El envío cuesta $700. El total de tu compra es US$" + total);
            } else {
                alert("El total de tu compra es US$" + total);
            }
            return total;
    }
}

const cobrarProducto = (nombre, precio, divisa) => {
    let pago = 0;
    switch (divisa) {
        case "2":
            alert("Usted eligio : " + nombre.toUpperCase() + ".\nEl precio es de $" + precio);
            pago = prompt("Cual es el saldo de su cuenta?");

            if (precio < pago || precio == pago) {
                alert("en su cuenta le quedan $" + (pago - precio) + "\nPago Efectuado, nos contactaremos a la brevedad");
            } else {
                alert("Saldo insuficiente");
            }
            break;
        case "1":
            alert("Usted eligio : " + nombre.toUpperCase() + ".\nEl precio es de US$" + precio);
            pago = prompt("Cual es el saldo de su cuenta?");

            if (precio < pago || precio == pago) {
                alert("en su cuenta le quedan US$" + (pago - precio) + "\nPago Efectuado, nos contactaremos a la brevedad");
            } else {
                alert("Saldo insuficiente");
            }
            break;
    }
}


saludar();
procesarCompra();