document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Enviar los datos al backend
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(`Usuario ${username} registrado con éxito. Ahora puedes iniciar sesión.`);
            // Redirigir al inicio de sesión después de registrarse
            window.location.href = "login.html";
        } else {
            alert(result.message || 'Error al registrar el usuario.'); // Mostrar mensaje de error
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión. Intenta nuevamente más tarde.');
    }
});