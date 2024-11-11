const contenedorTarjetas = document.getElementById("container-products");
const iconoCarrito = document.querySelector(".fa-cart-shopping");
const carrito = document.getElementById("cart");
const cerrarCarritoBtn = document.getElementById("cerrar-carrito");

iconoCarrito.addEventListener("click", () => {
  // Alternar la visibilidad del carrito
  carrito.classList.toggle("oculto");

  // Si el carrito se está mostrando, actualizar los productos
  if (!carrito.classList.contains("oculto")) {
    mostrarProductosCarrito();
  }
});

cerrarCarritoBtn.addEventListener("click", () => {
  carrito.classList.add("oculto");
});

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
