// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações ao fazer scroll
    initScrollAnimations();
    
    // Inicializar animação das barras de proficiência
    initProficiencyBars();
    
    // Adicionar efeito de digitação ao título principal
    initTypingEffect();
    
    // Inicializar navegação suave
    initSmoothNavigation();
    
    // Inicializar efeito parallax suave no hero
    initParallaxEffect();
    
    // Inicializar botão de alternar tema
    initThemeToggle();
    
    // Inicializar botão voltar ao topo
    initBackToTop();
    
    // Inicializar seta de rolagem
    initScrollIndicator();
    
    // Inicializar controle da logo ao rolar
    initLogoScroll();
    
    // Calcular idade automaticamente
    calculateAge();
});

// Animações ao fazer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Se for uma barra de proficiência, animar quando aparecer
                if (entry.target.classList.contains('proficiency-level')) {
                    animateProficiencyBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll(`
        .about-content,
        .experience-item,
        .education-item,
        .skill-category,
        .language-item,
        .proficiency-level
    `);
    
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Animação das barras de proficiência
function animateProficiencyBar(bar) {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
        bar.style.transition = 'width 1.5s ease-in-out';
        bar.style.width = targetWidth;
    }, 200);
}

// Inicializar barras de proficiência
function initProficiencyBars() {
    const proficiencyBars = document.querySelectorAll('.proficiency-level');
    proficiencyBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        // Animar quando a página carregar
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
        }, 1000);
    });
}

// Efeito de digitação para o nome
function initTypingEffect() {
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.borderRight = '3px solid white';
    
    let charIndex = 0;
    const typingSpeed = 100;
    
    function typeChar() {
        if (charIndex < originalText.length) {
            nameElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        } else {
            // Remover o cursor após terminar
            setTimeout(() => {
                nameElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Iniciar efeito após um pequeno delay
    setTimeout(typeChar, 500);
}

// Navegação suave (se houver links internos)
function initSmoothNavigation() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efeito parallax suave no hero section (desativado para evitar sobreposição)
function initParallaxEffect() {
    // Parallax desativado para melhor UX
    // Mantido como placeholder para futuras implementações
}

// Adicionar efeito hover nos cards de habilidades
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Validação do formulário de contato (se adicionado no futuro)
function validateContactForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    let isValid = true;
    
    // Validação de email
    if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError(email, 'Por favor, insira um email válido');
        isValid = false;
    }
    
    // Validação de mensagem
    if (message && message.value.trim().length < 10) {
        showError(message, 'A mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

// Função para mostrar erros de validação
function showError(element, message) {
    element.style.borderColor = '#ef4444';
    
    // Remover mensagem de erro anterior se existir
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Criar nova mensagem de erro
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '5px';
    
    element.parentNode.appendChild(errorElement);
    
    // Remover erro quando o usuário começar a digitar
    element.addEventListener('input', function() {
        element.style.borderColor = '';
        const error = element.parentNode.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    });
}

// Animação de contagem para estatísticas (se adicionadas no futuro)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Detectar quando o usuário está no final da página
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // Se estiver a 90% da página
    if (scrollTop + clientHeight >= scrollHeight * 0.9) {
        // Poderia adicionar uma animação ou efeito aqui
        document.body.classList.add('near-bottom');
    } else {
        document.body.classList.remove('near-bottom');
    }
});

// Adicionar efeito de brilho ao passar o mouse sobre links sociais
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link, .footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// Otimização de performance: Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce no evento de scroll para melhor performance
const optimizedScroll = debounce(function() {
    // Lógica de scroll otimizada aqui
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Adicionar suporte a temas (claro/escuro) - preparação para o futuro
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Carregar tema salvo (se existir)
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Inicializar tema
loadTheme();

// Adicionar feedback visual para links externos
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Adicionar classe para feedback visual
            this.classList.add('external-link-clicked');
            
            setTimeout(() => {
                this.classList.remove('external-link-clicked');
            }, 300);
        });
    });
});

// Botão de alternar tema
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Verificar preferência do sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Carregar tema salvo ou usar preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    let currentTheme = savedTheme;
    
    // Se não há tema salvo, usar preferência do sistema
    if (!currentTheme) {
        currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    }
    
    // Aplicar tema inicial
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.classList.remove('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Forçar aplicação do tema em tablets/iOS
    function forceThemeApplication() {
        if (body.classList.contains('light-mode')) {
            // Forçar cores claras mesmo em modo escuro do sistema
            document.documentElement.style.setProperty('color-scheme', 'light');
        } else {
            // Permitir modo escuro
            document.documentElement.style.setProperty('color-scheme', 'dark');
        }
    }
    
    // Aplicar força inicial
    forceThemeApplication();
    
    // Alternar tema ao clicar
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
        
        // Forçar aplicação do tema
        forceThemeApplication();
        
        // Adicionar animação de rotação
        themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
        
        // Aplicar tema suavemente sem reflow
        setTimeout(() => {
            // Força atualização de estilos sem recarregar página
            body.style.transition = 'none';
            body.offsetHeight; // Força reflow mínimo
            body.style.transition = '';
        }, 10);
    });
    
    // Escutar mudanças na preferência do sistema
    prefersDarkScheme.addEventListener('change', (e) => {
        // Só mudar se não houver tema salvo
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.remove('light-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                body.classList.add('light-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            forceThemeApplication();
        }
    });
}

// Botão voltar ao topo
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // Mostrar/esconder botão ao rolar
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Voltar ao topo ao clicar
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Adicionar animação de pulso
        backToTopButton.style.transform = 'scale(0.8)';
        setTimeout(() => {
            backToTopButton.style.transform = '';
        }, 200);
    });
}

// Seta animada de rolagem
function initScrollIndicator() {
    const scrollIndicator = document.getElementById('scroll-indicator');
    
    // Verificar se é a primeira visita
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
        // Mostrar seta imediatamente na primeira visita
        scrollIndicator.style.display = 'block';
        scrollIndicator.style.opacity = '1';
        
        // Marcar como visitado
        sessionStorage.setItem('hasVisited', 'true');
        
        // Esconder seta após começar a rolar
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.pageYOffset > 100) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.visibility = 'hidden';
                    setTimeout(() => {
                        scrollIndicator.style.display = 'none';
                    }, 300);
                }
            }, 100);
        });
        
        // Clique na seta para rolar suavemente
        scrollIndicator.addEventListener('click', function() {
            const sitesSection = document.querySelector('.sites-section');
            if (sitesSection) {
                sitesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Esconder seta imediatamente após clique
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
                setTimeout(() => {
                    scrollIndicator.style.display = 'none';
                }, 300);
            }
        });
    } else {
        // Esconder seta se não for a primeira visita
        scrollIndicator.style.display = 'none';
    }
}

// Calcular idade automaticamente
function calculateAge() {
    const birthDate = new Date('2006-06-28');
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // Ajustar se ainda não fez aniversário este ano
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    // Atualizar o elemento da idade
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = age;
    }
}

// Controlar visibilidade da logo ao rolar
function initLogoScroll() {
    const logoFixed = document.querySelector('.logo-fixed');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Esconder logo ao rolar para baixo, mostrar só quando voltar ao topo
        if (scrollTop > 100) {
            // Longe do topo - esconder logo
            logoFixed.classList.add('hidden');
        } else {
            // Próximo ao topo (header) - mostrar logo
            logoFixed.classList.remove('hidden');
        }
    });
}

// Console message personalizado
console.log('%c Landing Page de Rodrigo Pires', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com HTML5, CSS3 e JavaScript', 'color: #6b7280; font-size: 14px;');
