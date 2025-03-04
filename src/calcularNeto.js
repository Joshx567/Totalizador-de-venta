function calcularNeto(cantidaditem, precioitem) {
    return cantidaditem * precioitem + "$";
}

function calcularNeto(cantidaditem, precioitem, impuesto) {
    const neto = cantidaditem * precioitem;
    const totalConImpuesto = neto + (neto * (impuesto / 100));
    return totalConImpuesto.toFixed(2) + "$";
}

export default calcularNeto;
