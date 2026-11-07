/* Resaving — Cascade Preparation Guide & Summary */
document.addEventListener('DOMContentLoaded', () => {
    const isPagesSubdir = window.location.pathname.includes('/pages/');
    const basePath = isPagesSubdir ? '' : 'pages/';
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

        const linkAccept = document.getElementById('link-to-acceptability') || document.querySelector('a[href^="acceptability.html"]');
        if (linkAccept) {
            linkAccept.href = `acceptability.html?tipo=${curMat}`;
        }

        // Restore saved cascade state if available
        try {
            const savedState = sessionStorage.getItem(`resaving_prep_${curMat}`);
            if (savedState) {
                const parsed = JSON.parse(savedState);
                if (Array.isArray(parsed)) {
                    parsed.forEach((val, idx) => {
                        if (prepCbs[idx]) prepCbs[idx].checked = !!val;
                    });
                }
            }
        } catch (e) {
            console.error('Error loading prep state:', e);
        }

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
                    card.classList.remove('locked');
                    card.classList.remove('card-disabled');
                    card.style.opacity = '1';
                } else {
                    const prevChecked = prepCbs[i - 1].checked;
                    if (prevChecked) {
                        cb.disabled = false;
                        card.classList.remove('locked');
                        card.classList.remove('card-disabled');
                        card.style.opacity = '1';
                        if (!cb.checked && pill) {
                            pill.textContent = '▶ En progreso';
                            pill.className = 'step-lock-pill active';
                        }
                    } else {
                        cb.checked = false;
                        cb.disabled = true;
                        card.classList.add('locked');
                        card.classList.remove('active-step');
                        card.classList.remove('card-completed');
                        card.style.opacity = '0.65';
                        if (pill) {
                            pill.textContent = '🔒 Bloqueado';
                            pill.className = 'step-lock-pill';
                        }
                    }
                }

                if (cb.checked) {
                    completed++;
                    card.classList.add('card-completed');
                    card.classList.remove('locked');
                    card.classList.remove('active-step');
                    card.style.borderColor = '#1D8A57';
                    card.style.backgroundColor = '#F4FAF6';
                    if (pill) {
                        pill.textContent = '✓ Completado';
                        pill.className = 'step-lock-pill done';
                        pill.style.backgroundColor = '#DFF3E6';
                        pill.style.color = '#0B4A30';
                    }
                } else if (i === 0 || (prepCbs[i - 1] && prepCbs[i - 1].checked)) {
                    card.classList.remove('card-completed');
                    card.classList.add('active-step');
                    card.style.borderColor = '#0B4A30';
                    card.style.backgroundColor = '#FFFFFF';
                    if (pill) {
                        pill.textContent = '▶ En progreso';
                        pill.className = 'step-lock-pill active';
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

            try {
                sessionStorage.setItem(`resaving_prep_${curMat}`, JSON.stringify(prepCbs.map(cb => cb ? cb.checked : false)));
            } catch (e) {
                console.error('Error saving prep state:', e);
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

});
