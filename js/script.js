// Fungsi untuk animasi scroll halus
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Fungsi untuk menambahkan kelas 'active' pada menu navigasi
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Jalankan fungsi saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
});

// Efek parallax untuk hero section
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Animasi untuk card saat di-scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .photo');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);