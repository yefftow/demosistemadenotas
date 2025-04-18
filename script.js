// Función para mostrar mensajes
function showMessage(text, type) {
  const messageDiv = document.getElementById("mensaje")
  if (messageDiv) {
    messageDiv.innerHTML = `<div class="alert alert-${type === "exitoso" ? "success" : "warning"}">${text}</div>`
  }
}

// Verificar si el usuario ya está autenticado al cargar cualquier página
document.addEventListener("DOMContentLoaded", () => {
  // Verificar la página actual
  const currentPage = window.location.pathname.split("/").pop()

  // Obtener usuario actual
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  // Proteger dashboard.html - redirigir a login si no hay usuario
  if (currentPage === "dashboard.html" && !currentUser) {
    window.location.href = "login.html"
    return
  }

  // Si estamos en dashboard y hay usuario, mostrar su nombre
  if (currentPage === "dashboard.html" && currentUser) {
    const welcomeMessage = document.getElementById("welcomeMessage")
    if (welcomeMessage) {
      welcomeMessage.textContent = `Bienvenido, ${currentUser.name}`
    }
  }

  // Si ya está autenticado y está en login o registro, redirigir a dashboard
  if ((currentPage === "login.html" || currentPage === "registro.html") && currentUser) {
    window.location.href = "dashboard.html"
  }

  // Configurar botón de logout
  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      window.location.href = "login.html"
    })
  }
})

// Manejar el formulario de registro
const formularioRegistro = document.getElementById("formularioRegistro")
if (formularioRegistro) {
  formularioRegistro.addEventListener("submit", (event) => {
    event.preventDefault()

    // Obtener valores
    const name = document.getElementById("nombre").value.trim()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("contraseña").value
    const role = document.getElementById("rol").value

    // Validación sencilla
    if (!name || !email || !password || !role) {
      showMessage("Por favor completa todos los campos.", "advertencia")
      return
    }

    // Crear objeto usuario
    const user = {
      name,
      email,
      password,
      role,
    }

    // Guardar en localStorage
    const users = JSON.parse(localStorage.getItem("usuarios")) || []

    // Verificar si el correo ya existe
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      showMessage("Este correo electrónico ya está registrado.", "advertencia")
      return
    }

    users.push(user)
    localStorage.setItem("usuarios", JSON.stringify(users))

    showMessage("Usuario registrado correctamente ✅", "exitoso")

    // Resetear formulario
    formularioRegistro.reset()

    // Redirigir a login después de 2 segundos
    setTimeout(() => {
      window.location.href = "login.html"
    }, 2000)
  })
}

// Manejar el formulario de login
const loginForm = document.getElementById("loginForm")
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("contraseña").value.trim()

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem("usuarios")) || []
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      // Mostrar mensaje de éxito
      showMessage("Inicio de sesión exitoso. Redirigiendo...", "exitoso")

      // Guardar el usuario actual en localStorage
      localStorage.setItem("currentUser", JSON.stringify(user))

      // Redirigir al dashboard después de mostrar el mensaje
      setTimeout(() => {
        window.location.href = "dashboard.html"
      }, 1500)
    } else {
      showMessage("Correo o contraseña incorrectos.", "advertencia")
    }
  })
}

