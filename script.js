document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí puedes agregar la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    this.reset();
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