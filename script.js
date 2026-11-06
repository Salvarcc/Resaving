document.addEventListener('DOMContentLoaded', () => {
    const isPagesSubdir = window.location.pathname.includes('/pages/');
    const basePath = isPagesSubdir ? '' : 'pages/';

    const heroSearchInput = document.getElementById('hero-search-input');
    const heroSuggestions = document.getElementById('hero-search-suggestions');

    const searchCatalog = [
        { name: 'Botellas de agua y gaseosa (Plástico PET #1)', cat: 'Plásticos · Aprovechable', url: 'waste-detail.html?tipo=pet', color: '#1D8A57' },
        { name: 'Frascos y botellas de vidrio de conserva', cat: 'Vidrio · Aprovechable', url: 'waste-detail.html?tipo=vidrio', color: '#1D8A57' },
        { name: 'Cajas de cartón y empaques de jugo (Tetra Pak)', cat: 'Papel y Cartón · Aprovechable', url: 'waste-detail.html?tipo=carton', color: '#1D8A57' },
        { name: 'Latas de bebidas y conservas de aluminio', cat: 'Metales · Aprovechable', url: 'waste-detail.html?tipo=lata', color: '#1D8A57' },
        { name: 'Envases de shampoo y detergente (PEAD #2)', cat: 'Plásticos · Aprovechable', url: 'waste-detail.html?tipo=pead', color: '#1D8A57' },
        { name: 'Bolsas plásticas de compras (PEBD #4)', cat: 'Plásticos · No aprovechable en tacho común', url: 'waste-detail.html?tipo=bolsa', color: '#D97706' },
        { name: 'Pilas y baterías de linterna o control', cat: 'Peligrosos · Punto especial', url: 'waste-detail.html?tipo=pilas', color: '#B91C1C' }
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

    const btnFlip = document.getElementById('btn-flip-camera');
    if (btnFlip) {
        let isFront = false;
        btnFlip.addEventListener('click', () => {
            isFront = !isFront;
            const icon = btnFlip.querySelector('img');
            const span = btnFlip.querySelector('span');
            if (icon) {
                icon.style.transition = 'transform 0.4s ease';
                icon.style.transform = isFront ? 'rotate(180deg)' : 'rotate(0deg)';
            }
            if (span) {
                span.textContent = isFront ? 'Frontal' : 'Voltear';
            }
        });
    }

    const materialRadios = document.querySelectorAll('input[name="material-type"]');
    const qtyInput = document.getElementById('input-waste-qty');
    const btnMinus = document.getElementById('btn-qty-minus');
    const btnPlus = document.getElementById('btn-qty-plus');
    const weightLabel = document.getElementById('label-estimated-weight');
    const conditionCheckboxes = document.querySelectorAll('input[id^="check-cond-"]');

    const materialSpecs = {
        pet: {
            density: 0.03,
            unitLabel: 'plástico recuperable',
            checks: [
                'Envases enjuagados y completamente secos (sin residuos líquidos).',
                'Tapas plásticas separadas del cuerpo PET.',
                'Botellas aplastadas desde la base para reducir volumen.'
            ]
        },
        glass: {
            density: 0.25,
            unitLabel: 'vidrio aprovechable',
            checks: [
                'Botellas y frascos de vidrio completamente enteros (sin rajaduras ni astillados).',
                'Tapas metálicas o de plástico y corchos retirados por completo.',
                'Lavados y secos, sin restos de alimentos fermentables ni aceites.'
            ]
        },
        can: {
            density: 0.02,
            unitLabel: 'aluminio y metal reciclable',
            checks: [
                'Latas lavadas sin contenido residual de pescado, leche o bebidas.',
                'Etiquetas de papel desprendidas en la medida de lo posible.',
                'Comprimidas o aplanadas cuidadosamente sin bordes cortantes expuestos.'
            ]
        },
        cardboard: {
            density: 0.15,
            unitLabel: 'celulosa y papel seco',
            checks: [
                'Cajas de cartón desarmadas y dobladas de forma plana.',
                'Completamente secas, sin manchas de grasa, comida ni adhesivos gruesos.',
                'Atadas en paquetes manejables con pabilo o apiladas ordenadamente.'
            ]
        }
    };

    if (materialRadios.length > 0) {
        const updateMaterialSelection = (selectedVal) => {
            materialRadios.forEach(radio => {
                const card = radio.closest('.material-choice-card') || radio.closest('label');
                if (card) {
                    if (radio.value === selectedVal) {
                        card.style.borderColor = '#0B4A30';
                        card.style.borderWidth = '2px';
                        card.style.backgroundColor = '#EBF7F0';
                    } else {
                        card.style.borderColor = '#DBE7DF';
                        card.style.borderWidth = '1px';
                        card.style.backgroundColor = '#FFFFFF';
                    }
                }
            });

            const currentQty = parseInt(qtyInput ? qtyInput.value : 15, 10) || 15;
            const spec = materialSpecs[selectedVal] || materialSpecs.pet;
            const totalKg = (currentQty * spec.density).toFixed(2);

            if (weightLabel) {
                weightLabel.textContent = `Equivalente aproximado a ${totalKg} kg de ${spec.unitLabel}`;
            }

            if (conditionCheckboxes.length === 3 && spec.checks) {
                conditionCheckboxes.forEach((cb, idx) => {
                    const span = cb.nextElementSibling;
                    if (span && spec.checks[idx]) {
                        span.textContent = spec.checks[idx];
                    }
                });
            }
        };

        materialRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    updateMaterialSelection(radio.value);
                }
            });
        });

        const checkedRadio = document.querySelector('input[name="material-type"]:checked');
        if (checkedRadio) {
            updateMaterialSelection(checkedRadio.value);
        }
    }

    if (qtyInput && btnMinus && btnPlus) {
        const recalculateWeight = () => {
            const checkedRadio = document.querySelector('input[name="material-type"]:checked');
            const selectedVal = checkedRadio ? checkedRadio.value : 'pet';
            const spec = materialSpecs[selectedVal] || materialSpecs.pet;
            const val = parseInt(qtyInput.value, 10) || 1;
            const kg = (val * spec.density).toFixed(2);
            if (weightLabel) {
                weightLabel.textContent = `Equivalente aproximado a ${kg} kg de ${spec.unitLabel}`;
            }
        };

        btnMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            if (val > 1) {
                val--;
                qtyInput.value = val;
                recalculateWeight();
            }
        });

        btnPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            if (val < 200) {
                val++;
                qtyInput.value = val;
                recalculateWeight();
            }
        });
    }

    const matSwitchBtns = document.querySelectorAll('.mat-switch-btn');
    const detailTitle = document.getElementById('detail-title');
    const detailSubtitle = document.getElementById('detail-subtitle');
    const detailImg = document.getElementById('detail-main-img');
    const detailBadge = document.getElementById('detail-code-badge');
    const breadcrumbMat = document.getElementById('breadcrumb-current-mat');

    const detailMatData = {
        pet: {
            title: 'Botellas de plástico de agua y gaseosa (PET #1)',
            sub: 'La botella de plástico PET puede recuperarse al 100% mediante reciclaje mecánico cuando se entrega vacía, limpia y seca.',
            img: '../Images/waste-pet-bottle.png',
            badge: 'PET #1',
            crumb: 'Botellas plásticas (PET #1)'
        },
        vidrio: {
            title: 'Botellas y frascos de vidrio (100% aprovechables)',
            sub: 'El vidrio es un material noble infinitamente reciclable sin perder pureza. Debe entregarse entero y limpio para proteger la seguridad de los recicladores.',
            img: '../Images/gallery-glass.png',
            badge: 'VIDRIO',
            crumb: 'Frascos y botellas de vidrio'
        },
        carton: {
            title: 'Cajas de cartón corrugado y empaques de jugo (Tetra Pak)',
            sub: 'Las fibras de celulosa pueden reciclarse hasta 7 veces. Deben mantenerse completamente secas y dobladas para optimizar el transporte.',
            img: '../Images/delivery-cardboard.png',
            badge: 'CARTÓN / PAPEL',
            crumb: 'Cajas de cartón y Tetra Pak'
        },
        metal: {
            title: 'Latas de bebidas y conservas de aluminio / hojalata',
            sub: 'El reciclaje de aluminio ahorra el 95% de la energía frente a la extracción virgen. Enjuaga la lata y comprímela suavemente antes de entregar.',
            img: '../Images/delivery-can.png',
            badge: 'ALUMINIO / LATA',
            crumb: 'Latas de aluminio'
        }
    };

    if (matSwitchBtns.length > 0 && detailTitle) {
        const switchMaterial = (matKey) => {
            const data = detailMatData[matKey] || detailMatData.pet;
            matSwitchBtns.forEach(btn => {
                if (btn.getAttribute('data-mat') === matKey) {
                    btn.classList.add('active');
                    btn.style.backgroundColor = '#0B4A30';
                    btn.style.color = '#FFFFFF';
                    btn.style.borderColor = '#0B4A30';
                } else {
                    btn.classList.remove('active');
                    btn.style.backgroundColor = '#FFFFFF';
                    btn.style.color = '#14251B';
                    btn.style.borderColor = '#DBE7DF';
                }
            });

            detailTitle.textContent = data.title;
            if (detailSubtitle) detailSubtitle.textContent = data.sub;
            if (detailImg) detailImg.src = data.img;
            if (detailBadge) detailBadge.textContent = data.badge;
            if (breadcrumbMat) breadcrumbMat.textContent = data.crumb;
        };

        matSwitchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const mat = btn.getAttribute('data-mat');
                switchMaterial(mat);
            });
        });

        const params = new URLSearchParams(window.location.search);
        const tipoParam = params.get('tipo');
        if (tipoParam && detailMatData[tipoParam]) {
            switchMaterial(tipoParam);
        }
    }

    const districtStations = {
        'san-miguel': [
            { id: '1', name: '1. Estación Recicla San Miguel', status: 'Abierto', badge: 'badge-open', dist: '0.8 km · 11 min a pie · Cruce Av. La Marina con Universitaria', addr: 'Ingreso peatonal frente a Plaza San Miguel. Horario: 08:00 a 18:00.', mats: 'pet vidrio papel metal', tags: ['Botellas de agua y gaseosa (PET)', 'Vidrio', 'Cartón y papel'] },
            { id: '2', name: '2. Punto Limpio Parque Juan Pablo II', status: 'Abierto', badge: 'badge-open', dist: '1.4 km · 18 min a pie · Av. Riva Agüero cdra. 8', addr: 'Contenedores verdes ubicados junto a la caseta de serenazgo del parque. Horario: 07:00 a 19:00.', mats: 'pet vidrio papel', tags: ['Botellas plásticas', 'Latas de conserva', 'Papel'] },
            { id: '3', name: '3. Contenedor Verde Metro La Marina', status: 'Abierto 24h', badge: 'badge-open', dist: '1.9 km · 25 min a pie · Av. La Marina 2500', addr: 'Área de estacionamiento del supermercado. Acceso vehicular y peatonal las 24 horas.', mats: 'pet vidrio', tags: ['Botellas plásticas (PET)', 'Vidrio de conserva'] },
            { id: '4', name: '4. Estación Ambiental Plaza Bandera', status: 'Cierra a las 17:00', badge: 'badge-closing', dist: '2.3 km · 7 min en auto · Límite con Pueblo Libre', addr: 'Punto de acopio municipal para materiales aprovechables y contenedor para pilas usadas.', mats: 'pet metal especial', tags: ['Multimaterial', 'Pilas y baterías'] }
        ],
        'pueblo-libre': [
            { id: '1', name: '1. Ecopunto Plaza Bolívar', status: 'Abierto', badge: 'badge-open', dist: '0.6 km · 8 min a pie · Jr. Vivanco frente a Municipalidad', addr: 'Centro de reciclaje selectivo comunal. Horario: 08:00 a 17:00.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Vidrio', 'Cartón y papel'] },
            { id: '2', name: '2. Módulo Ambiental Parque El Carmen', status: 'Abierto', badge: 'badge-open', dist: '1.2 km · 15 min a pie · Av. Sucre cdra. 12', addr: 'Isla de segregación con promotor vecinal. Horario: 09:00 a 18:00.', mats: 'pet papel metal', tags: ['Plásticos PET', 'Latas de aluminio', 'Papel bond'] }
        ],
        'miraflores': [
            { id: '1', name: '1. Punto Limpio Parque Kennedy', status: 'Abierto 24h', badge: 'badge-open', dist: '0.4 km · 5 min a pie · Av. Larco con Diagonal', addr: 'Estación soterrada de alta capacidad para residuos reciclables.', mats: 'pet vidrio papel metal', tags: ['Botellas de bebidas', 'Vidrio', 'Aluminio'] },
            { id: '2', name: '2. Estación Comunal Wong Benavides', status: 'Abierto', badge: 'badge-open', dist: '1.1 km · 14 min a pie · Av. Benavides 1450', addr: 'Contenedor especial municipal con pesaje voluntario. Horario: 08:00 a 20:00.', mats: 'pet vidrio especial', tags: ['Plásticos', 'Vidrio', 'Pilas y RAEE'] }
        ],
        'magdalena': [
            { id: '1', name: '1. Punto Verde Plaza Túpac Amaru', status: 'Abierto', badge: 'badge-open', dist: '0.5 km · 7 min a pie · Jr. Bolognesi cdra. 4', addr: 'Isla de reciclaje vecinal asistida por personal municipal.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Vidrio', 'Cartón'] },
            { id: '2', name: '2. Módulo Malecón Castagnola', status: 'Abierto', badge: 'badge-open', dist: '1.3 km · 16 min a pie · Circuito de Playas', addr: 'Contenedores verdes ubicados junto al parque canino.', mats: 'pet metal', tags: ['Plásticos PET', 'Latas'] }
        ],
        'surco': [
            { id: '1', name: '1. Estación Surco Recicla - Parque de la Amistad', status: 'Abierto', badge: 'badge-open', dist: '0.9 km · 12 min a pie · Av. Caminos del Inca', addr: 'Planta de segregación y módulo educativo municipal.', mats: 'pet vidrio papel metal especial', tags: ['Multimaterial', 'Vidrio', 'Pilas'] }
        ]
    };

    const districtSelector = document.getElementById('district-selector');
    const mapPointsContainer = document.querySelector('.map-points-list');
    const listPointsContainer = document.querySelector('.list-view-grid');

    const renderDistrictStations = (districtKey) => {
        const stations = districtStations[districtKey] || districtStations['san-miguel'];

        if (mapPointsContainer) {
            mapPointsContainer.innerHTML = stations.map((st, i) => `
                <article class="point-card ${i === 0 ? 'selected' : ''}" data-point-id="${st.id}" data-materials="${st.mats}">
                    <div class="point-card-header">
                        <h2 class="point-card-title">${st.name}</h2>
                        <span class="point-status-badge ${st.badge}">${st.status}</span>
                    </div>
                    <p class="point-card-distance">
                        <img src="../Images/icon-pin.svg" alt="" style="width: 14px; height: 14px;">
                        <span>${st.dist}</span>
                    </p>
                    <p class="point-card-address">${st.addr}</p>
                    <div class="point-materials-row">
                        ${st.tags.map(t => `<span class="mat-tag">${t}</span>`).join('')}
                    </div>
                    <a href="point-detail.html?punto=${districtKey}-${st.id}" class="btn-outline-action flex center" style="padding: 9px 16px; font-size: 13.5px; width: 100%;">
                        <span>Ver detalle</span>
                    </a>
                </article>
            `).join('');

            bindMarkerClickEvents();
        }

        if (listPointsContainer) {
            listPointsContainer.innerHTML = stations.map(st => `
                <article class="list-point-item" data-materials="${st.mats}">
                    <div class="list-point-info">
                        <div class="point-card-header">
                            <h2 class="point-card-title">${st.name}</h2>
                            <span class="point-status-badge ${st.badge}">${st.status}</span>
                        </div>
                        <p class="point-card-distance">
                            <img src="../Images/icon-pin.svg" alt="" style="width: 14px; height: 14px;">
                            <span>${st.dist}</span>
                        </p>
                        <p class="point-card-address">${st.addr}</p>
                        <div class="point-materials-row">
                            ${st.tags.map(t => `<span class="mat-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                    <div class="list-point-actions">
                        <a href="point-detail.html?punto=${districtKey}-${st.id}" class="btn-primary-action flex center" style="padding: 10px 18px; font-size: 13.5px; text-decoration: none;">
                            <span>Ver ficha y horarios</span>
                        </a>
                        <a href="point-directions.html?punto=${districtKey}-${st.id}" class="btn-outline-action flex center" style="padding: 10px 18px; font-size: 13.5px; text-decoration: none;">
                            <span>Cómo llegar</span>
                        </a>
                    </div>
                </article>
            `).join('');
        }
    };

    if (districtSelector) {
        districtSelector.addEventListener('change', () => {
            renderDistrictStations(districtSelector.value);
        });
    }

    function bindMarkerClickEvents() {
        const pointCards = document.querySelectorAll('.point-card');
        const mapMarkers = document.querySelectorAll('.map-visual-container .map-marker[data-point-id]');

        if (mapMarkers.length > 0 && pointCards.length > 0) {
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

    bindMarkerClickEvents();

    const allFilterChips = document.querySelectorAll('.filter-chip[data-filter]');
    if (allFilterChips.length > 0) {
        allFilterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.preventDefault();
                allFilterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const filter = chip.getAttribute('data-filter');
                const targetCards = document.querySelectorAll('.point-card, .list-point-item');

                targetCards.forEach(card => {
                    const mats = card.getAttribute('data-materials') || '';
                    if (filter === 'all' || mats.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });

                const markers = document.querySelectorAll('.map-marker[data-point-id]');
                markers.forEach(marker => {
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
            });
        });
    }

    const searchResultsChips = document.querySelectorAll('.filter-chips .chip');
    const resultCards = document.querySelectorAll('.results-list .result-card');
    if (searchResultsChips.length > 0 && resultCards.length > 0) {
        searchResultsChips.forEach(chip => {
            chip.addEventListener('click', () => {
                searchResultsChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                const text = chip.textContent.toLowerCase();

                resultCards.forEach(card => {
                    const cardText = card.textContent.toLowerCase();
                    if (text.includes('todos')) {
                        card.style.display = 'flex';
                    } else if (text.includes('plásticos') && cardText.includes('plástico')) {
                        card.style.display = 'flex';
                    } else if (text.includes('vidrio') && cardText.includes('vidrio')) {
                        card.style.display = 'flex';
                    } else if (text.includes('especiales') && cardText.includes('peligroso')) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    const btnClearHistory = document.getElementById('btn-clear-history');
    const historyList = document.querySelector('.history-list');
    const historyContainer = document.getElementById('history-container');

    if (btnClearHistory && historyContainer) {
        btnClearHistory.addEventListener('click', () => {
            if (historyList) {
                historyList.style.display = 'none';
            }
            btnClearHistory.style.display = 'none';

            let emptyBox = document.getElementById('history-empty-notice');
            if (!emptyBox) {
                emptyBox = document.createElement('div');
                emptyBox.id = 'history-empty-notice';
                emptyBox.style.padding = '36px 20px';
                emptyBox.style.textAlign = 'center';
                emptyBox.style.backgroundColor = '#F7FAF8';
                emptyBox.style.border = '1px solid #DBE7DF';
                emptyBox.style.borderRadius = '14px';
                emptyBox.style.marginTop = '16px';
                emptyBox.innerHTML = `
                    <div style="font-size: 28px; margin-bottom: 8px;">✓</div>
                    <strong style="display: block; font-size: 15px; color: #14251B; margin-bottom: 4px;">Historial temporal vaciado</strong>
                    <p style="font-size: 13px; color: #6C8A79; margin: 0 0 16px 0;">No tienes consultas registradas en esta sesión. Tus nuevas búsquedas aparecerán aquí.</p>
                    <a href="../index.html" class="btn-primary-action flex center" style="display: inline-flex; padding: 10px 20px; font-size: 13px; text-decoration: none;">
                        <span>Volver a buscar</span>
                    </a>
                `;
                historyContainer.appendChild(emptyBox);
            }
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
                    progressDesc.textContent = '¡Excelente! Has completado los 4 pasos. Tu envase cumple todas las condiciones para una entrega exitosa.';
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

    const formReport = document.getElementById('form-report-incident');
    if (formReport) {
        formReport.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'report-success.html?ticket=INC-' + Math.floor(1000 + Math.random() * 9000);
        });
    }

    const formSuggest = document.getElementById('form-suggest-point');
    if (formSuggest) {
        formSuggest.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'report-success.html?ticket=SUG-' + Math.floor(1000 + Math.random() * 9000);
        });
    }
});
