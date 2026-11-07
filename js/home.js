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

    if (heroSearchInput && heroSuggestions) {
        const renderSuggestions = (items, isDefault = false) => {
            let headerHtml = '';
            if (isDefault) {
                headerHtml = '<div style="padding: 10px 18px; background-color: #F7FAF8; border-bottom: 1px solid #EEF3F0; font-size: 11.5px; font-weight: 800; color: #0B4A30; text-transform: uppercase; letter-spacing: 0.5px;">Materiales recomendados y frecuentes</div>';
            }
            heroSuggestions.innerHTML = headerHtml + items.map(item => `
                <a href="${basePath}${item.url}" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-bottom: 1px solid #EEF3F0; text-decoration: none; color: #14251B; transition: background-color 0.15s ease;">
                    <div>
                        <strong style="display: block; font-size: 14px; color: #14251B;">${item.name}</strong>
                        <span style="font-size: 11.5px; font-weight: 700; color: ${item.color};">${item.cat}</span>
                    </div>
                    <span style="font-size: 11px; font-weight: 800; color: #0B4A30; background-color: #EBF7F0; padding: 4px 8px; border-radius: 6px;">Ver ficha</span>
                </a>
            `).join('');
            heroSuggestions.style.display = 'block';
        };

        heroSearchInput.addEventListener('focus', () => {
            if (heroSearchInput.value.trim().length === 0) {
                renderSuggestions(searchCatalog, true);
            }
        });

        heroSearchInput.addEventListener('click', () => {
            if (heroSearchInput.value.trim().length === 0) {
                renderSuggestions(searchCatalog, true);
            }
        });

        heroSearchInput.addEventListener('input', () => {
            const query = heroSearchInput.value.trim().toLowerCase();
            if (query.length === 0) {
                renderSuggestions(searchCatalog, true);
                return;
            }

            const matches = searchCatalog.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.cat.toLowerCase().includes(query)
            );

            if (matches.length > 0) {
                renderSuggestions(matches, false);
            } else {
                heroSuggestions.innerHTML = `
                    <div style="padding: 16px 18px; text-align: center;">
                        <p style="font-size: 13px; color: #5F7066; margin-bottom: 8px;">No encontramos coincidencias exactas para "${query}"</p>
                        <a href="${basePath}search-results.html?q=${encodeURIComponent(query)}" style="font-size: 12.5px; font-weight: 700; color: #0B4A30; text-decoration: underline;">
                            Buscar en todo el catálogo de residuos &rarr;
                        </a>
                    </div>
                `;
                heroSuggestions.style.display = 'block';
            }
        });

        document.addEventListener('click', (e) => {
            if (!heroSearchInput.contains(e.target) && !heroSuggestions.contains(e.target)) {
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

});
