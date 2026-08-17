// ============================================
// SISTEMA DE POPUP PROMOCIONAL - FRANCIA RAMÍREZ
// VERSIÓN: Solo Video + Infografía (2 pantallas)
// ============================================
//
// CÓMO CAMBIAR EL VIDEO O LA INFOGRAFÍA:
// 1) Sube tu archivo de video a la carpeta del proyecto y reemplaza
//    el nombre "promo-video.mp4" en VIDEO_SRC más abajo (o renombra
//    tu archivo a exactamente ese nombre).
// 2) Sube tu imagen de infografía y reemplaza "promo-infografia.jpg"
//    en INFOGRAFIA_SRC (o renombra tu archivo a ese nombre).
// 3) Cambia el número de WhatsApp / enlace del botón si hace falta.
// ============================================

const VIDEO_SRC = 'promo-video.mp4';
const INFOGRAFIA_SRC = 'promo-infografia.jpg';
const WHATSAPP_LINK = 'https://wa.me/573176344778?text=Hola%20Francia,%20me%20interesa%20su%20promoci%C3%B3n';

class PromoCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 2; // 0 = video, 1 = infografía
        this.autoPlayTimeout = null;

        this.infografiaDelay = 8000;   // ms que se muestra la infografía antes de volver al video
        this.videoFallbackDelay = 25000; // ms de respaldo si el navegador bloquea el autoplay del video

        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isDragging = false;

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.createCarousel();
        this.attachEventListeners();

        // Mostrar el popup 2 segundos después de cargar la página
        setTimeout(() => {
            this.showCarousel();
        }, 2000);
    }

    createCarousel() {
        const carouselHTML = `
            <div class="promo-carousel-overlay" id="promoCarousel">
                <button class="promo-carousel-close" onclick="promoCarousel.closeCarousel()" aria-label="Cerrar promoción">
                    ×
                </button>

                <div class="promo-carousel-container">
                    <button class="promo-carousel-arrow prev" onclick="promoCarousel.prevSlide()" aria-label="Anterior">
                        <i class="fas fa-chevron-left"></i>
                    </button>

                    <div class="promo-carousel-slides" id="promoSlides">
                        ${this.createSlideVideo()}
                        ${this.createSlideInfografia()}
                    </div>

                    <button class="promo-carousel-arrow next" onclick="promoCarousel.nextSlide()" aria-label="Siguiente">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>

                <div class="promo-carousel-indicators">
                    ${Array(this.totalSlides).fill(0).map((_, i) =>
                        `<span class="promo-carousel-indicator ${i === 0 ? 'active' : ''}" onclick="promoCarousel.goToSlide(${i})"></span>`
                    ).join('')}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', carouselHTML);
    }

    // PANTALLA 1: VIDEO
    createSlideVideo() {
        return `
            <div class="promo-carousel-slide">
                <div class="promo-slide-content promo-slide-media">
                    <div class="slide-video">
                        <video id="promoVideo" class="promo-video" playsinline muted autoplay preload="auto">
                            <source src="${VIDEO_SRC}" type="video/mp4">
                            Tu navegador no soporta la reproducción de video.
                        </video>
                        <button class="promo-video-unmute" id="promoVideoUnmute" aria-label="Activar sonido" title="Activar sonido">
                            <i class="fas fa-volume-mute"></i>
                        </button>
                    </div>
                    <div class="slide-media-cta">
                        <a href="${WHATSAPP_LINK}" target="_blank" class="promo-btn">
                            <i class="fab fa-whatsapp"></i> Quiero saber más
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // PANTALLA 2: INFOGRAFÍA
    createSlideInfografia() {
        return `
            <div class="promo-carousel-slide">
                <div class="promo-slide-content promo-slide-media">
                    <div class="slide-infografia">
                        <img src="${INFOGRAFIA_SRC}" alt="Promoción Francia Ramírez">
                    </div>
                    <div class="slide-media-cta">
                        <a href="${WHATSAPP_LINK}" target="_blank" class="promo-btn">
                            <i class="fab fa-whatsapp"></i> Quiero saber más
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const carousel = document.getElementById('promoCarousel');
        const slidesContainer = document.getElementById('promoSlides');

        if (!carousel || !slidesContainer) return;

        // Touch events para dispositivos móviles
        slidesContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        slidesContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        slidesContainer.addEventListener('touchend', () => this.handleTouchEnd());

        // Mouse events para desktop (arrastrar)
        slidesContainer.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        slidesContainer.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        slidesContainer.addEventListener('mouseup', () => this.handleMouseUp());
        slidesContainer.addEventListener('mouseleave', () => this.handleMouseUp());

        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Prevenir scroll del body cuando el carousel está activo
        carousel.addEventListener('wheel', (e) => {
            if (carousel.classList.contains('active')) {
                e.stopPropagation();
            }
        });

        // Cuando el video termina, avanzar automáticamente a la infografía
        const video = document.getElementById('promoVideo');
        if (video) {
            video.addEventListener('ended', () => {
                if (this.currentSlide === 0) {
                    this.nextSlide();
                }
            });
        }

        // Botón de activar/silenciar sonido del video
        const unmuteBtn = document.getElementById('promoVideoUnmute');
        if (unmuteBtn && video) {
            unmuteBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                unmuteBtn.innerHTML = video.muted
                    ? '<i class="fas fa-volume-mute"></i>'
                    : '<i class="fas fa-volume-up"></i>';
                if (!video.muted) {
                    video.play().catch(() => {});
                }
            });
        }
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
        this.stopAutoPlay();
    }

    handleTouchMove(e) {
        this.touchEndX = e.changedTouches[0].screenX;
    }

    handleTouchEnd() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        } else {
            this.startAutoPlay();
        }

        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    handleMouseDown(e) {
        this.isDragging = true;
        this.touchStartX = e.pageX;
        this.stopAutoPlay();
        e.preventDefault();
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.touchEndX = e.pageX;
    }

    handleMouseUp() {
        if (!this.isDragging) return;

        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        } else {
            this.startAutoPlay();
        }

        this.isDragging = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    handleKeyPress(e) {
        const carousel = document.getElementById('promoCarousel');
        if (!carousel || !carousel.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            this.prevSlide();
        } else if (e.key === 'ArrowRight') {
            this.nextSlide();
        } else if (e.key === 'Escape') {
            this.closeCarousel();
        }
    }

    showCarousel() {
        const carousel = document.getElementById('promoCarousel');
        if (!carousel) return;

        carousel.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Intentar reproducir el video desde el inicio
        const video = document.getElementById('promoVideo');
        if (video) {
            video.currentTime = 0;
            video.play().catch(() => {
                // Si el navegador bloquea el autoplay, el temporizador de respaldo
                // igualmente avanzará a la infografía.
            });
        }

        this.startAutoPlay();
    }

    closeCarousel() {
        const carousel = document.getElementById('promoCarousel');
        if (!carousel) return;

        carousel.classList.remove('active');
        document.body.style.overflow = '';
        this.stopAutoPlay();

        const video = document.getElementById('promoVideo');
        if (video) video.pause();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }

    updateSlide() {
        const slidesContainer = document.getElementById('promoSlides');
        const indicators = document.querySelectorAll('.promo-carousel-indicator');
        const video = document.getElementById('promoVideo');

        if (!slidesContainer) return;

        const offset = -this.currentSlide * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // Controlar reproducción del video según la pantalla activa
        if (video) {
            if (this.currentSlide === 0) {
                video.currentTime = 0;
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        }

        this.startAutoPlay();
    }

    startAutoPlay() {
        this.stopAutoPlay();

        if (this.currentSlide === 0) {
            // El video avanza solo al terminar (evento 'ended').
            // Este temporizador es un respaldo por si el navegador bloquea el autoplay.
            this.autoPlayTimeout = setTimeout(() => this.nextSlide(), this.videoFallbackDelay);
        } else {
            this.autoPlayTimeout = setTimeout(() => this.nextSlide(), this.infografiaDelay);
        }
    }

    stopAutoPlay() {
        if (this.autoPlayTimeout) {
            clearTimeout(this.autoPlayTimeout);
            this.autoPlayTimeout = null;
        }
    }
}

// Inicializar el carrusel
const promoCarousel = new PromoCarousel();

// Función global para reabrir el popup si se necesita
function openPromoCarousel() {
    promoCarousel.showCarousel();
}
