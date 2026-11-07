/* Resaving — Collection Map, District Stations, List & Point Detail */
document.addEventListener('DOMContentLoaded', () => {
    const isPagesSubdir = window.location.pathname.includes('/pages/');
    const basePath = isPagesSubdir ? '' : 'pages/';
    const districtStations = {
        'san-miguel': [
            { id: '1', num: '1', name: 'Estación Recicla San Miguel', km: 0.8, status: 'Abierto hoy', badge: 'badge-open', dist: '0.8 km · 11 min a pie · Cruce Av. La Marina con Universitaria', addr: 'Ingreso peatonal frente a Plaza San Miguel. Horario: 08:00 a 18:00.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Vidrio', 'Cartón y papel', 'Latas'], x: 52, y: 44, promoter: 'Edgar Ramos (Reg. #SM-402)', capacity: '85% libre (vaciado hoy)' },
            { id: '2', num: '2', name: 'Punto Limpio Parque Juan Pablo II', km: 1.4, status: 'Abierto hoy', badge: 'badge-open', dist: '1.4 km · 18 min a pie · Av. Riva Agüero cdra. 8', addr: 'Contenedores verdes ubicados junto a la caseta de serenazgo del parque. Horario: 07:00 a 19:00.', mats: 'pet vidrio papel', tags: ['Botellas plásticas', 'Latas de conserva', 'Papel'], x: 32, y: 35, promoter: 'Rosa Quispe (Reg. #SM-205)', capacity: '60% libre' },
            { id: '3', num: '3', name: 'Contenedor Verde Metro La Marina', km: 1.9, status: 'Abierto 24h', badge: 'badge-open', dist: '1.9 km · 25 min a pie · Av. La Marina 2500', addr: 'Área de estacionamiento del supermercado. Acceso vehicular y peatonal las 24 horas.', mats: 'pet vidrio', tags: ['Botellas plásticas', 'Vidrio de conserva'], x: 46, y: 56, promoter: 'Caseta de Seguridad Metro', capacity: '75% libre' },
            { id: '4', num: '4', name: 'Estación Ambiental Plaza Bandera', km: 2.3, status: 'Cierra a las 17:00', badge: 'badge-closing', dist: '2.3 km · 7 min en auto · Límite con Pueblo Libre', addr: 'Punto de acopio municipal para materiales aprovechables y contenedor para pilas usadas.', mats: 'pet metal especial', tags: ['Multimaterial', 'Pilas y baterías'], x: 75, y: 30, promoter: 'Carlos Dávila (Reg. #SM-318)', capacity: '40% libre' }
        ],
        'pueblo-libre': [
            { id: '1', num: '1', name: 'Ecopunto Plaza Bolívar', km: 0.6, status: 'Abierto hoy', badge: 'badge-open', dist: '0.6 km · 8 min a pie · Jr. Vivanco frente a Municipalidad', addr: 'Centro de reciclaje selectivo comunal. Horario: 08:00 a 17:00.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Vidrio', 'Cartón y papel'], x: 50, y: 42, promoter: 'María Elena Fuentes (Reg. #PL-110)', capacity: '70% libre' },
            { id: '2', num: '2', name: 'Módulo Ambiental Parque El Carmen', km: 1.1, status: 'Abierto hoy', badge: 'badge-open', dist: '1.1 km · 14 min a pie · Av. Sucre cdra. 12', addr: 'Isla de segregación con promotor vecinal. Horario: 09:00 a 18:00.', mats: 'pet papel metal', tags: ['Botellas plásticas', 'Latas de aluminio', 'Papel bond'], x: 65, y: 32, promoter: 'Juan Paredes (Reg. #PL-142)', capacity: '50% libre' },
            { id: '3', num: '3', name: 'Punto Verde Parque Candamo', km: 1.8, status: 'Abierto hoy', badge: 'badge-open', dist: '1.8 km · 22 min a pie · Av. Del Río cuadra 3', addr: 'Contenedores para plástico, vidrio y contenedor rojo de pilas. Horario: 07:00 a 19:00.', mats: 'pet vidrio especial', tags: ['Botellas plásticas', 'Vidrio', 'Pilas alcalinas'], x: 35, y: 58, promoter: 'Sofía Delgado (Reg. #PL-203)', capacity: '80% libre' }
        ],
        'miraflores': [
            { id: '1', num: '1', name: 'Punto Limpio Parque Kennedy', km: 0.5, status: 'Abierto 24h', badge: 'badge-open', dist: '0.5 km · 7 min a pie · Parque Central de Miraflores (Diagonal)', addr: 'Estación soterrada de 4 bocas con promotor diurno. Horario 24h.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Vidrio', 'Latas'], x: 52, y: 45, promoter: 'Programa Basura Cero Miraflores', capacity: '90% libre' },
            { id: '2', num: '2', name: 'Estación Ecológica Reducto', km: 1.2, status: 'Abierto hoy', badge: 'badge-open', dist: '1.2 km · 15 min a pie · Parque Reducto N° 2 (Av. Benavides)', addr: 'Centro de segregación municipal y recepción de pequeños aparatos. Horario: 08:30 a 18:00.', mats: 'pet papel metal especial', tags: ['Cartón corrugado', 'Plásticos', 'Aparatos electrónicos'], x: 40, y: 62, promoter: 'Asoc. Recicladores Miraflores', capacity: '65% libre' },
            { id: '3', num: '3', name: 'Ecopunto Malecón Cisneros', km: 1.6, status: 'Abierto hoy', badge: 'badge-open', dist: '1.6 km · 20 min a pie · Malecón Cisneros cdra. 5', addr: 'Frente al Parque del Faro. Contenedores de alta capacidad. Horario: 07:00 a 19:00.', mats: 'pet vidrio', tags: ['Botellas de bebidas', 'Vidrio'], x: 24, y: 34, promoter: 'Serenazgo Miraflores Costa', capacity: '80% libre' },
            { id: '4', num: '4', name: 'Centro de Acopio Estadio Manuel Bonilla', km: 2.1, status: 'Abierto hoy', badge: 'badge-open', dist: '2.1 km · 8 min en auto · Av. Del Ejército cdra. 13', addr: 'Recepción general multimaterial, tolva para aceite vegetal y pilas. Horario: 08:00 a 17:00.', mats: 'pet vidrio papel metal especial', tags: ['Multimaterial', 'Aceite vegetal', 'Pilas'], x: 68, y: 24, promoter: 'Subgerencia Limpieza Pública', capacity: '55% libre' }
        ],
        'magdalena': [
            { id: '1', num: '1', name: 'Estación Recicla Plaza Túpac Amaru', km: 0.7, status: 'Abierto hoy', badge: 'badge-open', dist: '0.7 km · 9 min a pie · Jr. Bolognesi cdra. 3', addr: 'Centro comunal frente a la iglesia del Sagrado Corazón. Horario: 08:00 a 18:00.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Cartón', 'Latas'], x: 46, y: 38, promoter: 'Asoc. Recicla Magdalena', capacity: '75% libre' },
            { id: '2', num: '2', name: 'Ecopunto Malecón Castagnola', km: 1.3, status: 'Abierto hoy', badge: 'badge-open', dist: '1.3 km · 16 min a pie · Jr. Diego Ferré cruce con Malecón', addr: 'Contenedores verdes instalados con vista al mar. Horario: 07:00 a 18:00.', mats: 'pet vidrio', tags: ['Botellas para bebidas', 'Frascos de vidrio'], x: 30, y: 58, promoter: 'Serenazgo Costanera', capacity: '85% libre' },
            { id: '3', num: '3', name: 'Punto Limpio Mercado Magdalena', km: 1.5, status: 'Cierra a las 16:00', badge: 'badge-closing', dist: '1.5 km · 19 min a pie · Jr. Leoncio Prado cdra. 7', addr: 'Bahía de reciclaje posterior del mercado municipal. Horario: 07:00 a 16:00.', mats: 'pet papel organico', tags: ['Envases plásticos', 'Cartón limpio'], x: 62, y: 30, promoter: 'Comité Ambiental Mercado', capacity: '50% libre' }
        ],
        'surco': [
            { id: '1', num: '1', name: 'Planta de Reciclaje EMUSAP Surco', km: 0.9, status: 'Abierto hoy', badge: 'badge-open', dist: '0.9 km · 12 min a pie · Jr. Combate de Angamos s/n', addr: 'Planta modelo de segregación y valorización de residuos. Horario: 08:00 a 17:00.', mats: 'pet vidrio papel metal especial', tags: ['Plásticos', 'Vidrio', 'Papel y cartón', 'Metales'], x: 52, y: 44, promoter: 'Programa Surco Recicla (EMUSAP)', capacity: '90% libre' },
            { id: '2', num: '2', name: 'Ecopunto Parque de la Amistad', km: 1.4, status: 'Abierto hoy', badge: 'badge-open', dist: '1.4 km · 18 min a pie · Av. Caminos del Inca cruce con Benavides', addr: 'Punto limpio turístico al costado de la estación del tren. Horario: 08:00 a 19:00.', mats: 'pet vidrio papel', tags: ['Botellas plásticas', 'Frascos', 'Cartón'], x: 42, y: 30, promoter: 'Promotores Amistad Verde', capacity: '70% libre' },
            { id: '3', num: '3', name: 'Módulo Verde Jockey Plaza', km: 2.0, status: 'Abierto hoy', badge: 'badge-open', dist: '2.0 km · 6 min en auto · Av. Javier Prado Este 4200', addr: 'Zona de estacionamiento peatonal puerta 1. Horario comercial: 09:00 a 21:00.', mats: 'pet vidrio metal', tags: ['Botellas plásticas', 'Latas de bebidas'], x: 72, y: 22, promoter: 'Sostenibilidad Jockey', capacity: '80% libre' },
            { id: '4', num: '4', name: 'Punto de Acopio Parque Voces por el Clima', km: 2.8, status: 'Abierto hoy', badge: 'badge-open', dist: '2.8 km · 9 min en auto · Av. Los Castillos s/n', addr: 'Pabellón de reciclaje ecológico y recepción de ecoladrillos. Horario: 09:00 a 17:00.', mats: 'pet papel metal especial', tags: ['Multimaterial', 'Ecoladrillos', 'Pilas'], x: 58, y: 64, promoter: 'Centro Educación Ambiental Surco', capacity: '60% libre' }
        ],
        'san-borja': [
            { id: '1', num: '1', name: 'Ecopunto Pentagonito · Parque Olímpico', km: 0.7, status: 'Abierto 24h', badge: 'badge-open', dist: '0.7 km · 9 min a pie · Av. San Borja Norte cdra. 10', addr: 'Estación ecológica municipal junto al circuito deportivo del Pentagonito. Horario: 24 horas.', mats: 'pet vidrio papel metal', tags: ['Botellas plásticas', 'Vidrio', 'Cartón', 'Latas'], x: 35, y: 32, promoter: 'Programa San Borja Recicla', capacity: '85% libre' },
            { id: '2', num: '2', name: 'Estación Ambiental Parque de la Felicidad', km: 1.1, status: 'Abierto hoy', badge: 'badge-open', dist: '1.1 km · 14 min a pie · Cruce Av. San Borja Sur con Boulevard', addr: 'Módulo de segregación asistida con promotor ambiental acreditado. Horario: 08:00 a 18:00.', mats: 'pet vidrio papel', tags: ['Botellas plásticas', 'Frascos de vidrio', 'Papel bond'], x: 54, y: 42, promoter: 'Luis Alberto Soto (Reg. #SB-108)', capacity: '75% libre' },
            { id: '3', num: '3', name: 'Punto Limpio Estación La Cultura', km: 1.6, status: 'Abierto hoy', badge: 'badge-open', dist: '1.6 km · 19 min a pie · Av. Aviación cdra. 23 (Frente a Biblioteca Nacional)', addr: 'Contenedores selectivos de alta capacidad y buzón especial para pilas usadas. Horario: 07:00 a 20:00.', mats: 'pet metal especial', tags: ['Botellas plásticas', 'Latas de aluminio', 'Pilas y baterías'], x: 74, y: 24, promoter: 'Gerencia de Sostenibilidad San Borja', capacity: '65% libre' },
            { id: '4', num: '4', name: 'Módulo Recicla Polideportivo Limatambo', km: 2.2, status: 'Cierra a las 17:30', badge: 'badge-closing', dist: '2.2 km · 7 min en auto · Av. Malachowsky 560 (Urb. Limatambo)', addr: 'Centro de acopio vecinal para fardos de cartón, plásticos rígidos y vidrio limpio.', mats: 'pet vidrio papel metal', tags: ['Multimaterial', 'Cartón corrugado', 'Vidrio'], x: 66, y: 63, promoter: 'Asociación Recicladores San Borja', capacity: '50% libre' }
        ]
    };

    const districtSelector = document.getElementById('district-selector');
    const mapPointsContainer = document.querySelector('.map-points-list');
    const listPointsContainer = document.querySelector('.list-view-grid');
    const mapMarkersLayer = document.getElementById('map-markers-layer');
    const popupTitle = document.getElementById('popup-point-title');
    const popupDesc = document.getElementById('popup-point-desc');
    const popupLink = document.getElementById('popup-point-link');
    const sortSelector = document.getElementById('sort-selector');

    const updateMapPopup = (st, districtKey) => {
        if (!popupTitle || !popupDesc || !popupLink) return;
        popupTitle.textContent = st.name;
        popupDesc.textContent = `${st.dist} · ${st.status} · Acepta ${st.tags.join(', ')}.`;
        popupLink.href = `point-detail.html?punto=${districtKey}-${st.id}`;
    };

    const districtMapSvg = {
        'san-miguel': '../Images/map-collection-points.svg',
        'miraflores': '../Images/map-miraflores.svg',
        'surco': '../Images/map-surco.svg',
        'magdalena': '../Images/map-magdalena.svg',
        'pueblo-libre': '../Images/map-pueblo-libre.svg',
        'san-borja': '../Images/map-san-borja.svg'
    };

    const renderDistrictStations = (districtKey) => {
        const stations = districtStations[districtKey] || districtStations['san-miguel'];
        const mapBgImg = document.querySelector('.map-image-layer, .map-bg-img');
        if (mapBgImg) {
            mapBgImg.src = districtMapSvg[districtKey] || districtMapSvg['san-miguel'];
        }

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

        bindMarkerAndCardEvents(districtKey, stations);
    };

    const renderListView = (sortMode = 'distancia', filterMat = 'all') => {
        if (!listPointsContainer) return;

        let allPoints = [];
        Object.keys(districtStations).forEach(dKey => {
            districtStations[dKey].forEach(st => {
                allPoints.push({ ...st, districtKey: dKey });
            });
        });

        if (filterMat !== 'all') {
            allPoints = allPoints.filter(p => p.mats.includes(filterMat));
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

        listPointsContainer.innerHTML = allPoints.map((st, idx) => `
            <article class="list-point-item" data-materials="${st.mats}">
                <div class="list-point-info">
                    <div class="point-card-header">
                        <h2 class="point-card-title">${idx + 1}. ${st.name}</h2>
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
                    <a href="point-detail.html?punto=${st.districtKey}-${st.id}" class="btn-primary-action flex center" style="padding: 10px 18px; font-size: 13.5px; text-decoration: none;">
                        <span>Ver ficha y horarios</span>
                    </a>
                    <a href="javascript:void(0)" class="btn-outline-action flex center" style="padding: 10px 18px; font-size: 13.5px; text-decoration: none;">
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
            renderListView(sortSelector.value, curFilter);
        });
    }

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

    if (listPointsContainer) {
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

                if (listPointsContainer && sortSelector) {
                    renderListView(sortSelector.value, filter);
                    return;
                }

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
            },
            'san-borja-1': {
                name: 'Ecopunto Pentagonito · Parque Olímpico',
                entity: 'Municipalidad de San Borja · Programa San Borja Recicla',
                status: 'Abierto 24 horas',
                badgeClass: 'badge-open',
                addr: 'Av. San Borja Norte cdra. 10 (Circuito Deportivo Pentagonito)',
                dist: '0.7 km (9 min a pie)',
                capacity: '85% libre (vaciado diario)',
                promoter: 'Programa San Borja Recicla',
                tip: 'Estación ecológica municipal de acceso continuo. Recibe botellas plásticas limpias, frascos de vidrio, latas y cartón plegado.'
            },
            'san-borja-2': {
                name: 'Estación Ambiental Parque de la Felicidad',
                entity: 'Municipalidad de San Borja',
                status: 'Abierto hoy · 08:00 a 18:00',
                badgeClass: 'badge-open',
                addr: 'Cruce Av. San Borja Sur con Paseo del Bosque',
                dist: '1.1 km (14 min a pie)',
                capacity: '75% libre',
                promoter: 'Luis Alberto Soto (Reg. #SB-108)',
                tip: 'Módulo asistido con orientación vecinal y recepción de botellas plásticas, vidrio y papel bond seco.'
            },
            'san-borja-3': {
                name: 'Punto Limpio Estación La Cultura',
                entity: 'Gerencia de Sostenibilidad de San Borja',
                status: 'Abierto hoy · 07:00 a 20:00',
                badgeClass: 'badge-open',
                addr: 'Av. Aviación cdra. 23 (Explanada Biblioteca Nacional)',
                dist: '1.6 km (19 min a pie)',
                capacity: '65% libre',
                promoter: 'Promotores Ambientales La Cultura',
                tip: 'Ubicado en zona de alto tránsito peatonal. Dispone de contenedor rojo hermético para pilas alcalinas y baterías domésticas.'
            },
            'san-borja-4': {
                name: 'Módulo Recicla Polideportivo Limatambo',
                entity: 'Asociación de Recicladores San Borja Sostenible',
                status: 'Cierra hoy a las 17:30',
                badgeClass: 'badge-closing',
                addr: 'Av. Malachowsky 560 (Urb. Limatambo, San Borja)',
                dist: '2.2 km (7 min en auto)',
                capacity: '50% libre',
                promoter: 'Asociación Recicladores San Borja',
                tip: 'Centro de acopio vecinal con balanza para fardos de cartón corrugado, plásticos rígidos y botellas.'
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
