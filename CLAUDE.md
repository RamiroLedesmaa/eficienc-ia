# CLAUDE.md

## Proyecto
Sitio web de RutIA (agencia de automatización con IA) y DentalOS (SaaS para consultorios odontológicos argentinos).

## Stack
- React + TypeScript + Vite
- Tailwind CSS
- Vercel (deploy automático desde main)
- Repo: github.com/RamiroLedesmaa/eficienc-ia

## Estructura
- src/pages/Index.tsx → Entry point, renderiza ClinicLanding (ruta /)
- src/pages/DentalOS.tsx → Landing de DentalOS (ruta /dentalos)
- src/pages/NotFound.tsx → Página 404
- src/pages/landing/ClinicLanding.tsx → Landing principal de RutIA (clínicas)
- src/pages/landing/RutIAAgroLanding.tsx → Landing agro (archivada tras pivot a clínicas)
- src/components/ → Componentes reutilizables (Header, Footer, WavePlane, secciones, ui/)
- src/components/WavePlane.tsx → Fondo animado Three.js (usado en ClinicLanding y DentalOS)
- src/assets/ → Logos (rutIaLogo.svg, dentalos-logo.svg)
- vercel.json → Rewrites para client-side routing
- src/App.tsx → Router principal (react-router-dom)

## Deploy
- Branch principal: main
- Vercel auto-deploya al pushear a main
- Dominio: rutia.xyz (landing RutIA) y rutia.xyz/dentalos (landing DentalOS)

## Convenciones
- No agregar cambios que no fueron pedidos explícitamente
- Hacer plan antes de ejecutar cambios grandes
- Commits descriptivos en español
