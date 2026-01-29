// ============================================
// SISTEMA DE POPUPS CARRUSEL - FRANCIA RAMÍREZ
// ============================================

class PromoCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 10000; // 10 segundos por slide (antes 6)
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

    createSlide2() {
        return `
            <div class="promo-carousel-slide">
                <div class="promo-slide-content">
                    <div class="slide-asistencia">
                        <div class="slide-asistencia-left">
                            <h2>¿Necesitas Tiempo Para Ti?</h2>
                            <p class="subtitle-light">Asistencia Virtual y Presencial sin Contratación Permanente</p>
                            
                            <ul class="situations-list">
                                <li>
                                    <i class="fas fa-umbrella-beach"></i>
                                    <span><strong>¿Deseas vacaciones?</strong> Yo me encargo de tu trabajo mientras descansas.</span>
                                </li>
                                <li>
                                    <i class="fas fa-user-md"></i>
                                    <span><strong>¿Tienes una cita médica?</strong> Cubro tu asistencia presencial ese día.</span>
                                </li>
                                <li>
                                    <i class="fas fa-calendar-check"></i>
                                    <span><strong>¿Compromiso familiar urgente?</strong> Atiendo llamadas, correos y visitas.</span>
                                </li>
                                <li>
                                    <i class="fas fa-briefcase"></i>
                                    <span><strong>¿Necesitas apoyo puntual?</strong> Sin salarios fijos, sin contratos largos.</span>
                                </li>
                            </ul>

                            <div class="quote-text">
                                <i class="fas fa-quote-left" style="font-size: 1rem; opacity: 0.6;"></i>
                                Equilibra tu vida personal y laboral sin culpas ni complicaciones.
                                <i class="fas fa-quote-right" style="font-size: 1rem; opacity: 0.6;"></i>
                            </div>
                        </div>

                        <div class="slide-asistencia-right">
                            <div class="profile-photo-container">
                                <img src="foto_francia_2.png" alt="Francia Ramírez - Asistente Virtual" onerror="this.src='logo_francia.jpg'">
                            </div>

                            <h3>Asistencia Profesional Cuando la Necesites</h3>

                            <div class="benefits-list">
                                <div class="benefit-box">
                                    <i class="fas fa-phone-alt"></i>
                                    <span><strong>Atención de llamadas</strong> y gestión de comunicaciones</span>
                                </div>

                                <div class="benefit-box">
                                    <i class="fas fa-envelope"></i>
                                    <span><strong>Gestión de correos</strong> y respuestas profesionales</span>
                                </div>

                                <div class="benefit-box">
                                    <i class="fas fa-user-tie"></i>
                                    <span><strong>Asistencia presencial</strong> en tu lugar de trabajo</span>
                                </div>

                                <div class="benefit-box">
                                    <i class="fas fa-dollar-sign"></i>
                                    <span><strong>Pago por días trabajados</strong> sin compromisos mensuales</span>
                                </div>

                                <div class="benefit-box">
                                    <i class="fas fa-clock"></i>
                                    <span><strong>Disponibilidad flexible</strong> según tus necesidades</span>
                                </div>

                                <div class="benefit-box">
                                    <i class="fas fa-handshake"></i>
                                    <span><strong>Experiencia en propiedad horizontal</strong> y administración</span>
                                </div>
                            </div>

                            <div class="slide-cta">
                                <a href="https://wa.me/573176344778?text=Hola%20Francia,%20necesito%20asistencia%20virtual%20o%20presencial" target="_blank" class="promo-btn">
                                    <i class="fab fa-whatsapp"></i> Solicitar Asistencia
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createSlide3() {
        return `
            <div class="promo-carousel-slide">
                <div class="promo-slide-content">
                    <div class="slide-transcripcion">
                        <div class="promo-tag">
                            <i class="fas fa-star"></i> ¡NUEVOS PRECIOS 2026!
                        </div>

                        <h2><span class="gold-text">Transcripción de Actas</span><br>¡Precios Fantásticos!</h2>
                        <p class="subtitle">Aprovecha nuestras nuevas tarifas competitivas.<br>Calidad profesional al mejor precio del mercado.</p>

                        <div class="pricing-grid">
                            <div class="pricing-box">
                                <h3>Hasta 1 Hora</h3>
                                <p class="duration"><i class="fas fa-clock"></i> 60 minutos</p>
                                <div class="original-price">$ 70.000 COP</div>
                                <div class="current-price">$ 44.070 COP</div>
                                <div class="savings"><i class="fas fa-piggy-bank"></i> Ahorras $ 25.930</div>
                                <ul class="pricing-features">
                                    <li><i class="fas fa-check-circle"></i> Transcripción completa</li>
                                    <li><i class="fas fa-check-circle"></i> Formato profesional</li>
                                    <li><i class="fas fa-check-circle"></i> Entrega en 3-5 días</li>
                                    <li><i class="fas fa-check-circle"></i> 1 revisión incluida</li>
                                </ul>
                            </div>

                            <div class="pricing-box highlighted">
                                <div class="best-value-tag">⭐ MÁS POPULAR</div>
                                <h3>Hasta 3 Horas</h3>
                                <p class="duration"><i class="fas fa-clock"></i> 180 minutos</p>
                                <div class="original-price">$ 210.000 COP</div>
                                <div class="current-price">$ 107.350 COP</div>
                                <div class="savings"><i class="fas fa-piggy-bank"></i> ¡Ahorras $ 102.650!</div>
                                <ul class="pricing-features">
                                    <li><i class="fas fa-check-circle"></i> Transcripción completa</li>
                                    <li><i class="fas fa-check-circle"></i> Formato profesional</li>
                                    <li><i class="fas fa-check-circle"></i> Entrega en 3-5 días</li>
                                    <li><i class="fas fa-check-circle"></i> 2 revisiones incluidas</li>
                                    <li class="highlight-feature"><i class="fas fa-star"></i> ¡Mejor relación calidad-precio!</li>
                                </ul>
                            </div>

                            <div class="pricing-box">
                                <h3>Adicionales</h3>
                                <p class="duration"><i class="fas fa-clock"></i> Cada 30 min</p>
                                <div class="original-price">$ 35.000 COP</div>
                                <div class="current-price">$ 11.300 COP</div>
                                <div class="savings"><i class="fas fa-piggy-bank"></i> Ahorras $ 23.700</div>
                                <ul class="pricing-features">
                                    <li><i class="fas fa-check-circle"></i> Después de 3 horas</li>
                                    <li><i class="fas fa-check-circle"></i> Mismo estándar de calidad</li>
                                    <li><i class="fas fa-check-circle"></i> Precio por fracción</li>
                                    <li><i class="fas fa-check-circle"></i> Sin límite de duración</li>
                                </ul>
                            </div>
                        </div>

                        <div class="slide-cta">
                            <a href="#" onclick="promoCarousel.closeAndOpenForm(); return false;" class="promo-btn">
                                <i class="fas fa-calculator"></i> Cotizar Mi Acta Ahora
                            </a>
                            <a href="https://wa.me/573176344778?text=Hola%20Francia,%20quiero%20información%20sobre%20los%20nuevos%20precios%20de%20transcripción" target="_blank" class="promo-btn promo-btn-secondary">
                                <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
                            </a>
                        </div>

                        <div class="conditions-note">
                            <i class="fas fa-info-circle"></i> <strong>Condiciones:</strong> Anticipo 50% | Entrega 3-5 días hábiles | Confidencialidad garantizada
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
            if (typeof abrirModalCotizacion === 'function') {
                abrirModalCotizacion();
            } else {
                // Si no existe la función, buscar el botón de cotización y hacer click
                const cotizarBtn = document.querySelector('a[href*="Cotización"], a[onclick*="cotizacion"]');
                if (cotizarBtn) {
                    cotizarBtn.click();
                }
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
