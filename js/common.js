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
        
        // Add mobile user info at bottom of drawer
        const userDiv = document.createElement('div');
        userDiv.className = 'nav-user-mobile-bar';
        userDiv.innerHTML = `
            <div class="user-avatar flex center" style="width: 36px; height: 36px; border-radius: 50%; background: #0B4A30; color: #FFF; font-weight: 800; font-size: 13px;">YA</div>
            <div>
                <strong style="font-size: 13.5px; color: #14251B; display: block;">Yeremy Acuña</strong>
                <span style="font-size: 11.5px; color: #1F6B47; font-weight: 700;">Ciudadano comprometido · San Miguel</span>
            </div>
        `;
        inner.appendChild(userDiv);
        mainNav.appendChild(inner);
    }

    const toggleMenu = (open) => {
        const isOpen = open !== undefined ? open : !mainNav.classList.contains('is-open');
        mainNav.classList.toggle('is-open', isOpen);
        burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        burgerBtn.classList.toggle('active', isOpen);
        if (header) header.classList.toggle('nav-opened', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
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
                    alert('¡Nueva imagen cargada correctamente desde tu computadora!');
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

// --- TOAST INTERACTIVO "PRONTO ⚠️" ---
function showProntoToast(customMessage) {
    let toast = document.getElementById('pronto-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'pronto-toast';
        toast.className = 'pronto-toast-container';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML = `
            <div class="pronto-toast-icon">!</div>
            <div class="pronto-toast-content">
                <span class="pronto-toast-title">¡Pronto!</span>
                <span class="pronto-toast-desc" id="pronto-toast-desc">Esta función estará disponible en la próxima versión.</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        toast.addEventListener('click', () => {
            toast.classList.remove('is-visible');
        });
    }

    const descEl = document.getElementById('pronto-toast-desc');
    if (descEl) {
        descEl.textContent = customMessage || 'Esta función estará disponible en la próxima versión.';
    }

    // Force animation restart
    toast.classList.remove('is-visible');
    void toast.offsetWidth;
    toast.classList.add('is-visible');

    if (window._prontoToastTimer) {
        clearTimeout(window._prontoToastTimer);
    }
    window._prontoToastTimer = setTimeout(() => {
        toast.classList.remove('is-visible');
    }, 3200);
}

function initProntoButtons() {
    // Capturar clics en enlaces o botones sin función activa (javascript:void(0), data-pronto, etc.)
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button');
        if (!target) return;

        const href = target.getAttribute('href');
        const isVoid = href === 'javascript:void(0)' || href === 'javascript:void(0);' || href === '#';
        const hasPronto = target.hasAttribute('data-pronto') || target.classList.contains('btn-pronto');

        // Ignorar si es un botón funcional interno (como pestañas, modal o acordeón)
        if (target.closest('.faq-accordion') || target.closest('summary') || target.closest('#mobile-menu-toggle')) {
            return;
        }

        if (hasPronto || isVoid) {
            e.preventDefault();
            e.stopPropagation();

            const text = target.textContent.trim().replace(/\s+/g, ' ');
            let message = 'Esta función estará disponible en la próxima versión.';

            if (text.includes('Mi entrega') || text.includes('lote') || text.includes('Entrega')) {
                message = 'El módulo de Mi Entrega estará disponible en la próxima versión.';
            } else if (text.includes('Reportar') || text.includes('incidencia') || text.includes('dañado')) {
                message = 'El canal de reporte ciudadano estará disponible en la próxima versión.';
            } else if (text.includes('ruta') || text.includes('llegar') || text.includes('indicaciones')) {
                message = 'Las rutas e indicaciones paso a paso estarán disponibles en la próxima versión.';
            } else if (text.includes('Escuchar')) {
                message = 'La función de lectura en voz alta estará disponible próximamente.';
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
