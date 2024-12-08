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
      <h3 class="product-name">${producto.nombre}</h3>
      <p class="product-brand">${producto.marca}</p>
      <p class="product-price">$${producto.precio}</p>
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

const btnCerrar = document.querySelector(".btnCerrar");

btnHambur.addEventListener("click", () => {
  menuHambur.classList.add("visible");
});

btnCerrar.addEventListener("click", () => {
  menuHambur.classList.remove("visible");
});
