import calcularNeto from "./calcularNeto.js";

const cantidadInput = document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const calcularButton = document.querySelector("#calcular-button");
const resultadoNeto = document.querySelector("#resultado-neto");
const estadoSelect = document.querySelector("#estado");
const impuestoElemento = document.querySelector("#impuesto");
const descuentoElemento = document.querySelector("#descuento");

const impuestos = {
    CA: 8.25,
    AL: 4,
    NV: 8,
    UT: 6.65,
    TX: 6.25
};

function actualizarImpuesto() {
    const estado = estadoSelect.value;
    const impuesto = impuestos[estado] || 0;
    impuestoElemento.innerHTML = `<p>${impuesto}%</p>`;
}

function calcularDescuento(totalSinImpuesto) {
    let descuento = 0;

    if (totalSinImpuesto >= 1000 && totalSinImpuesto < 3000) {
        descuento = 3;
    } else if (totalSinImpuesto >= 3000 && totalSinImpuesto < 7000) {
        descuento = 5;
    } else if (totalSinImpuesto >= 7000 && totalSinImpuesto < 10000) {
        descuento = 7;
    } else if (totalSinImpuesto >= 10000 && totalSinImpuesto < 30000) {
        descuento = 10;
    }
    else if (totalSinImpuesto >= 30000) {
        descuento = 15;
    }

    const descuentoAplicado = totalSinImpuesto * (descuento / 100);
    const precioConDescuento = totalSinImpuesto - descuentoAplicado;

    descuentoElemento.innerHTML = `<p>${descuento}%</p>`;

    return precioConDescuento.toFixed(2) + "$";
}

function calcularTotalConImpuesto(totalConDescuento, impuesto) {
    const totalConImpuesto = totalConDescuento + (totalConDescuento * (impuesto / 100));
    return totalConImpuesto.toFixed(2) + "$";
}

actualizarImpuesto();
descuentoElemento.innerHTML = `<p>0%</p>`;

estadoSelect.addEventListener("change", () => {
    actualizarImpuesto();
    descuentoElemento.innerHTML = `<p>0%</p>`;
});

calcularButton.addEventListener("click", () => {
    const cantidad = parseInt(cantidadInput.value);
    const precio = parseFloat(precioInput.value);
    const estado = estadoSelect.value;
    const impuesto = impuestos[estado] || 0;

    if (isNaN(cantidad) || isNaN(precio)) {
        resultadoNeto.innerHTML = "<p>Ingrese valores válidos.</p>";
        return;
    }

    const totalSinImpuesto = cantidad * precio;

    const precioConDescuento = calcularDescuento(totalSinImpuesto);

    const totalConImpuesto = calcularTotalConImpuesto(parseFloat(precioConDescuento), impuesto);

    resultadoNeto.innerHTML = `<p>Total con impuesto: ${totalConImpuesto}</p>`;
});
