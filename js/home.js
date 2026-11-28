/* Resaving — Home Search & Photo Upload */
document.addEventListener('DOMContentLoaded', () => {
    const isPagesSubdir = window.location.pathname.includes('/pages/');
    const basePath = isPagesSubdir ? '' : 'pages/';
    const heroSearchInput = document.getElementById('hero-search-input');
    const heroSuggestions = document.getElementById('hero-search-suggestions');

    const searchCatalog = [
        { name: 'Botellas plásticas para bebidas', cat: 'Aprovechable · Tacho Verde', url: 'waste-detail.html?tipo=pet', color: '#1D8A57' },
        { name: 'Frascos y botellas de vidrio entero', cat: 'Aprovechable · Tacho Verde', url: 'waste-detail.html?tipo=vidrio', color: '#1D8A57' },
        { name: 'Cajas de cartón corrugado y papel', cat: 'Aprovechable · Tacho Verde', url: 'waste-detail.html?tipo=carton', color: '#1D8A57' },
        { name: 'Latas de bebidas y conservas', cat: 'Aprovechable · Tacho Verde', url: 'waste-detail.html?tipo=lata', color: '#1D8A57' },
        { name: 'Envases rígidos de detergente o champú', cat: 'Aprovechable · Tacho Verde', url: 'waste-detail.html?tipo=pead', color: '#1D8A57' },
        { name: 'Bolsas plásticas de compras', cat: 'Especial · No tacho común', url: 'waste-detail.html?tipo=bolsa', color: '#D97706' },
        { name: 'Pilas y baterías alcalinas', cat: 'Peligrosos · Punto especial', url: 'waste-detail.html?tipo=pilas', color: '#B91C1C' },
        { name: 'Cáscaras de frutas y verduras', cat: 'Orgánicos · Tacho Marrón', url: 'search-results.html?cat=organicos', color: '#7D4F27' },
        { name: 'Papel higiénico y servilletas usadas', cat: 'No aprovechable · Tacho Negro', url: 'search-results.html?cat=no-aprovechables', color: '#2C3E50' }
    ];

    const fullCatalogKeywords = [
        'botella', 'plastico', 'plástica', 'pet', 'agua', 'gaseosa', 'vidrio', 'frasco',
        'carton', 'cartón', 'papel', 'bond', 'caja', 'lata', 'aluminio', 'conserva',
        'champu', 'champú', 'detergente', 'yogur', 'pead', 'rigido', 'rígido', 'tetra',
        'fruta', 'verdura', 'hortaliza', 'organico', 'orgánico', 'cafe', 'café', 'te', 'té',
        'hoja', 'jardin', 'jardín', 'huevo', 'cascara', 'cáscara', 'pila', 'bateria', 'batería',
        'medicamento', 'blister', 'blíster', 'foco', 'fluorescente', 'raee', 'electronico',
        'electrónico', 'cargador', 'cable', 'higienico', 'higiénico', 'panuelo', 'pañuelo',
        'servilleta', 'colilla', 'cigarro', 'envoltura', 'galleta', 'papa', 'ceramica', 'cerámica',
        'loza', 'bolsa', 'aprovechable', 'peligroso'
    ];

    const recordSearchHistory = (term, url, statusLabel = 'Consultado') => {
        if (!term) return;
        try {
            const raw = localStorage.getItem('resaving_search_history');
            const history = raw ? JSON.parse(raw) : [];
            const next = [{ term, url, statusLabel, ts: Date.now() }, ...history.filter(h => h.term.toLowerCase() !== term.toLowerCase())].slice(0, 8);
            localStorage.setItem('resaving_search_history', JSON.stringify(next));
        } catch (e) {}
    };

    const hasCatalogMatch = (rawQuery) => {
        const q = rawQuery.trim().toLowerCase();
        if (!q) return true;
        const quickHit = searchCatalog.some(item =>
            item.name.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q)
        );
        if (quickHit) return true;
        return fullCatalogKeywords.some(kw => kw.includes(q) || q.includes(kw));
    };

    const heroSearchForm = heroSearchInput ? heroSearchInput.closest('form') : null;
    if (heroSearchForm && heroSearchInput) {
        heroSearchForm.addEventListener('submit', (e) => {
            const raw = heroSearchInput.value.trim();
            if (!raw) return;
            if (!hasCatalogMatch(raw)) {
                e.preventDefault();
                const targetUrl = `${basePath}search-no-results.html?q=${encodeURIComponent(raw)}`;
                recordSearchHistory(raw, targetUrl, 'Sin coincidencia');
                window.location.href = targetUrl;
            } else {
                recordSearchHistory(raw, `${basePath}search-results.html?q=${encodeURIComponent(raw)}`, 'Búsqueda en catálogo');
            }
        });
    }

    if (heroSearchInput && heroSuggestions) {
        const renderSuggestions = (items, isDefault = false) => {
            let headerHtml = '';
            if (isDefault) {
                headerHtml = '<div style="padding: 10px 18px; background-color: #F7FAF8; border-bottom: 1px solid #EEF3F0; font-size: 11.5px; font-weight: 800; color: #0B4A30; text-transform: uppercase; letter-spacing: 0.5px;">Materiales recomendados y frecuentes</div>';
            }
            heroSuggestions.innerHTML = headerHtml + items.map(item => `
                <a href="${basePath}${item.url}" class="hero-suggestion-link" data-term="${item.name}" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-bottom: 1px solid #EEF3F0; text-decoration: none; color: #14251B; transition: background-color 0.15s ease;">
                    <div>
                        <strong style="display: block; font-size: 14px; color: #14251B;">${item.name}</strong>
                        <span style="font-size: 11.5px; font-weight: 700; color: ${item.color};">${item.cat}</span>
                    </div>
                    <span style="font-size: 11px; font-weight: 800; color: #0B4A30; background-color: #EBF7F0; padding: 4px 8px; border-radius: 6px;">Ver ficha</span>
                </a>
            `).join('');
            heroSuggestions.querySelectorAll('.hero-suggestion-link').forEach(a => {
                a.addEventListener('click', () => recordSearchHistory(a.getAttribute('data-term'), a.getAttribute('href'), 'Desde sugerencia'));
            });
            heroSuggestions.style.display = 'block';
        };

        const triggerSearch = () => {
            const rawQuery = heroSearchInput.value.trim();
            const query = rawQuery.toLowerCase();
            if (query.length === 0) {
                renderSuggestions(searchCatalog, true);
            } else {
                const matches = searchCatalog.filter(item =>
                    item.name.toLowerCase().includes(query) ||
                    item.cat.toLowerCase().includes(query)
                );

                if (matches.length > 0) {
                    renderSuggestions(matches, false);
                } else {
                    const noResUrl = `${basePath}search-no-results.html?q=${encodeURIComponent(rawQuery)}`;
                    heroSuggestions.innerHTML = `
                        <div style="padding: 16px 18px; text-align: left;">
                            <p style="font-size: 13px; color: #3D5A4A; margin-bottom: 10px;">No encontramos coincidencias exactas para <strong id="hero-no-match-q"></strong>. Puedes explorar términos sugeridos o alternativas:</p>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
                                <a href="${basePath}waste-detail.html?tipo=carton" style="font-size: 12px; font-weight: 700; color: #0B4A30; background: #EBF7F0; padding: 4px 10px; border-radius: 6px; text-decoration: none;">Cartón multicapa</a>
                                <a href="${basePath}waste-detail.html?tipo=pet" style="font-size: 12px; font-weight: 700; color: #0B4A30; background: #EBF7F0; padding: 4px 10px; border-radius: 6px; text-decoration: none;">Botellas plásticas</a>
                                <a href="${basePath}categories.html" style="font-size: 12px; font-weight: 700; color: #0B4A30; background: #EBF7F0; padding: 4px 10px; border-radius: 6px; text-decoration: none;">Ver 4 categorías</a>
                            </div>
                            <a href="${noResUrl}" style="display: inline-block; font-size: 12.5px; font-weight: 800; color: #0B4A30; text-decoration: underline;">
                                Ver pantalla de alternativas para este término &rarr;
                            </a>
                        </div>
                    `;
                    const qSpan = document.getElementById('hero-no-match-q');
                    if (qSpan) qSpan.textContent = `«${rawQuery}»`;
                    heroSuggestions.style.display = 'block';
                }
            }
        };

        heroSearchInput.addEventListener('focus', triggerSearch);

        heroSearchInput.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerSearch();
        });

        heroSearchInput.addEventListener('input', triggerSearch);

        document.addEventListener('click', (e) => {
            if (!heroSearchInput.contains(e.target) && !heroSuggestions.contains(e.target)) {
                heroSuggestions.style.display = 'none';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && heroSuggestions) {
                heroSuggestions.style.display = 'none';
            }
        });
    }

    const heroFileInput = document.getElementById('hero-file-upload');
    if (heroFileInput) {
        heroFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                window.location.href = basePath + 'scan-confirm.html';
            }
        });
    }

    const infoForm = document.getElementById('form-solicitar-info') || document.querySelector('.registration-form');
    const infoFeedback = document.getElementById('info-form-feedback');
    if (infoForm) {
        infoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombres = document.getElementById('nombres')?.value?.trim() || '';
            const apellidos = document.getElementById('apellidos')?.value?.trim() || '';
            const correo = document.getElementById('correo')?.value?.trim() || '';
            const distritoSelect = document.getElementById('distrito');
            const temaSelect = document.getElementById('tema');
            const consulta = document.getElementById('consulta')?.value?.trim() || '';
            const consentimiento = document.getElementById('consentimiento')?.checked;

            const showFeedback = (msg, isError = false) => {
                if (infoFeedback) {
                    infoFeedback.textContent = msg;
                    infoFeedback.style.display = 'block';
                    infoFeedback.style.backgroundColor = isError ? '#FEF2F2' : '#EBF7F0';
                    infoFeedback.style.border = isError ? '1.5px solid #B91C1C' : '1.5px solid #0B4A30';
                    infoFeedback.style.color = isError ? '#991B1B' : '#0B4A30';
                    infoFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                if (typeof window.resavingNotify === 'function') {
                    window.resavingNotify(msg, isError ? 'Revisa el formulario' : 'Solicitud registrada', isError ? '!' : '✓');
                }
            };

            if (!nombres || !apellidos || !correo || !distritoSelect?.value || !temaSelect?.value || !consulta || !consentimiento) {
                showFeedback('Completa todos los campos obligatorios y acepta el tratamiento de datos antes de enviar.', true);
                return;
            }

            const distritoTxt = distritoSelect.options[distritoSelect.selectedIndex]?.text || distritoSelect.value;
            const temaTxt = temaSelect.options[temaSelect.selectedIndex]?.text || temaSelect.value;
            showFeedback(`¡Gracias, ${nombres}! Registramos tu consulta sobre "${temaTxt}" (${distritoTxt}). Te responderemos a ${correo}.`);
            infoForm.reset();
        });
    }

});
