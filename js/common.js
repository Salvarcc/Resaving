/* Resaving — Common Navigation, Mobile Menu & Responsive Utilities */

function initGlobalMobileHeaderAndNav() {
    const header = document.querySelector('.site-header');
    const headerInner = document.querySelector('.site-header .header-inner');
    const mainNav = document.querySelector('.site-header .main-nav');
    if (!headerInner || !mainNav) return;

    // Check if burger button already exists
    let burgerBtn = document.getElementById('mobile-menu-toggle');
    if (!burgerBtn) {
        burgerBtn = document.createElement('button');
        burgerBtn.type = 'button';
        burgerBtn.id = 'mobile-menu-toggle';
        burgerBtn.className = 'mobile-menu-btn';
        burgerBtn.setAttribute('aria-label', 'Abrir menú de navegación');
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.innerHTML = `
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
        `;
        
        let headerActions = document.querySelector('.site-header .header-actions');
        if (headerActions) {
            headerActions.appendChild(burgerBtn);
        } else {
            headerInner.appendChild(burgerBtn);
        }
    }

    // Wrap nav links if not wrapped
    if (!mainNav.querySelector('.main-nav-inner')) {
        const links = Array.from(mainNav.children);
        const inner = document.createElement('div');
        inner.className = 'main-nav-inner';
        links.forEach(link => inner.appendChild(link));
        mainNav.appendChild(inner);
    }

    const toggleMenu = (open) => {
        const isOpen = open !== undefined ? open : !mainNav.classList.contains('is-open');
        mainNav.classList.toggle('is-open', isOpen);
        burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        burgerBtn.classList.toggle('active', isOpen);
        if (header) header.classList.toggle('nav-opened', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';

        // Si se abre el menú drawer, ocultar cualquier toast activo para evitar solapamientos
        if (isOpen) {
            const activeToast = document.getElementById('pronto-toast');
            if (activeToast) activeToast.classList.remove('is-visible');
        }
    };

    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking backdrop outside inner
    mainNav.addEventListener('click', (e) => {
        if (e.target === mainNav) {
            toggleMenu(false);
        }
    });

    // Close when link clicked
    mainNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
            toggleMenu(false);
        }
    });
}

function initDevicePhotoUpload() {
    const isMobile = (window.innerWidth <= 768) || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const isPagesSubdir = window.location.pathname.includes('/pages/');
    const basePath = isPagesSubdir ? '' : 'pages/';

    // Hidden global file input for desktop upload
    let desktopFileInput = document.getElementById('global-desktop-file-input');
    if (!desktopFileInput) {
        desktopFileInput = document.createElement('input');
        desktopFileInput.type = 'file';
        desktopFileInput.id = 'global-desktop-file-input';
        desktopFileInput.accept = 'image/png, image/jpeg, image/webp';
        desktopFileInput.style.display = 'none';
        document.body.appendChild(desktopFileInput);

        desktopFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                const confirmImg = document.getElementById('scan-confirm-img') || document.querySelector('.candidate-img-box img');
                if (confirmImg && window.location.pathname.includes('scan-confirm.html')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        confirmImg.src = event.target.result;
                    };
                    reader.readAsDataURL(e.target.files[0]);
                    showStatusToast('¡Nueva imagen cargada correctamente desde tu dispositivo!', 'Imagen lista');
                } else {
                    window.location.href = basePath + 'scan-confirm.html';
                }
            }
        });
    }

    // Intercept any button/link that points to scan-camera.html
    const cameraLinks = document.querySelectorAll('a[href*="scan-camera.html"]');
    cameraLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!isMobile) {
                // On PC / Desktop: open file picker directly instead of camera viewfinder!
                e.preventDefault();
                desktopFileInput.click();
            }
        });
    });
}

// --- TOAST ACCESIBLE DE ESTADO Y "PRONTO" ---
function showStatusToast(customMessage, customTitle = 'Aviso', iconText = '✓') {
    let toast = document.getElementById('pronto-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'pronto-toast';
        toast.className = 'pronto-toast-container';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML = `
            <div class="pronto-toast-icon" id="pronto-toast-icon">${iconText}</div>
            <div class="pronto-toast-content">
                <span class="pronto-toast-title" id="pronto-toast-title">${customTitle}</span>
                <span class="pronto-toast-desc" id="pronto-toast-desc">${customMessage}</span>
            </div>
        `;
        document.body.appendChild(toast);

        toast.addEventListener('click', () => {
            toast.classList.remove('is-visible');
        });
    }

    const titleEl = document.getElementById('pronto-toast-title');
    const descEl = document.getElementById('pronto-toast-desc');
    const iconEl = document.getElementById('pronto-toast-icon');
    if (titleEl) titleEl.textContent = customTitle;
    if (descEl) descEl.textContent = customMessage;
    if (iconEl) iconEl.textContent = iconText;

    toast.classList.remove('is-visible');
    void toast.offsetWidth;
    toast.classList.add('is-visible');

    if (window._prontoToastTimer) {
        clearTimeout(window._prontoToastTimer);
    }
    window._prontoToastTimer = setTimeout(() => {
        toast.classList.remove('is-visible');
    }, 3600);
}

function showProntoToast(customMessage) {
    showStatusToast(
        customMessage || 'Esta función estará disponible en la próxima versión.',
        '¡Pronto!',
        '!'
    );
}

window.resavingNotify = showStatusToast;

function handleSpeakScreen(linkEl) {
    if (!('speechSynthesis' in window)) {
        showStatusToast('Tu navegador no admite síntesis de voz integrada; puedes usar el lector de pantalla de tu sistema.', 'Lectura en voz alta', 'i');
        return;
    }

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        linkEl.textContent = 'Escuchar esta pantalla';
        showStatusToast('Lectura en voz alta detenida.', 'Lectura en voz alta', 'i');
        return;
    }

    const mainEl = document.querySelector('main') || document.body;
    const rawText = (mainEl.innerText || '').replace(/\s+/g, ' ').trim();
    if (!rawText) return;

    const utterance = new SpeechSynthesisUtterance(rawText.slice(0, 3500));
    utterance.lang = 'es-PE';
    utterance.rate = 1.0;

    linkEl.textContent = 'Detener lectura en voz alta';
    showStatusToast('Reproduciendo contenido principal de la pantalla en español.', 'Lectura en voz alta', '♪');

    utterance.onend = () => {
        linkEl.textContent = 'Escuchar esta pantalla';
    };
    utterance.onerror = () => {
        linkEl.textContent = 'Escuchar esta pantalla';
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

function initProntoButtons() {
    // Capturar clics en enlaces o botones auxiliares o "Escuchar esta pantalla"
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button');
        if (!target) return;

        const text = target.textContent.trim().replace(/\s+/g, ' ');
        if (text.includes('Escuchar esta pantalla') || text.includes('Detener lectura en voz alta')) {
            e.preventDefault();
            e.stopPropagation();
            handleSpeakScreen(target);
            return;
        }

        const href = target.getAttribute('href');
        const isVoid = href === 'javascript:void(0)' || href === 'javascript:void(0);' || href === '#';
        const hasPronto = target.hasAttribute('data-pronto') || target.classList.contains('btn-pronto');

        if (target.closest('.faq-accordion') || target.closest('summary') || target.closest('#mobile-menu-toggle')) {
            return;
        }

        if (hasPronto || isVoid) {
            e.preventDefault();
            e.stopPropagation();

            let message = 'Esta función estará disponible en la próxima versión.';
            if (text.includes('ruta') || text.includes('llegar') || text.includes('indicaciones')) {
                message = 'Las rutas giro a giro estarán disponibles en la próxima versión.';
            }
            showProntoToast(message);
        }
    }, true);
}

// Auto-run if DOM ready or attach listener
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGlobalMobileHeaderAndNav();
        initDevicePhotoUpload();
        initProntoButtons();
    });
} else {
    initGlobalMobileHeaderAndNav();
    initDevicePhotoUpload();
    initProntoButtons();
}
