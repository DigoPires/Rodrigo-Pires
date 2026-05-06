// Nav-bar Flutuante e Inteligente
class SmartNavbar {
    constructor() {
        this.nav = document.getElementById('smart-nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navToggle = document.getElementById('nav-toggle-btn');
        this.navMenu = document.querySelector('.nav-menu');
        this.isVisible = false;
        this.currentSection = '';
        this.lastScrollY = 0;
        this.scrollThreshold = 100;
        
        this.init();
    }
    
    init() {
        // Detectar scroll
        this.handleScroll();
        
        // Configurar links
        this.setupLinks();
        
        // Configurar toggle mobile
        this.setupMobileToggle();
        
        // Detectar seção atual
        this.detectCurrentSection();
        
        // Event listeners
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        window.addEventListener('resize', () => this.handleResize(), { passive: true });
    }
    
        
    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        const isMobile = window.innerWidth <= 728;
        
        if (isMobile) {
            if (currentScrollY > 50) {
                if (!this.isVisible) {
                    this.show();
                }
            } else {
                if (this.isVisible) {
                    this.hide();
                }
            }
        } else {
            // Desktop: comportamento normal de scroll
            if (currentScrollY > this.scrollThreshold) {
                if (!this.isVisible) {
                    this.show();
                }
            } else {
                if (this.isVisible && scrollDirection === 'up' && currentScrollY < this.scrollThreshold - 50) {
                    this.hide();
                }
            }
        }
        
        this.lastScrollY = currentScrollY;
    }
    
    show() {
        this.isVisible = true;
        this.nav.classList.add('visible');
        
        // Animação de entrada suave
        this.nav.style.transform = 'translateX(-50%) translateY(0)';
        this.nav.style.opacity = '1';
        this.nav.style.visibility = 'visible';
        this.nav.style.pointerEvents = 'auto';
    }
    
    hide() {
        this.isVisible = false;
        this.nav.classList.remove('visible');
        
        // Animação de saída suave
        this.nav.style.transform = 'translateX(-50%) translateY(-20px)';
        this.nav.style.opacity = '0';
        this.nav.style.visibility = 'hidden';
        this.nav.style.pointerEvents = 'none';
    }
    
    setupLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.setActiveLink(targetId);
                
                // Não fechar menu mobile automaticamente - usuário decide quando fechar
                // Menu permanece aberto e ícone continua como X
            });
        });
    }
    
    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const offset = 80; // Offset para compensar a nav-bar
            const targetPosition = targetSection.offsetTop - offset;
            
            // Smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    setActiveLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }
    
    detectCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (sectionId !== this.currentSection) {
                        this.currentSection = sectionId;
                        this.setActiveLink(sectionId);
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
    
    setupMobileToggle() {
        if (this.navToggle && this.navMenu) {
            
            
            // O CSS responde ao estado do menu; limpar estilos inline para evitar conflitos
            if (window.innerWidth <= 728) {
                this.navMenu.style.display = '';
            }
            
            this.navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle menu
                const isActive = this.navMenu.classList.toggle('active');
                this.navToggle.classList.toggle('active');
                this.navMenu.style.display = '';
                this.navMenu.style.opacity = '';
                this.navMenu.style.visibility = '';
                
                // Change icon based on state
                const icon = this.navToggle.querySelector('i');
                if (isActive) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            // Não fechar menu ao clicar fora - usuário decide quando fechar
            // Menu permanece aberto até usuário clicar no toggle novamente
        }
    }
    
    handleResize() {
        // Ajustar comportamento baseado no tamanho da tela
        const isMobile = window.innerWidth <= 728;
        
        if (isMobile) {
            // Em mobile, mantém a nav visível se estiver ativa
            if (this.isVisible) {
                this.show();
            }
        } else {
            // Em desktop, usa o comportamento normal de scroll
            if (window.scrollY <= this.scrollThreshold) {
                this.hide();
            }
            // Garante que o menu mobile esteja fechado em desktop
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
        }
    }
    
    // Método público para controle externo
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
}

// Tratar erros de searchAnalyzer que não são do nosso código
window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('Search engine null is not supported')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}, true);

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new SmartNavbar();
});
