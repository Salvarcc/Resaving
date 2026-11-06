document.addEventListener('DOMContentLoaded', () => {
    const isPagesSubdir = window.location.pathname.includes('/pages/');
    const basePath = isPagesSubdir ? '' : 'pages/';

    const heroSearchInput = document.getElementById('hero-search-input');
    const heroSuggestions = document.getElementById('hero-search-suggestions');

    const searchCatalog = [
        { name: 'Botella de plástico PET (#1)', cat: 'Plásticos · Aprovechable', url: 'waste-detail.html', color: '#1D8A57' },
        { name: 'Bolsa de polietileno PEBD (#4)', cat: 'Plásticos · Condicional', url: 'waste-detail.html', color: '#D97706' },
        { name: 'Caja de cartón corrugado', cat: 'Papel y Cartón · Aprovechable', url: 'waste-detail.html', color: '#1D8A57' },
        { name: 'Lata de conserva de aluminio', cat: 'Metales · Aprovechable', url: 'waste-detail.html', color: '#1D8A57' },
        { name: 'Frasco de vidrio transparente', cat: 'Vidrio · Aprovechable', url: 'waste-detail.html', color: '#1D8A57' },
        { name: 'Pilas alcalinas AA / AAA', cat: 'Peligrosos · Punto especial', url: 'waste-detail.html', color: '#B91C1C' },
        { name: 'Envase de yogur PEAD (#2)', cat: 'Plásticos · Aprovechable', url: 'waste-detail.html', color: '#1D8A57' }
    ];

    if (heroSearchInput && heroSuggestions) {
        heroSearchInput.addEventListener('input', () => {
            const query = heroSearchInput.value.trim().toLowerCase();
            if (query.length === 0) {
                heroSuggestions.style.display = 'none';
                heroSuggestions.innerHTML = '';
                return;
            }

            const matches = searchCatalog.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.cat.toLowerCase().includes(query)
            );

            if (matches.length > 0) {
                heroSuggestions.innerHTML = matches.map(item => `
                    <a href="${basePath}${item.url}" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-bottom: 1px solid #EEF3F0; text-decoration: none; color: #14251B; transition: background-color 0.15s ease;">
                        <div>
                            <strong style="display: block; font-size: 14px; color: #14251B;">${item.name}</strong>
                            <span style="font-size: 11.5px; font-weight: 700; color: ${item.color};">${item.cat}</span>
                        </div>
                        <span style="font-size: 11px; font-weight: 800; color: #0B4A30; background-color: #EBF7F0; padding: 4px 8px; border-radius: 6px;">Ver ficha</span>
                    </a>
                `).join('');
                heroSuggestions.style.display = 'block';
            } else {
                heroSuggestions.innerHTML = `
                    <div style="padding: 16px; text-align: center; color: #6C8A79; font-size: 13px;">
                        <span>No encontramos coincidencias exactas para "${query}".</span>
                        <a href="${basePath}search-no-results.html" style="display: block; margin-top: 6px; font-weight: 700; color: #0B4A30; text-decoration: underline;">Ver opciones alternativas</a>
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

    const uploadPhoto = document.getElementById('upload-photo');
    if (uploadPhoto) {
        uploadPhoto.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                window.location.href = 'scan-confirm.html';
            }
        });
    }

    const shutterBtn = document.querySelector('.btn-shutter');
    if (shutterBtn) {
        shutterBtn.addEventListener('click', () => {
            shutterBtn.style.transform = 'scale(0.92)';
            setTimeout(() => {
                window.location.href = 'scan-confirm.html';
            }, 250);
        });
    }

    const checkboxes = [
        document.getElementById('check-step-1'),
        document.getElementById('check-step-2'),
        document.getElementById('check-step-3'),
        document.getElementById('check-step-4')
    ];

    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressBadge = document.getElementById('progress-badge');
    const progressDesc = document.getElementById('progress-desc');

    if (checkboxes[0] && progressBarFill && progressBadge) {
        const savedState = localStorage.getItem('resaving_prep_status');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                checkboxes.forEach((cb, idx) => {
                    if (cb && typeof parsed[idx] === 'boolean') {
                        cb.checked = parsed[idx];
                    }
                });
            } catch (err) {}
        }

        const updateProgress = () => {
            let completed = 0;
            const state = [];
            checkboxes.forEach((cb, idx) => {
                const card = document.getElementById(`card-step-${idx + 1}`);
                const isChecked = Boolean(cb && cb.checked);
                state.push(isChecked);
                if (isChecked) {
                    completed++;
                    if (card) card.classList.add('completed');
                } else {
                    if (card) card.classList.remove('completed');
                }
            });

            localStorage.setItem('resaving_prep_status', JSON.stringify(state));

            const pct = completed * 25;
            progressBarFill.style.width = `${pct}%`;
            progressBadge.textContent = `${completed} de 4`;

            if (progressDesc) {
                if (completed === 4) {
                    progressDesc.textContent = '¡Excelente! Has completado los 4 pasos. Tu botella PET cumple todas las condiciones para una entrega exitosa.';
                } else {
                    progressDesc.textContent = `Has completado ${completed} de 4 pasos. Marca las casillas restantes conforme acondiciones tu envase.`;
                }
            }
        };

        checkboxes.forEach(cb => {
            if (cb) {
                cb.addEventListener('change', updateProgress);
            }
        });

        updateProgress();
    }

    const qtyInput = document.getElementById('input-waste-qty');
    const btnMinus = document.getElementById('btn-qty-minus');
    const btnPlus = document.getElementById('btn-qty-plus');
    const weightLabel = document.getElementById('label-estimated-weight');

    if (qtyInput && btnMinus && btnPlus) {
        const updateWeight = (qty) => {
            const kg = (qty * 0.03).toFixed(2);
            if (weightLabel) {
                weightLabel.textContent = `Equivalente aproximado a ${kg} kg de plástico recuperable`;
            }
        };

        btnMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            if (val > 1) {
                val--;
                qtyInput.value = val;
                updateWeight(val);
            }
        });

        btnPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            if (val < 200) {
                val++;
                qtyInput.value = val;
                updateWeight(val);
            }
        });
    }

    const filterChips = document.querySelectorAll('.toolbar-row-filters .filter-chip[data-filter]');
    const pointCards = document.querySelectorAll('.map-points-list .point-card');
    const mapMarkers = document.querySelectorAll('.map-visual-container .map-marker[data-point-id]');

    if (filterChips.length > 0 && pointCards.length > 0) {
        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.preventDefault();
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const filter = chip.getAttribute('data-filter');
                pointCards.forEach(card => {
                    const materials = card.getAttribute('data-materials') || '';
                    if (filter === 'all' || materials.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (mapMarkers.length > 0) {
                    mapMarkers.forEach(marker => {
                        const pid = marker.getAttribute('data-point-id');
                        const targetCard = document.querySelector(`.point-card[data-point-id="${pid}"]`);
                        if (targetCard && targetCard.style.display === 'none') {
                            marker.style.opacity = '0.25';
                            marker.style.pointerEvents = 'none';
                        } else {
                            marker.style.opacity = '1';
                            marker.style.pointerEvents = 'auto';
                        }
                    });
                }
            });
        });

        if (mapMarkers.length > 0) {
            mapMarkers.forEach(marker => {
                marker.addEventListener('click', () => {
                    const pid = marker.getAttribute('data-point-id');
                    pointCards.forEach(card => {
                        if (card.getAttribute('data-point-id') === pid) {
                            card.classList.add('selected');
                            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        } else {
                            card.classList.remove('selected');
                        }
                    });
                });
            });
        }
    }

    const reportFileInput = document.getElementById('report-file-input');
    const reportFileStatus = document.getElementById('report-file-status');
    if (reportFileInput && reportFileStatus) {
        reportFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                reportFileStatus.textContent = `Archivo seleccionado: ${e.target.files[0].name}`;
                reportFileStatus.style.color = '#1D8A57';
                reportFileStatus.style.fontWeight = '700';
            }
        });
    }

    const locationBtn = document.querySelector('.btn-my-location');
    if (locationBtn) {
        locationBtn.addEventListener('click', () => {
            locationBtn.style.backgroundColor = '#EBF7F0';
            locationBtn.style.color = '#0B4A30';
            locationBtn.style.borderColor = '#1D8A57';
            const span = locationBtn.querySelector('span');
            if (span) {
                span.textContent = 'Ubicación activa (San Miguel)';
            }
        });
    }
});
