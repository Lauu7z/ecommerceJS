const container = document.getElementById("container-products");
const checkboxes = document.querySelectorAll(".filtro-marca");
const btnHambur = document.getElementById("hambur");
const openMenu = document.querySelector(".open-menu");
const carritoIcon = document.getElementById("cart");
const cartMenu = document.querySelector(".cart-menu");
const productsCart = document.querySelector(".products-container");
const totalCart = document.getElementById("total-cart");
const successModal = document.querySelector(".add-modal");
const clearCartBtn = document.querySelector(".clear-cart");
const buyCartBtn = document.querySelector(".btn-buy");
const cartBurbuja = document.querySelector(".cart-burbuja");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

const createProductCardTemplate = ({id, img, nombre, marca, precio}) => `
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

const renderProductos = (productos) => {
  container.innerHTML = productos.map(createProductCardTemplate).join("");
};

const filtrarProductos = () => {
  const marcasSeleccionadas = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const productosFiltrados =
    marcasSeleccionadas.length > 0
      ? camisetas.filter((producto) =>
          marcasSeleccionadas.includes(producto.marca)
        )
      : camisetas;

  renderProductos(productosFiltrados);
};

const toggleMenu = () => {
  openMenu.classList.toggle("visibleMenu");
  if (cartMenu.classList.contains("visibleCart")) {
    cartMenu.classList.remove("visibleCart");
  }
  document.body.style.overflow = openMenu.classList.contains("visibleMenu")
    ? "hidden"
    : "";
};

const toggleCart = () => {
  cartMenu.classList.toggle("visibleCart");
  if (openMenu.classList.contains("visibleMenu")) {
    openMenu.classList.remove("visibleMenu");
  }
  document.body.style.overflow = cartMenu.classList.contains("visibleCart")
    ? "hidden"
    : "";
};

const createCartProductHTML = ({id, img, nombre, precio, cantidad}) => `
  <div class='cart-item'>
  <div class='div-items'>	
    <img src="${img}" alt="${nombre}" class="product-img">
    <div>
      <p>${nombre}</p>
      <p>$${precio}</p>
    </div>
  </div>

    <div class="quantity">
      <span class="cantidad restar" data-id="${id}">-</span>
      <p>${cantidad}</p>
      <span class="cantidad sumar" data-id="${id}">+</span>
    </div>

  </div>
`;

const renderCart = () => {
  productsCart.innerHTML = cart.length
    ? cart.map(createCartProductHTML).join("")
    : `<p>No tienes productos en el carrito.</p>
       <p>Agrega productos 🙌</p>`;
};

const getCartTotal = () =>
  cart.reduce((acc, cur) => acc + cur.precio * cur.cantidad, 0);

const showCartTotal = () => {
  totalCart.textContent = `$${getCartTotal()}`;
};

const updateCartBurbuja = () => {
  cartBurbuja.textContent = cart.reduce((acc, cur) => acc + cur.cantidad, 0);
};

const updateCartState = () => {
  saveCart();
  showCartTotal();
  renderCart();
  updateCartBurbuja();
  disableBtn(buyCartBtn);
  disableBtn(clearCartBtn);
};

const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.innerHTML = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 2000);
};

const createProductData = ({id, nombre, precio, img}) => ({
  id,
  nombre,
  precio,
  img,
});

const isExistingCartProduct = (producto) =>
  cart.some((item) => item.id === producto.id);

const addUnitProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? {...cartProduct, cantidad: cartProduct.cantidad + 1}
      : cartProduct
  );
};

const addProduct = ({target}) => {
  if (!target.classList.contains("add-product")) return;
  const product = createProductData(target.dataset);
  if (isExistingCartProduct(product)) {
    addUnitProduct(product);
    showSuccessModal("Se agrego otra unidad al carrito");
  } else {
    cart = [...cart, {...product, cantidad: 1}];
    showSuccessModal("Producto agregado al carrito");
  }
  updateCartState();
};

const substracUnitProduct = (existingProduct) => {
  cart = cart.map((product) =>
    product.id === existingProduct.id
      ? {...product, cantidad: product.cantidad - 1}
      : product
  );
};

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => product.id !== existingProduct.id);
  updateCartState();
};

const handlePlusEvent = (id) => {
  const existingCartProduct = cart.find((product) => product.id === id);
  addUnitProduct(existingCartProduct);
};

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  if (existingCartProduct.cantidad === 1) {
    if (window.confirm("¿Desea eliminar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }
  } else {
    substracUnitProduct(existingCartProduct);
  }
};

const handleQuantity = (e) => {
  if (e.target.classList.contains("restar")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("sumar")) {
    handlePlusEvent(e.target.dataset.id);
  }
  updateCartState();
};

const clearCart = () => {
  cart = [];
  updateCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
  if (window.confirm(confirmMsg)) {
    cart = [];
    updateCartState();
    showSuccessModal(successMsg);
  }
};

const buyCart = () => {
  completeCartAction(
    "¿Desea confirmar la compra?",
    "Compra realizada con exito"
  );
};

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

// Contacto Validacion

const contactForm = document.getElementById("contact-form");

const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre-contact").value.trim();
  const email = document.getElementById("email").value.trim();
  const motivo = document.getElementById("motivo").value.trim();

  if (!nombre || !email || !motivo) {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (!validateEmail(email)) {
    alert("Email invalido");
    return;
  }

  alert("Mensaje enviado con exito");
  contactForm.submit();
});

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", filtrarProductos)
);
btnHambur.addEventListener("click", toggleMenu);
carritoIcon.addEventListener("click", toggleCart);
container.addEventListener("click", addProduct);
productsCart.addEventListener("click", handleQuantity);
clearCartBtn.addEventListener("click", clearCart);
buyCartBtn.addEventListener("click", buyCart);
document.addEventListener("DOMContentLoaded", () => {
  renderProductos(camisetas);
  renderCart();
  showCartTotal();
  updateCartBurbuja();
  disableBtn(buyCartBtn);
  disableBtn(clearCartBtn);
});
