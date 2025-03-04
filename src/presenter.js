import calcularNeto from "./calcularNeto.js";

const cantidadInput = document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const calcularButton = document.querySelector("#calcular-button");
const resultadoNeto = document.querySelector("#resultado-neto");
const estadoSelect = document.querySelector("#estado");
const estadoSeleccionado = document.querySelector("#estado-seleccionado");

const impuestos = {
    CA: 8.25
};

estadoSelect.addEventListener("change", () => {
    const estado = estadoSelect.value;
    const impuesto = impuestos[estado] || 0;
    estadoSeleccionado.innerHTML = `<p>Estado seleccionado: ${estado} - Impuesto: ${impuesto}%</p>`;
});


calcularButton.addEventListener("click", () => {
    const cantidad = Number.parseInt(cantidadInput.value);
    const precio = Number.parseInt(precioInput.value);

    if (!isNaN(cantidad) && !isNaN(precio)) {
        resultadoNeto.innerHTML = "<p>Resultado Neto: " + calcularNeto(cantidad, precio) + "</p>";
    } else {
        resultadoNeto.innerHTML = "<p>Ingrese valores válidos.</p>";
    }
});
