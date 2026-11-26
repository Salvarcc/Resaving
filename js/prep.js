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
            pageTitle: 'Prepara tu botella plástica',
            sub: 'Completa los 4 pasos en orden antes de entregar.',
            steps: [
                {
                    title: '1. Vacía el envase',
                    desc: 'Retira todo el líquido para no mojar otros reciclables.',
                    tip: 'Si solo tuvo agua, basta con escurrir.',
                    label: 'Paso 1: Envase vacío'
                },
                {
                    title: '2. Enjuaga rápido',
                    desc: 'Si tuvo jugo o gaseosa, agita con un poco de agua para evitar olores.',
                    tip: 'Reutiliza agua del lavado de platos.',
                    label: 'Paso 2: Enjuague listo'
                },
                {
                    title: '3. Escurre boca abajo',
                    desc: 'Déjala secar al aire para evitar humedad en el acopio.',
                    tip: 'Seca al aire, sin usar servilletas.',
                    label: 'Paso 3: Botella seca'
                },
                {
                    title: '4. Quita la tapa y aplasta',
                    desc: 'Separa la tapa plástica y aplasta la botella para ahorrar 70% de espacio.',
                    tip: 'Aplastada cabe el triple en cada recolección.',
                    label: 'Paso 4: Sin tapa y aplastada'
                }
            ]
        },
        vidrio: {
            pageTitle: 'Prepara frascos y botellas de vidrio',
            sub: 'Sigue los 4 pasos en orden para una entrega segura.',
            steps: [
                {
                    title: '1. Retira todo el contenido',
                    desc: 'Vacía restos de comida o líquido del frasco.',
                    tip: 'Nunca entregues vidrio roto ni astillado.',
                    label: 'Paso 1: Frasco vacío'
                },
                {
                    title: '2. Enjuaga con agua',
                    desc: 'Pasa un chorro de agua para quitar restos y olores.',
                    tip: 'Un enjuague rápido es suficiente.',
                    label: 'Paso 2: Vidrio limpio'
                },
                {
                    title: '3. Escurre boca abajo',
                    desc: 'Déjalo secar al aire antes de guardarlo.',
                    tip: 'Evita dejar agua dentro del envase.',
                    label: 'Paso 3: Vidrio seco'
                },
                {
                    title: '4. Retira la tapa metálica',
                    desc: 'Desenrosca la tapa de metal y sepárala aparte.',
                    tip: 'Entrega el frasco entero y destapado.',
                    label: 'Paso 4: Sin tapa y listo'
                }
            ]
        },
        carton: {
            pageTitle: 'Prepara cajas de cartón',
            sub: 'Desarma, limpia y ata el cartón en 4 pasos.',
            steps: [
                {
                    title: '1. Desarma y aplana la caja',
                    desc: 'Abre las solapas para dejarla completamente plana.',
                    tip: 'Aplanada ocupa 8 veces menos espacio.',
                    label: 'Paso 1: Caja aplanada'
                },
                {
                    title: '2. Retira cintas y grapas',
                    desc: 'Quita cintas gruesas de embalaje y grapas metálicas.',
                    tip: 'Usa tijeras si la cinta está muy adherida.',
                    label: 'Paso 2: Cinta retirada'
                },
                {
                    title: '3. Verifica que esté seco',
                    desc: 'No incluyas cartón mojado ni con grasa de comida.',
                    tip: 'Las zonas con aceite van al tacho negro.',
                    label: 'Paso 3: Cartón limpio y seco'
                },
                {
                    title: '4. Agrupa y ata el fardo',
                    desc: 'Apila las láminas planas y átalas con pita o soga.',
                    tip: 'Facilita el pesaje y traslado del reciclador.',
                    label: 'Paso 4: Paquete atado'
                }
            ]
        },
        lata: {
            pageTitle: 'Prepara latas de aluminio y hojalata',
            sub: '4 pasos rápidos para entregar metales sin riesgo.',
            steps: [
                {
                    title: '1. Escurre todo líquido',
                    desc: 'Vacía la lata por completo y drena aceite si es conserva.',
                    tip: 'No tires aceite usado al caño.',
                    label: 'Paso 1: Lata vacía'
                },
                {
                    title: '2. Enjuaga el interior',
                    desc: 'Pasa agua rápida para evitar olores en casa.',
                    tip: 'Usa una gota de detergente si tuvo atún.',
                    label: 'Paso 2: Lata enjuagada'
                },
                {
                    title: '3. Seca boca abajo',
                    desc: 'Escúrrela en lugar ventilado unos minutos.',
                    tip: 'El metal seca muy rápido al aire.',
                    label: 'Paso 3: Lata seca'
                },
                {
                    title: '4. Aplasta con cuidado',
                    desc: 'Comprime lateralmente o dobla la tapa filuda hacia adentro.',
                    tip: 'Evita dejar bordes cortantes expuestos.',
                    label: 'Paso 4: Lata compactada'
                }
            ]
        },
        pead: {
            pageTitle: 'Prepara envases de limpieza',
            sub: 'Acondiciona frascos de detergente o champú sin espuma.',
            steps: [
                {
                    title: '1. Vacía el producto',
                    desc: 'Usa el contenido restante antes de reciclar.',
                    tip: 'Un poco de agua aprovecha el último resto.',
                    label: 'Paso 1: Envase vacío'
                },
                {
                    title: '2. Enjuaga dos veces',
                    desc: 'Elimina restos de jabón o espuma del interior.',
                    tip: 'El enjuague sirve para limpiar el piso.',
                    label: 'Paso 2: Sin espuma ni residuos'
                },
                {
                    title: '3. Escurre boca abajo',
                    desc: 'Déjalo secar al aire antes de cerrarlo.',
                    tip: 'Evita humedad acumulada al guardar.',
                    label: 'Paso 3: Envase seco'
                },
                {
                    title: '4. Retira el dispensador',
                    desc: 'Quita bombas con resorte de metal (van al tacho negro).',
                    tip: 'Los resortes dañan el molino de plástico.',
                    label: 'Paso 4: Dosificador separado'
                }
            ]
        },
        pilas: {
            pageTitle: 'Prepara pilas y baterías',
            sub: '4 medidas de seguridad para entrega en punto especial.',
            steps: [
                {
                    title: '1. Separa por tipo',
                    desc: 'Clasifica pilas comunes y baterías sin golpearlas.',
                    tip: 'Nunca desarmes ni calientes una pila.',
                    label: 'Paso 1: Pilas separadas'
                },
                {
                    title: '2. Cubre ambos polos',
                    desc: 'Pega cinta adhesiva en los extremos (+) y (-).',
                    tip: 'Previene cortocircuitos dentro del acopio.',
                    label: 'Paso 2: Polos aislados'
                },
                {
                    title: '3. Guarda en envase seco',
                    desc: 'Colócalas en una botella o frasco plástico con tapa.',
                    tip: 'Mantenlo en un lugar fresco y seguro.',
                    label: 'Paso 3: Envase cerrado'
                },
                {
                    title: '4. Entrega en tacho rojo',
                    desc: 'Llévalas a un contenedor autorizado de supermercado o distrito.',
                    tip: 'Nunca van al tacho verde ni negro.',
                    label: 'Paso 4: Punto especial ubicado'
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
            if (tipEl) tipEl.innerHTML = `<strong>Tip:</strong> ${step.tip}`;
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
                        const msg = `Completa los pasos en orden secuencial. Actualmente te encuentras en el Paso ${completed + 1}.`;
                        if (typeof window.resavingNotify === 'function') {
                            window.resavingNotify(msg, 'Paso pendiente', '!');
                        }
                        if (progressDesc) {
                            progressDesc.textContent = msg;
                            progressDesc.style.color = '#8C6105';
                        }
                    };
                } else {
                    btnSummary.style.opacity = '1';
                    btnSummary.style.cursor = 'pointer';
                    btnSummary.style.backgroundColor = '#0B4A30';
                    btnSummary.innerHTML = `<span>¡Preparación completa! Ver resumen final</span><img src="../assets/icons/icon-arrow-right.svg" alt="">`;
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
            img: '../assets/images/prep-bottle-checklist.png',
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
            img: '../assets/images/delivery-glass.png',
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
            img: '../assets/images/delivery-cardboard.png',
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
            img: '../assets/images/delivery-can.png',
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
            img: '../assets/images/gallery-plastic-bottle.png',
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
            img: '../assets/images/category-hazardous.png',
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
                        <img src="../assets/icons/icon-check.svg" alt="" style="width: 14px; height: 14px;">
                    </div>
                    <span>${c}</span>
                </div>
            `).join('');
        }
    }

});
