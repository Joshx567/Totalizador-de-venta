import calcularNeto from "./calcularNeto.js";

const cantidadInput = document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const calcularButton = document.querySelector("#calcular-button");
const resultadoNeto = document.querySelector("#resultado-neto");

calcularButton.addEventListener("click", () => {
    const cantidad = Number.parseInt(cantidadInput.value);
    const precio = Number.parseInt(precioInput.value);

    if (!isNaN(cantidad) && !isNaN(precio)) {
        resultadoNeto.innerHTML = "<p>Resultado Neto: " + calcularNeto(cantidad, precio) + "</p>";
    } else {
        resultadoNeto.innerHTML = "<p>Ingrese valores válidos.</p>";
    }
});
