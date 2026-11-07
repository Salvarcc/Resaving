/* Resaving — Delivery Lot & Material Calculator */
document.addEventListener('DOMContentLoaded', () => {
    const isPagesSubdir = window.location.pathname.includes('/pages/');
    const basePath = isPagesSubdir ? '' : 'pages/';
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
        glass: {
            name: 'Frascos y botellas de vidrio',
            unitWeight: 0.250,
            weightLabel: 'envases de vidrio',
            tag: 'Acepta frascos y botellas de vidrio',
            img: '../Images/delivery-glass.png',
            tolva: 'Boca 2 (Vidrio)',
            prepSummary: 'Enjuagado, seco, entero y sin tapa metálica',
            cond1: 'Los frascos y botellas fueron enjuagados y escurridos sin restos de alimentos ni líquidos.',
            cond2: 'Se retiraron las tapas metálicas, corchos o precintos del cuello del envase.',
            cond3: 'Los envases de vidrio se encuentran 100% enteros, sin rajaduras ni bordes astillados.'
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
    materialConfig.vidrio = materialConfig.glass;

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
                    <td><span class="badge badge-green" style="background-color: #0B4A30; color: #FFFFFF !important; font-weight: 700; padding: 4px 10px; border-radius: 6px; display: inline-block;">${item.tolva}</span></td>
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

    const deliveryCheckDiagnosis = document.querySelector('section[style*="background-color: #EBF7F0"]');
    if (deliveryCheckDiagnosis && window.location.pathname.includes('delivery-check.html')) {
        let lot = [];
        try {
            const raw = localStorage.getItem('resaving_user_lot');
            if (raw) lot = JSON.parse(raw);
        } catch (e) {}

        if (Array.isArray(lot) && lot.length > 0) {
            const titleEl = deliveryCheckDiagnosis.querySelector('h2');
            const pEl = deliveryCheckDiagnosis.querySelector('p');
            if (titleEl) {
                titleEl.textContent = `¡Tu lote de ${lot.length} material(es) es 100% compatible para entrega!`;
            }
            if (pEl) {
                const names = lot.map(it => it.name).join(', ');
                pEl.textContent = `Todos los residuos registrados (${names}) corresponden a la categoría Verde y pueden recibirse sin observaciones.`;
            }
        }
    }

    const deliveryConfirmTable = document.querySelector('table tbody');
    if (deliveryConfirmTable && window.location.pathname.includes('delivery-confirm.html')) {
        let lot = [];
        try {
            const raw = localStorage.getItem('resaving_user_lot');
            if (raw) lot = JSON.parse(raw);
        } catch (e) {}

        if (Array.isArray(lot) && lot.length > 0) {
            deliveryConfirmTable.innerHTML = lot.map(item => `
                <tr style="border-bottom: 1px solid #EEF3F0;">
                    <td style="padding: 12px 18px; font-weight: 700; color: #14251B;">${item.name}</td>
                    <td style="padding: 12px 18px; color: #6C8A79;">${item.qty} unidades</td>
                    <td style="padding: 12px 18px; font-weight: 700; color: #14251B;">${item.weight} kg</td>
                    <td style="padding: 12px 18px; text-align: right;"><span style="background-color: #EBF7F0; color: #0B4A30; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px;">Aprobado</span></td>
                </tr>
            `).join('');

            const totalKg = lot.reduce((sum, it) => sum + (parseFloat(it.weight) || 0), 0).toFixed(2);
            const tfootTd = document.querySelector('table tfoot td:last-child');
            if (tfootTd) {
                tfootTd.textContent = `${totalKg} kg aprovechables`;
            }
        }
    }

});
