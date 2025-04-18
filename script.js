// registar usuario
document.getElementById("formularioRegistro").addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtener valores
  const name = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("contraseña").value;
  const role = document.getElementById("rol").value;

  // Validación sencilla
  if (!name || !email || !password || !role) {
    showMessage("Por favor completa todos los campos.", "advertencia");
    return;
  }

  // Crear objeto usuario
  const user = {
    name,
    email,
    password,
    role
  };

  // Guardar en localStorage
  let users = JSON.parse(localStorage.getItem("usuarios")) || [];
  users.push(user);
  localStorage.setItem("usuarios", JSON.stringify(users));

  showMessage("Usuario registrado correctamente ✅", "exitoso");

  // Resetear formulario
  document.getElementById("formularioRegistro").reset();
});

// Mostrar mensaje
function showMessage(text, type) {
  const messageDiv = document.getElementById("mensaje");
  messageDiv.innerHTML = `<div class="alert alert-${type}">${text}</div>`;
};
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("contraseña").value.trim();

      // Obtener usuarios del localStorage
      const users = JSON.parse(localStorage.getItem("usuarios")) || [];
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        // Guardar el usuario actual en localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Redirigir al dashboard
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1000);
      } else {
        alert("Correo o contraseña incorrectos.");
      }
    });
  }
});




