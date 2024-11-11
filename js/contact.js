// FUNCION CONTACTO

document
  .getElementById("form-contacto")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelectorAll(".error-message").forEach((error) => {
      error.style.display = "none";
    });
    document.getElementById("mensaje-exito").style.display = "none";

    let validado = true;

    const nombre = document.getElementById("name").value;
    if (!nombre) {
      document.getElementById("error-name").textContent =
        "El nombre es obligatorio.";
      document.getElementById("error-name").style.display = "block";
      validado = false;
    }

    const email = document.getElementById("email").value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      document.getElementById("error-email").textContent =
        "Por favor ingresa un correo electronico valido.";
      document.getElementById("error-email").style.display = "block";
      validado = false;
    }

    const telefono = document.getElementById("tel").value;
    const telefonoRegex = /^\d{10}$/;
    if (!telefono || !telefonoRegex.test(telefono)) {
      document.getElementById("error-tel").textContent =
        "Por favor ingresa un número de teléfono válido (10 digitos).";
      document.getElementById("error-tel").style.display = "block";
      validado = false;
    }

    if (validado) {
      document.getElementById("mensaje-exito").style.display = "block";
      document.getElementById("form-contacto").reset();
    }
  });
