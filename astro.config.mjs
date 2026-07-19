// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Sitio 100% estático que se ejecuta en local (npm run dev) o se compila a
// dist/ (npm run build). La herramienta no requiere servidor ni backend:
// todo el estado vive en el navegador del usuario. El servidor SQLite
// (servidor/servidor.mjs) es opcional y solo centraliza sesiones.
//
// Se sirve desde la raíz "/" (Vercel / hosting estático / Docker con nginx).
// `base` sigue siendo configurable por si se publica bajo una subruta.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  integrations: [react()],
  site: process.env.SITE_URL ?? 'https://adapsys-gobierno-datos.vercel.app',
  base,
});
