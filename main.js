const contenedorTarjetas = document.getElementById("container-productos");

function crearTarjetasProductos(productos) {
  productos.forEach((producto) => {
    const nuevaCamiseta = document.createElement("div");
    nuevaCamiseta.classList = "tarjeta-producto";
    nuevaCamiseta.innerHTML = `
    <img src=${producto.img}>
    `;
    contenedorTarjetas.appendChild(nuevaCamiseta);
  });
}

crearTarjetasProductos(camisetas);
