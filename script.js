document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = [
        document.getElementById('check-step-1'),
        document.getElementById('check-step-2'),
        document.getElementById('check-step-3'),
        document.getElementById('check-step-4')
    ];

    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressBadge = document.getElementById('progress-badge');
    const progressDesc = document.getElementById('progress-desc');

    if (checkboxes[0] && progressBarFill && progressBadge) {
        const updateProgress = () => {
            let completed = 0;
            checkboxes.forEach((cb, idx) => {
                const card = document.getElementById(`card-step-${idx + 1}`);
                if (cb && cb.checked) {
                    completed++;
                    if (card) card.classList.add('completed');
                } else {
                    if (card) card.classList.remove('completed');
                }
            });

            const pct = completed * 25;
            progressBarFill.style.width = `${pct}%`;
            progressBadge.textContent = `${completed} de 4`;

            if (progressDesc) {
                if (completed === 4) {
                    progressDesc.textContent = '¡Excelente! Has completado los 4 pasos. Tu botella PET cumple todas las condiciones para una entrega exitosa.';
                } else {
                    progressDesc.textContent = `Has completado ${completed} de 4 pasos. Marca las casillas restantes conforme acondiciones tu envase.`;
                }
            }
        };

        checkboxes.forEach(cb => {
            if (cb) {
                cb.addEventListener('change', updateProgress);
            }
        });

        updateProgress();
    }

    const heroFileInput = document.getElementById('hero-file-upload');
    if (heroFileInput) {
        heroFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                window.location.href = 'pages/scan-confirm.html';
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
            }, 300);
        });
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
});
