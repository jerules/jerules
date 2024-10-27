document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Enviar los datos al backend para validar el inicio de sesión
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("¡Inicio de sesión exitoso!");
            window.location.href = "index.html"; // Redirigir a la tienda
        } else {
            alert(result.message || "Usuario o contraseña incorrectos.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión. Intenta nuevamente más tarde.');
    }
});