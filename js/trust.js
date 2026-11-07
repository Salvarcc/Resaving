/* Resaving — Trust, Feedback & Location Support */
document.addEventListener('DOMContentLoaded', () => {
    const isPagesSubdir = window.location.pathname.includes('/pages/');
    const basePath = isPagesSubdir ? '' : 'pages/';
    const reportFileInput = document.getElementById('report-file-input');
    const reportFileStatus = document.getElementById('report-file-status');
    if (reportFileInput && reportFileStatus) {
        reportFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                reportFileStatus.textContent = `Foto adjunta: ${e.target.files[0].name} (${Math.round(e.target.files[0].size / 1024)} KB)`;
                reportFileStatus.style.color = '#1D8A57';
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

    const formReport = document.getElementById('form-report-incident');
    if (formReport) {
        formReport.addEventListener('submit', (e) => {
            e.preventDefault();
            /* Pantalla extra desactivada: report-success.html */
        });
    }

    const formSuggest = document.getElementById('form-suggest-point');
    if (formSuggest) {
        formSuggest.addEventListener('submit', (e) => {
            e.preventDefault();
            /* Pantalla extra desactivada: report-success.html */
        });
    }
});
