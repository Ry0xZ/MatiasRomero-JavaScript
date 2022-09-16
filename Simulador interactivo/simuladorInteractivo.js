function saludar() {
    alert("Hola bienvenido/a a RxStore");
    let nombre = prompt("Ingrese su nombre de usuario");
    while (nombre === "") {
        nombre = prompt("Ingrese su nombre de usuario");
    }
    alert("Bienvenido/a " + nombre);
}

function mostrarProductos() {
    let productoId;

    do {
        productoId = prompt("Que Producto desea adquirir? : \n(1) Monitor\n(2) Teclado\n(3 ) Mouse\n(4) CPU")
    } while (productoId != 1 && productoId != 2 && productoId != 3 && productoId != 4)

    switch (productoId) {
        case "1":
            return "Monitor";
        case "2":
            return "Teclado";
        case "3":
            return "Mouse";
        case "4":
            return "CPU";
    }
}

function divisas() {
    let divisa;
    do {
        divisa = prompt("Con que tipo de moneda desea abonar? : \n(1) Dolares\n(2) Pesos")
    } while (divisa != 1 && divisa != 2)
    return divisa;
}

function validarDivisa(valorDivisa, precio) {
    switch (valorDivisa) {
        case "1":
            return (precio / 290);
        default:
            return precio;
    }
}


function validarPrecio(nombre) {
    if (nombre === "Monitor") {
        return 55230;
    } else if (nombre === "Teclado") {
        return 10331;
    } else if (nombre === "Mouse") {
        return 3235;
    } else {
        return 120341;
    }

}


function calcularEnvio(total, divisa) {
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


function cobrarProducto(nombre, precio, divisa) {
    let pago = 0;
    switch (divisa) {
        case "2":
            alert("Usted eligio : " + nombre.toUpperCase() + ".\nEl precio del " + nombre + " es de $" + precio);
            pago = prompt("Cual es el saldo de su cuenta?");

            if (precio < pago || precio == pago) {
                alert("en su cuenta le quedan $" + (pago - precio) + "\nPago Efectuado, nos contactaremos a la brevedad");
            } else {
                alert("Saldo insuficiente");
            }
            break;
        case "1":
            alert("Usted eligio : " + nombre.toUpperCase() + ".\nEl precio del " + nombre + " es de US$" + precio);
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
let nombreProducto = mostrarProductos();
let precioProducto = validarPrecio(nombreProducto);
let divisa = divisas();
let precioFinal = calcularEnvio(Math.round(validarDivisa(divisa, precioProducto)),divisa);
cobrarProducto(nombreProducto, precioFinal, divisa);