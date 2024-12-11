const container = document.getElementById("container-products");

// Funcion para renderizar productos
const createProductTemplate = (productos) => {
  const {id, img, nombre, marca, precio} = productos;
  return `
  <div class="product-card">
    <img src="${img}" alt="${nombre}" class="product-img">
    <h3>${nombre}</h3>
    <p>${marca}</p>
    <p>$${precio}</p>
    <button class="add-product" 
      data-id='${id}' 
      data-nombre='${nombre}'
      data-img='${img}' 
      data-precio='${precio}'
      >Agregar al carrito</button>
  </div>
  `;
};

const renderProductos = (productos) => {
  container.innerHTML = "";
  container.innerHTML = productos.map(createProductTemplate).join("");
};

renderProductos(camisetas);

// Funcion para filtrar productos
const checkboxes = document.querySelectorAll(".filtro-marca");
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

// -------------------------MENU HAMBURGUESA ---------------------//
const btnHambur = document.getElementById("hambur");
const openMenu = document.querySelector(".open-menu");
// MOSTRAR MENU HAMBUR
const toogleMenu = () => {
  openMenu.classList.toggle("visibleMenu");

  if (cartMenu.classList.contains("visibleCart")) {
    cartMenu.classList.remove("visibleCart");
    return;
  }

  if (openMenu.classList.contains("visibleMenu")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};
btnHambur.addEventListener("click", toogleMenu);

// ------------------------- CARRITO --------------------------------//
const carritoIcon = document.getElementById("cart");
const cartMenu = document.querySelector(".cart-menu");

// Mostrar el carrito
const toogleCart = () => {
  cartMenu.classList.toggle("visibleCart");
  if (openMenu.classList.contains("visibleMenu")) {
    openMenu.classList.remove("visibleMenu");
    return;
  }
  if (cartMenu.classList.contains("visibleCart")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};
carritoIcon.addEventListener("click", toogleCart);

// -------------------------LOGICA CARRITO--------------------------------//
const productsCart = document.querySelector(".products-container");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

// Logica crear template
const createCartProductHTML = (cartProduct) => {
  const {id, img, nombre, precio, marca, cantidad} = cartProduct;
  return `
  <div class='cart-item'>
  <img src="${img}" alt="${nombre}" class="product-img">
  <div>
    <p>${nombre}</p>
    <p>$${precio}</p>
    </div>
    <p>Cantidad: ${cantidad}</p>
    </div>
    </div>
    `;
};
// Logica renderizar
renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p>No existe nada</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductHTML).join("");
};
document.addEventListener("DOMContentLoaded", renderCart);

// Funcion que ejecute todo lo necesario para actualizar el carro
const updateCartState = () => {
  saveCart();
  renderCart();
};

const addProduct = ({target}) => {
  if (!target.classList.contains("add-product")) return;
  const product = createProductData(target.dataset);
  // Validacion si existe el producto en el carrito
  if (isExistingCartProduct(product)) {
    addUnitProduct(product);
  } else {
    cart = [...cart, {...product, cantidad: 1}];
  }
  updateCartState();
};

// Funcion para agregar una unidad
const addUnitProduct = (product) => {
  console.log("Existe en el carro,le agrego una unidad");
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? {...cartProduct, cantidad: cartProduct.cantidad + 1}
      : cartProduct
  );
};

// Funcion para crear el objeto con la info del producto
const createProductData = (producto) => {
  const {id, nombre, precio, img} = producto;
  return {id, nombre, precio, img};
};

const isExistingCartProduct = (producto) => {
  return cart.find((item) => item.id === producto.id);
};

container.addEventListener("click", addProduct);
