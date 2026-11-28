/* Resaving — Collection Map, District Stations, List, Point Detail & Live Status */
document.addEventListener('DOMContentLoaded', () => {
    const store = window.ResavingStations;
    if (!store) return;

    const districtSelector = document.getElementById('district-selector');
    const mapPointsContainer = document.querySelector('.map-points-list');
    const listPointsContainer = document.querySelector('.list-view-grid');
    const mapMarkersLayer = document.getElementById('map-markers-layer');
    const popupTitle = document.getElementById('popup-point-title');
    const popupDesc = document.getElementById('popup-point-desc');
    const popupLink = document.getElementById('popup-point-link');
    const sortSelector = document.getElementById('sort-selector');
    const labelListDistrict = document.getElementById('label-list-district');
    const tabToMap = document.getElementById('tab-to-map');
    const districtNames = store.DISTRICT_NAMES;

    const mapUrlParams = new URLSearchParams(window.location.search);
    const initialDistrictParam = mapUrlParams.get('distrito');

    const popupCard = document.getElementById('map-popup-card');
    const closePopupBtn = document.getElementById('btn-close-map-popup');
    if (closePopupBtn && popupCard) {
        closePopupBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            popupCard.style.display = 'none';
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupCard) {
            popupCard.style.display = 'none';
        }
    });

    const updateMapPopup = (st, districtKey) => {
        if (popupCard) popupCard.style.display = 'block';
        if (!popupTitle || !popupDesc || !popupLink) return;
        popupTitle.textContent = st.name;
        const reasonNote = st.closedTemporarily && st.closureReason ? ` (${st.closureReason})` : '';
        popupDesc.textContent = `${st.dist} · ${st.status}${reasonNote} · Acepta ${st.tags.join(', ')}.`;
        popupLink.href = `point-detail.html?punto=${districtKey}-${st.id}`;
    };

    const districtMapSvg = {
        'san-miguel': '../assets/icons/map-collection-points.svg',
        miraflores: '../assets/icons/map-miraflores.svg',
        surco: '../assets/icons/map-surco.svg',
        magdalena: '../assets/icons/map-magdalena.svg',
        'pueblo-libre': '../assets/icons/map-pueblo-libre.svg',
        'san-borja': '../assets/icons/map-san-borja.svg'
    };

    const buildFallbackBoxHtml = (filterMat, districtKey) => {
        const allOpen = store.getAllStations().filter(st =>
            !st.closedTemporarily && (filterMat === 'all' || st.matsArray.includes(filterMat))
        ).sort((a, b) => a.km - b.km);
        const alt = allOpen[0];
        const distName = districtNames[districtKey] || districtKey;
        const altHtml = alt
            ? `<a href="point-detail.html?punto=${alt.code}" class="btn-primary-action" style="display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; font-size: 13px; text-decoration: none;">Ir a punto compatible cercano: ${alt.name} (${alt.districtName}) &rarr;</a>`
            : `<a href="prep-alternative.html" class="btn-primary-action" style="display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; font-size: 13px; text-decoration: none;">Ver alternativas responsables de entrega &rarr;</a>`;

        return `
            <div class="no-compatible-fallback" role="status" aria-live="polite" style="background: #FEF3D6; border: 1.5px solid #D97706; border-radius: 14px; padding: 20px; width: 100%; margin-top: 8px;">
                <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 800; color: #14251B;">Sin puntos abiertos compatibles en ${distName}</h3>
                <p style="margin: 0 0 14px 0; font-size: 13.5px; color: #3D5A4A; line-height: 1.45;">
                    Ninguna estación activa en este distrito coincide con tu filtro actual o está atendiendo hoy. Puedes consultar un distrito cercano o revisar vías alternativas.
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${altHtml}
                    <a href="prep-safety.html" class="btn-outline-action" style="display: inline-flex; align-items: center; padding: 9px 16px; font-size: 13px; text-decoration: none;">Manejo seguro de especiales</a>
                </div>
            </div>
        `;
    };

    const syncMapFallbackBanner = (container, visibleCount, filterMat, districtKey) => {
        if (!container) return;
        const existing = container.querySelector('.no-compatible-fallback');
        if (existing) existing.remove();
        if (visibleCount === 0) {
            container.insertAdjacentHTML('beforeend', buildFallbackBoxHtml(filterMat, districtKey));
        }
    };

    const renderDistrictStations = (districtKey) => {
        const normKey = (districtKey === 'all' || !districtNames[districtKey]) ? 'san-miguel' : districtKey;
        const stations = store.getStationsForDistrict(normKey);
        const mapBgImg = document.querySelector('.map-image-layer, .map-bg-img');
        if (mapBgImg) {
            mapBgImg.src = districtMapSvg[normKey] || districtMapSvg['san-miguel'];
        }

        const tabToList = document.querySelector('a[href^="collection-list.html"]');
        if (tabToList) {
            tabToList.href = `collection-list.html?distrito=${normKey}`;
        }

        if (mapPointsContainer) {
            mapPointsContainer.innerHTML = stations.map((st, i) => `
                <article class="point-card ${i === 0 ? 'selected' : ''}" data-point-id="${st.id}" data-materials="${st.mats}" data-closed="${st.closedTemporarily ? '1' : '0'}">
                    <div class="point-card-header">
                        <h2 class="point-card-title">${st.num}. ${st.name}</h2>
                        <span class="point-status-badge ${st.badge}">${st.status}</span>
                    </div>
                    <p class="point-card-distance">
                        <img src="../assets/icons/icon-pin.svg" alt="" style="width: 14px; height: 14px;">
                        <span>${st.dist}</span>
                    </p>
                    <p class="point-card-address">${st.addr}${st.closedTemporarily && st.closureReason ? ` · Motivo: ${st.closureReason}` : ''}</p>
                    <div class="point-materials-row">
                        ${st.tags.map(t => `<span class="mat-tag">${t}</span>`).join('')}
                    </div>
                    <a href="point-detail.html?punto=${normKey}-${st.id}" class="btn-outline-action flex center" style="padding: 9px 16px; font-size: 13.5px; width: 100%;">
                        <span>Ver detalle</span>
                    </a>
                </article>
            `).join('');
        }

        if (mapMarkersLayer) {
            mapMarkersLayer.innerHTML = stations.map((st, i) => `
                <div class="map-marker marker-${st.id} ${i === 0 ? 'selected' : ''}" data-point-id="${st.id}" style="top: ${st.y}%; left: ${st.x}%; ${st.closedTemporarily ? 'background-color: #991B1B;' : ''}">${st.num}</div>
            `).join('');
        }

        if (stations.length > 0) {
            updateMapPopup(stations[0], normKey);
        }

        bindMarkerAndCardEvents(normKey, stations);
    };

    const renderListView = (sortMode = 'distancia', filterMat = 'all', selDistrict = null) => {
        if (!listPointsContainer) return;

        if (!selDistrict && districtSelector) {
            selDistrict = districtSelector.value;
        }

        let allPoints = store.getStationsForDistrict(selDistrict || 'all');

        if (filterMat !== 'all') {
            allPoints = allPoints.filter(p => p.matsArray.includes(filterMat));
        }

        if (sortMode === 'distancia') {
            allPoints.sort((a, b) => a.km - b.km);
        } else if (sortMode === 'alfabetico') {
            allPoints.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortMode === 'materiales') {
            allPoints.sort((a, b) => b.tags.length - a.tags.length);
        } else if (sortMode === 'horario') {
            allPoints.sort((a, b) => (b.status.includes('24h') ? 1 : 0) - (a.status.includes('24h') ? 1 : 0));
        }

        if (allPoints.length === 0 || allPoints.every(p => p.closedTemporarily)) {
            const extraCards = allPoints.map((st, idx) => `
                <article class="list-point-item" data-materials="${st.mats}">
                    <div class="list-point-info">
                        <div class="point-card-header">
                            <h2 class="point-card-title">${idx + 1}. ${st.name}</h2>
                            <span class="point-status-badge ${st.badge}">${st.status}</span>
                        </div>
                        <p class="point-card-distance">
                            <img src="../assets/icons/icon-pin.svg" alt="" style="width: 14px; height: 14px;">
                            <span>${st.dist}</span>
                        </p>
                        <p class="point-card-address">${st.addr}</p>
                        <div class="point-materials-row">
                            ${st.tags.map(t => `<span class="mat-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                    <div class="list-point-actions">
                        <a href="point-detail.html?punto=${st.districtKey}-${st.id}" class="btn-primary-action flex center" style="padding: 10px 18px; font-size: 13.5px; text-decoration: none;">
                            <span>Ver ficha y horarios</span>
                        </a>
                    </div>
                </article>
            `).join('');
            listPointsContainer.innerHTML = buildFallbackBoxHtml(filterMat, selDistrict || 'all') + extraCards;
            return;
        }

        listPointsContainer.innerHTML = allPoints.map((st, idx) => `
            <article class="list-point-item" data-materials="${st.mats}">
                <div class="list-point-info">
                    <div class="point-card-header">
                        <h2 class="point-card-title">${idx + 1}. ${st.name}</h2>
                        <span class="point-status-badge ${st.badge}">${st.status}</span>
                    </div>
                    <p class="point-card-distance">
                        <img src="../assets/icons/icon-pin.svg" alt="" style="width: 14px; height: 14px;">
                        <span>${st.dist}</span>
                    </p>
                    <p class="point-card-address">${st.addr}${st.closedTemporarily && st.closureReason ? ` · Motivo: ${st.closureReason}` : ''}</p>
                    <div class="point-materials-row">
                        ${st.tags.map(t => `<span class="mat-tag">${t}</span>`).join('')}
                    </div>
                </div>
                <div class="list-point-actions">
                    <a href="point-detail.html?punto=${st.districtKey}-${st.id}" class="btn-primary-action flex center" style="padding: 10px 18px; font-size: 13.5px; text-decoration: none;">
                        <span>Ver ficha y horarios</span>
                    </a>
                    <a href="point-detail.html?punto=${st.districtKey}-${st.id}#como-llegar" class="btn-outline-action flex center" style="padding: 10px 18px; font-size: 13.5px; text-decoration: none;">
                        <span>Cómo llegar</span>
                    </a>
                </div>
            </article>
        `).join('');
    };

    if (sortSelector) {
        sortSelector.addEventListener('change', () => {
            const activeChip = document.querySelector('.filter-chip.active');
            const curFilter = activeChip ? activeChip.getAttribute('data-filter') : 'all';
            const curDistrict = districtSelector ? districtSelector.value : 'all';
            renderListView(sortSelector.value, curFilter, curDistrict);
        });
    }

    function bindMarkerAndCardEvents(districtKey, stations) {
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
    }

    if (districtSelector) {
        if (initialDistrictParam && (initialDistrictParam === 'all' || districtNames[initialDistrictParam])) {
            districtSelector.value = initialDistrictParam;
        }

        if (mapPointsContainer) {
            districtSelector.addEventListener('change', () => {
                renderDistrictStations(districtSelector.value);
                const activeChip = document.querySelector('.filter-chip.active');
                if (activeChip) activeChip.click();
            });
            renderDistrictStations(districtSelector.value);
        } else if (listPointsContainer) {
            const updateListDistrict = () => {
                const curVal = districtSelector.value;
                if (labelListDistrict) {
                    labelListDistrict.textContent = `${districtNames[curVal] || 'San Miguel'}, Lima`;
                }
                if (tabToMap) {
                    tabToMap.href = `collection-map.html?distrito=${curVal === 'all' ? 'san-miguel' : curVal}`;
                }
                const activeChip = document.querySelector('.filter-chip.active');
                const curFilter = activeChip ? activeChip.getAttribute('data-filter') : 'all';
                const curSort = sortSelector ? sortSelector.value : 'distancia';
                renderListView(curSort, curFilter, curVal);
            };

            districtSelector.addEventListener('change', updateListDistrict);
            updateListDistrict();
        }
    } else if (listPointsContainer) {
        renderListView();
    }

    const allFilterChips = document.querySelectorAll('.filter-chip[data-filter]');
    if (allFilterChips.length > 0) {
        allFilterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.preventDefault();
                allFilterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const filter = chip.getAttribute('data-filter');

                if (listPointsContainer) {
                    const curSort = sortSelector ? sortSelector.value : 'distancia';
                    const curDistrict = districtSelector ? districtSelector.value : 'all';
                    renderListView(curSort, filter, curDistrict);
                    return;
                }

                const targetCards = document.querySelectorAll('.point-card, .list-point-item');
                let visibleOpenCount = 0;

                targetCards.forEach(card => {
                    const mats = card.getAttribute('data-materials') || '';
                    const isClosed = card.getAttribute('data-closed') === '1';
                    if (filter === 'all' || mats.includes(filter)) {
                        card.style.display = '';
                        if (!isClosed) visibleOpenCount += 1;
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

                syncMapFallbackBanner(mapPointsContainer, visibleOpenCount, filter, districtSelector ? districtSelector.value : 'san-miguel');
            });
        });
    }

    // Point detail view (reads live store overrides)
    const pointDetailTitle = document.getElementById('point-detail-title');
    if (pointDetailTitle) {
        const pointUrlParams = new URLSearchParams(window.location.search);
        const puntoParam = pointUrlParams.get('punto') || 'san-miguel-1';
        const pointData = store.getStationByCode(puntoParam);

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

        const materialsGrid = document.getElementById('point-materials-grid');
        if (materialsGrid && pointData.isModified) {
            materialsGrid.innerHTML = `<div class="parts-grid">${pointData.matsArray.map(m => {
                const meta = store.MATERIAL_CATALOG[m] || { label: m, desc: 'Condición verificada por el encargado del punto.' };
                return `
                    <div class="part-card">
                        <div class="part-header">
                            <h3 class="part-name">${meta.label}</h3>
                            <span class="part-tag tag-recycle">Aceptado</span>
                        </div>
                        <p class="part-desc">${meta.desc}</p>
                    </div>
                `;
            }).join('')}</div>`;
        }

        const safeTip = document.getElementById('point-safety-tip');
        if (safeTip) {
            if (pointData.closedTemporarily) {
                safeTip.style.backgroundColor = '#FEF2F2';
                safeTip.style.borderColor = '#991B1B';
                safeTip.innerHTML = `<strong>Indisponibilidad temporal registrada:</strong> Motivo: ${pointData.closureReason || 'Mantenimiento operativo'}${pointData.reopenDate ? ` · Reapertura estimada: ${pointData.reopenDate}` : ''}. Consulta otro punto en el <a href="collection-map.html?distrito=${pointData.districtKey}" style="color: #991B1B; font-weight: 700;">mapa distrital</a>.`;
            } else {
                safeTip.innerHTML = `<strong>Aviso importante:</strong> ${pointData.tip}`;
            }
        }

        const msgTemplateP = document.querySelector('.message-template-box p');
        if (msgTemplateP) {
            msgTemplateP.textContent = `"Hola, tengo un lote de botellas plásticas para bebidas aplastadas y cartón limpio. ¿Se encuentran atendiendo normalmente hoy en ${pointData.name}?"`;
        }

        const stepInstructions = document.querySelectorAll('.directions-step-list .step-instruction');
        if (stepInstructions.length >= 3) {
            stepInstructions[0].innerHTML = `<strong>Dirígete hacia ${pointData.addr.split('(')[0].trim()}</strong><p>Avanza por la vía principal siguiendo la referencia municipal (${pointData.dist}).</p>`;
            stepInstructions[1].innerHTML = `<strong>Ingresa al perímetro de ${pointData.name}</strong><p>Usa el crucero peatonal señalizado junto a la zona de recepción.</p>`;
            stepInstructions[2].innerHTML = `<strong>Ubica los contenedores selectivos autorizados</strong><p>Identifica las bocas rotuladas con el apoyo de: ${pointData.promoter}.</p>`;
        }

        const km = pointData.km || parseFloat(pointData.dist) || 0.8;
        const walkMins = Math.round(km * 13);
        const walkMeters = Math.round(km * 1000);
        const bikeMins = Math.max(2, Math.round(km * 4.5));
        const driveMins = Math.max(2, Math.round(km * 3.2));

        const attrWalk = document.getElementById('attr-time-walk');
        const attrBike = document.getElementById('attr-time-bike');
        const attrDrive = document.getElementById('attr-time-drive');
        const btnGmaps = document.getElementById('btn-gmaps-link');

        if (attrWalk) attrWalk.textContent = `${walkMins} minutos (${walkMeters} m)`;
        if (attrBike) attrBike.textContent = `${bikeMins} minutos`;
        if (attrDrive) attrDrive.textContent = `${driveMins} minutos (estacionamiento libre)`;
        if (btnGmaps) {
            btnGmaps.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pointData.name + ', ' + pointData.addr + ', Lima')}`;
        }
    }

    // Point status view (syncs with collector portal overrides too)
    const statusBadgeEl = document.getElementById('status-station-badge');
    if (statusBadgeEl) {
        const statusParams = new URLSearchParams(window.location.search);
        const puntoCode = statusParams.get('punto') || 'san-miguel-1';
        const st = store.getStationByCode(puntoCode);

        const titleEl = document.getElementById('status-station-title');
        const metaEl = document.getElementById('status-station-meta');
        const hoursEl = document.getElementById('status-station-hours');
        const closureAlertEl = document.getElementById('status-closure-alert');

        if (titleEl) titleEl.textContent = st.name;
        if (metaEl) metaEl.textContent = `${st.addr} · Responsable: ${st.promoter} · Actualización: ${st.updatedAt}`;
        if (hoursEl) hoursEl.textContent = st.hours;

        if (st.closedTemporarily) {
            statusBadgeEl.textContent = st.status;
            statusBadgeEl.className = 'point-status-badge badge-closed';
            if (closureAlertEl) {
                closureAlertEl.style.display = 'block';
                closureAlertEl.innerHTML = `<strong>Estación cerrada temporalmente:</strong> ${st.closureReason || 'Mantenimiento preventivo'}${st.reopenDate ? ` · Reapertura estimada: ${st.reopenDate}` : ''}. <a href="collection-map.html?distrito=${st.districtKey}" style="color: #991B1B; font-weight: 800;">Buscar estación alternativa</a>.`;
            }
        } else {
            statusBadgeEl.textContent = 'Abierto · Operando con normalidad';
            statusBadgeEl.className = 'point-status-badge badge-open';
        }
    }

    // Collection routes handling
    const routePageTitle = document.getElementById('route-page-title');
    if (routePageTitle) {
        const routesDictionary = {
            'san-miguel-03': {
                name: 'Ruta San Miguel 03',
                pageTitle: 'Ruta municipal San Miguel 03',
                subtitle: 'Consulta días, frecuencias de recojo y el área de cobertura del programa de segregación en la fuente.',
                sector: 'Sector 3 de San Miguel',
                cardTitle: 'Ruta de recolección selectiva 03',
                nextVisit: 'Próxima visita: Sábado 10',
                desc: 'El vehículo recolector y los recicladores formalizados del programa distrital recorren las calles recolectando residuos aprovechables empacados en bolsas verdes.',
                materials: 'Plásticos, botellas, cartón, papel bond y latas limpios.',
                coverage: 'Av. La Marina, Av. Universitaria y Av. Bertolotto.',
                activeDays: { Mié: '08:00–12:00', Sáb: '08:00–12:00' }
            },
            'pueblo-libre-01': {
                name: 'Ruta Pueblo Libre 01',
                pageTitle: 'Ruta municipal Pueblo Libre 01',
                subtitle: 'Programa Recicla Pueblo Libre para predios y condominios del sector histórico.',
                sector: 'Sector 1 de Pueblo Libre',
                cardTitle: 'Ruta de recolección selectiva 01',
                nextVisit: 'Próxima visita: Jueves 08',
                desc: 'El camión baranda recorre las urbanizaciones del cuadrante histórico de Pueblo Libre en horario matutino.',
                materials: 'Botellas plásticas, frascos de vidrio, papel y cartón seco.',
                coverage: 'Cuadrante Av. Sucre, Av. Bolívar y Av. Vivanco.',
                activeDays: { Mar: '09:00–13:00', Jue: '09:00–13:00' }
            },
            'magdalena-02': {
                name: 'Ruta Magdalena 02',
                pageTitle: 'Ruta municipal Magdalena 02',
                subtitle: 'Ruta de recolección diferenciada para vecinos del sector comercial y residencial.',
                sector: 'Sector 2 de Magdalena',
                cardTitle: 'Ruta de recolección selectiva 02',
                nextVisit: 'Próxima visita: Viernes 09',
                desc: 'Brigada de recicladores acreditados recorre comercios y residencias con vehículo recolector ligero.',
                materials: 'Plásticos, envases de hojalata y aluminio, papel y cartón.',
                coverage: 'Cuadrante Jr. Bolognesi, Av. Brasil y Jr. Leoncio Prado.',
                activeDays: { Lun: '08:30–12:30', Vie: '08:30–12:30' }
            }
        };

        const routeParams = new URLSearchParams(window.location.search);
        const rutaKey = routeParams.get('ruta') || 'san-miguel-03';
        const routeData = routesDictionary[rutaKey] || routesDictionary['san-miguel-03'];

        document.title = `Resaving - ${routeData.name}`;
        routePageTitle.textContent = routeData.pageTitle;

        const routeCrumb = document.getElementById('route-breadcrumb-name');
        if (routeCrumb) routeCrumb.textContent = routeData.name;
        const routeSub = document.getElementById('route-page-subtitle');
        if (routeSub) routeSub.textContent = routeData.subtitle;
        const routeSector = document.getElementById('route-sector-badge');
        if (routeSector) routeSector.textContent = routeData.sector;
        const routeCardTitle = document.getElementById('route-card-title');
        if (routeCardTitle) routeCardTitle.textContent = routeData.cardTitle;
        const routeNextVisit = document.getElementById('route-next-visit');
        if (routeNextVisit) routeNextVisit.textContent = routeData.nextVisit;
        const routeDesc = document.getElementById('route-card-desc');
        if (routeDesc) routeDesc.textContent = routeData.desc;
        const routeMats = document.getElementById('route-materials-text');
        if (routeMats) routeMats.textContent = routeData.materials;
        const routeCov = document.getElementById('route-coverage-text');
        if (routeCov) routeCov.textContent = routeData.coverage;

        const dayCards = document.querySelectorAll('#route-week-calendar .day-pill-card');
        dayCards.forEach(card => {
            const dayName = card.getAttribute('data-day') || (card.querySelector('.day-name') ? card.querySelector('.day-name').textContent.trim() : '');
            const hoursEl = card.querySelector('.day-hours');
            if (routeData.activeDays && routeData.activeDays[dayName]) {
                card.classList.add('active');
                if (hoursEl) {
                    hoursEl.classList.remove('empty');
                    hoursEl.textContent = routeData.activeDays[dayName];
                }
            } else {
                card.classList.remove('active');
                if (hoursEl) {
                    hoursEl.classList.add('empty');
                    hoursEl.textContent = '—';
                }
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
});
