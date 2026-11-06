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
    const materialChoiceCards = document.querySelectorAll('.material-choice-card');
    const qtyInput = document.getElementById('qty-bottles');
    const weightLabel = document.getElementById('weight-estimation-label');
    const btnMinus = document.getElementById('btn-qty-minus');
    const btnPlus = document.getElementById('btn-qty-plus');
    const conditionCheckboxes = document.querySelectorAll('input[id^="check-cond-"]');

    const materialSpecs = {
        pet: {
            density: 0.03,
            unitLabel: 'plástico PET (botellas de 500 ml)',
            checks: [
                'Los envases fueron enjuagados rápidamente y están completamente secos (sin residuos líquidos).',
                'Se desenroscaron las tapas plásticas (polipropileno #5) y se separaron del cuerpo PET.',
                'Las botellas fueron aplastadas desde la base para reducir su volumen de transporte.'
            ]
        },
        glass: {
            density: 0.25,
            unitLabel: 'vidrio aprovechable (frascos de conserva)',
            checks: [
                'Los frascos están enteros y limpios, sin restos de salsas, aderezos o alimentos.',
                'Se retiraron las tapas de hojalata o corchos y se colocaron por separado.',
                'Ningún frasco presenta roturas, fisuras ni astillas cortantes que arriesguen al reciclador.'
            ]
        },
        can: {
            density: 0.02,
            unitLabel: 'aluminio y latas de conserva',
            checks: [
                'Las latas de bebida y conserva se vaciaron y enjuagaron para no atraer insectos.',
                'Las anillas abre-fácil quedaron dobladas hacia el interior sin desprenderse.',
                'Las latas fueron suavemente comprimidas de costado sin dejar bordes filosos.'
            ]
        },
        cardboard: {
            density: 0.15,
            unitLabel: 'cartón corrugado y Tetra Pak',
            checks: [
                'Las cajas están 100% secas y libres de restos de grasa de comida o pizza.',
                'Se despegaron las cintas plásticas de embalaje y grapas metálicas gruesas.',
                'Las cajas fueron desarmadas y aplanadas en fardos ordenados.'
            ]
        }
    };

    if (materialRadios.length > 0) {
        const updateMaterialSelection = (selectedVal) => {
            materialChoiceCards.forEach(card => {
                const radio = card.querySelector('input[type="radio"]');
                if (radio) {
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

    const cond1 = document.getElementById('check-cond-1');
    const cond2 = document.getElementById('check-cond-2');
    const cond3 = document.getElementById('check-cond-3');
    const label2 = document.getElementById('label-cond-2');
    const label3 = document.getElementById('label-cond-3');
    const btnSubmitDelivery = document.getElementById('btn-submit-delivery');

    if (cond1 && cond2 && cond3) {
        const updateDeliveryCascade = () => {
            if (!cond1.checked) {
                cond2.checked = false;
                cond2.disabled = true;
                if (label2) { label2.style.opacity = '0.55'; label2.style.cursor = 'not-allowed'; }
                cond3.checked = false;
                cond3.disabled = true;
                if (label3) { label3.style.opacity = '0.55'; label3.style.cursor = 'not-allowed'; }
            } else {
                cond2.disabled = false;
                if (label2) { label2.style.opacity = '1'; label2.style.cursor = 'pointer'; }
                if (!cond2.checked) {
                    cond3.checked = false;
                    cond3.disabled = true;
                    if (label3) { label3.style.opacity = '0.55'; label3.style.cursor = 'not-allowed'; }
                } else {
                    cond3.disabled = false;
                    if (label3) { label3.style.opacity = '1'; label3.style.cursor = 'pointer'; }
                }
            }

            const allChecked = cond1.checked && cond2.checked && cond3.checked;
            if (btnSubmitDelivery) {
                if (allChecked) {
                    btnSubmitDelivery.disabled = false;
                    btnSubmitDelivery.style.backgroundColor = '#0B4A30';
                    btnSubmitDelivery.style.opacity = '1';
                    btnSubmitDelivery.style.cursor = 'pointer';
                } else {
                    btnSubmitDelivery.disabled = true;
                    btnSubmitDelivery.style.backgroundColor = '#6C8A79';
                    btnSubmitDelivery.style.opacity = '0.65';
                    btnSubmitDelivery.style.cursor = 'not-allowed';
                }
            }
        };

        cond1.addEventListener('change', updateDeliveryCascade);
        cond2.addEventListener('change', updateDeliveryCascade);
        cond3.addEventListener('change', updateDeliveryCascade);
        updateDeliveryCascade();
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
            crumb: 'Botellas plásticas (PET #1)',
            category: 'Aprovechable',
            bannerStatus: 'Condición verificada: Tacho Verde (Aprovechable)',
            bannerDesc: 'Clasificación oficial según la Norma Técnica Peruana NTP 900.058:2019 de segregación de residuos.',
            bannerIcon: '../Images/icon-check.svg',
            bannerColor: '#EBF7F0',
            bannerBorder: '#B8DEC9',
            attrs: [
                { label: 'Material', val: 'Plástico PET #1 (Tereftalato de polietileno)' },
                { label: 'Apariencia', val: 'Transparente o cristalino' },
                { label: 'Peso promedio', val: 'Ligero (~28 g por envase de 500 ml)' },
                { label: 'Recuperación', val: 'Alta (100% mecánicamente reciclable)' },
                { label: 'Uso habitual', val: 'Bebidas hidratantes, aguas y gaseosas' }
            ],
            parts: [
                { name: 'Cuerpo de la botella', tag: 'Aprovechable', mat: 'Tereftalato de polietileno (PET #1)', desc: 'Componente de mayor valor comercial. Se tritura en hojuelas limpias para producir nuevas botellas y fibras textiles.' },
                { name: 'Tapa rosca', tag: 'Separar', mat: 'Polipropileno rígido (PP #5)', desc: 'Desenroscar y separar. Se destina a campañas solidarias de tapitas o molinos de inyección plástica.' },
                { name: 'Etiqueta envolvente', tag: 'Opcional', mat: 'Film termoencogible (PVC / BOPP)', desc: 'Retirar si cuenta con abre-fácil punteado. Si no, las plantas de lavado la separan por flotación.' }
            ],
            partsDesc: 'Cada elemento de la botella plástica tiene un tratamiento específico de reciclaje. Revisa cómo separar cada parte antes de entregarla.',
            destDesc: 'Canales formales y recomendados para entregar botellas de plástico PET en Lima Metropolitana.',
            ctaTitle: '¿Listo para acondicionar tu botella PET?',
            ctaDesc: 'Sigue la guía rápida de preparación de 4 pasos en orden de cascada para asegurarte de que tu residuo sea recibido sin observaciones.',
            ctaPrepText: 'Ir a Guía de preparación',
            faq: [
                { q: '¿Por qué es necesario vaciar y escurrir la botella antes de reciclarla?', a: 'Los líquidos residuales fermentan, producen malos olores y humedecen papeles y cartones cercanos en el tacho verde, inutilizando todo el lote reciclable.' },
                { q: '¿Es obligatorio aplastar o compactar la botella?', a: 'Sí, reduce el volumen hasta en un 70%, permitiendo almacenar más residuos en casa y facilitando que el reciclador de base traslade el triple de peso.' },
                { q: '¿Qué pasa si la botella contenía aceite comestible?', a: 'Las botellas con aceite residual NO deben mezclarse con las PET regulares. Requieren lavado con agua caliente y detergente o entregarse en centros de acopio de aceite usado.' }
            ]
        },
        vidrio: {
            title: 'Botellas y frascos de vidrio (100% aprovechables)',
            sub: 'El vidrio es un recurso noble infinitamente reciclable que nunca pierde calidad ni pureza. Debe entregarse entero y limpio.',
            img: '../Images/delivery-glass.png',
            badge: 'VIDRIO',
            crumb: 'Frascos y botellas de vidrio',
            category: 'Aprovechable',
            bannerStatus: 'Condición verificada: Tacho Verde (Aprovechable)',
            bannerDesc: 'El vidrio se funde al 100% en hornos de reciclaje para producir nuevos frascos y botellas sin generar merma.',
            bannerIcon: '../Images/icon-check.svg',
            bannerColor: '#EBF7F0',
            bannerBorder: '#B8DEC9',
            attrs: [
                { label: 'Material', val: 'Vidrio sodocálcico silíceo' },
                { label: 'Apariencia', val: 'Transparente, verde o ámbar' },
                { label: 'Peso promedio', val: 'Pesado (~250 g a 450 g por envase)' },
                { label: 'Recuperación', val: 'Infinita (100% reciclable en ciclo cerrado)' },
                { label: 'Uso habitual', val: 'Conservas de mermelada, salsas, café y bebidas' }
            ],
            parts: [
                { name: 'Cuerpo del envase de vidrio', tag: 'Aprovechable', mat: 'Sílice fundida (SiO2)', desc: 'Debe entregarse ENTERO. Nunca rompas los frascos porque los fragmentos afilados causan heridas graves a los recicladores.' },
                { name: 'Tapa metálica de conserva', tag: 'Separar', mat: 'Hojalata con barniz alimentario', desc: 'Desenroscar la tapa y depositarla separada o en el contenedor de metales.' },
                { name: 'Etiqueta adhesiva de papel', tag: 'Opcional', mat: 'Papel con adhesivo base agua', desc: 'No es indispensable retirarla; los hornos de fundición a más de 1500 °C incineran el papel sin dejar rastros.' }
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
            title: 'Cajas de cartón corrugado y empaques Tetra Pak',
            sub: 'Las fibras de celulosa pueden reciclarse hasta 7 veces. Deben mantenerse completamente secas y dobladas para optimizar el transporte.',
            img: '../Images/delivery-cardboard.png',
            badge: 'CARTÓN / PAPEL',
            crumb: 'Cajas de cartón y Tetra Pak',
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
                { name: 'Cinta plástica de embalaje', tag: 'Separar', mat: 'Polipropileno adhesivo', desc: 'Desprende las tiras de cinta plástica gruesa para evitar que se traben en los pulpers industriales.' },
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
            badge: 'ALUMINIO / LATA',
            crumb: 'Latas de aluminio',
            category: 'Aprovechable',
            bannerStatus: 'Condición verificada: Tacho Verde (Aprovechable)',
            bannerDesc: 'Metal de altísimo valor de rescate comercial para el sustento de los recicladores de base.',
            bannerIcon: '../Images/icon-check.svg',
            bannerColor: '#EBF7F0',
            bannerBorder: '#B8DEC9',
            attrs: [
                { label: 'Material', val: 'Aleación de aluminio 3004 / Hojalata acerada' },
                { label: 'Apariencia', val: 'Metálico cilíndrico brillante' },
                { label: 'Peso promedio', val: 'Ultraligero (~15 g por lata de 355 ml)' },
                { label: 'Recuperación', val: 'Infinita (100% fundible sin pérdida de propiedades)' },
                { label: 'Uso habitual', val: 'Gaseosas, cervezas, leche evaporada y conservas' }
            ],
            parts: [
                { name: 'Cuerpo de la lata', tag: 'Aprovechable', mat: 'Aluminio o acero estañado', desc: 'Enjuagar con un chorrito de agua para retirar restos azucarados o salmuera y comprimir de costado.' },
                { name: 'Anilla abre-fácil', tag: 'Aprovechable', mat: 'Aluminio grado 5182', desc: 'No la arranques ni la arrojes al suelo; déjala empujada hacia el interior del envase.' },
                { name: 'Tapa suelta de conserva', tag: 'Aprovechable', mat: 'Hojalata plana', desc: 'Introdúcela dentro de la lata y aprieta el borde para evitar bordes cortantes que puedan herir.' }
            ],
            partsDesc: 'Las latas están hechas de metales nobles fácilmente separables por corrientes de Foucault o imanes.',
            destDesc: 'Canales recomendados para entregar metales y latas comprimidas en Lima Metropolitana.',
            ctaTitle: '¿Listo para acondicionar tus latas de aluminio?',
            ctaDesc: 'Sigue la guía rápida de preparación de 4 pasos en orden de cascada para enjuagar y compactar metales sin peligro.',
            ctaPrepText: 'Ir a Guía de preparación de latas',
            faq: [
                { q: '¿Las latas de atún en aceite se reciclan?', a: 'Sí, pero debes escurrir el aceite residual y enjuagar con una gota de detergente para evitar olores y fauna nociva en acopio.' },
                { q: '¿Se aceptan latas de aerosol presurizado?', a: 'Las latas de pintura o insecticida presurizado son residuos peligrosos. Solo se aceptan perforadas y despresurizadas en puntos especiales.' }
            ]
        },
        metal: null,
        pead: {
            title: 'Envases rígidos de detergente, champú y yogur (PEAD #2)',
            sub: 'El polietileno de alta densidad es un plástico rígido muy duradero. Se recicla para fabricar tuberías de riego, baldes y nuevas galoneras.',
            img: '../Images/gallery-plastic-bottle.png',
            badge: 'PEAD #2',
            crumb: 'Envases PEAD #2',
            category: 'Aprovechable',
            bannerStatus: 'Condición verificada: Tacho Verde (Aprovechable)',
            bannerDesc: 'Plástico de gran demanda industrial. Requiere enjuague previo para evitar contaminación química.',
            bannerIcon: '../Images/icon-check.svg',
            bannerColor: '#EBF7F0',
            bannerBorder: '#B8DEC9',
            attrs: [
                { label: 'Material', val: 'Polietileno de alta densidad (PEAD / HDPE #2)' },
                { label: 'Apariencia', val: 'Opaco, coloreado o blanco mate' },
                { label: 'Peso promedio', val: 'Medio (~45 g a 90 g por botella)' },
                { label: 'Recuperación', val: 'Alta (granzas para extrusión e inyección)' },
                { label: 'Uso habitual', val: 'Galoneras de lejía, botellas de champú y yogur' }
            ],
            parts: [
                { name: 'Cuerpo de la galonera o envase', tag: 'Aprovechable', mat: 'Polietileno de alta densidad', desc: 'Enjuagar dos veces con agua tibia para retirar residuos viscosos de jabón o detergente.' },
                { name: 'Bomba dispensadora', tag: 'Separar', mat: 'Multimaterial con resorte de acero', desc: 'Desenroscar y retirar el dosificador porque el resorte de metal daña los molinos de plástico.' },
                { name: 'Tapa rosca simple', tag: 'Aprovechable', mat: 'Polipropileno o PEAD', desc: 'Se enrosca ligeramente una vez seco el interior del envase.' }
            ],
            partsDesc: 'Los envases PEAD cuentan con componentes plásticos rígidos y bombas mecánicas que deben segregarse.',
            destDesc: 'Puntos limpios y tolvas municipales para envases de polietileno de alta densidad.',
            ctaTitle: '¿Listo para acondicionar tus envases PEAD #2?',
            ctaDesc: 'Sigue la guía rápida de preparación de 4 pasos en orden de cascada para enjuagar y retirar dispensadores.',
            ctaPrepText: 'Ir a Guía de preparación PEAD',
            faq: [
                { q: '¿Puedo entregar botellas con restos de lejía?', a: 'Sí, siempre que estén completamente enjuagadas con agua para que no desprendan vapores ni irriten la piel de los recicladores.' }
            ]
        },
        pilas: {
            title: 'Pilas alcalinas y baterías domésticas (Residuo Peligroso / Especial)',
            sub: 'Las pilas contienen metales pesados (zinc, manganeso, cadmio). ¡NUNCA las arrojes al tacho verde ni negro! Requieren entrega en contenedores rojos o ecopuntos especiales.',
            img: '../Images/category-hazardous.png',
            badge: 'PELIGROSO',
            crumb: 'Pilas y baterías alcalinas',
            category: 'Peligrosos · Punto Especial',
            bannerStatus: '¡Atención de Seguridad: Tacho Rojo o Punto Especial!',
            bannerDesc: 'Prohibido mezclar con residuos aprovechables comunes. Debe depositarse en contenedores rotulados para pilas en supermercados o municipios.',
            bannerIcon: '../Images/trust-alternative.svg',
            bannerColor: '#FDE8E8',
            bannerBorder: '#F87171',
            attrs: [
                { label: 'Material', val: 'Zinc, dióxido de manganeso y electrólito alcalino' },
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
                { q: '¿Qué hago si una pila sulfató o botó polvo blanco?', a: 'Tómala con una bolsa plástica sin tocar con la piel desnuda. Introdúcela en una botella PET seca con tapa rosca y llévala al punto de pilas.' },
                { q: '¿Por qué no va al tacho verde?', a: 'Porque el tacho verde es para reciclaje manual de envases limpios. El ácido de una pila sulfatada inutiliza toneladas de material reciclable.' }
            ]
        },
        bolsa: {
            title: 'Bolsas plásticas de un solo uso y láminas flexibles (PEBD #4)',
            sub: 'Las bolsas plásticas delgadas no se procesan en tachos verdes comunes de Lima porque traban los molinos trituradores. Requieren ecopuntos de film específico.',
            img: '../Images/category-sanitary.png',
            badge: 'PEBD #4',
            crumb: 'Bolsas plásticas de compras',
            category: 'Punto Específico',
            bannerStatus: 'Condición especial: No colocar en el tacho verde común',
            bannerDesc: 'Entregar únicamente en campañas municipales de ecoladrillos o módulos específicos para film flexible.',
            bannerIcon: '../Images/trust-alternative.svg',
            bannerColor: '#FEF3C7',
            bannerBorder: '#FCD34D',
            attrs: [
                { label: 'Material', val: 'Polietileno de baja densidad (PEBD / LDPE #4)' },
                { label: 'Apariencia', val: 'Película flexible transparente o impresa' },
                { label: 'Peso promedio', val: 'Ultraligero (~6 g por bolsa de mercado)' },
                { label: 'Recuperación', val: 'Especializada (aglomeración y peletizado térmico)' },
                { label: 'Uso habitual', val: 'Bolsas de compras, fundas de pan y film de embalaje' }
            ],
            parts: [
                { name: 'Cuerpo de la bolsa', tag: 'Especial', mat: 'Film polimérico de baja densidad', desc: 'Limpiar de restos de comida y comprimir dentro de una botella plástica si se elaboran ecoladrillos.' }
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
                banner.style.backgroundColor = data.bannerColor || '#EBF7F0';
                banner.style.borderColor = data.bannerBorder || '#B8DEC9';
                if (bannerTitle) bannerTitle.textContent = data.bannerStatus;
                if (bannerDesc) bannerDesc.textContent = data.bannerDesc;
                if (bannerIcon && data.bannerIcon) bannerIcon.src = data.bannerIcon;
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
            if (partsTitle && data.badge) {
                partsTitle.textContent = `¿De qué componentes está formado (${data.badge})?`;
            }
            if (partsDesc && data.partsDesc) {
                partsDesc.textContent = data.partsDesc;
            }
            if (partsGrid && data.parts) {
                partsGrid.innerHTML = data.parts.map(part => {
                    let tagClass = 'tag-recycle';
                    if (part.tag === 'Separar' || part.tag === 'Aislar') tagClass = 'tag-separate';
                    else if (part.tag === 'Opcional' || part.tag === 'Especial') tagClass = 'tag-optional';
                    else if (part.tag === 'Peligroso' || part.tag === 'Desechar') tagClass = 'tag-separate';
                    return `
                        <article class="part-card">
                            <div class="part-header">
                                <h3 class="part-name">${part.name}</h3>
                                <span class="part-tag ${tagClass}">${part.tag}</span>
                            </div>
                            <p class="part-material">${part.mat}</p>
                            <p class="part-desc">${part.desc}</p>
                        </article>
                    `;
                }).join('');
            }

            const destDesc = document.getElementById('detail-dest-desc');
            if (destDesc && data.destDesc) {
                destDesc.textContent = data.destDesc;
            }

            const faqAccordion = document.getElementById('detail-faq-accordion');
            if (faqAccordion && data.faq) {
                faqAccordion.innerHTML = data.faq.map((item, idx) => `
                    <details class="glossary-item"${idx === 0 ? ' open' : ''}>
                        <summary class="glossary-question flex Ycenter">
                            <span>${item.q}</span>
                            <img src="../Images/icon-chevron-down.svg" alt="" class="chevron-icon">
                        </summary>
                        <div class="glossary-answer">
                            <p>${item.a}</p>
                        </div>
                    </details>
                `).join('');
            }

            const ctaTitle = document.getElementById('detail-cta-title');
            const ctaDesc = document.getElementById('detail-cta-desc');
            const ctaPrepBtn = document.getElementById('detail-cta-prep-btn');
            const actionPrepBtn = document.getElementById('detail-action-prep-btn');
            if (ctaTitle) ctaTitle.textContent = data.ctaTitle || `¿Listo para acondicionar ${data.crumb}?`;
            if (ctaDesc) ctaDesc.textContent = data.ctaDesc || 'Sigue la guía rápida de preparación de 4 pasos en orden de cascada para asegurarte de que tu residuo sea recibido sin observaciones.';
            if (ctaPrepBtn) {
                ctaPrepBtn.href = `prep-guide.html?tipo=${normKey}`;
                const span = ctaPrepBtn.querySelector('span');
                if (span) span.textContent = data.ctaPrepText || 'Ir a Guía de preparación';
            }
            if (actionPrepBtn) {
                actionPrepBtn.href = `prep-guide.html?tipo=${normKey}`;
            }
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
            pageTitle: 'Prepara tu botella de plástico PET',
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
                    desc: 'Desenrosca la tapa de polipropileno (PP #5) y guárdala por separado. Aplasta el cuerpo de la botella desde la base hacia el pico para ahorrar hasta 70% de volumen.',
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
                    title: '1. Vacía todo el producto o conserva',
                    desc: 'Retira hasta la última cucharada de mermelada, salsa o aderezo. Puedes usar una espátula de silicona para aprovechar todo el alimento.',
                    tip: 'Asegúrate de retirar residuos sólidos orgánicos espesos que puedan descomponerse.',
                    label: 'Paso 1 completado: Frasco totalmente vacío'
                },
                {
                    title: '2. Enjuaga con un poco de agua tibia',
                    desc: 'Agrega medio vaso de agua, remueve y enjuaga las paredes de vidrio. Si tenía aceite o mayonesa, agrega una gota de lavavajillas.',
                    tip: 'Usa agua reutilizada del fregadero para cuidar el recurso hídrico.',
                    label: 'Paso 2 completado: Paredes de vidrio limpias sin grasa espesa'
                },
                {
                    title: '3. Escurre y seca al ambiente',
                    desc: 'Coloca el frasco boca abajo sobre una rejilla hasta que el agua evapore por completo.',
                    tip: 'Evita meter paños de tela que puedan dejar pelusas en el fondo.',
                    label: 'Paso 3 completado: Seco y sin condensación interna'
                },
                {
                    title: '4. Separa tapas metálicas y mantén el envase ENTERO',
                    desc: 'Desenrosca la tapa de hojalata y colócala aparte. ¡NUNCA rompas el envase! Los recicladores reciben vidrio entero para no accidentarse.',
                    tip: 'Los vidrios rotos cortan las bolsas y las manos de los recolectores de base.',
                    label: 'Paso 4 completado: Tapas separadas y vidrio íntegro sin fisuras'
                }
            ]
        },
        carton: {
            pageTitle: 'Prepara tus cajas de cartón y Tetra Pak',
            sub: 'Sigue estos cuatro sencillos pasos en orden de cascada para proteger las fibras de celulosa de la humedad.',
            steps: [
                {
                    title: '1. Retira restos de alimentos o envoltorios',
                    desc: 'Abre la caja y retira plásticos de burbujas, tecnopor o migas de pan que hayan quedado dentro.',
                    tip: 'Las partes con grasa de pizza o aceite deben cortarse y enviarse al tacho negro.',
                    label: 'Paso 1 completado: Libre de comida y plásticos interiores'
                },
                {
                    title: '2. Despega cinta adhesiva plástica gruesa',
                    desc: 'Tira de las tiras de cinta de embalaje plástica para que la caja quede solo en cartón limpio.',
                    tip: 'No es necesario retirar el 100% del pegamento, solo la cinta plástica externa.',
                    label: 'Paso 2 completado: Cintas plásticas desprendidas'
                },
                {
                    title: '3. Aplana completamente la caja',
                    desc: 'Despliega las aletas superiores e inferiores y presiona la caja hasta que quede plana como una lámina.',
                    tip: 'El cartón aplanado ocupa una décima parte del espacio en tu hogar.',
                    label: 'Paso 3 completado: Caja totalmente desarmada y aplanada'
                },
                {
                    title: '4. Apila y amarra en fardo seco',
                    desc: 'Junta varias cajas planas y átalas con pabilo o mételas dentro de otra caja plana. Almacénalas lejos de humedad.',
                    tip: 'El cartón húmedo genera hongos en 24 horas y pierde todo su valor comercial.',
                    label: 'Paso 4 completado: Fardo seco, amarrado y listo'
                }
            ]
        },
        lata: {
            pageTitle: 'Prepara tus latas de bebidas y conservas',
            sub: 'Sigue estos cuatro sencillos pasos en orden de cascada para maximizar la pureza del aluminio.',
            steps: [
                {
                    title: '1. Drena todo el líquido o contenido alimenticio',
                    desc: 'Vacía completamente la bebida o escurre el aceite de la conserva de atún o verduras.',
                    tip: 'Si es lata de leche o sopa, aprovecha todo el contenido antes de descartar.',
                    label: 'Paso 1 completado: Contenido drenado por completo'
                },
                {
                    title: '2. Pasa un chorrito de agua',
                    desc: 'Enjuaga brevemente el interior para disolver los azúcares o salmuera residual.',
                    tip: 'No gastes mucha agua potable; un enjuague rápido es suficiente.',
                    label: 'Paso 2 completado: Enjuague sin restos pegajosos'
                },
                {
                    title: '3. Seca al aire boca abajo',
                    desc: 'Deja la lata unos minutos sobre una bandeja para que escurra toda gota de agua.',
                    tip: 'La hojalata puede oxidarse si se deja con charcos de agua por semanas.',
                    label: 'Paso 3 completado: Lata escurrida y seca'
                },
                {
                    title: '4. Comprime suavemente y protege filos',
                    desc: 'Para latas de bebidas, aplasta de lado con el pie. En latas de conserva, mete la tapa cortante dentro del cuerpo y presiona el borde.',
                    tip: 'Protege a los recicladores de base cubriendo bordes afilados.',
                    label: 'Paso 4 completado: Lata compactada con filos protegidos'
                }
            ]
        },
        pead: {
            pageTitle: 'Prepara tus envases plásticos PEAD #2',
            sub: 'Sigue estos cuatro sencillos pasos en orden de cascada para evitar contaminación por residuos jabonosos.',
            steps: [
                {
                    title: '1. Usa todo el producto hasta el fondo',
                    desc: 'Agrega dos cucharadas de agua al frasco casi vacío de champú o lavavajillas para aprovechar la última porción.',
                    tip: 'El residuo químico concentrado arruina la calidad del plástico recuperado.',
                    label: 'Paso 1 completado: Producto químico agotado'
                },
                {
                    title: '2. Enjuaga con agua tibia',
                    desc: 'Llena un cuarto con agua, tapa con la mano, agita vigorosamente y vacía en el lavadero.',
                    tip: 'Repite una vez hasta que no salga espuma densa.',
                    label: 'Paso 2 completado: Libre de espuma densa'
                },
                {
                    title: '3. Escurre invertido',
                    desc: 'Coloca el envase boca abajo sin tapa hasta que no queden gotas de agua jabonosa.',
                    tip: 'Guárdalo destapado para que ventile el aroma.',
                    label: 'Paso 3 completado: Escurrido y seco'
                },
                {
                    title: '4. Desenrosca el dispensador o bomba',
                    desc: 'Las bombas dosificadoras contienen resortes metálicos incompatibles con el reciclaje de PEAD; retíralas.',
                    tip: 'El cuerpo PEAD se recicla limpiamente una vez separada la bomba.',
                    label: 'Paso 4 completado: Bomba o dispensador retirado'
                }
            ]
        },
        pilas: {
            pageTitle: 'Acondiciona tus pilas y baterías alcalinas',
            sub: 'Sigue estos cuatro sencillos pasos en orden de cascada para manipular residuos peligrosos con total seguridad cívica.',
            steps: [
                {
                    title: '1. Retira del dispositivo y verifica su estado',
                    desc: 'Extrae las pilas gastadas de controles, linternas o juguetes. Revisa que no tengan derrames blanquecinos o sulfato ácido.',
                    tip: 'Si tiene sulfato blanco, no lo toques con la mano desnuda; usa una bolsa o guante.',
                    label: 'Paso 1 completado: Pilas extraídas e inspeccionadas'
                },
                {
                    title: '2. Coloca cinta aislante en ambos polos',
                    desc: 'Corta un trozo pequeño de cinta adhesiva transparente o de embalaje y cubre el polo positivo (+) y el polo negativo (-).',
                    tip: 'Aislar los polos previene cortocircuitos accidentales y chispas al juntar varias pilas.',
                    label: 'Paso 2 completado: Polos aislados con cinta'
                },
                {
                    title: '3. Almacena en un contenedor plástico rígido seco',
                    desc: 'Guarda las pilas encintadas en una botella PET seca o frasco plástico con tapa rosca, fuera del alcance de niños y mascotas.',
                    tip: 'NUNCA las guardes en bolsas delgadas ni en recipientes metálicos.',
                    label: 'Paso 3 completado: Empacadas en recipiente seco cerrado'
                },
                {
                    title: '4. Ubica un contenedor municipal rojo o punto de pilas',
                    desc: 'Lleva el frasco al ecopunto municipal, supermercado autorizado o punto de acopio especial. ¡NUNCA las eches al tacho verde ni negro!',
                    tip: 'Una sola pila alcalina contamina hasta 600 mil litros de agua si llega a un relleno común.',
                    label: 'Paso 4 completado: Destino en contenedor especial verificado'
                }
            ]
        }
    };
    prepMatData.metal = prepMatData.lata;

    if (prepCards[0] && prepCbs[0]) {
        const urlParams = new URLSearchParams(window.location.search);
        let curMat = urlParams.get('tipo') || 'pet';
        if (curMat === 'metal') curMat = 'lata';
        const matData = prepMatData[curMat] || prepMatData.pet;

        const pageTitle = document.getElementById('prep-page-title');
        const pageSub = document.getElementById('prep-page-subtitle');
        const wasteBreadcrumb = document.getElementById('breadcrumb-waste-link');
        if (pageTitle) pageTitle.textContent = matData.pageTitle;
        if (pageSub) pageSub.textContent = matData.sub;
        if (wasteBreadcrumb) wasteBreadcrumb.href = `waste-detail.html?tipo=${curMat}`;

        const chips = document.querySelectorAll('.prep-mat-chip');
        chips.forEach(chip => {
            const chipMat = chip.getAttribute('data-mat');
            if (chipMat === curMat) {
                chip.style.backgroundColor = '#0B4A30';
                chip.style.color = '#FFFFFF';
                chip.style.borderColor = '#0B4A30';
            } else {
                chip.style.backgroundColor = '#FFFFFF';
                chip.style.color = '#14251B';
                chip.style.borderColor = '#DBE7DF';
            }
        });

        matData.steps.forEach((st, idx) => {
            const titleEl = document.getElementById(`step-${idx + 1}-title`);
            const descEl = document.getElementById(`step-${idx + 1}-desc`);
            const tipEl = document.getElementById(`step-${idx + 1}-tip`);
            const labelEl = document.getElementById(`step-${idx + 1}-label`);
            if (titleEl) titleEl.textContent = st.title;
            if (descEl) descEl.textContent = st.desc;
            if (tipEl) tipEl.innerHTML = `<strong>Recomendación:</strong> ${st.tip}`;
            if (labelEl) labelEl.textContent = st.label;
        });

        const updateCascade = () => {
            let completed = 0;
            prepCbs.forEach((cb, idx) => {
                const card = prepCards[idx];
                const pill = prepPills[idx];
                if (!cb || !card) return;

                const isPreviousCompleted = (idx === 0) || (prepCbs[idx - 1] && prepCbs[idx - 1].checked);

                if (!isPreviousCompleted) {
                    cb.checked = false;
                    cb.disabled = true;
                    card.classList.add('locked');
                    card.classList.remove('active-step', 'completed');
                    if (pill) {
                        pill.className = 'step-lock-pill';
                        pill.textContent = `🔒 Bloqueado: Completa Paso ${idx}`;
                    }
                } else {
                    cb.disabled = false;
                    card.classList.remove('locked');
                    if (cb.checked) {
                        completed++;
                        card.classList.add('completed');
                        card.classList.remove('active-step');
                        if (pill) {
                            pill.className = 'step-lock-pill done';
                            pill.textContent = '✓ Listo';
                        }
                    } else {
                        card.classList.remove('completed');
                        card.classList.add('active-step');
                        if (pill) {
                            pill.className = 'step-lock-pill active';
                            pill.textContent = '▶ En progreso';
                        }
                    }
                }
            });

            const pct = completed * 25;
            if (progressBarFill) progressBarFill.style.width = `${pct}%`;
            if (progressBadge) progressBadge.textContent = `${completed} de 4`;
            if (progressDesc) {
                if (completed === 4) {
                    progressDesc.textContent = '¡Excelente! Has completado los 4 pasos en orden de cascada. Tu residuo cumple todas las condiciones para una entrega exitosa.';
                } else if (completed === 0) {
                    progressDesc.textContent = 'Comienza marcando el Paso 1. Cada paso se desbloqueará en cascada conforme acondiciones tu residuo.';
                } else {
                    progressDesc.textContent = `Paso ${completed} completado. Ahora puedes realizar y marcar el Paso ${completed + 1}.`;
                }
            }

            const btnSummary = document.getElementById('btn-to-summary') || document.querySelector('a[href^="prep-summary.html"]');
            if (btnSummary) {
                btnSummary.href = `prep-summary.html?tipo=${curMat}`;
                if (completed < 4) {
                    btnSummary.style.opacity = '0.6';
                    btnSummary.style.cursor = 'not-allowed';
                    btnSummary.style.backgroundColor = '#6C8A79';
                    btnSummary.innerHTML = `<span>Completa los 4 pasos para continuar (${completed}/4)</span>`;
                    btnSummary.onclick = (e) => {
                        e.preventDefault();
                        alert(`Debes completar los pasos en orden de cascada. Actualmente te encuentras en el Paso ${completed + 1}.`);
                    };
                } else {
                    btnSummary.style.opacity = '1';
                    btnSummary.style.cursor = 'pointer';
                    btnSummary.style.backgroundColor = '#0B4A30';
                    btnSummary.innerHTML = `<span>✓ ¡Preparación completa! Ver resumen final</span><img src="../Images/icon-arrow-right.svg" alt="">`;
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

    if (summaryTitle && summaryChecklist) {
        const params = new URLSearchParams(window.location.search);
        let curMat = params.get('tipo') || 'pet';
        if (curMat === 'metal') curMat = 'lata';

        const summaryData = {
            pet: {
                title: 'Tu botella PET está lista para entregar',
                sub: 'Cumple con todas las condiciones técnicas exigidas por el Ministerio del Ambiente y los recicladores de Lima para ingresar a la cadena de valor sin ser rechazada.',
                img: '../Images/waste-pet-bottle.png',
                items: [
                    { t: '1. Totalmente vacía', d: 'Sin restos de líquido residual ni sedimentos en el fondo.' },
                    { t: '2. Enjuagada responsablemente', d: 'Sin manchas pegajosas, azúcares ni suciedad que atraiga insectos.' },
                    { t: '3. Secada al aire', d: 'Completamente escurrida para no humedecer cartones ni papeles vecinos.' },
                    { t: '4. Tapa separada y volumen reducido', d: 'Tapa de polipropileno aparte y cuerpo compactado al 70%.' }
                ]
            },
            vidrio: {
                title: 'Tu frasco o botella de vidrio está listo para entregar',
                sub: 'Asegura la salud física de los recicladores y garantiza un ciclo de reciclaje infinito al 100% de pureza.',
                img: '../Images/delivery-glass.png',
                items: [
                    { t: '1. Totalmente vacío', d: 'Sin restos de salsas, aderezos ni comida fermentada.' },
                    { t: '2. Enjuagado sin grasa', d: 'Paredes de vidrio limpias y transparentes.' },
                    { t: '3. Secado al aire', d: 'Sin agua estancada ni condensación interior.' },
                    { t: '4. Tapas de hojalata separadas y vidrio ENTERO', d: 'Envase íntegro sin fisuras ni quiebres cortantes.' }
                ]
            },
            carton: {
                title: 'Tus cajas de cartón y Tetra Pak están listas para entregar',
                sub: 'Fibras de celulosa preservadas de la humedad para un reciclaje óptimo de hasta 7 nuevos ciclos.',
                img: '../Images/delivery-cardboard.png',
                items: [
                    { t: '1. Sin restos de alimentos', d: 'Completamente libre de grasas de comida o plásticos interiores.' },
                    { t: '2. Cintas plásticas desprendidas', d: 'Sin cintas de embalaje gruesas que traben los pulpers.' },
                    { t: '3. Totalmente aplanado', d: 'Aletas desplegadas para optimizar espacio.' },
                    { t: '4. Atado en fardo seco', d: 'Apilado y protegido de cualquier fuente de humedad.' }
                ]
            },
            lata: {
                title: 'Tus latas de bebidas y conservas están listas para entregar',
                sub: 'Aluminio y hojalata limpios de altísimo valor para las asociaciones de recicladores formalizados.',
                img: '../Images/delivery-can.png',
                items: [
                    { t: '1. Drenadas por completo', d: 'Sin residuos líquidos ni aceite residual.' },
                    { t: '2. Enjuagadas', d: 'Libres de salmuera o almíbar azucarado.' },
                    { t: '3. Secadas al ambiente', d: 'Sin charcos de agua que causen corrosión prematura.' },
                    { t: '4. Compactadas con filos protegidos', d: 'Tapas de conserva introducidas y borde apretado.' }
                ]
            },
            pead: {
                title: 'Tus envases PEAD #2 están listos para entregar',
                sub: 'Plástico rígido descontaminado listo para molienda e inyección de nuevos productos duraderos.',
                img: '../Images/gallery-plastic-bottle.png',
                items: [
                    { t: '1. Producto consumido', d: 'Aprovechado hasta la última gota de champú o detergente.' },
                    { t: '2. Enjuagado con agua tibia', d: 'Sin espuma densa ni residuos químicos en las paredes.' },
                    { t: '3. Escurrido boca abajo', d: 'Completamente seco al tacto.' },
                    { t: '4. Bomba dispensadora retirada', d: 'Sin resortes metálicos que contaminen el lote de PEAD.' }
                ]
            },
            pilas: {
                title: 'Tus pilas alcalinas están acondicionadas con seguridad',
                sub: 'Residuos peligrosos manipulados con responsabilidad cívica para no contaminar fuentes de agua ni tierra.',
                img: '../Images/category-hazardous.png',
                items: [
                    { t: '1. Inspeccionadas', d: 'Revisadas sin fugas ácidas ni sulfatos libres.' },
                    { t: '2. Polos aislados', d: 'Cinta adhesiva colocada en terminales positivo y negativo.' },
                    { t: '3. Envasadas en plástico rígido', d: 'Guardadas en botella o frasco seco con tapa rosca.' },
                    { t: '4. Destino especial verificado', d: 'Identificado contenedor rojo o punto de pilas municipal.' }
                ]
            }
        };

        const sData = summaryData[curMat] || summaryData.pet;
        summaryTitle.textContent = sData.title;
        if (summarySubtitle) summarySubtitle.textContent = sData.sub;
        if (summaryImg) summaryImg.src = sData.img;
        if (summaryBackLink) summaryBackLink.href = `prep-guide.html?tipo=${curMat}`;
        if (breadcrumbWaste) breadcrumbWaste.href = `waste-detail.html?tipo=${curMat}`;
        if (breadcrumbGuide) breadcrumbGuide.href = `prep-guide.html?tipo=${curMat}`;

        summaryChecklist.innerHTML = sData.items.map(it => `
            <li class="summary-check-item">
                <img src="../Images/icon-check.svg" alt="">
                <div class="summary-check-item-text">
                    <strong>${it.t}</strong>
                    <span>${it.d}</span>
                </div>
                <span class="summary-status-tag">Listo</span>
            </li>
        `).join('');
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