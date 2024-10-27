let cart = [];

// Agregar un artículo al carrito con nombre y precio
function addToCart(item, price) {
    cart.push({ name: item, price: price });
    updateCartCount();
    alert(`${item} ha sido agregado al carrito💖`);
}

// Actualizar el contador de artículos en el carrito
function updateCartCount() {
    document.getElementById("carrito-count").innerText = cart.length;
}

// Mostrar los artículos en el carrito y el total
function displayCartItems() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = ''; // Limpia la lista actual

    let total = 0;
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>El carrito está vacío.</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
            total += item.price; // Sumar el precio de cada artículo al total
        });

        // Mostrar el total en el carrito
        const totalItem = document.createElement('li');
        totalItem.textContent = `Total: $${total.toFixed(2)}`;
        totalItem.style.fontWeight = 'bold';
        cartItemsList.appendChild(totalItem);
    }
}

// Alternar la visibilidad del carrito
function toggleCart() {
    const cartSection = document.getElementById("carrito");
    cartSection.classList.toggle("visible");
    displayCartItems();
}

// Vaciar el carrito
function clearCart() {
    cart = [];
    updateCartCount();
    displayCartItems();
    toggleCart(); // Oculta el carrito
}

// Cambiar de imagen en el carrusel
let currentSlide = 0;

function changeSlide(direction) {
    const images = document.querySelectorAll('.carousel-images img');
    currentSlide = (currentSlide + direction + images.length) % images.length;
    images.forEach((img, index) => {
        img.style.display = index === currentSlide ? 'block' : 'none';
    });
}

// Inicializar el carrusel al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel-images img');
    images.forEach((img, index) => {
        img.style.display = index === 0 ? 'block' : 'none'; // Muestra solo la primera imagen
    });
});

// Función para desplazarse a una sección
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

let isZoomed = false;

function openModal(imgSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = imgSrc;
    modalImg.style.transform = "scale(1)"; // Restablece el zoom al abrir la imagen
    isZoomed = false; // Reinicia el estado de zoom
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Alternar el zoom de la imagen
function toggleZoom() {
    const modalImg = document.getElementById("modalImg");
    if (isZoomed) {
        modalImg.style.transform = "scale(1)"; // Tamaño normal
    } else {
        modalImg.style.transform = "scale(2)"; // Aplica zoom
    }
    isZoomed = !isZoomed; // Cambia el estado de zoom
}

// Cerrar el modal al hacer clic fuera de la imagen
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const zoomContainer = document.querySelector('.zoom-container');
let scale = 1;

zoomContainer.addEventListener('wheel', (event) => {
    event.preventDefault(); // Previene el scroll de la página
    const zoomImage = document.getElementById('zoom-image');
    
    // Cambia el nivel de zoom basado en la dirección de la rueda del mouse
    scale += event.deltaY * -0.01;
    
    // Limita el zoom para evitar que la imagen se haga demasiado grande o pequeña
    scale = Math.min(Math.max(3, scale), 6); 

    zoomImage.style.transform = `scale(${scale})`;
});

// Para permitir el desplazamiento de la imagen al hacer clic y arrastrar
let isDragging = false;
let startX, startY;

zoomContainer.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.pageX - zoomContainer.offsetLeft;
    startY = event.pageY - zoomContainer.offsetTop;
    zoomContainer.style.cursor = 'grabbing'; // Cambia el cursor
});

zoomContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    zoomContainer.style.cursor = 'grab'; // Restaura el cursor
});

zoomContainer.addEventListener('mouseup', () => {
    isDragging = false;
    zoomContainer.style.cursor = 'grab'; // Restaura el cursor
});

zoomContainer.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - zoomContainer.offsetLeft;
    const walkX = (x - startX) * 2; // Ajusta la sensibilidad
    const y = event.pageY - zoomContainer.offsetTop;
    const walkY = (y - startY) * 2; // Ajusta la sensibilidad

    zoomImage.style.transform = `scale(${scale}) translate(${walkX}px, ${walkY}px)`; // Aplica desplazamiento
});
