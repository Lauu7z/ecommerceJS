function agregarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("camisetas")) || [];
  const indiceProducto = memoria.findIndex(
    (camiseta) => camiseta.id === producto.id
  );

  if (indiceProducto === -1) {
    memoria.push(getNuevoProductoParaMemoria(producto));
  } else {
    memoria[indiceProducto].cantidad++;
  }

  localStorage.setItem("camisetas", JSON.stringify(memoria));
  actualizarNumeroCarrito();
  mostrarProductosCarrito(); // Actualiza la lista de productos en el carrito
}

function getNuevoProductoParaMemoria(producto) {
  return {...producto, cantidad: 1};
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
  const memoria = JSON.parse(localStorage.getItem("camisetas")) || [];
  const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
  cuentaCarritoElement.innerText = cuenta;
}

function mostrarProductosCarrito() {
  const memoria = JSON.parse(localStorage.getItem("camisetas")) || [];
  const listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = ""; // Limpiar el contenido anterior

  memoria.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} - Cantidad: ${producto.cantidad}
      <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
    `;
    listaCarrito.appendChild(li);
  });
}

function eliminarDelCarrito(idProducto) {
  let memoria = JSON.parse(localStorage.getItem("camisetas")) || [];
  // Filtrar productos para remover el que tiene el id especificado
  memoria = memoria.filter((producto) => producto.id !== idProducto);
  localStorage.setItem("camisetas", JSON.stringify(memoria));

  actualizarNumeroCarrito(); // Actualiza el número en el ícono del carrito
  mostrarProductosCarrito(); // Actualiza la lista de productos en el carrito
}

// Inicializa la cantidad del carrito al cargar la página
actualizarNumeroCarrito();
