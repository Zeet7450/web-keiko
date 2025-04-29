// Main JavaScript for Kenangan Sekolah Keiko Template

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua fungsi
    initNavigation();
    initScrollAnimation();
    initGalleryFilter();
    initMessageFilter();
    initLightbox();
    initFormValidation();
    initTimelineAnimation();
    initMomentsTags();
});

// Fungsi untuk navigasi
function initNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Highlight link aktif berdasarkan halaman saat ini
    navLinks.forEach(link => {
        if (link.getAttribute('href') === location.pathname.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // Tambahkan efek smooth scroll untuk link dalam halaman
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('nav ul');
            navMenu.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
}

// Fungsi untuk animasi scroll
function initScrollAnimation() {
    // Animasi elemen saat scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
        const checkScroll = function() {
            animateElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('animated');
                }
            });
        };
        
        // Check posisi elemen saat halaman dimuat
        checkScroll();
        
        // Check posisi elemen saat scroll
        window.addEventListener('scroll', checkScroll);
    }
}

// Fungsi untuk filter galeri
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Hapus kelas active dari semua tombol
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Tambahkan kelas active ke tombol yang diklik
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter item galeri
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Fungsi untuk filter pesan
function initMessageFilter() {
    const messageFilterButtons = document.querySelectorAll('.messages-filter .filter-btn');
    const messageCards = document.querySelectorAll('.message-card');
    
    if (messageFilterButtons.length > 0 && messageCards.length > 0) {
        messageFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Hapus kelas active dari semua tombol
                messageFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Tambahkan kelas active ke tombol yang diklik
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter kartu pesan
                messageCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Fungsi untuk lightbox galeri
function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img, .photo img, .moment-image img');
    
    if (galleryImages.length > 0) {
        // Buat elemen lightbox
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-container">
                <div class="lightbox-content">
                    <img src="" alt="Lightbox Image">
                    <div class="lightbox-caption"></div>
                </div>
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">&lsaquo;</button>
                <button class="lightbox-next">&rsaquo;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Variabel untuk menyimpan indeks gambar saat ini
        let currentIndex = 0;
        
        // Fungsi untuk membuka lightbox
        const openLightbox = function(index) {
            currentIndex = index;
            const image = galleryImages[currentIndex];
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.src = image.src;
            
            // Cari caption jika ada
            let caption = '';
            if (image.closest('.gallery-item')) {
                const captionElement = image.closest('.gallery-item').querySelector('.gallery-caption h3');
                if (captionElement) {
                    caption = captionElement.textContent;
                }
            }
            
            const lightboxCaption = lightbox.querySelector('.lightbox-caption');
            lightboxCaption.textContent = caption;
            
            lightbox.style.display = 'flex';
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Nonaktifkan scroll pada body
            document.body.style.overflow = 'hidden';
        };
        
        // Fungsi untuk menutup lightbox
        const closeLightbox = function() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
            
            // Aktifkan kembali scroll pada body
            document.body.style.overflow = '';
        };
        
        // Fungsi untuk navigasi ke gambar sebelumnya
        const prevImage = function() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            const image = galleryImages[currentIndex];
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.src = image.src;
            
            // Cari caption jika ada
            let caption = '';
            if (image.closest('.gallery-item')) {
                const captionElement = image.closest('.gallery-item').querySelector('.gallery-caption h3');
                if (captionElement) {
                    caption = captionElement.textContent;
                }
            }
            
            const lightboxCaption = lightbox.querySelector('.lightbox-caption');
            lightboxCaption.textContent = caption;
        };
        
        // Fungsi untuk navigasi ke gambar berikutnya
        const nextImage = function() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            const image = galleryImages[currentIndex];
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.src = image.src;
            
            // Cari caption jika ada
            let caption = '';
            if (image.closest('.gallery-item')) {
                const captionElement = image.closest('.gallery-item').querySelector('.gallery-caption h3');
                if (captionElement) {
                    caption = captionElement.textContent;
                }
            }
            
            const lightboxCaption = lightbox.querySelector('.lightbox-caption');
            lightboxCaption.textContent = caption;
        };
        
        // Event listener untuk gambar
        galleryImages.forEach((image, index) => {
            image.addEventListener('click', function() {
                openLightbox(index);
            });
        });
        
        // Event listener untuk tombol close
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        
        // Event listener untuk tombol prev
        lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);
        
        // Event listener untuk tombol next
        lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
        
        // Event listener untuk menutup lightbox saat klik di luar gambar
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Event listener untuk keyboard
        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    prevImage();
                } else if (e.key === 'ArrowRight') {
                    nextImage();
                }
            }
        });
    }
}

// Fungsi untuk validasi form
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                let isValid = true;
                
                // Validasi input yang required
                const requiredInputs = form.querySelectorAll('[required]');
                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        
                        // Tambahkan pesan error jika belum ada
                        let errorMessage = input.nextElementSibling;
                        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                            errorMessage = document.createElement('div');
                            errorMessage.classList.add('error-message');
                            errorMessage.textContent = 'Bidang ini wajib diisi';
                            input.parentNode.insertBefore(errorMessage, input.nextSibling);
                        }
                    } else {
                        input.classList.remove('error');
                        
                        // Hapus pesan error jika ada
                        const errorMessage = input.nextElementSibling;
                        if (errorMessage && errorMessage.classList.contains('error-message')) {
                            errorMessage.remove();
                        }
                    }
                });
                
                // Validasi email jika ada
                const emailInputs = form.querySelectorAll('input[type="email"]');
                emailInputs.forEach(input => {
                    if (input.value.trim() && !validateEmail(input.value)) {
                        isValid = false;
                        input.classList.add('error');
                        
                        // Tambahkan pesan error jika belum ada
                        let errorMessage = input.nextElementSibling;
                        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                            errorMessage = document.createElement('div');
                            errorMessage.classList.add('error-message');
                            errorMessage.textContent = 'Format email tidak valid';
                            input.parentNode.insertBefore(errorMessage, input.nextSibling);
                        } else {
                            errorMessage.textContent = 'Format email tidak valid';
                        }
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                } else {
                    // Tampilkan pesan sukses jika form valid
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.textContent = 'Pesan berhasil dikirim!';
                    
                    form.reset();
                    form.parentNode.insertBefore(successMessage, form.nextSibling);
                    
                    // Hapus pesan sukses setelah beberapa detik
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                    
                    e.preventDefault(); // Prevent actual form submission for demo
                }
            });
            
            // Hapus kelas error saat input diubah
            form.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                    
                    // Hapus pesan error jika ada
                    const errorMessage = this.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                });
            });
        });
    }
}

// Fungsi untuk validasi email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Fungsi untuk animasi timeline
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        const animateTimeline = function() {
            timelineItems.forEach(item => {
                const itemPosition = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (itemPosition < screenPosition) {
                    item.classList.add('show');
                }
            });
        };
        
        // Tambahkan kelas untuk animasi
        timelineItems.forEach(item => {
            item.classList.add('timeline-animate');
        });
        
        // Check posisi item saat halaman dimuat
        animateTimeline();
        
        // Check posisi item saat scroll
        window.addEventListener('scroll', animateTimeline);
    }
}

// Fungsi untuk filter momen berdasarkan tag
function initMomentsTags() {
    const momentTags = document.querySelectorAll('.moment-tag');
    const momentCards = document.querySelectorAll('.moment-card');
    
    if (momentTags.length > 0 && momentCards.length > 0) {
        momentTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const tagValue = this.textContent.trim().toLowerCase();
                
                // Toggle kelas active pada tag
                this.classList.toggle('active');
                
                // Dapatkan semua tag yang aktif
                const activeTags = Array.from(document.querySelectorAll('.moment-tag.active')).map(tag => tag.textContent.trim().toLowerCase());
                
                // Jika tidak ada tag yang aktif, tampilkan semua momen
                if (activeTags.length === 0) {
                    momentCards.forEach(card => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    });
                    return;
                }
                
                // Filter momen berdasarkan tag yang aktif
                momentCards.forEach(card => {
                    const cardTags = Array.from(card.querySelectorAll('.moment-tag')).map(tag => tag.textContent.trim().toLowerCase());
                    
                    // Cek apakah kartu memiliki setidaknya satu tag yang aktif
                    const hasActiveTag = cardTags.some(tag => activeTags.includes(tag));
                    
                    if (hasActiveTag) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Tambahkan CSS untuk lightbox
(function() {
    const style = document.createElement('style');
    style.textContent = `
        #lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox-container {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            border: 5px solid white;
            border-radius: 5px;
        }
        
        .lightbox-caption {
            color: white;
            margin-top: 15px;
            font-size: 1.2rem;
            text-align: center;
        }
        
        .lightbox-close, .lightbox-prev, .lightbox-next {
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            position: absolute;
            transition: all 0.3s ease;
        }
        
        .lightbox-close {
            top: -40px;
            right: -40px;
        }
        
        .lightbox-prev {
            left: -60px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 3rem;
        }
        
        .lightbox-next {
            right: -60px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 3rem;
        }
        
        .lightbox-close:hover, .lightbox-prev:hover, .lightbox-next:hover {
            color: #5DA9E9;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.9rem;
            margin-top: 5px;
        }
        
        .success-message {
            background-color: #2ecc71;
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: center;
        }
        
        input.error, textarea.error {
            border-color: #e74c3c !important;
        }
        
        .timeline-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .timeline-animate.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .moment-tag.active {
            background-color: #4E89AE;
            color: white;
        }
        
        @media (max-width: 768px) {
            .lightbox-prev {
                left: 10px;
            }
            
            .lightbox-next {
                right: 10px;
            }
            
            .lightbox-close {
                top: 10px;
                right: 10px;
            }
        }
    `;
    document.head.appendChild(style);
})();

// Fungsi untuk tab pada halaman Perkembangan Diri
function initGrowthTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Hapus kelas active dari semua tombol dan konten
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Tambahkan kelas active ke tombol yang diklik
                this.classList.add('active');
                
                // Tampilkan konten yang sesuai
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

// Tambahkan fungsi initGrowthTabs ke DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua fungsi
    initNavigation();
    initScrollAnimation();
    initGalleryFilter();
    initMessageFilter();
    initLightbox();
    initFormValidation();
    initTimelineAnimation();
    initMomentsTags();
    initGrowthTabs(); // Tambahkan ini
    
    // Inisialisasi animasi skill bar
    initSkillBars();
});

// Fungsi untuk animasi skill bar
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
        const animateSkills = function() {
            skillBars.forEach(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (barPosition < screenPosition) {
                    // Ambil width dari style inline
                    const width = bar.style.width;
                    
                    // Reset width ke 0 terlebih dahulu
                    bar.style.width = '0%';
                    
                    // Animasikan ke width yang sebenarnya
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                }
            });
        };
        
        // Check posisi skill bar saat halaman dimuat
        animateSkills();
        
        // Check posisi skill bar saat tab diubah
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', animateSkills);
        });
        
        // Check posisi skill bar saat scroll
        window.addEventListener('scroll', animateSkills);
    }
}