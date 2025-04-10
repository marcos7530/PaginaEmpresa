// Inicializar EmailJS
(function() {
    // Reemplaza "TU_PUBLIC_KEY" con tu Public Key de EmailJS
    // Puedes encontrarlo en tu dashboard de EmailJS bajo "Account" > "API Keys"
    emailjs.init("CUjB5TjoCWx18Okb3");
})();

// Función para animar contadores
function animateCounter(element, target, duration = 3500) {
    let start = 0;
    const startTime = performance.now();
    
    const counter = setInterval(() => {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Función de easing para hacer la animación más suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        start = target * easeOutQuart;

        if (progress >= 1) {
            element.textContent = '+' + Math.floor(target);
            clearInterval(counter);
        } else {
            element.textContent = '+' + Math.floor(start);
        }
    }, 16);
}

// Función para verificar si un elemento está visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Iniciar animación cuando la sección sea visible
function handleScrollAnimation() {
    const statsSection = document.querySelector('.stats');
    if (isElementInViewport(statsSection)) {
        const counters = document.querySelectorAll('.stat-item h3');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace('+', ''));
            if (!counter.dataset.animated) {
                counter.dataset.animated = true;
                animateCounter(counter, target);
            }
        });
        // Remover el event listener una vez que se haya animado
        window.removeEventListener('scroll', handleScrollAnimation);
    }
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mostrar indicador de carga
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    // Obtener los valores del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value
    };

    // Enviar el correo usando EmailJS
    // Reemplaza 'TU_SERVICE_ID' con el ID de tu servicio de EmailJS
    // Reemplaza 'TU_TEMPLATE_ID' con el ID de la plantilla que creaste
    emailjs.send('service_bmhhcvd', 'template_qt2wtma', formData)
        .then(function() {
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            document.getElementById('contact-form').reset();
        })
        .catch(function(error) {
            alert('Lo sentimos, hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
            console.error('Error:', error);
        })
        .finally(function() {
            // Restaurar el botón
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
});

// Animación suave para el scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('toggleMusic');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    // Iniciar la animación de los contadores cuando la página cargue
    handleScrollAnimation();
    // Agregar event listener para el scroll
    window.addEventListener('scroll', handleScrollAnimation);

    // Ajustar el volumen de la música
    bgMusic.volume = 0.3;

    // Intentar reproducir la música automáticamente
    const playMusic = async () => {
        try {
            await bgMusic.play();
            isPlaying = true;
            musicToggle.classList.add('playing');
        } catch (error) {
            console.log("No se pudo reproducir automáticamente la música:", error);
            // Si falla la reproducción automática, esperamos interacción del usuario
            document.addEventListener('click', function initMusic() {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    musicToggle.classList.add('playing');
                    // Removemos el event listener después de la primera interacción
                    document.removeEventListener('click', initMusic);
                }).catch(error => console.log("Error al reproducir la música:", error));
            }, { once: true });
        }
    };

    playMusic();

    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play().catch(function(error) {
                console.log("Error al reproducir la música:", error);
            });
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}); 