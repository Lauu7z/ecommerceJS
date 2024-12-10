// Elementos del DOM
const container = document.getElementById("container-products");
const checkboxes = document.querySelectorAll(".filtro-marca");

// Función para renderizar productos
const renderProductos = (productos) => {
  container.innerHTML = productos
    .map(
      (producto) => `
    <div class="product-card">
      <img src="${producto.img}" alt="${producto.nombre}" class="product-img">
      <h3>${producto.nombre}</h3>
      <p>${producto.marca}</p>
      <p>$${producto.precio}</p>
      <button class="add-to-cart" data-id=${producto.id}">Agregar al carrito</button>
    </div>
  `
    )
    .join("");
};

// Funcion para filtrar productos
const filtrarProductos = () => {
  // Obtener las marcas seleccionadas
  const marcasSeleccionadas = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const productosFiltrados =
    marcasSeleccionadas.length > 0
      ? camisetas.filter((producto) =>
          marcasSeleccionadas.includes(producto.marca)
        )
      : camisetas;

  // Renderizar los productos filtrados
  renderProductos(productosFiltrados);
};

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", filtrarProductos)
);

// Renderizar todos los productos al cargar la página
renderProductos(camisetas);

// MENU HAMBURGUESA
const btnHambur = document.getElementById("hambur");
const menuHambur = document.querySelector(".menu-hambur");
const btnCerrarMenu = document.querySelector(".btnCerrar-menu");

btnHambur.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  menuHambur.classList.add("visibleMenu");
});

btnCerrarMenu.addEventListener("click", () => {
  document.body.style.overflow = "";
  menuHambur.classList.remove("visibleMenu");
});

// CARRITO
const carritoIcon = document.getElementById("cart");
const cartMenu = document.querySelector(".cart-menu");
const btnCerrarCart = document.querySelector(".btnCerrar-cart");

carritoIcon.addEventListener("click", () => {
  cartMenu.classList.add("visibleCart");
});

btnCerrarCart.addEventListener("click", () => {
  cartMenu.classList.remove("visibleCart");
  console.log(cartMenu.classList);
});

// FUNCIONALIDAD DEL CARRITO
let carrito = [];
// Agregar evento a cada botón "Agregar al carrito"
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const idProducto = parseInt(e.target.getAttribute("data-id"), 10);
    agregarAlCarrito(idProducto);
  });
});

// Agregar producto al carrito
const agregarAlCarrito = (id) => {
  const producto = camisetas.find((item) => item.id === id);

  if (!producto) {
    console.error(`Producto con id ${id} no encontrado.`);
    return;
  }

  // Verifica si el producto ya esta en el carrito
  const productoEnCarrito = carrito.find((item) => item.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({...producto, cantidad: 1});
  }

  actualizarCarrito();
};

// Eliminar producto del carrito
const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((item) => item.id !== id);
  actualizarCarrito();
};

// Actualizar la vista del carrito
const actualizarCarrito = () => {
  const containerProductsCart = document.querySelector(
    ".container-products-cart"
  );
  const totalElement = document.getElementById("total");

  // Limpiar contenido previo
  containerProductsCart.innerHTML = "";
  let total = 0;

  // Mostrar los productos en el carrito
  let htmlCarrito = "";
  carrito.forEach((item) => {
    htmlCarrito += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.nombre}" class="cart-item-img">
        <div class="item-info"><span>${item.nombre} </span><span> $${item.precio} x ${item.cantidad}</span></div>
        
        <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
      </div>
    `;
    total += item.precio * item.cantidad;
  });
  containerProductsCart.innerHTML = htmlCarrito;
  totalElement.textContent = `Total: $${total.toFixed(2)}`;

  // Agregar eventos a los botones "Eliminar"
  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const idProducto = parseInt(e.target.getAttribute("data-id"), 10);
      eliminarDelCarrito(idProducto);
    });
  });
};
