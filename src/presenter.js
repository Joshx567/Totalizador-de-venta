import calcularNeto from "./calcularNeto.js";

const cantidadInput = document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const calcularButton = document.querySelector("#calcular-button");
const resultadoNeto = document.querySelector("#resultado-neto");
const estadoSelect = document.querySelector("#estado");
const impuestoElemento = document.querySelector("#impuesto");
const descuentoElemento = document.querySelector("#descuento");
const categoriaSelect = document.querySelector("#categoria");
const impuestoAdicionalElemento = document.querySelector("#impuesto-adicional");
const descuentoAdicionalElemento = document.querySelector("#descuento-adicional");

const impuestos = {
    CA: 8.25,
    AL: 4,
    NV: 8,
    UT: 6.65,
    TX: 6.25
};

const categorias = {
    "Varios": { impuesto: 0, descuento: 0 },
    "Alimentos": { impuesto: 0, descuento: 2 },
    "Bebidas Alcoholicas": { impuesto: 7, descuento: 0 },
    "Material de Escritorio": { impuesto: 0, descuento: 1.5 },
    "Muebles": { impuesto: 3, descuento: 0 },
    "Electronicos": { impuesto: 4, descuento: 1 },
    "Vestimenta": { impuesto: 2, descuento: 0 }
};

function actualizarCategoria() {
    const categoria = categoriaSelect.value;
    const { impuesto, descuento } = categorias[categoria] || { impuesto: 0, descuento: 0 };

    impuestoAdicionalElemento.innerHTML = `<p>${impuesto}%</p>`;
    descuentoAdicionalElemento.innerHTML = `<p>${descuento}%</p>`;
}

actualizarCategoria();
categoriaSelect.addEventListener("change", actualizarCategoria);

function actualizarImpuesto() {
    const estado = estadoSelect.value;
    const impuesto = impuestos[estado] || 0;
    impuestoElemento.innerHTML = `<p>${impuesto}%</p>`;
}

function calcularDescuento(totalSinImpuesto, descuentoAdicional) {
    let descuento = 0;

    if (totalSinImpuesto >= 1000 && totalSinImpuesto < 3000) {
        descuento = 3;
    } else if (totalSinImpuesto >= 3000 && totalSinImpuesto < 7000) {
        descuento = 5;
    } else if (totalSinImpuesto >= 7000 && totalSinImpuesto < 10000) {
        descuento = 7;
    } else if (totalSinImpuesto >= 10000 && totalSinImpuesto < 30000) {
        descuento = 10;
    } else if (totalSinImpuesto >= 30000) {
        descuento = 15;
    }

    const descuentoTotal = descuento + descuentoAdicional;
    const descuentoAplicado = totalSinImpuesto * (descuentoTotal / 100);
    const precioConDescuento = totalSinImpuesto - descuentoAplicado;

    descuentoElemento.innerHTML = `<p>${descuento}%</p>`;
    descuentoAdicionalElemento.innerHTML = `<p>${descuentoAdicional}%</p>`;

    return precioConDescuento.toFixed(2);
}


function calcularTotalConImpuesto(totalConDescuento, impuesto, impuestoAdicional) {
    const totalConImpuesto = totalConDescuento + (totalConDescuento * ((impuesto + impuestoAdicional) / 100));
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
    const categoria = categoriaSelect.value;

    const impuesto = impuestos[estado] || 0;
    const { impuesto: impuestoAdicional, descuento: descuentoAdicional } = categorias[categoria] || { impuesto: 0, descuento: 0 };

    if (isNaN(cantidad) || isNaN(precio)) {
        resultadoNeto.innerHTML = "<p>Ingrese valores válidos.</p>";
        return;
    }

    const totalSinImpuesto = cantidad * precio;

    let precioConDescuento = parseFloat(calcularDescuento(totalSinImpuesto));

    const descuentoExtraAplicado = precioConDescuento * (descuentoAdicional / 100);
    precioConDescuento -= descuentoExtraAplicado;

    const totalConImpuesto = calcularTotalConImpuesto(precioConDescuento, impuesto, impuestoAdicional);

    resultadoNeto.innerHTML = `<p>Total con impuesto: ${totalConImpuesto}</p>`;
});
