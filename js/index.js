const contenedorTarjetas = document.getElementById("container-products");
const iconoCarrito = document.querySelector(".fa-cart-shopping");
const carrito = document.getElementById("cart");
const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
const filtrosMarca = document.querySelectorAll(".filtro-marca");

iconoCarrito.addEventListener("click", () => {
  carrito.classList.toggle("oculto");

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

function filtrarProductosPorMarcas() {
  const marcasSeleccionadas = Array.from(filtrosMarca)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const productosFiltrados = camisetas.filter(
    (producto) =>
      marcasSeleccionadas.length === 0 ||
      marcasSeleccionadas.includes(producto.marca)
  );

  mostrarProductosFiltrados(productosFiltrados);
}

function mostrarProductosFiltrados(productos) {
  contenedorTarjetas.innerHTML = "";

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
      .querySelector("button")
      .addEventListener("click", () => agregarAlCarrito(producto));
  });
}

filtrosMarca.forEach((checkbox) =>
  checkbox.addEventListener("change", filtrarProductosPorMarcas)
);

mostrarProductosFiltrados(camisetas);
