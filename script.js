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
            }, 180);
        });
    }

    const btnFlip = document.getElementById('btn-flip-camera');
    let isFrontCamera = false;
    if (btnFlip) {
        btnFlip.addEventListener('click', () => {
            isFrontCamera = !isFrontCamera;
            const icon = btnFlip.querySelector('img');
            const span = btnFlip.querySelector('span');
            if (btnFlip.classList) btnFlip.classList.toggle('flipped');
            if (span) {
                span.textContent = isFrontCamera ? 'Cámara frontal' : 'Cámara posterior';
            }
        });
    }

    const formAddMaterial = document.getElementById('form-add-material');
    const inputWasteQty = document.getElementById('input-waste-qty');
    const labelEstimatedWeight = document.getElementById('label-estimated-weight');
    const btnQtyMinus = document.getElementById('btn-qty-minus');
    const btnQtyPlus = document.getElementById('btn-qty-plus');
    const materialChoiceCards = document.querySelectorAll('.material-choice-card');
    const cond1 = document.getElementById('check-cond-1');
    const cond2 = document.getElementById('check-cond-2');
    const cond3 = document.getElementById('check-cond-3');
    const labelCond2 = document.getElementById('label-cond-2');
    const labelCond3 = document.getElementById('label-cond-3');
    const spanCond1 = document.getElementById('span-cond-1');
    const spanCond2 = document.getElementById('span-cond-2');
    const spanCond3 = document.getElementById('span-cond-3');
    const btnSubmitDelivery = document.getElementById('btn-submit-delivery');
    const sidebarAcceptedTag = document.getElementById('sidebar-accepted-tag');

    const materialConfig = {
        pet: {
            name: 'Botellas plásticas para bebidas',
            unitWeight: 0.030,
            weightLabel: 'botellas plásticas',
            tag: 'Acepta botellas plásticas para bebidas',
            img: '../Images/delivery-bottle.png',
            tolva: 'Boca 1 (Plásticos)',
            prepSummary: 'Enjuagada, escurrida, compactada y sin tapa',
            cond1: 'Los envases fueron enjuagados rápidamente y están completamente secos (sin residuos líquidos).',
            cond2: 'Se desenroscaron las tapas plásticas y se separaron del envase principal.',
            cond3: 'Las botellas fueron aplastadas desde la base para reducir su volumen de transporte.'
        },
        can: {
            name: 'Latas de aluminio y hojalata',
            unitWeight: 0.015,
            weightLabel: 'latas de aluminio',
            tag: 'Acepta latas de aluminio y hojalata',
            img: '../Images/delivery-can.png',
            tolva: 'Boca 3 (Metales)',
            prepSummary: 'Enjuagada, seca y comprimida sin filo',
            cond1: 'Las latas fueron escurridas y enjuagadas para eliminar restos de grasa o líquido.',
            cond2: 'Las tapas sueltas fueron introducidas dentro del envase sin filos descubiertos.',
            cond3: 'Las latas fueron comprimidas lateralmente con cuidado para optimizar el espacio.'
        },
        cardboard: {
            name: 'Cartón corrugado y papel bond',
            unitWeight: 0.250,
            weightLabel: 'cartón corrugado y papel',
            tag: 'Acepta cartón y papel limpio',
            img: '../Images/delivery-cardboard.png',
            tolva: 'Boca 4 (Papel y Cartón)',
            prepSummary: 'Desarmado, plano, seco y atado',
            cond1: 'Las cajas y papeles están 100% secos (sin manchas de grasa, comida o humedad).',
            cond2: 'Se retiraron cintas plásticas de embalaje gruesas y grapas de gran tamaño.',
            cond3: 'Las cajas fueron desarmadas y dobladas planas para formar un paquete compacto.'
        }
    };

    const getSelectedMaterialKey = () => {
        const checked = document.querySelector('input[name="material-type"]:checked');
        return checked ? checked.value : 'pet';
    };

    const recalculateWeight = () => {
        if (!inputWasteQty || !labelEstimatedWeight) return;
        let qty = parseInt(inputWasteQty.value, 10);
        if (isNaN(qty) || qty < 1) qty = 1;
        if (qty > 500) qty = 500;
        inputWasteQty.value = qty;

        const currentKey = getSelectedMaterialKey();
        const conf = materialConfig[currentKey] || materialConfig.pet;
        const totalKg = (qty * conf.unitWeight).toFixed(2);
        labelEstimatedWeight.textContent = `Equivalente aproximado a ${totalKg} kg de ${conf.weightLabel}`;
    };

    if (materialChoiceCards.length > 0) {
        materialChoiceCards.forEach(card => {
            const radio = card.querySelector('input[type="radio"]');
            if (!radio) return;

            card.addEventListener('click', () => {
                materialChoiceCards.forEach(c => {
                    c.style.borderColor = '#DBE7DF';
                    c.style.backgroundColor = '#FFFFFF';
                });
                card.style.borderColor = '#0B4A30';
                card.style.backgroundColor = '#F4FAF6';
                radio.checked = true;

                const currentKey = radio.value;
                const conf = materialConfig[currentKey] || materialConfig.pet;
                if (spanCond1) spanCond1.textContent = conf.cond1;
                if (spanCond2) spanCond2.textContent = conf.cond2;
                if (spanCond3) spanCond3.textContent = conf.cond3;
                if (sidebarAcceptedTag) sidebarAcceptedTag.textContent = conf.tag;

                recalculateWeight();
            });

            radio.addEventListener('change', () => {
                recalculateWeight();
            });
        });

        const initialKey = getSelectedMaterialKey();
        const initialCard = document.querySelector(`input[name="material-type"][value="${initialKey}"]`);
        if (initialCard) {
            const parentLabel = initialCard.closest('.material-choice-card');
            if (parentLabel) {
                parentLabel.style.borderColor = '#0B4A30';
                parentLabel.style.backgroundColor = '#F4FAF6';
            }
        }
    }

    if (inputWasteQty) {
        inputWasteQty.addEventListener('input', recalculateWeight);
        inputWasteQty.addEventListener('change', recalculateWeight);
    }

    if (btnQtyMinus && inputWasteQty) {
        btnQtyMinus.addEventListener('click', () => {
            let cur = parseInt(inputWasteQty.value, 10) || 1;
            if (cur > 1) {
                inputWasteQty.value = cur - 1;
                recalculateWeight();
            }
        });
    }

    if (btnQtyPlus && inputWasteQty) {
        btnQtyPlus.addEventListener('click', () => {
            let cur = parseInt(inputWasteQty.value, 10) || 1;
            if (cur < 500) {
                inputWasteQty.value = cur + 1;
                recalculateWeight();
            }
        });
    }

    const updateDeliveryCascade = () => {
        if (!cond1 || !cond2 || !cond3 || !btnSubmitDelivery) return;

        if (cond1.checked) {
            cond2.disabled = false;
            if (labelCond2) {
                labelCond2.style.cursor = 'pointer';
                labelCond2.style.opacity = '1';
            }
        } else {
            cond2.checked = false;
            cond2.disabled = true;
            if (labelCond2) {
                labelCond2.style.cursor = 'not-allowed';
                labelCond2.style.opacity = '0.6';
            }
            cond3.checked = false;
            cond3.disabled = true;
            if (labelCond3) {
                labelCond3.style.cursor = 'not-allowed';
                labelCond3.style.opacity = '0.6';
            }
        }

        if (cond2.checked && cond1.checked) {
            cond3.disabled = false;
            if (labelCond3) {
                labelCond3.style.cursor = 'pointer';
                labelCond3.style.opacity = '1';
            }
        } else {
            cond3.checked = false;
            cond3.disabled = true;
            if (labelCond3) {
                labelCond3.style.cursor = 'not-allowed';
                labelCond3.style.opacity = '0.6';
            }
        }

        if (cond1.checked && cond2.checked && cond3.checked) {
            btnSubmitDelivery.disabled = false;
            btnSubmitDelivery.style.cursor = 'pointer';
            btnSubmitDelivery.style.opacity = '1';
            btnSubmitDelivery.style.backgroundColor = '#0B4A30';
        } else {
            btnSubmitDelivery.disabled = true;
            btnSubmitDelivery.style.cursor = 'not-allowed';
            btnSubmitDelivery.style.opacity = '0.7';
            btnSubmitDelivery.style.backgroundColor = '#6C8A79';
        }
    };

    if (cond1 && cond2 && cond3) {
        cond1.addEventListener('change', updateDeliveryCascade);
        cond2.addEventListener('change', updateDeliveryCascade);
        cond3.addEventListener('change', updateDeliveryCascade);
        updateDeliveryCascade();
    }

    if (formAddMaterial) {
        formAddMaterial.addEventListener('submit', (e) => {
            e.preventDefault();
            if (btnSubmitDelivery && btnSubmitDelivery.disabled) {
                alert('Debes confirmar los 3 pasos de preparación obligatoria antes de agregar el residuo al lote.');
                return;
            }

            const currentKey = getSelectedMaterialKey();
            const conf = materialConfig[currentKey] || materialConfig.pet;
            const qty = parseInt(inputWasteQty.value, 10) || 1;
            const totalKg = (qty * conf.unitWeight).toFixed(2);

            let currentLot = [];
            try {
                const stored = localStorage.getItem('resaving_user_lot');
                if (stored) currentLot = JSON.parse(stored);
                if (!Array.isArray(currentLot)) currentLot = [];
            } catch (err) {
                currentLot = [];
            }

            const newItem = {
                id: 'item_' + Date.now(),
                key: currentKey,
                name: conf.name,
                qty: qty,
                weight: totalKg,
                img: conf.img,
                tolva: conf.tolva,
                prepSummary: conf.prepSummary,
                condition: 'Limpio, seco y compactado'
            };

            currentLot.push(newItem);
            localStorage.setItem('resaving_user_lot', JSON.stringify(currentLot));
            window.location.href = 'delivery.html';
        });
    }

    const lotContainer = document.getElementById('lot-items-container');
    const lotTableBody = document.getElementById('lot-table-body');
    const sectionLotTable = document.getElementById('section-lot-table');
    const btnClearLot = document.getElementById('btn-clear-lot');
    const sidebarMatchChip = document.getElementById('sidebar-match-chip');
    const sidebarMatchTitle = document.getElementById('sidebar-match-title');
    const sidebarMatchStats = document.getElementById('sidebar-match-stats');
    const sidebarMatchList = document.getElementById('sidebar-match-list');

    const renderDeliveryLot = () => {
        if (!lotContainer) return;

        let lot = [];
        try {
            const raw = localStorage.getItem('resaving_user_lot');
            if (raw) lot = JSON.parse(raw);
            if (!Array.isArray(lot)) lot = [];
        } catch (e) {
            lot = [];
        }

        if (lot.length === 0) {
            lotContainer.innerHTML = `
                <div class="empty-lot-card" style="background-color: #F7FAF8; border: 2px dashed #B8DDC8; border-radius: 14px; padding: 40px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px;">
                    <div style="width: 56px; height: 56px; border-radius: 50%; background-color: #EBF7F0; display: flex; align-items: center; justify-content: center;">
                        <img src="../Images/icon-recycler.svg" alt="" style="width: 28px; height: 28px;">
                    </div>
                    <h3 style="font-size: 18px; font-weight: 800; color: #14251B; margin: 0;">Tu lote actual está vacío</h3>
                    <p style="font-size: 13.5px; color: #5F7066; max-width: 440px; margin: 0; line-height: 1.5;">Aún no has agregado materiales para tu entrega. Puedes añadir botellas plásticas, latas, cartón u otros residuos aprovechables ya acondicionados.</p>
                    <a href="delivery-add.html" style="margin-top: 6px; padding: 10px 20px; background-color: #0B4A30; color: #FFFFFF; border-radius: 8px; font-size: 13.5px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
                        <span>+ Agregar mi primer material</span>
                    </a>
                </div>
            `;

            if (sectionLotTable) sectionLotTable.style.display = 'none';
            if (btnClearLot) btnClearLot.style.display = 'none';

            if (sidebarMatchChip) sidebarMatchChip.textContent = 'Lote en preparación';
            if (sidebarMatchTitle) sidebarMatchTitle.textContent = 'Selecciona materiales';
            if (sidebarMatchStats) sidebarMatchStats.textContent = '0 materiales registrados · 0 kg acumulados';
            if (sidebarMatchList) {
                sidebarMatchList.innerHTML = '<li><span>Agrega materiales para verificar la compatibilidad de tolva</span></li>';
            }
            return;
        }

        lotContainer.innerHTML = lot.map(item => `
            <article class="lot-item-card" data-lot-id="${item.id}">
                <div class="lot-item-img">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="lot-item-info">
                    <h3 class="lot-item-title">${item.name}</h3>
                    <p class="lot-item-sub">${item.qty} unidades · Estimado: ${item.weight} kg · ${item.condition}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                    <span class="lot-chip chip-ready">Listo para entrega</span>
                    <button type="button" class="btn-remove-lot-item" data-lot-id="${item.id}" aria-label="Eliminar ${item.name}" style="background: none; border: 1px solid #E0E7E3; border-radius: 8px; padding: 6px 12px; color: #C0392B; cursor: pointer; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
                        <img src="../Images/icon-trash-delete.svg" alt="" style="width: 14px; height: 14px;">
                        <span>Eliminar</span>
                    </button>
                </div>
            </article>
        `).join('');

        if (lotTableBody) {
            lotTableBody.innerHTML = lot.map(item => `
                <tr>
                    <td><strong>${item.name}</strong></td>
                    <td><span class="table-check" style="color: #1D8A57; font-weight: 700;">✓ Sí</span></td>
                    <td><span class="table-check" style="color: #1D8A57; font-weight: 700;">✓ Sí</span></td>
                    <td>${item.prepSummary}</td>
                    <td><span class="badge badge-green">${item.tolva}</span></td>
                </tr>
            `).join('');
        }

        if (sectionLotTable) sectionLotTable.style.display = 'block';
        if (btnClearLot) btnClearLot.style.display = 'inline-block';

        const totalUnits = lot.reduce((acc, it) => acc + (parseInt(it.qty, 10) || 0), 0);
        const totalKg = lot.reduce((acc, it) => acc + (parseFloat(it.weight) || 0), 0).toFixed(2);

        if (sidebarMatchChip) sidebarMatchChip.textContent = 'Mejor coincidencia encontrada';
        if (sidebarMatchTitle) sidebarMatchTitle.textContent = 'Estación Recicla San Miguel';
        if (sidebarMatchStats) sidebarMatchStats.textContent = `0.8 km · Abierto hoy hasta 18:00 · ${totalUnits} unidades (${totalKg} kg)`;
        if (sidebarMatchList) {
            sidebarMatchList.innerHTML = lot.map(item => `
                <li>
                    <img src="../Images/icon-check.svg" alt="" style="width: 14px; height: 14px;">
                    <span>${item.name} (${item.qty} un · ${item.weight} kg)</span>
                </li>
            `).join('');
        }

        const removeBtns = lotContainer.querySelectorAll('.btn-remove-lot-item');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const idToRemove = btn.getAttribute('data-lot-id');
                let updatedLot = lot.filter(it => it.id !== idToRemove);
                localStorage.setItem('resaving_user_lot', JSON.stringify(updatedLot));
                renderDeliveryLot();
            });
        });
    };

    if (btnClearLot) {
        btnClearLot.addEventListener('click', () => {
            if (confirm('¿Deseas vaciar todos los materiales de tu lote actual?')) {
                localStorage.removeItem('resaving_user_lot');
                renderDeliveryLot();
            }
        });
    }

    if (lotContainer) {
        renderDeliveryLot();
    }

    const detailMatData = {
        pet: {
            title: 'Botellas plásticas para bebidas (Agua y refrescos)',
            sub: 'La botella plástica transparente puede recuperarse al 100% mediante reciclaje mecánico cuando se entrega vacía, limpia y seca.',
            img: '../Images/waste-pet-bottle.png',
            badge: 'Tacho Verde · Plástico',
            crumb: 'Botellas plásticas para bebidas',
            category: 'Aprovechable',
            bannerStatus: 'Condición verificada: Tacho Verde (Aprovechable)',
            bannerDesc: 'Clasificación oficial según la Norma Técnica Peruana NTP 900.058:2019 de segregación de residuos.',
            bannerIcon: '../Images/icon-check.svg',
            bannerColor: '#EBF7F0',
            bannerBorder: '#B8DEC9',
            attrs: [
                { label: 'Material', val: 'Plástico transparente de bebidas' },
                { label: 'Apariencia', val: 'Cristalino o ligeramente azulado' },
                { label: 'Peso promedio', val: 'Ligero (~28 g por envase de 500 ml)' },
                { label: 'Recuperación', val: 'Alta (100% mecánicamente reciclable)' },
                { label: 'Uso habitual', val: 'Bebidas hidratantes, aguas y gaseosas' }
            ],
            parts: [
                { name: 'Cuerpo de la botella', tag: 'Aprovechable', mat: 'Plástico transparente', desc: 'Componente de mayor valor comercial. Se tritura en hojuelas limpias para producir nuevas botellas y fibras textiles.' },
                { name: 'Tapa rosca', tag: 'Separar', mat: 'Plástico rígido coloreado', desc: 'Desenroscar y separar. Se destina a campañas solidarias de tapitas o molinos de inyección plástica.' },
                { name: 'Etiqueta envolvente', tag: 'Opcional', mat: 'Película plástica impresa', desc: 'Retirar si cuenta con abre-fácil punteado. Si no, las plantas de lavado la separan por flotación.' }
            ],
            partsDesc: 'Cada elemento de la botella plástica tiene un tratamiento específico de reciclaje. Revisa cómo separar cada parte antes de entregarla.',
            destDesc: 'Canales formales y recomendados para entregar botellas plásticas en Lima Metropolitana.',
            ctaTitle: '¿Listo para acondicionar tu botella plástica?',
            ctaDesc: 'Sigue la guía rápida de preparación de 4 pasos en orden de cascada para asegurarte de que tu residuo sea recibido sin observaciones.',
            ctaPrepText: 'Ir a Guía de preparación',
            faq: [
                { q: '¿Por qué es necesario vaciar y escurrir la botella antes de reciclarla?', a: 'Los líquidos residuales fermentan, producen malos olores y humedecen papeles y cartones cercanos en el tacho verde, inutilizando todo el lote reciclable.' },
                { q: '¿Es obligatorio aplastar o compactar la botella?', a: 'Sí, reduce el volumen hasta en un 70%, permitiendo almacenar más residuos en casa y facilitando que el reciclador de base traslade el triple de peso.' },
                { q: '¿Qué pasa si la botella contenía aceite comestible?', a: 'Las botellas con aceite residual NO deben mezclarse con las de bebidas. Requieren lavado con agua caliente y detergente o entregarse en centros de acopio de aceite usado.' }
            ]
        },
        vidrio: {
            title: 'Botellas y frascos de vidrio (100% aprovechables)',
            sub: 'El vidrio es un recurso noble infinitamente reciclable que nunca pierde calidad ni pureza. Debe entregarse entero y limpio.',
            img: '../Images/delivery-glass.png',
            badge: 'Tacho Verde · Vidrio',
            crumb: 'Frascos y botellas de vidrio',
            category: 'Aprovechable',
            bannerStatus: 'Condición verificada: Tacho Verde (Aprovechable)',
            bannerDesc: 'El vidrio se funde al 100% en hornos de reciclaje para producir nuevos frascos y botellas sin generar merma.',
            bannerIcon: '../Images/icon-check.svg',
            bannerColor: '#EBF7F0',
            bannerBorder: '#B8DEC9',
            attrs: [
                { label: 'Material', val: 'Vidrio sódico silíceo' },
                { label: 'Apariencia', val: 'Transparente, verde o ámbar' },
                { label: 'Peso promedio', val: 'Pesado (~250 g a 450 g por envase)' },
                { label: 'Recuperación', val: 'Infinita (100% reciclable en ciclo cerrado)' },
                { label: 'Uso habitual', val: 'Conservas de mermelada, salsas, café y bebidas' }
            ],
            parts: [
                { name: 'Cuerpo del envase de vidrio', tag: 'Aprovechable', mat: 'Sílice fundida', desc: 'Debe entregarse ENTERO. Nunca rompas los frascos porque los fragmentos afilados causan heridas graves a los recicladores.' },
                { name: 'Tapa metálica de conserva', tag: 'Separar', mat: 'Hojalata con barniz alimentario', desc: 'Desenroscar la tapa y depositarla separada en el contenedor de metales.' },
                { name: 'Etiqueta adhesiva de papel', tag: 'Opcional', mat: 'Papel con adhesivo base agua', desc: 'No es indispensable retirarla; los hornos de fundición incineran el papel sin dejar rastros.' }
            ],
            partsDesc: 'El envase de vidrio se compone de sílice pura y tapa metálica separable. Revisa cómo acondicionarlo sin riesgos de corte.',
            destDesc: 'Canales formales para entregar frascos y botellas de vidrio enteros en Lima Metropolitana.',
            ctaTitle: '¿Listo para acondicionar tu frasco de vidrio?',
            ctaDesc: 'Sigue la guía rápida de preparación de 4 pasos en orden de cascada para entregar vidrio seguro y limpio.',
            ctaPrepText: 'Ir a Guía de preparación de vidrio',
            faq: [
                { q: '¿Puedo entregar vidrios rotos o vidrios de ventana?', a: 'NO. Los vidrios planos de ventana, espejos y cerámicas tienen puntos de fusión distintos y no se funden con botellas; además causan heridas graves a los operarios.' },
                { q: '¿Por qué debe entregarse seco el frasco?', a: 'Para evitar la formación de hongos e insectos en los centros de acopio temporal de las asociaciones de recicladores.' }
            ]
        },
        carton: {
            title: 'Cajas de cartón corrugado y empaques de jugo',
            sub: 'Las fibras de celulosa pueden reciclarse hasta 7 veces. Deben mantenerse completamente secas y dobladas para optimizar el transporte.',
            img: '../Images/delivery-cardboard.png',
            badge: 'Tacho Verde · Papel y Cartón',
            crumb: 'Cajas de cartón y empaques',
            category: 'Aprovechable',
            bannerStatus: 'Condición verificada: Tacho Verde (Aprovechable)',
            bannerDesc: 'Aceptado por todas las asociaciones de recicladores municipales cuando se mantiene seco y limpio.',
            bannerIcon: '../Images/icon-check.svg',
            bannerColor: '#EBF7F0',
            bannerBorder: '#B8DEC9',
            attrs: [
                { label: 'Material', val: 'Fibras de celulosa kraft y onda corrugada' },
                { label: 'Apariencia', val: 'Marrón rígido o cartulina multicapa' },
                { label: 'Peso promedio', val: 'Variable (~150 g a 400 g por caja)' },
                { label: 'Recuperación', val: 'Alta (hasta 7 ciclos de pulpeo)' },
                { label: 'Uso habitual', val: 'Cajas de encomiendas, cereales y embalajes' }
            ],
            parts: [
                { name: 'Láminas de cartón corrugado', tag: 'Aprovechable', mat: 'Pulpa de celulosa reciclable', desc: 'Aplanar completamente despegando las aletas para optimizar el espacio de almacenamiento.' },
                { name: 'Cinta plástica de embalaje', tag: 'Separar', mat: 'Cinta adhesiva sintética', desc: 'Desprende las tiras de cinta plástica gruesa para evitar que se traben en los molinos industriales.' },
                { name: 'Grapas metálicas', tag: 'Opcional', mat: 'Alambre de acero galvanizado', desc: 'Los imanes industriales las retiran automáticamente en planta, pero es preferible sacarlas.' }
            ],
            partsDesc: 'El cartón y los empaques multicapa se reciclan eficientemente al retirar materiales sintéticos adheridos.',
            destDesc: 'Canales autorizados para entregar cartón limpio y seco en Lima Metropolitana.',
            ctaTitle: '¿Listo para acondicionar tus cajas de cartón?',
            ctaDesc: 'Sigue la guía rápida de preparación de 4 pasos en orden de cascada para plegar y atar tus cajas en fardos secos.',
            ctaPrepText: 'Ir a Guía de preparación de cartón',
            faq: [
                { q: '¿Se pueden reciclar cajas de pizza con grasa?', a: 'NO. El cartón con restos de queso o aceite no se disuelve en agua durante el pulpeo y arruina lotes de papel bond. Esas partes van al tacho negro.' },
                { q: '¿Qué pasa si el cartón se moja?', a: 'El cartón húmedo genera hongos en menos de 24 horas y pierde resistencia mecánica, provocando su rechazo total.' }
            ]
        },
        lata: {
            title: 'Latas de bebidas y conservas de aluminio / hojalata',
            sub: 'El reciclaje de aluminio ahorra el 95% de la energía frente a la extracción virgen. Enjuaga la lata y comprímela suavemente antes de entregar.',
            img: '../Images/delivery-can.png',
            badge: 'Tacho Verde · Metales',
            crumb: 'Latas de aluminio',
            category: 'Aprovechable',
            bannerStatus: 'Condición verificada: Tacho Verde (Aprovechable)',
            bannerDesc: 'Metal de altísimo valor de rescate comercial para el sustento de los recicladores de base.',
            bannerIcon: '../Images/icon-check.svg',
            bannerColor: '#EBF7F0',
            bannerBorder: '#B8DEC9',
            attrs: [
                { label: 'Material', val: 'Aleación de aluminio / Hojalata alimentaria' },
                { label: 'Apariencia', val: 'Metálico cilíndrico brillante' },
                { label: 'Peso promedio', val: 'Ultraligero (~15 g por lata de 355 ml)' },
                { label: 'Recuperación', val: 'Infinita (100% fundible sin pérdida de propiedades)' },
                { label: 'Uso habitual', val: 'Gaseosas, cervezas, leche evaporada y conservas' }
            ],
            parts: [
                { name: 'Cuerpo de la lata', tag: 'Aprovechable', mat: 'Aluminio o acero estañado', desc: 'Enjuagar con un chorrito de agua para retirar restos azucarados o salmuera y comprimir de costado.' },
                { name: 'Anilla abre-fácil', tag: 'Aprovechable', mat: 'Aluminio puro', desc: 'No la arranques ni la arrojes al suelo; déjala empujada hacia el interior del envase.' },
                { name: 'Tapa suelta de conserva', tag: 'Aprovechable', mat: 'Hojalata plana', desc: 'Introdúcela dentro de la lata y aprieta el borde para evitar bordes cortantes que puedan herir.' }
            ],
            partsDesc: 'Las latas están hechas de metales nobles fácilmente separables por corrientes de Foucault o imanes.',
            destDesc: 'Canales recomendados para entregar metales y latas comprimidas en Lima Metropolitana.',
            ctaTitle: '¿Listo para acondicionar tus latas de aluminio?',
            ctaDesc: 'Sigue la guía rápida de preparación de 4 pasos en orden de cascada para enjuagar y compactar metales sin peligro.',
            ctaPrepText: 'Ir a Guía de preparación de latas',
            faq: [
                { q: '¿Las latas de atún en aceite se reciclan?', a: 'Sí, pero debes escurrir el aceite residual y enjuagar con una gota de detergente para evitar olores y fauna nociva en acopio.' },
                { q: '¿Se aceptan latas de aerosol presurizado?', a: 'Las latas de pintura o insecticida presurizado son residuos peligrosos. Solo se aceptan despresurizadas en puntos especiales.' }
            ]
        },
        pead: {
            title: 'Envases rígidos de detergente, champú y yogur',
            sub: 'El plástico rígido de alta densidad es muy duradero. Se recicla para fabricar tuberías de riego, baldes y nuevas galoneras.',
            img: '../Images/gallery-plastic-bottle.png',
            badge: 'Tacho Verde · Plástico rígido',
            crumb: 'Envases de detergente y champú',
            category: 'Aprovechable',
            bannerStatus: 'Condición verificada: Tacho Verde (Aprovechable)',
            bannerDesc: 'Plástico de gran demanda industrial. Requiere enjuague previo para evitar contaminación química.',
            bannerIcon: '../Images/icon-check.svg',
            bannerColor: '#EBF7F0',
            bannerBorder: '#B8DEC9',
            attrs: [
                { label: 'Material', val: 'Plástico opaco de alta densidad' },
                { label: 'Apariencia', val: 'Opaco, coloreado o blanco mate' },
                { label: 'Peso promedio', val: 'Medio (~45 g a 90 g por botella)' },
                { label: 'Recuperación', val: 'Alta (granzas para extrusión e inyección)' },
                { label: 'Uso habitual', val: 'Galoneras de lejía, botellas de champú y yogur' }
            ],
            parts: [
                { name: 'Cuerpo de la galonera o envase', tag: 'Aprovechable', mat: 'Plástico rígido opaco', desc: 'Enjuagar dos veces con agua tibia para retirar residuos viscosos de jabón o detergente.' },
                { name: 'Bomba dispensadora', tag: 'Separar', mat: 'Multimaterial con resorte de acero', desc: 'Desenroscar y retirar el dosificador porque el resorte de metal daña los molinos de plástico.' },
                { name: 'Tapa rosca simple', tag: 'Aprovechable', mat: 'Plástico rígido', desc: 'Se enrosca ligeramente una vez seco el interior del envase.' }
            ],
            partsDesc: 'Los envases de limpieza cuentan con componentes plásticos rígidos y bombas mecánicas que deben segregarse.',
            destDesc: 'Puntos limpios y tolvas municipales para envases de limpieza y champú.',
            ctaTitle: '¿Listo para acondicionar tus envases de limpieza?',
            ctaDesc: 'Sigue la guía rápida de preparación de 4 pasos en orden de cascada para enjuagar y retirar dispensadores.',
            ctaPrepText: 'Ir a Guía de preparación',
            faq: [
                { q: '¿Puedo entregar botellas con restos de lejía?', a: 'Sí, siempre que estén completamente enjuagadas con agua para que no desprendan vapores ni irriten la piel de los recicladores.' }
            ]
        },
        pilas: {
            title: 'Pilas alcalinas y baterías domésticas',
            sub: 'Las pilas contienen metales pesados. NUNCA las arrojes al tacho verde ni negro. Requieren entrega en contenedores rojos o ecopuntos especiales.',
            img: '../Images/category-hazardous.png',
            badge: 'Tacho Rojo · Peligroso',
            crumb: 'Pilas y baterías alcalinas',
            category: 'Peligrosos · Punto Especial',
            bannerStatus: 'Atención de Seguridad: Tacho Rojo o Punto Especial',
            bannerDesc: 'Prohibido mezclar con residuos aprovechables comunes. Debe depositarse en contenedores rotulados para pilas en supermercados o municipios.',
            bannerIcon: '../Images/trust-alternative.svg',
            bannerColor: '#FDE8E8',
            bannerBorder: '#F87171',
            attrs: [
                { label: 'Material', val: 'Zinc, dióxido de manganeso y electrolito' },
                { label: 'Apariencia', val: 'Cilíndrico metálico sellado (AA, AAA, D, 9V, botón)' },
                { label: 'Peso promedio', val: 'Pesado (~24 g por unidad AA)' },
                { label: 'Tratamiento', val: 'Disposición segura y encapsulado en celdas de seguridad' },
                { label: 'Uso habitual', val: 'Controles remotos, juguetes, relojes y linternas' }
            ],
            parts: [
                { name: 'Cuerpo sellado de la pila', tag: 'Peligroso', mat: 'Acero con núcleo químico activo', desc: 'NUNCA intentes abrir, quemar, recargar ni golpear una pila alcalina gastada.' },
                { name: 'Terminales de contacto (+ y -)', tag: 'Aislar', mat: 'Polos conductores metálicos', desc: 'Cubre ambos polos con cinta adhesiva transparente para evitar chispas o cortocircuitos accidentales.' }
            ],
            partsDesc: 'Las pilas son residuos peligrosos que no deben desarmarse ni mezclarse con plásticos.',
            destDesc: 'Puntos limpios especiales y tachos rojos autorizados en Lima Metropolitana.',
            ctaTitle: '¿Listo para acondicionar tus pilas usadas?',
            ctaDesc: 'Sigue la guía de acondicionamiento seguro de 4 pasos en cascada para proteger el medio ambiente.',
            ctaPrepText: 'Ir a Guía de seguridad de pilas',
            faq: [
                { q: '¿Qué hago si una pila sulfató o botó polvo blanco?', a: 'Tómala con una bolsa plástica sin tocar con la piel desnuda. Introdúcela en una botella plástica seca con tapa y llévala al punto de pilas.' },
                { q: '¿Por qué no va al tacho verde?', a: 'Porque el tacho verde es para reciclaje manual de envases limpios. El ácido de una pila sulfatada inutiliza toneladas de material reciclable.' }
            ]
        },
        bolsa: {
            title: 'Bolsas plásticas de compras y láminas flexibles',
            sub: 'Las bolsas delgadas no se procesan en tachos verdes comunes de Lima porque traban los molinos trituradores. Requieren ecopuntos de película plástica específica.',
            img: '../Images/category-sanitary.png',
            badge: 'Tacho Especial · Film',
            crumb: 'Bolsas plásticas de compras',
            category: 'Punto Específico',
            bannerStatus: 'Condición especial: No colocar en el tacho verde común',
            bannerDesc: 'Entregar únicamente en campañas municipales de ecoladrillos o módulos específicos para film flexible.',
            bannerIcon: '../Images/trust-alternative.svg',
            bannerColor: '#FEF3C7',
            bannerBorder: '#FCD34D',
            attrs: [
                { label: 'Material', val: 'Película flexible transparente o impresa' },
                { label: 'Apariencia', val: 'Lámina plástica flexible' },
                { label: 'Peso promedio', val: 'Ultraligero (~6 g por bolsa de mercado)' },
                { label: 'Recuperación', val: 'Especializada (aglomeración y peletizado térmico)' },
                { label: 'Uso habitual', val: 'Bolsas de compras, fundas de pan y film de embalaje' }
            ],
            parts: [
                { name: 'Cuerpo de la bolsa', tag: 'Especial', mat: 'Lámina polimérica flexible', desc: 'Limpiar de restos de comida y comprimir dentro de una botella plástica si se elaboran ecoladrillos.' }
            ],
            partsDesc: 'Las bolsas requieren tratamiento por separado para no obstaculizar maquinaria rotativa.',
            destDesc: 'Centros comunales y ecomódulos autorizados para plásticos flexibles.',
            ctaTitle: '¿Listo para acondicionar bolsas plásticas?',
            ctaDesc: 'Sigue la guía de 4 pasos en orden de cascada para almacenar bolsas secas.',
            ctaPrepText: 'Ir a Guía de preparación de film',
            faq: [
                { q: '¿Por qué se rechazan en los tachos verdes comunes?', a: 'Porque se enredan en los ejes mecánicos de los molinos de trituración, quemando los motores y frenando la línea de reciclaje.' }
            ]
        }
    };
    detailMatData.metal = detailMatData.lata;

    const matSwitchBtns = document.querySelectorAll('.mat-switch-btn');
    const detailTitle = document.getElementById('detail-title');
    const detailSubtitle = document.getElementById('detail-subtitle');
    const detailImg = document.getElementById('detail-main-img');
    const detailBadge = document.getElementById('detail-code-badge');
    const breadcrumbMat = document.getElementById('breadcrumb-current-mat');

    if (matSwitchBtns.length > 0 && detailTitle) {
        const switchMaterial = (matKey) => {
            const normKey = (matKey === 'metal' || matKey === 'lata') ? 'lata' : matKey;
            const data = detailMatData[normKey] || detailMatData.pet;

            matSwitchBtns.forEach(btn => {
                const btnKey = btn.getAttribute('data-mat');
                const isMatch = btnKey === normKey || (btnKey === 'metal' && normKey === 'lata');
                if (isMatch) {
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

            document.title = `Resaving - ${data.title}`;
            if (breadcrumbMat) breadcrumbMat.textContent = data.crumb;
            if (detailTitle) detailTitle.textContent = data.title;
            if (detailSubtitle) detailSubtitle.textContent = data.sub;
            if (detailImg) {
                detailImg.src = data.img;
                detailImg.alt = data.title;
            }
            if (detailBadge) detailBadge.textContent = data.badge;

            const catBadge = document.getElementById('detail-category-badge');
            if (catBadge) {
                catBadge.textContent = data.category || 'Aprovechable';
                if (normKey === 'pilas') {
                    catBadge.style.backgroundColor = '#C0392B';
                } else if (normKey === 'bolsa') {
                    catBadge.style.backgroundColor = '#D97706';
                } else {
                    catBadge.style.backgroundColor = '#1D8A57';
                }
            }

            const banner = document.getElementById('detail-status-banner');
            const bannerTitle = document.getElementById('detail-status-title');
            const bannerDesc = document.getElementById('detail-status-desc');
            const bannerIcon = document.getElementById('detail-status-icon');
            if (banner && data.bannerStatus) {
                banner.style.backgroundColor = data.bannerColor;
                banner.style.borderColor = data.bannerBorder;
                if (bannerTitle) bannerTitle.textContent = data.bannerStatus;
                if (bannerDesc) bannerDesc.textContent = data.bannerDesc;
                if (bannerIcon) bannerIcon.src = data.bannerIcon;
            }

            const attrGrid = document.getElementById('detail-attr-grid');
            if (attrGrid && data.attrs) {
                attrGrid.innerHTML = data.attrs.map(attr => `
                    <div class="attr-item">
                        <span class="attr-label">${attr.label}</span>
                        <span class="attr-val">${attr.val}</span>
                    </div>
                `).join('');
            }

            const partsTitle = document.getElementById('detail-parts-title');
            const partsDesc = document.getElementById('detail-parts-desc');
            const partsGrid = document.getElementById('detail-parts-grid');
            if (partsTitle) partsTitle.textContent = `Partes y componentes de: ${data.crumb}`;
            if (partsDesc && data.partsDesc) partsDesc.textContent = data.partsDesc;
            if (partsGrid && data.parts) {
                partsGrid.innerHTML = data.parts.map(part => {
                    let tagClass = 'tag-recycle';
                    if (part.tag === 'Separar' || part.tag === 'Peligroso') tagClass = 'tag-separate';
                    if (part.tag === 'Opcional' || part.tag === 'Especial') tagClass = 'tag-optional';
                    return `
                        <div class="part-card">
                            <div class="part-header">
                                <h3 class="part-name">${part.name}</h3>
                                <span class="part-tag ${tagClass}">${part.tag}</span>
                            </div>
                            <span class="part-material">${part.mat}</span>
                            <p class="part-desc">${part.desc}</p>
                        </div>
                    `;
                }).join('');
            }

            const destDesc = document.getElementById('detail-dest-desc');
            if (destDesc && data.destDesc) destDesc.textContent = data.destDesc;

            const faqAccordion = document.getElementById('detail-faq-accordion');
            if (faqAccordion && data.faq) {
                faqAccordion.innerHTML = data.faq.map(item => `
                    <details class="faq-item">
                        <summary class="faq-question">
                            <span>${item.q}</span>
                            <img src="../Images/icon-chevron-down.svg" alt="" class="faq-arrow">
                        </summary>
                        <div class="faq-answer">
                            <p>${item.a}</p>
                        </div>
                    </details>
                `).join('');
            }

            const ctaTitle = document.getElementById('detail-cta-title');
            const ctaDesc = document.getElementById('detail-cta-desc');
            const ctaPrepBtn = document.getElementById('detail-cta-prep-btn');
            const actionPrepBtn = document.getElementById('detail-action-prep-btn');
            if (ctaTitle && data.ctaTitle) ctaTitle.textContent = data.ctaTitle;
            if (ctaDesc && data.ctaDesc) ctaDesc.textContent = data.ctaDesc;
            if (ctaPrepBtn) {
                ctaPrepBtn.href = `prep-guide.html?tipo=${normKey}`;
                const span = ctaPrepBtn.querySelector('span');
                if (span && data.ctaPrepText) span.textContent = data.ctaPrepText;
            }
            if (actionPrepBtn) {
                actionPrepBtn.href = `prep-guide.html?tipo=${normKey}`;
            }
        };

        matSwitchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-mat');
                switchMaterial(key);
            });
        });

        const urlParams = new URLSearchParams(window.location.search);
        const requestedType = urlParams.get('tipo') || 'pet';
        switchMaterial(requestedType);
    }

    const districtStations = {
        'san-miguel': [
            { id: '1', num: '1', name: 'Estación Recicla San Miguel', status: 'Abierto hoy', badge: 'badge-open', dist: '0.8 km · 11 min a pie · Cruce Av. La Marina con Universitaria', addr: 'Ingreso peatonal frente a Plaza San Miguel. Horario: 08:00 a 18:00.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Vidrio', 'Cartón y papel'], x: 48, y: 42, promoter: 'Edgar Ramos (Reg. #SM-402)', capacity: '85% libre (vaciado hoy)' },
            { id: '2', num: '2', name: 'Punto Limpio Parque Juan Pablo II', status: 'Abierto hoy', badge: 'badge-open', dist: '1.4 km · 18 min a pie · Av. Riva Agüero cdra. 8', addr: 'Contenedores verdes ubicados junto a la caseta de serenazgo del parque. Horario: 07:00 a 19:00.', mats: 'pet vidrio papel', tags: ['Botellas plásticas', 'Latas de conserva', 'Papel'], x: 65, y: 30, promoter: 'Rosa Quispe (Reg. #SM-205)', capacity: '60% libre' },
            { id: '3', num: '3', name: 'Contenedor Verde Metro La Marina', status: 'Abierto 24h', badge: 'badge-open', dist: '1.9 km · 25 min a pie · Av. La Marina 2500', addr: 'Área de estacionamiento del supermercado. Acceso vehicular y peatonal las 24 horas.', mats: 'pet vidrio', tags: ['Botellas plásticas', 'Vidrio de conserva'], x: 35, y: 60, promoter: 'Caseta de Seguridad Metro', capacity: '75% libre' },
            { id: '4', num: '4', name: 'Estación Ambiental Plaza Bandera', status: 'Cierra a las 17:00', badge: 'badge-closing', dist: '2.3 km · 7 min en auto · Límite con Pueblo Libre', addr: 'Punto de acopio municipal para materiales aprovechables y contenedor para pilas usadas.', mats: 'pet metal especial', tags: ['Multimaterial', 'Pilas y baterías'], x: 80, y: 25, promoter: 'Carlos Dávila (Reg. #SM-318)', capacity: '40% libre' }
        ],
        'pueblo-libre': [
            { id: '1', num: '1', name: 'Ecopunto Plaza Bolívar', status: 'Abierto hoy', badge: 'badge-open', dist: '0.6 km · 8 min a pie · Jr. Vivanco frente a Municipalidad', addr: 'Centro de reciclaje selectivo comunal. Horario: 08:00 a 17:00.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Vidrio', 'Cartón y papel'], x: 50, y: 45, promoter: 'María Elena Fuentes (Reg. #PL-110)', capacity: '70% libre' },
            { id: '2', num: '2', name: 'Módulo Ambiental Parque El Carmen', status: 'Abierto hoy', badge: 'badge-open', dist: '1.1 km · 14 min a pie · Av. Sucre cdra. 12', addr: 'Isla de segregación con promotor vecinal. Horario: 09:00 a 18:00.', mats: 'pet papel metal', tags: ['Botellas plásticas', 'Latas de aluminio', 'Papel bond'], x: 68, y: 35, promoter: 'Juan Paredes (Reg. #PL-142)', capacity: '50% libre' },
            { id: '3', num: '3', name: 'Punto Verde Parque Candamo', status: 'Abierto hoy', badge: 'badge-open', dist: '1.8 km · 22 min a pie · Av. Del Río cuadra 3', addr: 'Contenedores para plástico, vidrio y contenedor rojo de pilas. Horario: 07:00 a 19:00.', mats: 'pet vidrio especial', tags: ['Botellas plásticas', 'Vidrio', 'Pilas alcalinas'], x: 32, y: 58, promoter: 'Sofía Delgado (Reg. #PL-203)', capacity: '80% libre' }
        ],
        'miraflores': [
            { id: '1', num: '1', name: 'Punto Limpio Parque Kennedy', status: 'Abierto 24h', badge: 'badge-open', dist: '0.5 km · 7 min a pie · Parque Central de Miraflores (Diagonal)', addr: 'Estación soterrada de 4 bocas con promotor diurno. Horario 24h.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Vidrio', 'Latas'], x: 52, y: 48, promoter: 'Programa Basura Cero Miraflores', capacity: '90% libre' },
            { id: '2', num: '2', name: 'Estación Ecológica Reducto', status: 'Abierto hoy', badge: 'badge-open', dist: '1.2 km · 15 min a pie · Parque Reducto N° 2 (Av. Benavides)', addr: 'Centro de segregación municipal y recepción de pequeños aparatos. Horario: 08:30 a 18:00.', mats: 'pet papel metal especial', tags: ['Cartón corrugado', 'Plásticos', 'Aparatos electrónicos'], x: 40, y: 65, promoter: 'Asoc. Recicladores Miraflores', capacity: '65% libre' },
            { id: '3', num: '3', name: 'Ecopunto Malecón Cisneros', status: 'Abierto hoy', badge: 'badge-open', dist: '1.6 km · 20 min a pie · Malecón Cisneros cdra. 5', addr: 'Frente al Parque del Faro. Contenedores de alta capacidad. Horario: 07:00 a 19:00.', mats: 'pet vidrio', tags: ['Botellas de bebidas', 'Vidrio'], x: 25, y: 32, promoter: 'Serenazgo Miraflores Costa', capacity: '80% libre' },
            { id: '4', num: '4', name: 'Centro de Acopio Estadio Manuel Bonilla', status: 'Abierto hoy', badge: 'badge-open', dist: '2.1 km · 8 min en auto · Av. Del Ejército cdra. 13', addr: 'Recepción general multimaterial, tolva para aceite vegetal y pilas. Horario: 08:00 a 17:00.', mats: 'pet vidrio papel metal especial', tags: ['Multimaterial', 'Aceite vegetal', 'Pilas'], x: 72, y: 22, promoter: 'Subgerencia Limpieza Pública', capacity: '55% libre' }
        ],
        'magdalena': [
            { id: '1', num: '1', name: 'Estación Recicla Plaza Túpac Amaru', status: 'Abierto hoy', badge: 'badge-open', dist: '0.7 km · 9 min a pie · Jr. Bolognesi cdra. 3', addr: 'Centro comunal frente a la iglesia del Sagrado Corazón. Horario: 08:00 a 18:00.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Cartón', 'Latas'], x: 45, y: 40, promoter: 'Asoc. Recicla Magdalena', capacity: '75% libre' },
            { id: '2', num: '2', name: 'Ecopunto Malecón Castagnola', status: 'Abierto hoy', badge: 'badge-open', dist: '1.3 km · 16 min a pie · Jr. Diego Ferré cruce con Malecón', addr: 'Contenedores verdes instalados con vista al mar. Horario: 07:00 a 18:00.', mats: 'pet vidrio', tags: ['Botellas para bebidas', 'Frascos de vidrio'], x: 30, y: 60, promoter: 'Serenazgo Costanera', capacity: '85% libre' },
            { id: '3', num: '3', name: 'Punto Limpio Mercado Magdalena', status: 'Cierra a las 16:00', badge: 'badge-closing', dist: '1.5 km · 19 min a pie · Jr. Leoncio Prado cdra. 7', addr: 'Bahía de reciclaje posterior del mercado municipal. Horario: 07:00 a 16:00.', mats: 'pet papel organico', tags: ['Envases plásticos', 'Cartón limpio'], x: 65, y: 30, promoter: 'Comité Ambiental Mercado', capacity: '50% libre' }
        ],
        'surco': [
            { id: '1', num: '1', name: 'Planta de Reciclaje EMUSAP Surco', status: 'Abierto hoy', badge: 'badge-open', dist: '0.9 km · 12 min a pie · Jr. Combate de Angamos s/n', addr: 'Planta modelo de segregación y valorización de residuos. Horario: 08:00 a 17:00.', mats: 'pet vidrio papel metal especial', tags: ['Plásticos', 'Vidrio', 'Papel y cartón', 'Metales'], x: 55, y: 46, promoter: 'Programa Surco Recicla (EMUSAP)', capacity: '90% libre' },
            { id: '2', num: '2', name: 'Ecopunto Parque de la Amistad', status: 'Abierto hoy', badge: 'badge-open', dist: '1.4 km · 18 min a pie · Av. Caminos del Inca cruce con Benavides', addr: 'Punto limpio turístico al costado de la estación del tren. Horario: 08:00 a 19:00.', mats: 'pet vidrio papel', tags: ['Botellas plásticas', 'Frascos', 'Cartón'], x: 42, y: 32, promoter: 'Promotores Amistad Verde', capacity: '70% libre' },
            { id: '3', num: '3', name: 'Módulo Verde Jockey Plaza', status: 'Abierto hoy', badge: 'badge-open', dist: '2.0 km · 6 min en auto · Av. Javier Prado Este 4200', addr: 'Zona de estacionamiento peatonal puerta 1. Horario comercial: 09:00 a 21:00.', mats: 'pet vidrio metal', tags: ['Botellas plásticas', 'Latas de bebidas'], x: 75, y: 20, promoter: 'Sostenibilidad Jockey', capacity: '80% libre' },
            { id: '4', num: '4', name: 'Punto de Acopio Parque Voces por el Clima', status: 'Abierto hoy', badge: 'badge-open', dist: '2.8 km · 9 min en auto · Av. Los Castillos s/n', addr: 'Pabellón de reciclaje ecológico y recepción de ecoladrillos. Horario: 09:00 a 17:00.', mats: 'pet papel metal especial', tags: ['Multimaterial', 'Ecoladrillos', 'Pilas'], x: 60, y: 68, promoter: 'Centro Educación Ambiental Surco', capacity: '60% libre' }
        ]
    };

    const districtSelector = document.getElementById('district-selector');
    const mapPointsContainer = document.querySelector('.map-points-list');
    const listPointsContainer = document.querySelector('.list-view-grid');
    const mapMarkersLayer = document.getElementById('map-markers-layer');
    const popupTitle = document.getElementById('popup-point-title');
    const popupDesc = document.getElementById('popup-point-desc');
    const popupLink = document.getElementById('popup-point-link');

    const updateMapPopup = (st, districtKey) => {
        if (!popupTitle || !popupDesc || !popupLink) return;
        popupTitle.textContent = st.name;
        popupDesc.textContent = `${st.dist} · ${st.status} · Acepta ${st.tags.join(', ')}.`;
        popupLink.href = `point-detail.html?punto=${districtKey}-${st.id}`;
    };

    const renderDistrictStations = (districtKey) => {
        const stations = districtStations[districtKey] || districtStations['san-miguel'];

        if (mapPointsContainer) {
            mapPointsContainer.innerHTML = stations.map((st, i) => `
                <article class="point-card ${i === 0 ? 'selected' : ''}" data-point-id="${st.id}" data-materials="${st.mats}">
                    <div class="point-card-header">
                        <h2 class="point-card-title">${st.num}. ${st.name}</h2>
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
        }

        if (mapMarkersLayer) {
            mapMarkersLayer.innerHTML = stations.map((st, i) => `
                <div class="map-marker marker-${st.id} ${i === 0 ? 'selected' : ''}" data-point-id="${st.id}" style="top: ${st.y}%; left: ${st.x}%;">${st.num}</div>
            `).join('');
        }

        if (stations.length > 0) {
            updateMapPopup(stations[0], districtKey);
        }

        if (listPointsContainer) {
            listPointsContainer.innerHTML = stations.map(st => `
                <article class="list-point-item" data-materials="${st.mats}">
                    <div class="list-point-info">
                        <div class="point-card-header">
                            <h2 class="point-card-title">${st.num}. ${st.name}</h2>
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

        bindMarkerAndCardEvents(districtKey, stations);
    };

    const bindMarkerAndCardEvents = (districtKey, stations) => {
        const pointCards = document.querySelectorAll('.point-card');
        const mapMarkers = document.querySelectorAll('.map-marker[data-point-id]');

        mapMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                const pid = marker.getAttribute('data-point-id');
                const matchedSt = stations.find(s => s.id === pid);
                if (matchedSt) updateMapPopup(matchedSt, districtKey);

                mapMarkers.forEach(m => m.classList.remove('selected'));
                marker.classList.add('selected');

                pointCards.forEach(c => {
                    if (c.getAttribute('data-point-id') === pid) {
                        c.classList.add('selected');
                        c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } else {
                        c.classList.remove('selected');
                    }
                });
            });
        });

        pointCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                const pid = card.getAttribute('data-point-id');
                const matchedSt = stations.find(s => s.id === pid);
                if (matchedSt) updateMapPopup(matchedSt, districtKey);

                pointCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                mapMarkers.forEach(m => {
                    if (m.getAttribute('data-point-id') === pid) {
                        m.classList.add('selected');
                    } else {
                        m.classList.remove('selected');
                    }
                });
            });
        });
    };

    if (districtSelector) {
        districtSelector.addEventListener('change', () => {
            renderDistrictStations(districtSelector.value);
        });
        renderDistrictStations(districtSelector.value);
    }

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
                        card.style.display = '';
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

    const pointDetailTitle = document.getElementById('point-detail-title');
    if (pointDetailTitle) {
        const pointUrlParams = new URLSearchParams(window.location.search);
        const puntoParam = pointUrlParams.get('punto') || 'san-miguel-1';

        const allStationsDictionary = {
            'san-miguel-1': {
                name: 'Estación Recicla San Miguel',
                entity: 'Municipalidad Distrital de San Miguel & Programa Recicla Lima',
                status: 'Abierto hoy · 08:00 a 18:00',
                badgeClass: 'badge-open',
                addr: 'Cruce Av. La Marina con Av. Universitaria (Frente a Plaza San Miguel)',
                dist: '0.8 km (11 min a pie)',
                capacity: '85% libre (vaciado hoy)',
                promoter: 'Edgar Ramos (Reg. #SM-402)',
                tip: 'Este punto recibe botellas plásticas, latas, vidrio y cartón limpios y secos. Cuenta con promotor permanente para verificar condiciones de entrega.'
            },
            'san-miguel-2': {
                name: 'Punto Limpio Parque Juan Pablo II',
                entity: 'Municipalidad Distrital de San Miguel',
                status: 'Abierto hoy · 07:00 a 19:00',
                badgeClass: 'badge-open',
                addr: 'Av. Riva Agüero cdra. 8 (Junto a caseta de serenazgo)',
                dist: '1.4 km (18 min a pie)',
                capacity: '60% libre',
                promoter: 'Rosa Quispe (Reg. #SM-205)',
                tip: 'Dispone de tolvas separadas para plásticos, latas y papeles secos. Se ubica frente al área infantil del parque.'
            },
            'san-miguel-3': {
                name: 'Contenedor Verde Metro La Marina',
                entity: 'Supermercados Metro & Asociación de Recicladores San Miguel',
                status: 'Abierto 24 horas',
                badgeClass: 'badge-open',
                addr: 'Av. La Marina 2500 (Estacionamiento posterior)',
                dist: '1.9 km (25 min a pie)',
                capacity: '75% libre',
                promoter: 'Caseta de Seguridad Metro',
                tip: 'Acceso vehicular y peatonal las 24 horas para depositar botellas de bebidas y frascos de vidrio.'
            },
            'san-miguel-4': {
                name: 'Estación Ambiental Plaza Bandera',
                entity: 'Programa Metropolitano de Residuos Especiales',
                status: 'Cierra hoy a las 17:00',
                badgeClass: 'badge-closing',
                addr: 'Plaza de la Bandera s/n (Límite con Pueblo Libre)',
                dist: '2.3 km (7 min en auto)',
                capacity: '40% libre',
                promoter: 'Carlos Dávila (Reg. #SM-318)',
                tip: 'Punto multimodal de acopio con módulo especial de seguridad para pilas alcalinas y baterías domésticas.'
            },
            'pueblo-libre-1': {
                name: 'Ecopunto Plaza Bolívar',
                entity: 'Municipalidad de Pueblo Libre · Gerencia Ambiental',
                status: 'Abierto hoy · 08:00 a 17:00',
                badgeClass: 'badge-open',
                addr: 'Jr. Vivanco frente al Palacio Municipal de Pueblo Libre',
                dist: '0.6 km (8 min a pie)',
                capacity: '70% libre',
                promoter: 'María Elena Fuentes (Reg. #PL-110)',
                tip: 'Centro cívico de acopio para vecinos de Pueblo Libre. Acepta botellas plásticas, latas, vidrio y cartón desarmado.'
            },
            'pueblo-libre-2': {
                name: 'Módulo Ambiental Parque El Carmen',
                entity: 'Asociación de Recicladores Pueblo Libre Sostenible',
                status: 'Abierto hoy · 09:00 a 18:00',
                badgeClass: 'badge-open',
                addr: 'Av. Sucre cdra. 12 (Interior parque El Carmen)',
                dist: '1.1 km (14 min a pie)',
                capacity: '50% libre',
                promoter: 'Juan Paredes (Reg. #PL-142)',
                tip: 'Atención con pesaje in situ para lotes medianos de cartón, papel bond y plásticos limpios.'
            },
            'pueblo-libre-3': {
                name: 'Punto Verde Parque Candamo',
                entity: 'Municipalidad de Pueblo Libre',
                status: 'Abierto hoy · 07:00 a 19:00',
                badgeClass: 'badge-open',
                addr: 'Av. Del Río cuadra 3 (Cerca a Av. Brasil)',
                dist: '1.8 km (22 min a pie)',
                capacity: '80% libre',
                promoter: 'Sofía Delgado (Reg. #PL-203)',
                tip: 'Contenedores verdes de boca ancha y tacho rojo seguro para pilas alcalinas.'
            },
            'miraflores-1': {
                name: 'Punto Limpio Parque Kennedy',
                entity: 'Municipalidad de Miraflores · Programa Basura Cero',
                status: 'Abierto 24 horas',
                badgeClass: 'badge-open',
                addr: 'Parque Central de Miraflores s/n (Paseo Diagonal)',
                dist: '0.5 km (7 min a pie)',
                capacity: '90% libre (vaciado permanente)',
                promoter: 'Equipo Basura Cero Miraflores',
                tip: 'Estación soterrada de alta tecnología para envases limpios, botellas de agua, vidrio y latas de aluminio.'
            },
            'miraflores-2': {
                name: 'Estación Ecológica Reducto',
                entity: 'Municipalidad de Miraflores & Asociación de Recicladores',
                status: 'Abierto hoy · 08:30 a 18:00',
                badgeClass: 'badge-open',
                addr: 'Parque Reducto N° 2 (Ingreso por Av. Alfredo Benavides)',
                dist: '1.2 km (15 min a pie)',
                capacity: '65% libre',
                promoter: 'Asociación de Recicladores Miraflores',
                tip: 'Recepción de fardos de cartón, plásticos y módulo de residuos de aparatos eléctricos y electrónicos en desuso.'
            },
            'miraflores-3': {
                name: 'Ecopunto Malecón Cisneros',
                entity: 'Municipalidad de Miraflores',
                status: 'Abierto hoy · 07:00 a 19:00',
                badgeClass: 'badge-open',
                addr: 'Malecón Cisneros cdra. 5 (Frente al Parque del Faro)',
                dist: '1.6 km (20 min a pie)',
                capacity: '80% libre',
                promoter: 'Serenazgo Miraflores Costa',
                tip: 'Tolvas preparadas para resistir brisa marina, destinadas a botellas para bebidas y frascos de vidrio.'
            },
            'miraflores-4': {
                name: 'Centro de Acopio Estadio Manuel Bonilla',
                entity: 'Subgerencia de Limpieza Pública y Medio Ambiente',
                status: 'Abierto hoy · 08:00 a 17:00',
                badgeClass: 'badge-open',
                addr: 'Av. Del Ejército cdra. 13 (Ingreso vehicular)',
                dist: '2.1 km (8 min en auto)',
                capacity: '55% libre',
                promoter: 'Personal Operativo Bonilla',
                tip: 'Centro integral con pesaje industrial para vecinos y empresas. Recibe multimaterial, aceite usado y pilas.'
            },
            'magdalena-1': {
                name: 'Estación Recicla Plaza Túpac Amaru',
                entity: 'Municipalidad de Magdalena del Mar & Asociación Local',
                status: 'Abierto hoy · 08:00 a 18:00',
                badgeClass: 'badge-open',
                addr: 'Jr. Bolognesi cdra. 3 (Plaza Central de Magdalena)',
                dist: '0.7 km (9 min a pie)',
                capacity: '75% libre',
                promoter: 'Asociación Recicla Magdalena',
                tip: 'Punto neurálgico del distrito. Tolvas para botellas de plástico, latas de conserva, frascos y cartón limpio.'
            },
            'magdalena-2': {
                name: 'Ecopunto Malecón Castagnola',
                entity: 'Municipalidad de Magdalena del Mar',
                status: 'Abierto hoy · 07:00 a 18:00',
                badgeClass: 'badge-open',
                addr: 'Jr. Diego Ferré cruce con Malecón Castagnola',
                dist: '1.3 km (16 min a pie)',
                capacity: '85% libre',
                promoter: 'Serenazgo Costanera',
                tip: 'Ubicado en el circuito costero de Magdalena para deportistas y familias. Ideal para botellas de agua y bebidas.'
            },
            'magdalena-3': {
                name: 'Punto Limpio Mercado Magdalena',
                entity: 'Comité Ambiental Mercado Magdalena',
                status: 'Cierra hoy a las 16:00',
                badgeClass: 'badge-closing',
                addr: 'Jr. Leoncio Prado cdra. 7 (Área de carga)',
                dist: '1.5 km (19 min a pie)',
                capacity: '50% libre',
                promoter: 'Comité Vecinal Mercado',
                tip: 'Recepción especializada de cartón seco de embalaje y envases plásticos de comerciantes y vecinos.'
            },
            'surco-1': {
                name: 'Planta de Reciclaje EMUSAP Surco',
                entity: 'Empresa Municipal Santiago de Surco (EMUSAP)',
                status: 'Abierto hoy · 08:00 a 17:00',
                badgeClass: 'badge-open',
                addr: 'Jr. Combate de Angamos s/n (Cerca a Av. Tomás Marsano)',
                dist: '0.9 km (12 min a pie)',
                capacity: '90% libre (planta procesadora)',
                promoter: 'Programa Surco Recicla (EMUSAP)',
                tip: 'La planta de reciclaje modelo más grande del país. Recibe todos los materiales aprovechables y especiales debidamente acondicionados.'
            },
            'surco-2': {
                name: 'Ecopunto Parque de la Amistad',
                entity: 'Municipalidad de Santiago de Surco',
                status: 'Abierto hoy · 08:00 a 19:00',
                badgeClass: 'badge-open',
                addr: 'Av. Caminos del Inca cruce con Av. Benavides',
                dist: '1.4 km (18 min a pie)',
                capacity: '70% libre',
                promoter: 'Promotores Amistad Verde',
                tip: 'Estación accesible con asistencia ciudadana. Depósito de envases plásticos, frascos y cartón corrugado.'
            },
            'surco-3': {
                name: 'Módulo Verde Jockey Plaza',
                entity: 'Jockey Plaza Shopping Center & Surco Recicla',
                status: 'Abierto hoy · 09:00 a 21:00',
                badgeClass: 'badge-open',
                addr: 'Av. Javier Prado Este 4200 (Ingreso peatonal Puerta 1)',
                dist: '2.0 km (6 min en auto)',
                capacity: '80% libre',
                promoter: 'Sostenibilidad Jockey',
                tip: 'Horario extendido ideal para compras y visitas. Dispone de bocas para botellas de plástico y latas de bebidas.'
            },
            'surco-4': {
                name: 'Punto de Acopio Parque Voces por el Clima',
                entity: 'Centro de Educación Ambiental Surco',
                status: 'Abierto hoy · 09:00 a 17:00',
                badgeClass: 'badge-open',
                addr: 'Av. Los Castillos s/n (Urb. Los Próceres)',
                dist: '2.8 km (9 min en auto)',
                capacity: '60% libre',
                promoter: 'Centro Educación Ambiental Surco',
                tip: 'Parque temático ecológico. Acepta ecoladrillos, multimaterial aprovechable y residuos de pilas.'
            }
        };

        const pointData = allStationsDictionary[puntoParam] || allStationsDictionary['san-miguel-1'];

        pointDetailTitle.textContent = pointData.name;
        document.title = `Resaving - ${pointData.name}`;

        const bCrumb = document.getElementById('point-breadcrumb-name');
        if (bCrumb) bCrumb.textContent = pointData.name;

        const entName = document.getElementById('point-entity-name');
        if (entName) entName.textContent = pointData.entity;

        const statBadge = document.getElementById('point-status-badge');
        if (statBadge) {
            statBadge.textContent = pointData.status;
            statBadge.className = `point-status-badge ${pointData.badgeClass}`;
        }

        const metaAddr = document.getElementById('point-meta-address');
        if (metaAddr) metaAddr.textContent = pointData.addr;

        const metaDist = document.getElementById('point-meta-distance');
        if (metaDist) metaDist.textContent = pointData.dist;

        const metaCap = document.getElementById('point-meta-capacity');
        if (metaCap) metaCap.textContent = pointData.capacity;

        const metaProm = document.getElementById('point-meta-promoter');
        if (metaProm) metaProm.textContent = pointData.promoter;

        const safeTip = document.getElementById('point-safety-tip');
        if (safeTip) {
            safeTip.innerHTML = `<strong>Aviso importante:</strong> ${pointData.tip}`;
        }
    }

    const searchResultsList = document.getElementById('search-results-list');
    const searchResultsCount = document.getElementById('search-results-count');
    const searchInputField = document.getElementById('search-input-field');
    const formSearchResults = document.getElementById('form-search-results');
    const searchFilterChips = document.querySelectorAll('#search-filter-chips .chip');
    const sortSelect = document.getElementById('sort-select');

    const fullMaterialsCatalog = [
        {
            id: 'pet',
            name: 'Botella plástica para bebidas (Agua y gaseosas)',
            category: 'aprovechables',
            catLabel: 'Aprovechable · Tacho Verde',
            badgeClass: 'badge-green',
            subBadge: 'Plástico transparente',
            desc: 'Aceptada en todas las estaciones de acopio y contenedores verdes. Debe entregarse vacía, limpia, seca y compactada con la tapa separada.',
            img: '../Images/waste-pet-bottle.png',
            url: 'waste-detail.html?tipo=pet'
        },
        {
            id: 'vidrio',
            name: 'Botellas y frascos de vidrio entero',
            category: 'aprovechables',
            catLabel: 'Aprovechable · Tacho Verde',
            badgeClass: 'badge-green',
            subBadge: 'Vidrio',
            desc: 'Material 100% reciclable en infinitos ciclos. Debe entregarse entero, limpio y sin tapas metálicas ni corchos.',
            img: '../Images/gallery-glass.png',
            url: 'waste-detail.html?tipo=vidrio'
        },
        {
            id: 'carton',
            name: 'Cajas de cartón corrugado y papel bond',
            category: 'aprovechables',
            catLabel: 'Aprovechable · Tacho Verde',
            badgeClass: 'badge-green',
            subBadge: 'Papel y Cartón',
            desc: 'Cajas de encomiendas y hojas de papel secas. Desarmar las cajas para ahorrar espacio y atar en paquetes limpios.',
            img: '../Images/delivery-cardboard.png',
            url: 'waste-detail.html?tipo=carton'
        },
        {
            id: 'lata',
            name: 'Latas de aluminio y conservas',
            category: 'aprovechables',
            catLabel: 'Aprovechable · Tacho Verde',
            badgeClass: 'badge-green',
            subBadge: 'Metales',
            desc: 'Latas de bebidas y conservas enjuagadas sin restos de alimentos. Comprimir suavemente para facilitar transporte.',
            img: '../Images/delivery-can.png',
            url: 'waste-detail.html?tipo=lata'
        },
        {
            id: 'pead',
            name: 'Envase de champú, detergente y yogur',
            category: 'aprovechables',
            catLabel: 'Aprovechable · Tacho Verde',
            badgeClass: 'badge-green',
            subBadge: 'Plástico rígido',
            desc: 'Envases plásticos opacos de alta densidad. Enjuagar para retirar restos de jabón o líquido y desenroscar dosificadores.',
            img: '../Images/gallery-plastic-bottle.png',
            url: 'waste-detail.html?tipo=pead'
        },
        {
            id: 'tetra',
            name: 'Envases multicapa de jugo y leche (Tetra Brik)',
            category: 'aprovechables',
            catLabel: 'Aprovechable · Tacho Verde',
            badgeClass: 'badge-green',
            subBadge: 'Multicapa cartón',
            desc: 'Compuestos de cartón, aluminio y polietileno. Deben abrirse de las esquinas, enjuagarse y aplanarse secos.',
            img: '../Images/category-recyclables.png',
            url: 'waste-detail.html?tipo=carton'
        },
        {
            id: 'frutas',
            name: 'Cáscaras de frutas, verduras y hortalizas',
            category: 'organicos',
            catLabel: 'Orgánicos · Tacho Marrón',
            badgeClass: 'badge-brown',
            subBadge: 'Compostaje natural',
            desc: 'Restos vegetales crudos ideales para elaborar abono orgánico o compost municipal. No deben mezclarse con plásticos ni bolsas.',
            img: '../Images/category-organic.png',
            url: 'waste-detail.html?tipo=organico'
        },
        {
            id: 'cafe',
            name: 'Restos y posos de café pasado, té e infusiones',
            category: 'organicos',
            catLabel: 'Orgánicos · Tacho Marrón',
            badgeClass: 'badge-brown',
            subBadge: 'Abono fértil',
            desc: 'Aportan nitrógeno y enriquecen la tierra de parques y biohuertos comunales. Retirar grapas metálicas de saquitos de té.',
            img: '../Images/category-organic.png',
            url: 'waste-detail.html?tipo=organico'
        },
        {
            id: 'hojas',
            name: 'Hojas secas, flores y ramas pequeñas de jardín',
            category: 'organicos',
            catLabel: 'Orgánicos · Tacho Marrón',
            badgeClass: 'badge-brown',
            subBadge: 'Restos de poda',
            desc: 'Materia orgánica seca que equilibra el compostaje. Deben entregarse sin alambres, plásticos ni piedras.',
            img: '../Images/category-organic.png',
            url: 'waste-detail.html?tipo=organico'
        },
        {
            id: 'huevo',
            name: 'Cáscaras de huevo trituradas',
            category: 'organicos',
            catLabel: 'Orgánicos · Tacho Marrón',
            badgeClass: 'badge-brown',
            subBadge: 'Mineral y calcio',
            desc: 'Excelente aporte de calcio para suelos. Se deben enjuagar ligeramente para no atraer moscas antes de colocarlas en el tacho marrón.',
            img: '../Images/category-organic.png',
            url: 'waste-detail.html?tipo=organico'
        },
        {
            id: 'pilas',
            name: 'Pilas alcalinas y baterías domésticas (AA, AAA, 9V, botón)',
            category: 'peligrosos',
            catLabel: 'Peligrosos · Tacho Rojo',
            badgeClass: 'badge-red',
            subBadge: 'Punto especial',
            desc: 'Contienen metales pesados contaminantes. Prohibido arrojarlas al tacho verde o negro. Depositar en contenedores rojos o puntos en supermercados.',
            img: '../Images/category-hazardous.png',
            url: 'waste-detail.html?tipo=pilas'
        },
        {
            id: 'medicamento',
            name: 'Medicamentos vencidos o en desuso y blísteres',
            category: 'peligrosos',
            catLabel: 'Peligrosos · Punto Especial',
            badgeClass: 'badge-red',
            subBadge: 'Contenedor farmacias',
            desc: 'No tirar por el inodoro ni a la basura común. Deben llevarse a los puntos azules de acopio instalados en farmacias y centros de salud.',
            img: '../Images/gallery-special-waste.png',
            url: 'waste-detail.html?tipo=medicamento'
        },
        {
            id: 'focos',
            name: 'Focos ahorradores y tubos fluorescentes',
            category: 'peligrosos',
            catLabel: 'Peligrosos · Tacho Rojo',
            badgeClass: 'badge-red',
            subBadge: 'Vapor de mercurio',
            desc: 'Contienen mercurio gaseoso. Deben entregarse enteros dentro de su caja de cartón en centros de atención especializada.',
            img: '../Images/category-hazardous.png',
            url: 'waste-detail.html?tipo=focos'
        },
        {
            id: 'raee',
            name: 'Aparatos electrónicos menores, cargadores y cables en desuso',
            category: 'peligrosos',
            catLabel: 'Especiales · RAEE',
            badgeClass: 'badge-red',
            subBadge: 'Aparatos eléctricos',
            desc: 'Equipos electrónicos en desuso que requieren campañas municipales de acopio RAEE para recuperar metales valiosos y neutralizar tóxicos.',
            img: '../Images/category-hazardous.png',
            url: 'waste-detail.html?tipo=raee'
        },
        {
            id: 'higienico',
            name: 'Papel higiénico, pañuelos y toallas absorbentes usadas',
            category: 'no-aprovechables',
            catLabel: 'No Aprovechable · Tacho Negro',
            badgeClass: 'badge-black',
            subBadge: 'Relleno sanitario',
            desc: 'Residuos con carga biológica o sanitaria que no pueden recuperarse. Deben ir en bolsa bien cerrada al tacho negro común.',
            img: '../Images/category-sanitary.png',
            url: 'waste-detail.html?tipo=no-aprovechable'
        },
        {
            id: 'colillas',
            name: 'Colillas de cigarro y cenizas',
            category: 'no-aprovechables',
            catLabel: 'No Aprovechable · Tacho Negro',
            badgeClass: 'badge-black',
            subBadge: 'Tóxico no reciclable',
            desc: 'Los filtros de acetato de celulosa tardan más de una década en degradarse y concentran químicos tóxicos. Van al tacho negro.',
            img: '../Images/category-sanitary.png',
            url: 'waste-detail.html?tipo=no-aprovechable'
        },
        {
            id: 'snacks',
            name: 'Envolturas metalizadas de golosinas, galletas y papas fritas',
            category: 'no-aprovechables',
            catLabel: 'No Aprovechable · Tacho Negro',
            badgeClass: 'badge-black',
            subBadge: 'Film metalizado',
            desc: 'Películas complejas de polipropileno con vaporizado de aluminio que no se separan industrialmente en Lima. Tacho negro.',
            img: '../Images/category-sanitary.png',
            url: 'waste-detail.html?tipo=no-aprovechable'
        },
        {
            id: 'ceramica',
            name: 'Cerámica rota, loza y vajilla desgastada',
            category: 'no-aprovechables',
            catLabel: 'No Aprovechable · Tacho Negro',
            badgeClass: 'badge-black',
            subBadge: 'Inerte común',
            desc: 'No funde con el vidrio de botellas por tener temperaturas distintas. Debe envolverse en papel grueso y disponerse en tacho negro.',
            img: '../Images/category-sanitary.png',
            url: 'waste-detail.html?tipo=no-aprovechable'
        }
    ];

    if (searchResultsList) {
        let currentFilter = 'all';
        let currentQuery = '';

        const urlParams = new URLSearchParams(window.location.search);
        const urlCat = urlParams.get('cat');
        const urlQ = urlParams.get('q');

        if (urlCat) {
            currentFilter = urlCat;
        }
        if (urlQ) {
            currentQuery = urlQ.trim();
            if (searchInputField) searchInputField.value = currentQuery;
        }

        const renderMaterials = () => {
            let filtered = fullMaterialsCatalog.filter(item => {
                const matchesCategory = (currentFilter === 'all') || (item.category === currentFilter);
                if (!matchesCategory) return false;

                if (currentQuery.length === 0) return true;
                const q = currentQuery.toLowerCase();
                return item.name.toLowerCase().includes(q) ||
                       item.desc.toLowerCase().includes(q) ||
                       item.subBadge.toLowerCase().includes(q) ||
                       item.catLabel.toLowerCase().includes(q);
            });

            if (sortSelect && sortSelect.value === 'name') {
                filtered.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortSelect && sortSelect.value === 'category') {
                filtered.sort((a, b) => a.catLabel.localeCompare(b.catLabel));
            }

            if (searchResultsCount) {
                let contextLabel = '';
                if (currentFilter !== 'all') {
                    const catMap = {
                        'aprovechables': 'Aprovechables (Tacho Verde)',
                        'organicos': 'Orgánicos (Tacho Marrón)',
                        'peligrosos': 'Peligrosos (Tacho Rojo / Especiales)',
                        'no-aprovechables': 'No aprovechables (Tacho Negro)'
                    };
                    contextLabel = ` en «${catMap[currentFilter] || currentFilter}»`;
                }
                if (currentQuery.length > 0) {
                    searchResultsCount.innerHTML = `Se encontraron <strong>${filtered.length} resultados</strong> para <em>«${currentQuery}»</em>${contextLabel}`;
                } else {
                    searchResultsCount.innerHTML = `Mostrando <strong>${filtered.length} materiales</strong>${contextLabel}`;
                }
            }

            if (filtered.length === 0) {
                searchResultsList.innerHTML = `
                    <div style="background-color: #F7FAF8; border: 1.5px dashed #DBE7DF; border-radius: 14px; padding: 36px 20px; text-align: center; width: 100%;">
                        <h3 style="font-size: 17px; font-weight: 800; color: #14251B; margin-bottom: 8px;">No se encontraron materiales para esta búsqueda</h3>
                        <p style="font-size: 13.5px; color: #5F7066; margin-bottom: 16px;">Prueba buscando con palabras más generales (ej: plástico, papel, pilas) o explora nuestras categorías.</p>
                        <button type="button" id="btn-reset-search" style="padding: 9px 18px; background-color: #0B4A30; color: #FFFFFF; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer;">Ver todos los materiales</button>
                    </div>
                `;
                const resetBtn = document.getElementById('btn-reset-search');
                if (resetBtn) {
                    resetBtn.addEventListener('click', () => {
                        currentFilter = 'all';
                        currentQuery = '';
                        if (searchInputField) searchInputField.value = '';
                        updateActiveChip();
                        renderMaterials();
                    });
                }
                return;
            }

            searchResultsList.innerHTML = filtered.map(item => `
                <article class="result-card flex Ycenter">
                    <div class="result-img-wrap">
                        <img src="${item.img}" alt="${item.name}">
                    </div>
                    <div class="result-body flex-1">
                        <div class="result-badges flex Ycenter">
                            <span class="badge ${item.badgeClass}">${item.catLabel}</span>
                            <span class="badge badge-gray">${item.subBadge}</span>
                        </div>
                        <h3>${item.name}</h3>
                        <p class="result-desc">${item.desc}</p>
                    </div>
                    <div class="result-action">
                        <a href="${item.url}" class="btn-primary-action flex Ycenter">
                            <span>Ver detalles y preparación</span>
                            <img src="../Images/icon-arrow-right.svg" alt="">
                        </a>
                    </div>
                </article>
            `).join('');
        };

        const updateActiveChip = () => {
            searchFilterChips.forEach(chip => {
                const f = chip.getAttribute('data-filter');
                if (f === currentFilter) {
                    chip.classList.add('active');
                } else {
                    chip.classList.remove('active');
                }
            });
        };

        updateActiveChip();
        renderMaterials();

        searchFilterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                currentFilter = chip.getAttribute('data-filter') || 'all';
                updateActiveChip();
                renderMaterials();
            });
        });

        if (searchInputField) {
            searchInputField.addEventListener('input', () => {
                currentQuery = searchInputField.value.trim();
                renderMaterials();
            });
        }

        if (formSearchResults) {
            formSearchResults.addEventListener('submit', (e) => {
                e.preventDefault();
                if (searchInputField) currentQuery = searchInputField.value.trim();
                renderMaterials();
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', renderMaterials);
        }
    }

    const btnClearHistory = document.getElementById('btn-clear-history');
    const historyList = document.querySelector('.history-list');
    const historyContainer = document.getElementById('history-container');

    if (btnClearHistory && (historyList || historyContainer)) {
        btnClearHistory.addEventListener('click', () => {
            if (historyList) {
                historyList.style.display = 'none';
            }
            if (historyContainer) {
                historyContainer.style.display = 'none';
            }
            let emptyBox = document.getElementById('history-empty-notice');
            if (!emptyBox) {
                emptyBox = document.createElement('div');
                emptyBox.id = 'history-empty-notice';
                emptyBox.className = 'empty-notice-card';
                emptyBox.innerHTML = `
                    <div style="background-color: #FFFFFF; border: 1.5px dashed #DBE7DF; border-radius: 14px; padding: 48px 24px; text-align: center; margin: 24px 0;">
                        <img src="../Images/icon-check.svg" alt="" style="width: 44px; height: 44px; margin-bottom: 12px; opacity: 0.7;">
                        <h3 style="font-size: 18px; font-weight: 800; color: #14251B; margin-bottom: 8px;">Historial eliminado con éxito</h3>
                        <p style="font-size: 13.5px; color: #6C8A79; max-width: 460px; margin: 0 auto 20px auto; line-height: 1.5;">Tus consultas y registros locales han sido borrados de este navegador. Puedes iniciar una nueva búsqueda cuando lo desees.</p>
                        <a href="search-results.html" class="btn-primary-action" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; font-size: 13.5px; text-decoration: none;">
                            <span>Explorar residuos</span>
                            <img src="../Images/icon-arrow-right.svg" alt="">
                        </a>
                    </div>
                `;
                const parent = (historyList && historyList.parentNode) || (historyContainer && historyContainer.parentNode);
                if (parent) {
                    parent.appendChild(emptyBox);
                }
            } else {
                emptyBox.style.display = 'block';
            }
            btnClearHistory.style.display = 'none';
        });
    }

    const prepCards = [
        document.getElementById('card-step-1'),
        document.getElementById('card-step-2'),
        document.getElementById('card-step-3'),
        document.getElementById('card-step-4')
    ];
    const prepCbs = [
        document.getElementById('check-step-1'),
        document.getElementById('check-step-2'),
        document.getElementById('check-step-3'),
        document.getElementById('check-step-4')
    ];
    const prepPills = [
        document.getElementById('step-1-pill'),
        document.getElementById('step-2-pill'),
        document.getElementById('step-3-pill'),
        document.getElementById('step-4-pill')
    ];
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressBadge = document.getElementById('progress-badge');
    const progressDesc = document.getElementById('progress-desc');

    const prepMatData = {
        pet: {
            pageTitle: 'Prepara tu botella plástica para bebidas',
            sub: 'Sigue estos cuatro sencillos pasos en orden de cascada para acondicionar tu botella antes de la entrega.',
            steps: [
                {
                    title: '1. Vacía el contenido por completo',
                    desc: 'Asegúrate de retirar hasta la última gota de refresco, agua o jugo. Los restos líquidos arruinan el reciclaje de cartones y generan hongos en el tacho verde.',
                    tip: 'No es necesario usar jabón si solo contuvo agua de mesa. Basta con drenar todo el líquido.',
                    label: 'Paso 1 completado: Envase totalmente vacío'
                },
                {
                    title: '2. Enjuaga con un chorrito de agua',
                    desc: 'Si contuvo bebidas azucaradas, néctares o yogur ligero, agrega un poco de agua, agita suavemente y deséchala. Esto evita hormigas y malos olores en tu zona de almacenamiento.',
                    tip: 'Aprovecha el agua residual del lavado de vajilla o verduras para no malgastar agua potable limpia.',
                    label: 'Paso 2 completado: Enjuague realizado sin residuos visibles'
                },
                {
                    title: '3. Deja escurrir boca abajo',
                    desc: 'Coloca la botella invertida en un escurridor o espacio ventilado durante 20 a 30 minutos. La humedad es la causa número uno de rechazo de papel y cartón en acopio.',
                    tip: 'Deja que se seque al aire; no utilices toallas de papel desechable para secar el interior.',
                    label: 'Paso 3 completado: Escurrida y seca al tacto'
                },
                {
                    title: '4. Separa la tapa y compacta la botella',
                    desc: 'Desenrosca la tapa de plástico y guárdala por separado. Aplasta el cuerpo de la botella desde la base hacia el pico para ahorrar hasta 70% de volumen.',
                    tip: 'Las botellas compactadas permiten al reciclador de base recolectar el triple de material en un solo viaje.',
                    label: 'Paso 4 completado: Tapa retirada y envase compactado'
                }
            ]
        },
        vidrio: {
            pageTitle: 'Prepara tus botellas y frascos de vidrio',
            sub: 'Sigue estos cuatro sencillos pasos en orden de cascada para garantizar una entrega 100% segura para los recicladores.',
            steps: [
                {
                    title: '1. Retira todo el contenido sólido o líquido',
                    desc: 'Drena aceites, mermeladas o jugos del frasco con una espátula o cuchara. Los restos grasos atraen plagas y complican el acopio.',
                    tip: 'Nunca entregues frascos quebrados ni astillados; pueden causar cortes graves a los operarios.',
                    label: 'Paso 1 completado: Frasco completamente libre de contenido'
                },
                {
                    title: '2. Enjuaga con agua corriente',
                    desc: 'Pasa un chorrito de agua para que las paredes de vidrio queden cristalinas y sin olores fermentados.',
                    tip: 'El vidrio no absorbe químicos ni grasa, por lo que un enjuague rápido basta.',
                    label: 'Paso 2 completado: Vidrio lavado y sin olores'
                },
                {
                    title: '3. Deja escurrir boca abajo hasta secar',
                    desc: 'Colócalo invertido sobre un secador. La estación de acopio exige material seco para no manchar otras entregas.',
                    tip: 'No dejes agua estancada dentro del frasco cerrado con tapa.',
                    label: 'Paso 3 completado: Vidrio seco'
                },
                {
                    title: '4. Retira la tapa metálica',
                    desc: 'Desenrosca la tapa de hojalata y colócala en el contenedor de metales. Entrega el frasco destapado para su inspección visual.',
                    tip: 'Las tapas de metal se funden a temperaturas distintas al vidrio sódico.',
                    label: 'Paso 4 completado: Frasco destapado y listo'
                }
            ]
        },
        carton: {
            pageTitle: 'Prepara tus cajas de cartón corrugado',
            sub: 'Sigue estos pasos en orden de cascada para desarmar, secar y atar tus fardos de cartón para entrega.',
            steps: [
                {
                    title: '1. Desarma la caja desde las solapas inferiores',
                    desc: 'Abre las solapas con cuidado para que la caja quede completamente plana en una sola lámina rectangular.',
                    tip: 'El cartón plano ocupa 8 veces menos espacio en casa y en el camión de acopio.',
                    label: 'Paso 1 completado: Caja desarmada y aplanada'
                },
                {
                    title: '2. Retira cintas plásticas de embalaje y grapas',
                    desc: 'Desprende las tiras de cinta gruesa plástica y alambres para evitar que traben las aspas de las plantas de pulpeo.',
                    tip: 'Si la cinta está muy adherida, córtala con tijeras sin romper el cartón.',
                    label: 'Paso 2 completado: Cinta plástica retirada'
                },
                {
                    title: '3. Verifica que esté completamente seco y limpio',
                    desc: 'Asegúrate de que no tenga manchas de aceite de pizza, comida ni hongos. Las partes sucias van al tacho negro.',
                    tip: 'Una sola caja de cartón con grasa de comida puede contaminar 50 kg de celulosa limpia.',
                    label: 'Paso 3 completado: Cartón seco y sin grasa'
                },
                {
                    title: '4. Agrupa y ata con soga o pita',
                    desc: 'Junta de 5 a 10 cajas aplanadas del mismo tamaño y átalas con pabilo o soga biodegradable para facilitar su transporte.',
                    tip: 'Los recicladores de base agradecen los paquetes atados porque aceleran su pesaje y carga.',
                    label: 'Paso 4 completado: Paquete de cartón atado'
                }
            ]
        },
        lata: {
            pageTitle: 'Prepara tus latas de bebidas y conservas',
            sub: 'Cuatro pasos en cascada para entregar aluminio y hojalata limpia, segura y sin bordes cortantes.',
            steps: [
                {
                    title: '1. Escurre todo residuo de jugo o salmuera',
                    desc: 'Vacía la lata al 100%. Si era una lata de atún, escurre bien el aceite para evitar manchas en tu bolsa.',
                    tip: 'No viertas el aceite de conservas al lavadero; guárdalo en una botella para acopio de aceite usado.',
                    label: 'Paso 1 completado: Lata vaciada'
                },
                {
                    title: '2. Enjuaga con una gota de detergente',
                    desc: 'Pasa agua y una esponja rápida para remover la capa interna azucarada o salada.',
                    tip: 'Una lata limpia no genera olores en tu hogar durante los días previos a la entrega.',
                    label: 'Paso 2 completado: Lata enjuagada'
                },
                {
                    title: '3. Deja secar al aire libre',
                    desc: 'Coloca la lata invertida para que no queden charcos de agua en el fondo.',
                    tip: 'El metal se seca en pocos minutos si está boca abajo en un lugar ventilado.',
                    label: 'Paso 3 completado: Lata escurrida'
                },
                {
                    title: '4. Comprime lateralmente protegiendo bordes',
                    desc: 'Para latas de bebidas, aplasta de costado con el pie o la mano. Para conservas con tapa filuda, empuja la tapa adentro.',
                    tip: 'Nunca dejes tapas de conserva sueltas con filo hacia afuera para proteger las manos del reciclador.',
                    label: 'Paso 4 completado: Lata compactada de forma segura'
                }
            ]
        },
        pead: {
            pageTitle: 'Prepara tus envases de limpieza y champú',
            sub: 'Acondiciona tus envases plásticos opacos para una recolección segura y sin químicos residuales.',
            steps: [
                {
                    title: '1. Vacía el producto restante',
                    desc: 'Usa hasta la última gota de champú o detergente agregando un poco de agua al final.',
                    tip: 'Aprovecha todo el producto antes de acondicionar el frasco para reciclaje.',
                    label: 'Paso 1 completado: Envase vacío'
                },
                {
                    title: '2. Enjuaga dos veces el interior',
                    desc: 'Enjuaga bien para que no quede espuma persistente ni restos resbalosos.',
                    tip: 'El agua jabonosa del enjuague sirve para limpiar el piso del baño o patio.',
                    label: 'Paso 2 completado: Sin residuos químicos'
                },
                {
                    title: '3. Deja escurrir boca abajo',
                    desc: 'Seca el frasco invertido para eliminar el agua del enjuague.',
                    tip: 'Un envase bien seco no genera moho en almacenamiento.',
                    label: 'Paso 3 completado: Envase seco'
                },
                {
                    title: '4. Retira el dispensador mecánico',
                    desc: 'Desenrosca las bombas con resorte de metal (van al tacho negro). Si la tapa es simple, enróscala ligeramente.',
                    tip: 'Los resortes metálicos de los dosificadores dañan los molinos de picado de plástico.',
                    label: 'Paso 4 completado: Dosificador separado'
                }
            ]
        },
        pilas: {
            pageTitle: 'Acondiciona tus pilas y baterías domésticas',
            sub: 'Medidas de seguridad obligatorias en cascada para aislar y entregar pilas sin riesgo de fugas ácidas.',
            steps: [
                {
                    title: '1. Identifica y separa por tipo',
                    desc: 'Separa pilas alcalinas comunes (AA, AAA, D) de baterías recargables de litio o pilas de botón.',
                    tip: 'NUNCA recargues ni calientes una pila que no sea expresamente rotulada como recargable.',
                    label: 'Paso 1 completado: Pilas clasificadas'
                },
                {
                    title: '2. Protege ambos polos con cinta adhesiva transparente',
                    desc: 'Coloca un trozo de cinta aislante o de embalaje cubriendo el polo positivo (+) y negativo (-) de cada pila.',
                    tip: 'El encintado de polos previene cortocircuitos e incendios por fricción dentro del contenedor.',
                    label: 'Paso 2 completado: Polos aislados con cinta'
                },
                {
                    title: '3. Almacena en un envase plástico seco con tapa',
                    desc: 'Usa una botella plástica limpia o frasco plástico hermético para guardar las pilas en tu hogar.',
                    tip: 'Guarda el frasco en un lugar fresco y fuera del alcance de niños y mascotas.',
                    label: 'Paso 3 completado: Envasadas en contenedor seco'
                },
                {
                    title: '4. Ubica un contenedor especial rojo o de supermercado',
                    desc: 'Llévalas a los depósitos identificados para pilas en farmacias, supermercados o municipios autorizados.',
                    tip: 'NUNCA arrojes pilas en el tacho verde ni en la basura común de casa.',
                    label: 'Paso 4 completado: Punto especial identificado'
                }
            ]
        }
    };
    prepMatData.metal = prepMatData.lata;

    if (prepCbs[0] && prepCards[0]) {
        const prepUrlParams = new URLSearchParams(window.location.search);
        let curMat = prepUrlParams.get('tipo') || 'pet';
        if (curMat === 'metal') curMat = 'lata';

        const curData = prepMatData[curMat] || prepMatData.pet;

        const pageTitle = document.getElementById('prep-page-title');
        const pageSub = document.getElementById('prep-page-subtitle');
        const wasteBreadcrumb = document.getElementById('breadcrumb-waste-link');
        if (pageTitle) pageTitle.textContent = curData.pageTitle;
        if (pageSub) pageSub.textContent = curData.sub;
        if (wasteBreadcrumb) wasteBreadcrumb.href = `waste-detail.html?tipo=${curMat}`;

        const chips = document.querySelectorAll('.prep-mat-chip');
        chips.forEach(chip => {
            const m = chip.getAttribute('data-mat');
            if (m === curMat || (m === 'metal' && curMat === 'lata')) {
                chip.classList.add('active');
                chip.style.backgroundColor = '#0B4A30';
                chip.style.color = '#FFFFFF';
            } else {
                chip.classList.remove('active');
                chip.style.backgroundColor = '#FFFFFF';
                chip.style.color = '#14251B';
            }
        });

        curData.steps.forEach((step, idx) => {
            const titleEl = document.getElementById(`step-${idx + 1}-title`);
            const descEl = document.getElementById(`step-${idx + 1}-desc`);
            const tipEl = document.getElementById(`step-${idx + 1}-tip`);
            const labelEl = document.getElementById(`step-${idx + 1}-label`);
            if (titleEl) titleEl.textContent = step.title;
            if (descEl) descEl.textContent = step.desc;
            if (tipEl) tipEl.textContent = step.tip;
            if (labelEl) labelEl.textContent = step.label;
        });

        const updateCascade = () => {
            let completed = 0;

            for (let i = 0; i < prepCbs.length; i++) {
                const cb = prepCbs[i];
                const card = prepCards[i];
                const pill = prepPills[i];

                if (!cb || !card) continue;

                if (i === 0) {
                    cb.disabled = false;
                    card.classList.remove('card-disabled');
                    card.style.opacity = '1';
                } else {
                    const prevChecked = prepCbs[i - 1].checked;
                    if (prevChecked) {
                        cb.disabled = false;
                        card.classList.remove('card-disabled');
                        card.style.opacity = '1';
                    } else {
                        cb.checked = false;
                        cb.disabled = true;
                        card.classList.add('card-disabled');
                        card.style.opacity = '0.55';
                    }
                }

                if (cb.checked) {
                    completed++;
                    card.classList.add('card-completed');
                    card.style.borderColor = '#1D8A57';
                    card.style.backgroundColor = '#F4FAF6';
                    if (pill) {
                        pill.textContent = 'Completado';
                        pill.style.backgroundColor = '#DFF3E6';
                        pill.style.color = '#0B4A30';
                    }
                } else {
                    card.classList.remove('card-completed');
                    card.style.borderColor = '#DBE7DF';
                    card.style.backgroundColor = '#FFFFFF';
                    if (pill) {
                        pill.textContent = `Paso ${i + 1}`;
                        pill.style.backgroundColor = '#EBF7F0';
                        pill.style.color = '#0B4A30';
                    }
                }
            }

            const percent = (completed / 4) * 100;
            if (progressBarFill) progressBarFill.style.width = `${percent}%`;
            if (progressBadge) progressBadge.textContent = `${completed} de 4 completados`;
            if (progressDesc) {
                if (completed === 0) progressDesc.textContent = 'Inicia con el Paso 1 para desbloquear los siguientes pasos en cascada.';
                else if (completed === 4) progressDesc.textContent = '¡Excelente! Cumpliste todos los pasos obligatorios. Tu residuo está listo para la entrega.';
                else progressDesc.textContent = `Has avanzado ${completed} de 4 pasos. Continúa con el Paso ${completed + 1}.`;
            }

            const btnSummary = document.getElementById('btn-to-summary') || document.querySelector('a[href^="prep-summary.html"]');
            if (btnSummary) {
                btnSummary.href = `prep-summary.html?tipo=${curMat}`;
                if (completed < 4) {
                    btnSummary.style.opacity = '0.6';
                    btnSummary.style.cursor = 'not-allowed';
                    btnSummary.style.backgroundColor = '#6C8A79';
                    btnSummary.innerHTML = `<span>Completa los 4 pasos en orden para continuar (${completed}/4)</span>`;
                    btnSummary.onclick = (e) => {
                        e.preventDefault();
                        alert(`Debes completar los pasos en orden de cascada. Actualmente te encuentras en el Paso ${completed + 1}.`);
                    };
                } else {
                    btnSummary.style.opacity = '1';
                    btnSummary.style.cursor = 'pointer';
                    btnSummary.style.backgroundColor = '#0B4A30';
                    btnSummary.innerHTML = `<span>¡Preparación completa! Ver resumen final</span><img src="../Images/icon-arrow-right.svg" alt="">`;
                    btnSummary.onclick = null;
                }
            }
        };

        prepCbs.forEach((cb, idx) => {
            if (cb) {
                cb.addEventListener('change', () => {
                    if (!cb.checked) {
                        for (let j = idx + 1; j < prepCbs.length; j++) {
                            if (prepCbs[j]) prepCbs[j].checked = false;
                        }
                    }
                    updateCascade();
                });
            }
        });

        updateCascade();
    }

    const summaryTitle = document.getElementById('summary-title');
    const summarySubtitle = document.getElementById('summary-subtitle');
    const summaryImg = document.getElementById('summary-img');
    const summaryChecklist = document.getElementById('summary-checklist');
    const summaryBackLink = document.getElementById('summary-back-link');
    const breadcrumbWaste = document.getElementById('breadcrumb-summary-waste');
    const breadcrumbGuide = document.getElementById('breadcrumb-summary-guide');

    const summaryMatData = {
        pet: {
            title: '¡Tu botella plástica para bebidas está lista!',
            sub: 'Has completado los 4 pasos obligatorios de preparación. Tu residuo cumple todos los estándares para ser recibido en cualquier estación de acopio municipal.',
            img: '../Images/prep-bottle-checklist.png',
            crumb: 'Botellas plásticas',
            checks: [
                'Vaciada al 100% sin residuos de líquidos o refrescos fermentables.',
                'Enjuagada rápidamente para evitar olores y fauna nociva.',
                'Escurrida boca abajo y completamente seca al tacto.',
                'Tapa desenroscada y guardada por separado para campañas de tapitas.',
                'Cuerpo aplastado desde la base para ahorrar hasta 70% de volumen.'
            ]
        },
        vidrio: {
            title: '¡Tus envases de vidrio están listos!',
            sub: 'Completaste los pasos de preparación segura. El vidrio entero limpio protege las manos de los recicladores y se funde al 100% sin merma.',
            img: '../Images/delivery-glass.png',
            crumb: 'Vidrio limpio',
            checks: [
                'Frasco totalmente limpio de mermelada, salsas o café.',
                'Enjuagado con agua corriente sin manchas.',
                'Escurrido e inspeccionado: frasco 100% entero sin fisuras.',
                'Tapa metálica separada para el contenedor de metales.'
            ]
        },
        carton: {
            title: '¡Tus cajas de cartón están listas!',
            sub: 'Cartón desarmado, libre de cintas y completamente seco. Listo para ser pesado y procesado en las plantas de celulosa.',
            img: '../Images/delivery-cardboard.png',
            crumb: 'Cartón y papel',
            checks: [
                'Cajas desarmadas y plegadas planas.',
                'Cintas de embalaje y grapas retiradas.',
                'Material 100% seco sin manchas de aceite ni humedad.',
                'Paquetes apilados y atados para traslado seguro.'
            ]
        },
        lata: {
            title: '¡Tus latas de aluminio están listas!',
            sub: 'Metales enjuagados, sin filos descubiertos y compactados lateralmente.',
            img: '../Images/delivery-can.png',
            crumb: 'Latas de aluminio',
            checks: [
                'Vaciadas de bebidas o conservas.',
                'Enjuagadas con una gota de detergente para eliminar grasa.',
                'Escurridas y secas.',
                'Tapas filudas dobladas al interior y lata compactada.'
            ]
        },
        pead: {
            title: '¡Tus envases de limpieza están listos!',
            sub: 'Galoneras y botellas de champú enjuagadas, secas y con dosificadores separados.',
            img: '../Images/gallery-plastic-bottle.png',
            crumb: 'Envases de limpieza',
            checks: [
                'Contenido agotado en su totalidad.',
                'Interior enjuagado dos veces con agua limpia.',
                'Envase seco al tacto.',
                'Bombas dosificadoras mecánicas con resorte retiradas.'
            ]
        },
        pilas: {
            title: '¡Tus pilas están acondicionadas de forma segura!',
            sub: 'Terminales aislados con cinta para prevenir chispas y guardadas en frasco plástico sellado para su entrega en puntos especiales.',
            img: '../Images/category-hazardous.png',
            crumb: 'Pilas y baterías',
            checks: [
                'Pilas clasificadas por tipo (alcalinas / recargables).',
                'Polos positivo y negativo cubiertos con cinta adhesiva.',
                'Guardadas en botella o envase plástico seco con tapa.',
                'Listas para depositar en el contenedor rojo autorizado.'
            ]
        }
    };
    summaryMatData.metal = summaryMatData.lata;

    if (summaryTitle) {
        const sumParams = new URLSearchParams(window.location.search);
        let sMat = sumParams.get('tipo') || 'pet';
        if (sMat === 'metal') sMat = 'lata';

        const sData = summaryMatData[sMat] || summaryMatData.pet;

        summaryTitle.textContent = sData.title;
        if (summarySubtitle) summarySubtitle.textContent = sData.sub;
        if (summaryImg) {
            summaryImg.src = sData.img;
            summaryImg.alt = sData.title;
        }
        if (breadcrumbWaste) breadcrumbWaste.href = `waste-detail.html?tipo=${sMat}`;
        if (breadcrumbGuide) breadcrumbGuide.href = `prep-guide.html?tipo=${sMat}`;
        if (summaryBackLink) summaryBackLink.href = `prep-guide.html?tipo=${sMat}`;

        if (summaryChecklist && sData.checks) {
            summaryChecklist.innerHTML = sData.checks.map(c => `
                <div class="summary-check-item flex Ycenter">
                    <div class="summary-check-icon flex center">
                        <img src="../Images/icon-check.svg" alt="" style="width: 14px; height: 14px;">
                    </div>
                    <span>${c}</span>
                </div>
            `).join('');
        }
    }

    const reportFileInput = document.getElementById('report-file-input');
    const reportFileStatus = document.getElementById('report-file-status');
    if (reportFileInput && reportFileStatus) {
        reportFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                reportFileStatus.textContent = `Foto adjunta: ${e.target.files[0].name} (${Math.round(e.target.files[0].size / 1024)} KB)`;
                reportFileStatus.style.color = '#1D8A57';
            }
        });
    }

    const locationBtn = document.querySelector('.btn-my-location');
    if (locationBtn) {
        locationBtn.addEventListener('click', () => {
            const locInput = document.getElementById('loc-input') || document.querySelector('input[type="text"][placeholder*="dirección"]');
            if (locInput) {
                locInput.value = 'Av. La Marina con Av. Universitaria, San Miguel, Lima';
                const span = locationBtn.querySelector('span');
                if (span) span.textContent = 'Ubicación obtenida';
                locationBtn.style.backgroundColor = '#EBF7F0';
            }
        });
    }

    const formReport = document.getElementById('form-report-incident');
    if (formReport) {
        formReport.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'report-success.html';
        });
    }

    const formSuggest = document.getElementById('form-suggest-point');
    if (formSuggest) {
        formSuggest.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'report-success.html';
        });
    }
});
