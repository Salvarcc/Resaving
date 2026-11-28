/* Resaving — Recyclers & Point Operators Portal (HU-041, HU-043, HU-044, HU-045, HU-046, HU-047) */
document.addEventListener('DOMContentLoaded', () => {
    const store = window.ResavingStations;
    if (!store) return;

    // 1. Technical catalog & reception criteria tabs (HU-041, HU-043, HU-044)
    const techSpecData = {
        pet: {
            title: 'Botellas plásticas PET (Tacho Verde · Aprovechable)',
            norm: 'NTP 900.058:2019 · Aprovechables',
            accepted: 'Botellas transparentes o celestes de agua, gaseosas y rehidratantes; vacías, enjuagadas, escurridas y aplastadas.',
            rejected: 'Botellas con aceite comestible, solventes, químicos agrícolas o líquidos fermentados que humedecen el fardo.',
            collectorTip: 'Verificar al tacto que no haya humedad interna; separar las tapas rosca si la asociación las valoriza por separado.'
        },
        vidrio: {
            title: 'Envases de vidrio entero (Tacho Verde · Aprovechable)',
            norm: 'NTP 900.058:2019 · Aprovechables',
            accepted: 'Botellas de bebidas y frascos de conservas enteros, enjuagados, sin tapas metálicas ni corchos.',
            rejected: 'Vidrio roto mezclado, focos, espejos, cerámica, loza o pirex (tienen distinto punto de fusión).',
            collectorTip: 'Recibir en tolva acolchada o caja rígida por color (transparente, verde, ámbar) para proteger al operario según Ley N.° 29419.'
        },
        papel: {
            title: 'Cartón corrugado y papel bond (Tacho Verde · Aprovechable)',
            norm: 'NTP 900.058:2019 · Aprovechables',
            accepted: 'Cajas desarmadas, hojas bond, periódicos y cuadernos secos, planos y atados sin grapas gruesas.',
            rejected: 'Cajas de pizza con grasa, servilletas usadas, papel higiénico o cartón húmedo por lluvia.',
            collectorTip: 'Un solo bloque de cartón mojado o engrasado inutiliza el fardo completo de acopio selectivo.'
        },
        metal: {
            title: 'Latas de aluminio y hojalata (Tacho Verde · Aprovechable)',
            norm: 'NTP 900.058:2019 · Aprovechables',
            accepted: 'Latas de bebidas y conservas enjuagadas, secas y comprimidas sin bordes cortantes expuestos.',
            rejected: 'Envases de pintura, aerosoles presurizados, lubricantes o restos de comida descompuesta.',
            collectorTip: 'Separar latas de aluminio (imán no se adhiere) de hojalata ferrosa para optimizar precio en centro de comercialización.'
        },
        especial: {
            title: 'Pilas, baterías y residuos especiales (Tacho Rojo / Punto autorizado)',
            norm: 'NTP 900.058:2019 · Peligrosos y Especiales',
            accepted: 'Pilas alcalinas AA/AAA/9V, baterías pequeñas con polos cubiertos con cinta aislante y entregadas secas.',
            rejected: 'Pilas sulfatadas/abiertas mezcladas con plásticos o papel; focos rotos o termómetros sin resguardo.',
            collectorTip: 'Manipulación mínima con guantes (EPP según Ley N.° 29419); depositar directo en bidón hermético rojo y nunca compactar.'
        }
    };

    const techTabs = document.querySelectorAll('.collector-tech-tab');
    const techPanel = document.getElementById('collector-tech-panel');
    if (techTabs.length > 0 && techPanel) {
        const renderTechSpec = (matKey) => {
            const spec = techSpecData[matKey] || techSpecData.pet;
            techTabs.forEach(btn => {
                const active = btn.getAttribute('data-tech-mat') === matKey;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            techPanel.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 10px;">
                    <h3 style="font-size: 16.5px; font-weight: 800; color: #14251B; margin: 0;">${spec.title}</h3>
                    <span class="match-chip" style="margin: 0;">${spec.norm}</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 12px;">
                    <div style="background: #EBF7F0; border: 1px solid #B8DEC9; border-radius: 10px; padding: 12px;">
                        <strong style="display: block; font-size: 12.5px; color: #0B4A30; margin-bottom: 4px;">✓ Aceptado en recepción</strong>
                        <p style="margin: 0; font-size: 13px; color: #14251B; line-height: 1.45;">${spec.accepted}</p>
                    </div>
                    <div style="background: #FEF2F2; border: 1px solid #F5C2C2; border-radius: 10px; padding: 12px;">
                        <strong style="display: block; font-size: 12.5px; color: #991B1B; margin-bottom: 4px;">✕ Criterio de rechazo</strong>
                        <p style="margin: 0; font-size: 13px; color: #14251B; line-height: 1.45;">${spec.rejected}</p>
                    </div>
                </div>
                <p style="margin: 0; font-size: 13px; color: #3D5A4A;"><strong>Manejo operativo:</strong> ${spec.collectorTip}</p>
            `;
        };
        techTabs.forEach(btn => btn.addEventListener('click', () => renderTechSpec(btn.getAttribute('data-tech-mat'))));
        renderTechSpec('pet');
    }

    // 2. Station Manager Operational Portal (HU-045, HU-046, HU-047)
    const stationSelect = document.getElementById('manager-station-select');
    const formManager = document.getElementById('form-collector-station');
    if (!stationSelect || !formManager) return;

    const hoursInput = document.getElementById('mgr-hours');
    const addrInput = document.getElementById('mgr-address');
    const promoterInput = document.getElementById('mgr-promoter');
    const capacityInput = document.getElementById('mgr-capacity');
    const conditionNoteInput = document.getElementById('mgr-condition-note');
    const closedCheckbox = document.getElementById('mgr-closed-toggle');
    const closureFieldsBox = document.getElementById('mgr-closure-fields');
    const closureReasonSelect = document.getElementById('mgr-closure-reason');
    const reopenDateInput = document.getElementById('mgr-reopen-date');
    const matCheckboxes = document.querySelectorAll('input[name="mgr-materials"]');
    const liveBadge = document.getElementById('mgr-live-status-badge');
    const liveSummary = document.getElementById('mgr-live-summary');
    const feedbackBox = document.getElementById('collector-live-feedback');
    const linkDetail = document.getElementById('mgr-link-detail');
    const linkStatus = document.getElementById('mgr-link-status');
    const linkMap = document.getElementById('mgr-link-map');
    const btnResetStation = document.getElementById('btn-mgr-reset');

    const allStations = store.getAllStations();
    stationSelect.innerHTML = allStations.map(st =>
        `<option value="${st.code}">${st.name} (${st.districtName})</option>`
    ).join('');

    const toggleClosureBox = () => {
        if (closureFieldsBox && closedCheckbox) {
            closureFieldsBox.style.display = closedCheckbox.checked ? 'grid' : 'none';
        }
    };

    const syncStationForm = (code) => {
        const st = store.getStationByCode(code);
        if (!st) return;

        if (hoursInput) hoursInput.value = st.hours || '08:00 a 18:00';
        if (addrInput) addrInput.value = st.addr || '';
        if (promoterInput) promoterInput.value = st.promoter || '';
        if (capacityInput) capacityInput.value = st.capacity || '';
        if (conditionNoteInput) conditionNoteInput.value = st.conditionNote || '';
        if (closedCheckbox) closedCheckbox.checked = Boolean(st.closedTemporarily);
        if (closureReasonSelect && st.closureReason) closureReasonSelect.value = st.closureReason;
        if (reopenDateInput) reopenDateInput.value = st.reopenDate || '';
        toggleClosureBox();

        matCheckboxes.forEach(cb => {
            cb.checked = st.matsArray.includes(cb.value);
        });

        if (liveBadge) {
            liveBadge.textContent = st.status;
            liveBadge.className = `point-status-badge ${st.badge}`;
        }
        if (liveSummary) {
            liveSummary.textContent = `${st.districtName} · Última revisión: ${st.updatedAt} · Materiales: ${st.tags.join(', ')}`;
        }
        if (linkDetail) linkDetail.href = `point-detail.html?punto=${st.code}`;
        if (linkStatus) linkStatus.href = `point-status.html?punto=${st.code}`;
        if (linkMap) linkMap.href = `collection-map.html?distrito=${st.districtKey}`;
    };

    stationSelect.addEventListener('change', () => syncStationForm(stationSelect.value));
    if (closedCheckbox) closedCheckbox.addEventListener('change', toggleClosureBox);

    const showFeedback = (msg, isError = false) => {
        if (feedbackBox) {
            feedbackBox.textContent = msg;
            feedbackBox.style.display = 'block';
            feedbackBox.style.backgroundColor = isError ? '#FEF2F2' : '#EBF7F0';
            feedbackBox.style.borderColor = isError ? '#991B1B' : '#0B4A30';
            feedbackBox.style.color = isError ? '#991B1B' : '#0B4A30';
            feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        if (typeof window.resavingNotify === 'function') {
            window.resavingNotify(msg, 'Portal de acopio', isError ? '!' : '✓');
        }
    };

    formManager.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = stationSelect.value;
        const selectedMats = Array.from(matCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        if (selectedMats.length === 0) {
            showFeedback('Selecciona al menos un tipo de material aceptado antes de guardar.', true);
            return;
        }
        const isClosed = Boolean(closedCheckbox && closedCheckbox.checked);
        const updated = store.saveStationOverride(code, {
            hours: hoursInput ? hoursInput.value.trim() : '',
            addr: addrInput ? addrInput.value.trim() : '',
            promoter: promoterInput ? promoterInput.value.trim() : '',
            capacity: capacityInput ? capacityInput.value.trim() : '',
            conditionNote: conditionNoteInput ? conditionNoteInput.value.trim() : '',
            matsArray: selectedMats,
            closedTemporarily: isClosed,
            closureReason: isClosed && closureReasonSelect ? closureReasonSelect.value : '',
            reopenDate: isClosed && reopenDateInput ? reopenDateInput.value.trim() : ''
        });
        syncStationForm(code);
        showFeedback(
            isClosed
                ? `Indisponibilidad temporal registrada para "${updated.name}". Ahora figura como "${updated.status}" en el mapa y detalle.`
                : `Cambios publicados para "${updated.name}". Horario, materiales y condiciones actualizados en tiempo real.`
        );
    });

    if (btnResetStation) {
        btnResetStation.addEventListener('click', () => {
            const code = stationSelect.value;
            store.resetStationOverride(code);
            syncStationForm(code);
            showFeedback('Se restablecieron los datos base verificados de esta estación.');
        });
    }

    syncStationForm(stationSelect.value);
});
