# Adapsys · Diagnóstico de Gobernanza de Datos

**Diagnóstico de madurez en gobernanza y protección de datos para instituciones públicas de Chile**, alineado a la
**Ley 21.719** (nueva Ley de Protección de Datos Personales, vigente el 1-dic-2026) y al **Marco de Gestión de Datos
del Estado (MGDE)**.

Es una herramienta web de **autodiagnóstico**: un cuestionario tipo Likert en lenguaje claro, con escala de madurez
1–5, que entrega puntajes por dimensión, un perfil radar por módulo, un **instrumento** de madurez global, un
**plan de acción** priorizado y una **hoja de ruta** institucional a 12/24/36 meses.

> 🔒 **Privacidad por diseño.** Funciona por completo en el navegador. **Ninguna respuesta se envía a internet ni a
> ningún servidor.** El avance se guarda solo en el equipo (localStorage) y el usuario decide si lo exporta como
> JSON/CSV. El consolidado institucional también se calcula localmente.

---

## Qué entrega

- **Nivel de madurez** 1–5 por dimensión, con equivalencia a los niveles del MGDE (Insuficiente/Básico/Medio/Avanzado).
- **Instrumento de madurez global** + dot-plot por módulo sobre un eje 0–5 con la meta institucional (nivel 3 «Definido»).
- **Perfil radar** por dimensión y módulo.
- **Plan de acción** priorizado — la acción concreta para subir de nivel en cada dimensión.
- **Hoja de ruta** 0–12 / 12–24 / 24–36 meses, con *quick wins* y proyectos estructurales.
- **Consolidado institucional** que combina todas las áreas evaluadas en una matriz dimensión × área.

## Contenido del instrumento

- **Módulo A — Ley 21.719** (14 dimensiones, 37 preguntas): gobernanza/DPO, base de licitud, RAT, datos sensibles,
  consentimiento, derechos ARCOP, EIPD, seguridad, brechas, encargados, transferencias, anonimización, cultura y cesiones.
- **Módulo B — Gobernanza de datos / MGDE** (12 dimensiones, 32 preguntas): instancias, roles, estrategia, políticas,
  calidad, metadatos, arquitectura/interoperabilidad, seguridad, ciclo de vida, cultura, adopción y gobierno de IA.

El banco de preguntas está documentado en [`docs/banco-preguntas.md`](docs/banco-preguntas.md) y es el espejo legible
del código en [`src/data/banco.ts`](src/data/banco.ts).

## Stack

- **[Astro](https://astro.build) 5** — sitio estático (build y dev server).
- **React 19** (isla `client:only`) para toda la interacción.
- **TypeScript** en modo estricto para el modelo de datos y la lógica de puntaje.
- **Sistema de diseño Adapsys** — tokens CSS reskinneables (Poppins + DM Sans autoalojadas), escala de madurez
  validada para daltonismo (CVD), `framer-motion` y `react-countup` para el instrumento y las cifras.

## Desarrollo

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo (http://localhost:4321)
npm run build     # compila a dist/ (sitio estático)
npm run preview   # sirve dist/ para revisar el build
npm run check     # typecheck con astro check
```

## Despliegue

Sitio 100% estático — se sirve desde la raíz `/`. En **Vercel**, Astro se detecta automáticamente
(build: `astro build`, output: `dist/`). También se puede publicar en cualquier hosting de archivos estáticos o vía
Docker (`docker compose up --build`, nginx en el puerto 8080).

> El sitio incluye `<meta name="robots" content="noindex, nofollow">` mientras la herramienta está en preparación.
> Quítalo en [`src/layouts/Layout.astro`](src/layouts/Layout.astro) cuando se decida su lanzamiento público.

## Diseño

El sistema de diseño vive en [`src/styles/global.css`](src/styles/global.css): cambiar de cliente/marca = cambiar los
tokens del `:root`. La escala de madurez 1–5 fue validada (contraste WCAG + separación bajo protanopía/deuteranopía/
tritanopía) y cada valor se muestra siempre con su número y nombre de nivel, de modo que el color nunca es la única señal.

## Créditos y licencia

Este proyecto es una **adaptación de Adapsys Consulting** del excelente trabajo original de
**[Paulo Villarroel](https://github.com/paulovillarroel)**:
[`levantamiento-gobierno-datos`](https://github.com/paulovillarroel/levantamiento-gobierno-datos).
La lógica de diagnóstico, el banco de preguntas y el modelo de puntaje provienen de ese proyecto; Adapsys aportó el
rediseño de interfaz, el sistema de diseño y el branding.

Publicado bajo licencia **MIT** (ver [`LICENSE`](LICENSE)). Se conserva la atribución al autor original.

> **Uso referencial.** Instrumento orientativo de autodiagnóstico; **no constituye asesoría legal**. El banco de
> preguntas debe validarse contra el texto oficial de la Ley 21.719 y la Guía de la SGD antes de un uso formal.
