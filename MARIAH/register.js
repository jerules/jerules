document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Obtener usuarios del Local Storage o inicializar un array vacío
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Verificar si el usuario ya existe
    if (users.some(user => user.username === username)) {
      alert('El nombre de usuario ya existe.');
      return;
    }
  
    // Agregar el nuevo usuario
    users.push({ username, email, password });
  
    // Guardar en Local Storage
    localStorage.setItem('users', JSON.stringify(users));
  
    alert(`Usuario ${username} registrado con éxito. Ahora puedes iniciar sesión.`);
    window.location.href = "login.html";  // Redirigir al login
  });
  