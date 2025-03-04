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
    UT: 6.65
};

function actualizarImpuesto() {
    const estado = estadoSelect.value;
    const impuesto = impuestos[estado] || 0;
    impuestoElemento.innerHTML = `<p>${impuesto}%</p>`;
}

function actualizarDescuento() {
    descuentoElemento.innerHTML = `<p>0%</p>`;
}

actualizarImpuesto();
actualizarDescuento();

estadoSelect.addEventListener("change", () => {
    actualizarImpuesto();
    actualizarDescuento();
});

calcularButton.addEventListener("click", () => {
    const cantidad = Number.parseInt(cantidadInput.value);
    const precio = Number.parseInt(precioInput.value);
    const estado = estadoSelect.value;
    const impuesto = impuestos[estado] || 0;

    if (!isNaN(cantidad) && !isNaN(precio)) {
        resultadoNeto.innerHTML = `<p>Total con impuesto: ${calcularNeto(cantidad, precio, impuesto)}</p>`;
    } else {
        resultadoNeto.innerHTML = "<p>Ingrese valores válidos.</p>";
    }
});
