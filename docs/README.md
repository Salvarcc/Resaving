# Resaving ♻️

> **Plataforma web accesible para la gestión, identificación y reciclaje responsable de residuos urbanos en Lima Metropolitana.**

Desarrollada para el curso **1ASI0784 - Human-Computer Interaction (HCI) for UX Design**, Facultad de Ingeniería, Universidad Peruana de Ciencias Aplicadas (UPC). Ciclo 2026-20.

---

## 🌐 Despliegue en GitHub Pages
* **URL Pública:** [https://salvarcc.github.io/Resaving/](https://salvarcc.github.io/Resaving/)
* **Repositorio oficial:** [https://github.com/Salvarcc/Resaving](https://github.com/Salvarcc/Resaving)

---

## 👥 Créditos del Equipo de Desarrollo
Proyecto realizado por el equipo de estudiantes de la Carrera de **Ingeniería de Software**:
* **Salvador André Rivera Chavez** (`U202315390`) — `@Salvarcc`
* **Melissa Orihuela**
* **Yeremy Acuña**
* **Joseph Balbin**
* **Leonardo Bendezu**
* **Samuel Rodriguez**

---

## 📋 Descripción del Proyecto
Resaving responde a la problemática de la desinformación, desconfianza y dispersión de datos sobre el reciclaje domiciliario y urbano. La solución provee una experiencia intuitiva, accesible y responsive para que los ciudadanos puedan:
1. **Identificar:** Diferenciar las 4 categorías oficiales de residuos (Aprovechables, Orgánicos, Peligrosos, No Aprovechables), buscar materiales específicos o escanear/subir fotos de sus envases.
2. **Preparar:** Consultar guías técnicas paso a paso con checklists interactivos para acondicionar residuos (enjuague, secado, compactación y separación de tapas).
3. **Entregar:** Localizar estaciones de reciclaje y puntos de acopio autorizados cercanos con horarios, vigencia de datos y materiales aceptados en distritos como San Miguel, Miraflores, San Borja, Magdalena y Pueblo Libre.

---

## 🎯 Cobertura de 30 Historias de Usuario Core
La plataforma implementa fielmente las **30 Historias de Usuario Core** priorizadas en el Product Backlog del TB2, garantizando trazabilidad completa con el Needfinding, Arquitectura de Información, User Flows y Prototipo en Figma:

* **Descubrimiento y Búsqueda (HU-001 a HU-009):** Portada informativa, buscador en vivo con sugerencias contextuales, historial de búsquedas recientes, manejo de consultas sin resultados, escaneo fotográfico y confirmación.
* **Fichas Técnicas de Materiales (HU-010 a HU-017):** Guía visual de las 4 categorías, ficha detallada con especificaciones técnicas, matriz de aceptación vs rechazo, diferenciación de materiales confusos, componentes separables y contenedor correspondiente.
* **Guías de Preparación Paso a Paso (HU-018 a HU-023):** Resumen de pasos, checklist interactivo por material (limpieza, secado, compactado, separación), alternativas de reutilización y advertencias de seguridad para materiales peligrosos.
* **Puntos de Acopio y Geolocalización (HU-024 a HU-030):** Mapa interactivo de estaciones, listado ordenado por cercanía, filtros por tipo de material, detección de ubicación del usuario, ficha con horarios y estado operativo en tiempo real.

---

## 📁 Estructura del Repositorio
Organizado estrictamente bajo el estándar establecido en el **Handbook de HCI for UX Design**:

```text
Resaving/
├── assets/
│   ├── images/               # Fotografías, banners y recursos visuales (.png, .webp, .jpg)
│   ├── icons/                # Íconos vectoriales de interfaz y estado (.svg)
│   ├── fonts/                # Fuentes tipográficas del proyecto
│   └── videos/               # Recursos multimedia
├── css/
│   ├── styles.css            # Archivo principal de estilos CSS (agregador)
│   ├── base.css              # Reset, variables globales, tipografía, header, footer y toast
│   ├── home.css              # Estilos específicos de la portada/landing
│   ├── catalog.css           # Estilos de búsqueda, categorías y fichas técnicas
│   ├── prep.css              # Estilos de guías de preparación y checklists
│   ├── map.css               # Estilos del mapa de acopio y listado de estaciones
│   ├── trust.css             # Estilos de vigencia de datos y transparencia
│   └── delivery.css          # Estilos de módulos complementarios
├── js/
│   ├── main.js               # Archivo principal de inicialización JavaScript
│   ├── common.js             # Navegación mobile, drawer, banner de usuario y toasts interactivos
│   ├── home.js               # Búsqueda rápida y sugerencias en portada
│   ├── catalog.js            # Filtros dinámicos, tabs y simulador de escaneo
│   ├── prep.js               # Checklist de acondicionamiento interactivo
│   ├── map.js                # Geolocalización simulada, selector mapa/lista y filtros
│   └── trust.js              # Interacciones de verificación de datos
├── pages/
│   ├── index.html            # Réplica de landing para navegación interna
│   └── [29 pantallas .html]  # Vistas completas de las 30 HU core
├── docs/
│   └── README.md             # Documentación, instrucciones y créditos
├── favicon.ico               # Ícono oficial del sitio web
├── index.html                # Punto de entrada principal para GitHub Pages
└── .gitignore                # Reglas de exclusión de Git
```

---

## ♿ Accesibilidad y Buenas Prácticas
* **Contraste WCAG 2.1 AA:** Ratios de contraste optimizados entre texto y fondo.
* **Diseño Responsive:** Adaptación fluida sin pérdida de funcionalidades en Desktop (1280px+), Tablet (768px) y Mobile (390px). Cero scroll horizontal inesperado.
* **Navegación Intuitiva:** Atributos semánticos `aria-label`, foco visible en enlaces interactivos y retroalimentación mediante Toasts interactivos (`¡Pronto! ⚠️`) en funcionalidades programadas para versiones futuras.

---

## 💻 Instrucciones de Ejecución Local
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Salvarcc/Resaving.git
   cd Resaving
   ```
2. Abrir directamente en el navegador:
   * Hacer doble clic en el archivo `index.html`.
   * O utilizar una extensión como **Live Server** en VS Code o ejecutar:
     ```bash
     npx serve .
     ```
3. Navegar por los diferentes flujos y verificar las 30 HU core implementadas.
