/* Resaving — Shared Collection Stations Store & Compatibility Helpers */
(function (window) {
    'use strict';

    const OVERRIDES_KEY = 'resaving_station_overrides';

    const MATERIAL_CATALOG = {
        pet: { label: 'Botellas plásticas', desc: 'Envases de bebidas PET limpios, secos, aplastados y sin tapa.' },
        vidrio: { label: 'Vidrio', desc: 'Botellas y frascos enteros, enjuagados, sin tapa metálica ni rajaduras.' },
        papel: { label: 'Cartón y papel', desc: 'Cajas desarmadas, papel bond y cuadernos 100 % secos sin grasa.' },
        metal: { label: 'Latas', desc: 'Latas de aluminio o conserva enjuagadas y compactadas sin filos expuestos.' },
        especial: { label: 'Pilas y especiales', desc: 'Pilas alcalinas y baterías domésticas con polos cubiertos, en buzón rojo.' }
    };

    const DELIVERY_KEY_TO_STATION_MAT = {
        pet: 'pet',
        glass: 'vidrio',
        vidrio: 'vidrio',
        can: 'metal',
        lata: 'metal',
        cardboard: 'papel',
        carton: 'papel',
        pilas: 'especial',
        especial: 'especial'
    };

    const DISTRICT_NAMES = {
        all: 'Todos los distritos',
        'san-miguel': 'San Miguel',
        'pueblo-libre': 'Pueblo Libre',
        magdalena: 'Magdalena del Mar',
        miraflores: 'Miraflores',
        surco: 'Santiago de Surco',
        'san-borja': 'San Borja'
    };

    const BASE_STATIONS = {
        'san-miguel': [
            {
                id: '1', num: '1', name: 'Estación Recicla San Miguel',
                entity: 'Municipalidad Distrital de San Miguel & Programa Recicla Lima',
                km: 0.8, status: 'Abierto hoy · 08:00 a 18:00', badge: 'badge-open',
                hours: '08:00 a 18:00',
                dist: '0.8 km · 11 min a pie · Cruce Av. La Marina con Universitaria',
                addr: 'Cruce Av. La Marina con Av. Universitaria (Frente a Plaza San Miguel)',
                matsArray: ['pet', 'vidrio', 'papel', 'metal'],
                x: 52, y: 44, promoter: 'Edgar Ramos (Reg. #SM-402)',
                capacity: '85% libre (vaciado hoy)',
                tip: 'Este punto recibe botellas plásticas, latas, vidrio y cartón limpios y secos. Cuenta con promotor permanente para verificar condiciones de entrega.'
            },
            {
                id: '2', num: '2', name: 'Punto Limpio Parque Juan Pablo II',
                entity: 'Municipalidad Distrital de San Miguel',
                km: 1.4, status: 'Abierto hoy · 07:00 a 19:00', badge: 'badge-open',
                hours: '07:00 a 19:00',
                dist: '1.4 km · 18 min a pie · Av. Riva Agüero cdra. 8',
                addr: 'Av. Riva Agüero cdra. 8 (Junto a caseta de serenazgo)',
                matsArray: ['pet', 'vidrio', 'papel'],
                x: 32, y: 35, promoter: 'Rosa Quispe (Reg. #SM-205)',
                capacity: '60% libre',
                tip: 'Dispone de tolvas separadas para plásticos, latas y papeles secos. Se ubica frente al área infantil del parque.'
            },
            {
                id: '3', num: '3', name: 'Contenedor Verde Metro La Marina',
                entity: 'Supermercados Metro & Asociación de Recicladores San Miguel',
                km: 1.9, status: 'Abierto 24h', badge: 'badge-open',
                hours: '24 horas',
                dist: '1.9 km · 25 min a pie · Av. La Marina 2500',
                addr: 'Av. La Marina 2500 (Estacionamiento posterior)',
                matsArray: ['pet', 'vidrio'],
                x: 46, y: 56, promoter: 'Caseta de Seguridad Metro',
                capacity: '75% libre',
                tip: 'Acceso vehicular y peatonal las 24 horas para depositar botellas de bebidas y frascos de vidrio.'
            },
            {
                id: '4', num: '4', name: 'Estación Ambiental Plaza Bandera',
                entity: 'Programa Metropolitano de Residuos Especiales',
                km: 2.3, status: 'Cierra a las 17:00', badge: 'badge-closing',
                hours: '08:00 a 17:00',
                dist: '2.3 km · 7 min en auto · Límite con Pueblo Libre',
                addr: 'Plaza de la Bandera s/n (Límite con Pueblo Libre)',
                matsArray: ['pet', 'metal', 'especial'],
                x: 75, y: 30, promoter: 'Carlos Dávila (Reg. #SM-318)',
                capacity: '40% libre',
                tip: 'Punto multimodal de acopio con módulo especial de seguridad para pilas alcalinas y baterías domésticas.'
            }
        ],
        'pueblo-libre': [
            {
                id: '1', num: '1', name: 'Ecopunto Plaza Bolívar',
                entity: 'Municipalidad de Pueblo Libre · Gerencia Ambiental',
                km: 0.6, status: 'Abierto hoy · 08:00 a 17:00', badge: 'badge-open',
                hours: '08:00 a 17:00',
                dist: '0.6 km · 8 min a pie · Jr. Vivanco frente a Municipalidad',
                addr: 'Jr. Vivanco frente al Palacio Municipal de Pueblo Libre',
                matsArray: ['pet', 'vidrio', 'papel', 'metal'],
                x: 50, y: 42, promoter: 'María Elena Fuentes (Reg. #PL-110)',
                capacity: '70% libre',
                tip: 'Centro cívico de acopio para vecinos de Pueblo Libre. Acepta botellas plásticas, latas, vidrio y cartón desarmado.'
            },
            {
                id: '2', num: '2', name: 'Módulo Ambiental Parque El Carmen',
                entity: 'Asociación de Recicladores Pueblo Libre Sostenible',
                km: 1.1, status: 'Abierto hoy · 09:00 a 18:00', badge: 'badge-open',
                hours: '09:00 a 18:00',
                dist: '1.1 km · 14 min a pie · Av. Sucre cdra. 12',
                addr: 'Av. Sucre cdra. 12 (Interior parque El Carmen)',
                matsArray: ['pet', 'papel', 'metal'],
                x: 65, y: 32, promoter: 'Juan Paredes (Reg. #PL-142)',
                capacity: '50% libre',
                tip: 'Atención con pesaje in situ para lotes medianos de cartón, papel bond y plásticos limpios.'
            },
            {
                id: '3', num: '3', name: 'Punto Verde Parque Candamo',
                entity: 'Municipalidad de Pueblo Libre',
                km: 1.8, status: 'Abierto hoy · 07:00 a 19:00', badge: 'badge-open',
                hours: '07:00 a 19:00',
                dist: '1.8 km · 22 min a pie · Av. Del Río cuadra 3',
                addr: 'Av. Del Río cuadra 3 (Cerca a Av. Brasil)',
                matsArray: ['pet', 'vidrio', 'especial'],
                x: 35, y: 58, promoter: 'Sofía Delgado (Reg. #PL-203)',
                capacity: '80% libre',
                tip: 'Contenedores verdes de boca ancha y tacho rojo seguro para pilas alcalinas.'
            }
        ],
        miraflores: [
            {
                id: '1', num: '1', name: 'Punto Limpio Parque Kennedy',
                entity: 'Municipalidad de Miraflores · Programa Basura Cero',
                km: 0.5, status: 'Abierto 24h', badge: 'badge-open',
                hours: '24 horas',
                dist: '0.5 km · 7 min a pie · Parque Central de Miraflores (Diagonal)',
                addr: 'Parque Central de Miraflores s/n (Paseo Diagonal)',
                matsArray: ['pet', 'vidrio', 'papel', 'metal'],
                x: 52, y: 45, promoter: 'Equipo Basura Cero Miraflores',
                capacity: '90% libre (vaciado permanente)',
                tip: 'Estación soterrada de alta tecnología para envases limpios, botellas de agua, vidrio y latas de aluminio.'
            },
            {
                id: '2', num: '2', name: 'Estación Ecológica Reducto',
                entity: 'Municipalidad de Miraflores & Asociación de Recicladores',
                km: 1.2, status: 'Abierto hoy · 08:30 a 18:00', badge: 'badge-open',
                hours: '08:30 a 18:00',
                dist: '1.2 km · 15 min a pie · Parque Reducto N° 2 (Av. Benavides)',
                addr: 'Parque Reducto N° 2 (Ingreso por Av. Alfredo Benavides)',
                matsArray: ['pet', 'papel', 'metal', 'especial'],
                x: 40, y: 62, promoter: 'Asociación de Recicladores Miraflores',
                capacity: '65% libre',
                tip: 'Recepción de fardos de cartón, plásticos y módulo de residuos de aparatos eléctricos y electrónicos en desuso.'
            },
            {
                id: '3', num: '3', name: 'Ecopunto Malecón Cisneros',
                entity: 'Municipalidad de Miraflores',
                km: 1.6, status: 'Abierto hoy · 07:00 a 19:00', badge: 'badge-open',
                hours: '07:00 a 19:00',
                dist: '1.6 km · 20 min a pie · Malecón Cisneros cdra. 5',
                addr: 'Malecón Cisneros cdra. 5 (Frente al Parque del Faro)',
                matsArray: ['pet', 'vidrio'],
                x: 24, y: 34, promoter: 'Serenazgo Miraflores Costa',
                capacity: '80% libre',
                tip: 'Tolvas preparadas para resistir brisa marina, destinadas a botellas para bebidas y frascos de vidrio.'
            },
            {
                id: '4', num: '4', name: 'Centro de Acopio Estadio Manuel Bonilla',
                entity: 'Subgerencia de Limpieza Pública y Medio Ambiente',
                km: 2.1, status: 'Abierto hoy · 08:00 a 17:00', badge: 'badge-open',
                hours: '08:00 a 17:00',
                dist: '2.1 km · 8 min en auto · Av. Del Ejército cdra. 13',
                addr: 'Av. Del Ejército cdra. 13 (Ingreso vehicular)',
                matsArray: ['pet', 'vidrio', 'papel', 'metal', 'especial'],
                x: 68, y: 24, promoter: 'Personal Operativo Bonilla',
                capacity: '55% libre',
                tip: 'Centro integral con pesaje industrial para vecinos y empresas. Recibe multimaterial, aceite usado y pilas.'
            }
        ],
        magdalena: [
            {
                id: '1', num: '1', name: 'Estación Recicla Plaza Túpac Amaru',
                entity: 'Municipalidad de Magdalena del Mar & Asociación Local',
                km: 0.7, status: 'Abierto hoy · 08:00 a 18:00', badge: 'badge-open',
                hours: '08:00 a 18:00',
                dist: '0.7 km · 9 min a pie · Jr. Bolognesi cdra. 3',
                addr: 'Jr. Bolognesi cdra. 3 (Plaza Central de Magdalena)',
                matsArray: ['pet', 'vidrio', 'papel', 'metal'],
                x: 46, y: 38, promoter: 'Asociación Recicla Magdalena',
                capacity: '75% libre',
                tip: 'Punto neurálgico del distrito. Tolvas para botellas de plástico, latas de conserva, frascos y cartón limpio.'
            },
            {
                id: '2', num: '2', name: 'Ecopunto Malecón Castagnola',
                entity: 'Municipalidad de Magdalena del Mar',
                km: 1.3, status: 'Abierto hoy · 07:00 a 18:00', badge: 'badge-open',
                hours: '07:00 a 18:00',
                dist: '1.3 km · 16 min a pie · Jr. Diego Ferré cruce con Malecón',
                addr: 'Jr. Diego Ferré cruce con Malecón Castagnola',
                matsArray: ['pet', 'vidrio'],
                x: 30, y: 58, promoter: 'Serenazgo Costanera',
                capacity: '85% libre',
                tip: 'Ubicado en el circuito costero de Magdalena para deportistas y familias. Ideal para botellas de agua y bebidas.'
            },
            {
                id: '3', num: '3', name: 'Punto Limpio Mercado Magdalena',
                entity: 'Comité Ambiental Mercado Magdalena',
                km: 1.5, status: 'Cierra a las 16:00', badge: 'badge-closing',
                hours: '07:00 a 16:00',
                dist: '1.5 km · 19 min a pie · Jr. Leoncio Prado cdra. 7',
                addr: 'Jr. Leoncio Prado cdra. 7 (Área de carga)',
                matsArray: ['pet', 'papel'],
                x: 62, y: 30, promoter: 'Comité Vecinal Mercado',
                capacity: '50% libre',
                tip: 'Recepción especializada de cartón seco de embalaje y envases plásticos de comerciantes y vecinos.'
            }
        ],
        surco: [
            {
                id: '1', num: '1', name: 'Planta de Reciclaje EMUSAP Surco',
                entity: 'Empresa Municipal Santiago de Surco (EMUSAP)',
                km: 0.9, status: 'Abierto hoy · 08:00 a 17:00', badge: 'badge-open',
                hours: '08:00 a 17:00',
                dist: '0.9 km · 12 min a pie · Jr. Combate de Angamos s/n',
                addr: 'Jr. Combate de Angamos s/n (Cerca a Av. Tomás Marsano)',
                matsArray: ['pet', 'vidrio', 'papel', 'metal', 'especial'],
                x: 52, y: 44, promoter: 'Programa Surco Recicla (EMUSAP)',
                capacity: '90% libre (planta procesadora)',
                tip: 'La planta de reciclaje modelo del distrito. Recibe todos los materiales aprovechables y especiales debidamente acondicionados.'
            },
            {
                id: '2', num: '2', name: 'Ecopunto Parque de la Amistad',
                entity: 'Municipalidad de Santiago de Surco',
                km: 1.4, status: 'Abierto hoy · 08:00 a 19:00', badge: 'badge-open',
                hours: '08:00 a 19:00',
                dist: '1.4 km · 18 min a pie · Av. Caminos del Inca cruce con Benavides',
                addr: 'Av. Caminos del Inca cruce con Av. Benavides',
                matsArray: ['pet', 'vidrio', 'papel'],
                x: 42, y: 30, promoter: 'Promotores Amistad Verde',
                capacity: '70% libre',
                tip: 'Estación accesible con asistencia ciudadana. Depósito de envases plásticos, frascos y cartón corrugado.'
            },
            {
                id: '3', num: '3', name: 'Módulo Verde Jockey Plaza',
                entity: 'Jockey Plaza Shopping Center & Surco Recicla',
                km: 2.0, status: 'Abierto hoy · 09:00 a 21:00', badge: 'badge-open',
                hours: '09:00 a 21:00',
                dist: '2.0 km · 6 min en auto · Av. Javier Prado Este 4200',
                addr: 'Av. Javier Prado Este 4200 (Ingreso peatonal Puerta 1)',
                matsArray: ['pet', 'vidrio', 'metal'],
                x: 72, y: 22, promoter: 'Sostenibilidad Jockey',
                capacity: '80% libre',
                tip: 'Horario extendido ideal para compras y visitas. Dispone de bocas para botellas de plástico y latas de bebidas.'
            },
            {
                id: '4', num: '4', name: 'Punto de Acopio Parque Voces por el Clima',
                entity: 'Centro de Educación Ambiental Surco',
                km: 2.8, status: 'Abierto hoy · 09:00 a 17:00', badge: 'badge-open',
                hours: '09:00 a 17:00',
                dist: '2.8 km · 9 min en auto · Av. Los Castillos s/n',
                addr: 'Av. Los Castillos s/n (Urb. Los Próceres)',
                matsArray: ['pet', 'papel', 'metal', 'especial'],
                x: 58, y: 64, promoter: 'Centro Educación Ambiental Surco',
                capacity: '60% libre',
                tip: 'Parque temático ecológico. Acepta ecoladrillos, multimaterial aprovechable y residuos de pilas.'
            }
        ],
        'san-borja': [
            {
                id: '1', num: '1', name: 'Ecopunto Pentagonito · Parque Olímpico',
                entity: 'Municipalidad de San Borja · Programa San Borja Recicla',
                km: 0.7, status: 'Abierto 24h', badge: 'badge-open',
                hours: '24 horas',
                dist: '0.7 km · 9 min a pie · Av. San Borja Norte cdra. 10',
                addr: 'Av. San Borja Norte cdra. 10 (Circuito Deportivo Pentagonito)',
                matsArray: ['pet', 'vidrio', 'papel', 'metal'],
                x: 35, y: 32, promoter: 'Programa San Borja Recicla',
                capacity: '85% libre (vaciado diario)',
                tip: 'Estación ecológica municipal de acceso continuo. Recibe botellas plásticas limpias, frascos de vidrio, latas y cartón plegado.'
            },
            {
                id: '2', num: '2', name: 'Estación Ambiental Parque de la Felicidad',
                entity: 'Municipalidad de San Borja',
                km: 1.1, status: 'Abierto hoy · 08:00 a 18:00', badge: 'badge-open',
                hours: '08:00 a 18:00',
                dist: '1.1 km · 14 min a pie · Cruce Av. San Borja Sur con Boulevard',
                addr: 'Cruce Av. San Borja Sur con Paseo del Bosque',
                matsArray: ['pet', 'vidrio', 'papel'],
                x: 54, y: 42, promoter: 'Luis Alberto Soto (Reg. #SB-108)',
                capacity: '75% libre',
                tip: 'Módulo asistido con orientación vecinal y recepción de botellas plásticas, vidrio y papel bond seco.'
            },
            {
                id: '3', num: '3', name: 'Punto Limpio Estación La Cultura',
                entity: 'Gerencia de Sostenibilidad de San Borja',
                km: 1.6, status: 'Abierto hoy · 07:00 a 20:00', badge: 'badge-open',
                hours: '07:00 a 20:00',
                dist: '1.6 km · 19 min a pie · Av. Aviación cdra. 23 (Biblioteca Nacional)',
                addr: 'Av. Aviación cdra. 23 (Explanada Biblioteca Nacional)',
                matsArray: ['pet', 'metal', 'especial'],
                x: 74, y: 24, promoter: 'Promotores Ambientales La Cultura',
                capacity: '65% libre',
                tip: 'Ubicado en zona de alto tránsito peatonal. Dispone de contenedor rojo hermético para pilas alcalinas y baterías domésticas.'
            },
            {
                id: '4', num: '4', name: 'Módulo Recicla Polideportivo Limatambo',
                entity: 'Asociación de Recicladores San Borja Sostenible',
                km: 2.2, status: 'Cierra a las 17:30', badge: 'badge-closing',
                hours: '08:00 a 17:30',
                dist: '2.2 km · 7 min en auto · Av. Malachowsky 560 (Urb. Limatambo)',
                addr: 'Av. Malachowsky 560 (Urb. Limatambo, San Borja)',
                matsArray: ['pet', 'vidrio', 'papel', 'metal'],
                x: 66, y: 63, promoter: 'Asociación Recicladores San Borja',
                capacity: '50% libre',
                tip: 'Centro de acopio vecinal con balanza para fardos de cartón corrugado, plásticos rígidos y botellas.'
            }
        ]
    };

    function loadOverrides() {
        try {
            const raw = localStorage.getItem(OVERRIDES_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    function applyOverride(districtKey, st) {
        const code = `${districtKey}-${st.id}`;
        const overrides = loadOverrides();
        const ov = overrides[code];
        const baseMats = Array.isArray(st.matsArray) ? [...st.matsArray] : [];
        const merged = {
            ...st,
            code,
            districtKey,
            districtName: DISTRICT_NAMES[districtKey] || districtKey,
            matsArray: ov && Array.isArray(ov.matsArray) && ov.matsArray.length > 0 ? ov.matsArray : baseMats,
            hours: ov && ov.hours ? ov.hours : st.hours,
            addr: ov && ov.addr ? ov.addr : st.addr,
            promoter: ov && ov.promoter ? ov.promoter : st.promoter,
            capacity: ov && ov.capacity ? ov.capacity : st.capacity,
            conditionNote: ov && ov.conditionNote ? ov.conditionNote : '',
            closedTemporarily: Boolean(ov && ov.closedTemporarily),
            closureReason: (ov && ov.closureReason) || '',
            reopenDate: (ov && ov.reopenDate) || '',
            updatedAt: (ov && ov.updatedAt) || '05/10/2026',
            isModified: Boolean(ov)
        };

        merged.mats = merged.matsArray.join(' ');
        merged.tags = merged.matsArray.map(m => (MATERIAL_CATALOG[m] ? MATERIAL_CATALOG[m].label : m));
        if (merged.conditionNote) {
            merged.tip = `${merged.conditionNote} (${merged.tip})`;
        }
        if (merged.closedTemporarily) {
            const reopenTxt = merged.reopenDate ? ` · Reapertura: ${merged.reopenDate}` : '';
            merged.status = `Cerrado temporalmente${reopenTxt}`;
            merged.badge = 'badge-closed';
            merged.badgeClass = 'badge-closed';
        } else {
            if (ov && ov.hours) {
                merged.status = `Abierto hoy · ${merged.hours}`;
                merged.badge = 'badge-open';
            }
            merged.badgeClass = merged.badge;
        }
        return merged;
    }

    function getStationsForDistrict(districtKey) {
        if (!districtKey || districtKey === 'all') {
            return getAllStations();
        }
        const list = BASE_STATIONS[districtKey] || BASE_STATIONS['san-miguel'];
        return list.map(st => applyOverride(districtKey, st));
    }

    function getAllStations() {
        const result = [];
        Object.keys(BASE_STATIONS).forEach(dKey => {
            BASE_STATIONS[dKey].forEach(st => result.push(applyOverride(dKey, st)));
        });
        return result;
    }

    function getStationByCode(code) {
        const all = getAllStations();
        return all.find(s => s.code === code) || all[0];
    }

    function saveStationOverride(code, patch) {
        const overrides = loadOverrides();
        overrides[code] = {
            ...(overrides[code] || {}),
            ...patch,
            updatedAt: new Date().toLocaleDateString('es-PE')
        };
        localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
        return getStationByCode(code);
    }

    function resetStationOverride(code) {
        const overrides = loadOverrides();
        if (code) {
            delete overrides[code];
        } else {
            localStorage.removeItem(OVERRIDES_KEY);
            return;
        }
        localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
    }

    function checkLotCompatibility(lotItems, districtKey) {
        const reqSet = new Set();
        (lotItems || []).forEach(it => {
            const mapped = DELIVERY_KEY_TO_STATION_MAT[it.key] || 'pet';
            reqSet.add(mapped);
        });
        const requiredMats = Array.from(reqSet);

        const matchesAll = (station) =>
            !station.closedTemporarily && requiredMats.every(m => station.matsArray.includes(m));

        const inDistrict = getStationsForDistrict(districtKey || 'san-miguel');
        const compatibleStations = inDistrict.filter(matchesAll);

        let nearestAlternative = null;
        if (compatibleStations.length === 0 && requiredMats.length > 0) {
            const allOpenCompatible = getAllStations().filter(matchesAll).sort((a, b) => a.km - b.km);
            nearestAlternative = allOpenCompatible[0] || null;
        }

        return {
            requiredMats,
            districtStations: inDistrict,
            compatibleStations,
            nearestAlternative
        };
    }

    window.ResavingStations = {
        DISTRICT_NAMES,
        MATERIAL_CATALOG,
        DELIVERY_KEY_TO_STATION_MAT,
        getStationsForDistrict,
        getAllStations,
        getStationByCode,
        saveStationOverride,
        resetStationOverride,
        checkLotCompatibility
    };
})(window);
