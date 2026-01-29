// ============================================
// SISTEMA DE POPUPS CARRUSEL - FRANCIA RAMÍREZ
// VERSIÓN CORRECTA: Slide 1 atractivo + Slides 2 y 3 diseño compacto original
// ============================================

class PromoCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 10000; // 10 segundos por slide
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isDragging = false;
        
        this.init();
    }

    init() {
        // Esperar a que la página cargue completamente
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.createCarousel();
        this.attachEventListeners();
        
        // Mostrar el carrusel después de 2 segundos de cargar la página
        setTimeout(() => {
            this.showCarousel();
        }, 2000);
    }

    createCarousel() {
        const carouselHTML = `
            <div class="promo-carousel-overlay" id="promoCarousel">
                <button class="promo-carousel-close" onclick="promoCarousel.closeCarousel()" aria-label="Cerrar promociones">
                    ×
                </button>
                
                <div class="promo-carousel-container">
                    <button class="promo-carousel-arrow prev" onclick="promoCarousel.prevSlide()" aria-label="Anterior">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    
                    <div class="promo-carousel-slides" id="promoSlides">
                        ${this.createSlide1()}
                        ${this.createSlide2()}
                        ${this.createSlide3()}
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

    // SLIDE 1: DISEÑO ULTRA ATRACTIVO (se mantiene)
    createSlide1() {
        return `
            <div class="promo-carousel-slide">
                <div class="promo-slide-content">
                    <div class="slide-paginas-web">
                        <div class="slide-header">
                            <h2>¿Su Unidad Residencial Necesita una <span class="highlight">Página Web Profesional</span>?</h2>
                            <p class="subtitle">Información ordenada, accesible y actualizada para todos sus residentes.<br><strong>Sin cláusulas de permanencia. Sin complicaciones.</strong></p>
                        </div>

                        <div class="features-grid">
                            <div class="feature-box">
                                <i class="fas fa-laptop-code"></i>
                                <h3>Diseño Personalizado</h3>
                                <p>Sitio web adaptado a las necesidades específicas de su conjunto residencial con su identidad visual.</p>
                            </div>

                            <div class="feature-box">
                                <i class="fas fa-file-alt"></i>
                                <h3>Secciones Esenciales</h3>
                                <p>Normas de convivencia, formularios digitales, contactos de emergencia y agenda de citas online.</p>
                            </div>

                            <div class="feature-box">
                                <i class="fas fa-mobile-alt"></i>
                                <h3>100% Responsive</h3>
                                <p>Perfecto en celulares, tablets y computadores. Accesible desde cualquier dispositivo.</p>
                            </div>

                            <div class="feature-box">
                                <i class="fas fa-shield-alt"></i>
                                <h3>Sin Permanencia</h3>
                                <p>Paga solo por el servicio mientras lo necesites. Sin ataduras ni contratos a largo plazo.</p>
                            </div>

                            <div class="feature-box">
                                <i class="fas fa-edit"></i>
                                <h3>Actualizaciones Incluidas</h3>
                                <p>Cambios de contenido, nuevos avisos y actualizaciones sin costo adicional durante el servicio.</p>
                            </div>

                            <div class="feature-box">
                                <i class="fas fa-headset"></i>
                                <h3>Soporte Continuo</h3>
                                <p>Asistencia técnica permanente. Respuesta rápida a cualquier inquietud o ajuste.</p>
                            </div>
                        </div>

                        <div class="slide-cta">
                            <a href="https://franciaramirezr-transcripciondeactas.github.io/PAGWEB-MODELO/" target="_blank" class="promo-btn">
                                <i class="fas fa-eye"></i> Ver Página de Ejemplo
                            </a>
                            <a href="https://wa.me/573176344778?text=Hola%20Francia,%20me%20interesa%20una%20página%20web%20para%20mi%20unidad%20residencial" target="_blank" class="promo-btn promo-btn-secondary">
                                <i class="fab fa-whatsapp"></i> Solicitar Información
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // SLIDE 2: DISEÑO ORIGINAL COMPACTO
    createSlide2() {
        return `
            <div class="promo-carousel-slide">
                <div class="promo-slide-content">
                    <div class="slide-asistencia">
                        <div class="slide-asistencia-left">
                            <h2>⏰ ¿Necesitas un Respiro?</h2>
                            <p class="subtitle-light">Asistencia Virtual & Presencial<br><strong>Sin Contratos • Pago por Días</strong></p>
                            
                            <ul class="situations-list">
                                <li>
                                    <i class="fas fa-umbrella-beach"></i>
                                    <span>Vacaciones merecidas sin preocupaciones</span>
                                </li>
                                <li>
                                    <i class="fas fa-user-md"></i>
                                    <span>Citas médicas sin abandonar tu puesto</span>
                                </li>
                                <li>
                                    <i class="fas fa-heart"></i>
                                    <span>Tiempo para tu familia cuando lo necesites</span>
                                </li>
                                <li>
                                    <i class="fas fa-handshake"></i>
                                    <span>Apoyo profesional cuando quieras</span>
                                </li>
                            </ul>

                            <div class="quote-text">
                                💼 Experiencia en Propiedad Horizontal<br>
                                📞 Llamadas • 📧 Correos • 👤 Presencial
                            </div>
                        </div>

                        <div class="slide-asistencia-right">
                            <div class="profile-photo-container">
                                <img src="foto_francia_2.png" alt="Francia Ramírez" onerror="this.src='logo_francia.jpg'">
                            </div>

                            <h3>Tu Tranquilidad, Mi Prioridad</h3>

                            <div class="benefits-list">
                                <div class="benefit-box">
                                    <i class="fas fa-dollar-sign"></i>
                                    <span>Pagas solo los días que necesites</span>
                                </div>

                                <div class="benefit-box">
                                    <i class="fas fa-clock"></i>
                                    <span>Disponibilidad según tu agenda</span>
                                </div>

                                <div class="benefit-box">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>Discreción y profesionalismo</span>
                                </div>
                            </div>

                            <div class="slide-cta">
                                <a href="https://wa.me/573176344778?text=Hola%20Francia,%20necesito%20asistencia" target="_blank" class="promo-btn">
                                    <i class="fab fa-whatsapp"></i> Solicitar Ahora
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // SLIDE 3: DISEÑO ORIGINAL COMPACTO
    createSlide3() {
        return `
            <div class="promo-carousel-slide">
                <div class="promo-slide-content">
                    <div class="slide-transcripcion">
                        <div class="promo-tag">
                            ⚡ PRECIOS 2026 - INCREÍBLES
                        </div>

                        <h2><span class="gold-text">Transcripción de Actas</span><br>Ahorra hasta 50%</h2>
                        <p class="subtitle">Calidad profesional • Entrega 3-5 días • Confidencial</p>

                        <div class="pricing-grid">
                            <div class="pricing-box">
                                <h3>1 Hora</h3>
                                <p class="duration"><i class="fas fa-clock"></i> 60 min</p>
                                <div class="original-price">$70.000</div>
                                <div class="current-price">$44.070</div>
                                <ul class="pricing-features">
                                    <li><i class="fas fa-check-circle"></i> Formato profesional</li>
                                    <li><i class="fas fa-check-circle"></i> 1 revisión</li>
                                </ul>
                            </div>

                            <div class="pricing-box highlighted">
                                <div class="best-value-tag">⭐ RECOMENDADO</div>
                                <h3>3 Horas</h3>
                                <p class="duration"><i class="fas fa-clock"></i> 180 min</p>
                                <div class="original-price">$210.000</div>
                                <div class="current-price">$107.350</div>
                                <div class="savings"><i class="fas fa-fire"></i> ¡Ahorras $102.650!</div>
                                <ul class="pricing-features">
                                    <li><i class="fas fa-check-circle"></i> Formato profesional</li>
                                    <li><i class="fas fa-check-circle"></i> 2 revisiones</li>
                                    <li class="highlight-feature"><i class="fas fa-star"></i> Mejor precio</li>
                                </ul>
                            </div>

                            <div class="pricing-box">
                                <h3>Adicional</h3>
                                <p class="duration"><i class="fas fa-clock"></i> c/30 min</p>
                                <div class="original-price">$35.000</div>
                                <div class="current-price">$11.300</div>
                                <ul class="pricing-features">
                                    <li><i class="fas fa-check-circle"></i> Después de 3h</li>
                                    <li><i class="fas fa-check-circle"></i> Misma calidad</li>
                                </ul>
                            </div>
                        </div>

                        <div class="slide-cta">
                            <a href="#" onclick="promoCarousel.closeAndOpenForm(); return false;" class="promo-btn">
                                <i class="fas fa-calculator"></i> Cotizar Ahora
                            </a>
                            <a href="https://wa.me/573176344778?text=Hola%20Francia,%20quiero%20info%20de%20transcripción" target="_blank" class="promo-btn promo-btn-secondary">
                                <i class="fab fa-whatsapp"></i> WhatsApp
                            </a>
                        </div>

                        <div class="conditions-note">
                            <i class="fas fa-shield-alt"></i> Anticipo 50% • Confidencial • Formato Ley 675
                        </div>
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
        }

        this.touchStartX = 0;
        this.touchEndX = 0;
        this.startAutoPlay();
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
        }

        this.isDragging = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.startAutoPlay();
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
        this.startAutoPlay();
    }

    closeCarousel() {
        const carousel = document.getElementById('promoCarousel');
        if (!carousel) return;

        carousel.classList.remove('active');
        document.body.style.overflow = '';
        this.stopAutoPlay();
    }

    closeAndOpenForm() {
        this.closeCarousel();
        // Intentar abrir el modal de cotización si existe
        setTimeout(() => {
            const modal = document.getElementById('modalCotizacion');
            if (modal) {
                modal.style.display = 'block';
            }
        }, 300);
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
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    updateSlide() {
        const slidesContainer = document.getElementById('promoSlides');
        const indicators = document.querySelectorAll('.promo-carousel-indicator');
        
        if (!slidesContainer) return;

        const offset = -this.currentSlide * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Limpiar cualquier intervalo existente
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Inicializar el carrusel
const promoCarousel = new PromoCarousel();

// Función global para reabrir el carrusel si se necesita
function openPromoCarousel() {
    promoCarousel.showCarousel();
}
