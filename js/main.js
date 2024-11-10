const contenedorTarjetas = document.getElementById("container-products");

function crearTarjetasProductos(productos) {
  productos.forEach((producto) => {
    const nuevaCamiseta = document.createElement("div");
    nuevaCamiseta.classList = "tarjeta-producto";
    nuevaCamiseta.innerHTML = `
    <img src=./img/productos/${producto.id}.jpg>
    <h3>${producto.nombre}</h3>
    <p>${producto.precio}</p>
    <button>Agregar al carrito</button>
    `;
    contenedorTarjetas.appendChild(nuevaCamiseta);
    nuevaCamiseta
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => agregarAlCarrito(producto));
  });
}

crearTarjetasProductos(camisetas);
