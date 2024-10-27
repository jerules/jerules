document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Obtener usuarios del Local Storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Buscar si el usuario existe y la contraseña es correcta
    const user = users.find(user => user.username === username && user.password === password);
  
    if (user) {
      alert('¡Inicio de sesión exitoso!');
      window.location.href = "index.html";  // Redirigir a la página principal
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  });
  