/* Resaving — Catalog, Search, Scan & Waste Detail */
document.addEventListener('DOMContentLoaded', () => {
    const isPagesSubdir = window.location.pathname.includes('/pages/');
    const basePath = isPagesSubdir ? '' : 'pages/';
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
            const span = btnFlip.querySelector('span');
            if (btnFlip.classList) btnFlip.classList.toggle('flipped');
            if (span) {
                span.textContent = isFrontCamera ? 'Cámara frontal' : 'Cámara posterior';
            }
        });
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

            const destDesc = document.getElementById('detail-dest-desc') || document.getElementById('detail-channels-desc');
            if (destDesc && data.destDesc) destDesc.textContent = data.destDesc;

            const faqAccordion = document.getElementById('detail-faq-accordion');
            if (faqAccordion && data.faq) {
                faqAccordion.innerHTML = data.faq.map(item => `
                    <details class="glossary-item">
                        <summary class="glossary-summary flex Ycenter">
                            <span>${item.q}</span>
                            <img src="../Images/icon-chevron-down.svg" alt="" class="chevron-icon">
                        </summary>
                        <div class="glossary-content">
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

            const acceptLinks = document.querySelectorAll('a[href^="acceptability.html"]');
            acceptLinks.forEach(link => {
                link.href = `acceptability.html?tipo=${normKey}`;
            });
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

    // Dynamic criteria buttons on acceptability.html
    const btnAcceptToPrep = document.getElementById('btn-accept-to-prep');
    const btnAcceptToDetail = document.getElementById('btn-accept-to-detail');
    if (btnAcceptToPrep || btnAcceptToDetail) {
        const urlParams = new URLSearchParams(window.location.search);
        const tipo = urlParams.get('tipo') || 'pet';
        if (btnAcceptToPrep) btnAcceptToPrep.href = `prep-guide.html?tipo=${tipo}`;
        if (btnAcceptToDetail) btnAcceptToDetail.href = `waste-detail.html?tipo=${tipo}`;
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
            img: '../Images/thumb-hdpe-bottle.svg',
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
            img: '../Images/thumb-coffee-grounds.svg',
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
            img: '../Images/thumb-dry-leaves.svg',
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
            img: '../Images/thumb-eggshells.svg',
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
            img: '../Images/accepted-empty-clean.png',
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
            img: '../Images/thumb-lightbulb.svg',
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
            img: '../Images/gallery-special-waste.png',
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
            img: '../Images/thumb-cigarettes.svg',
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
            img: '../Images/rejected-mixed-wet.webp',
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
            img: '../Images/thumb-ceramics.svg',
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
                            <span class="badge ${item.badgeClass}" style="color: #FFFFFF !important; font-weight: 800; padding: 4px 10px; border-radius: 6px;">${item.catLabel}</span>
                            <span class="badge badge-gray" style="color: #0B4A30 !important; font-weight: 700; padding: 4px 10px; border-radius: 6px;">${item.subBadge}</span>
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

});
