# Esquemator Blog

> Snapshot del contexto del proyecto a 21 de mayo de 2026. Si llevas semanas sin abrir esto, considera la posibilidad de que algunos detalles hayan cambiado.

## Qué es

Blog de marketing/SEO de Esquemator ([app.esquemator.com](https://app.esquemator.com)), una SaaS que convierte texto legal en esquemas visuales para opositores. URL del blog: **https://blog.esquemator.com**

El blog existe para:

1. Posicionar SEO por queries de leyes concretas (ej. *"esquema art 112 LPAC"*, *"constitución española visual"*).
2. Servir piezas descargables (PDFs de esquemas) que atraen tráfico cualificado.
3. Ser destino de los vídeos de YouTube — cada vídeo se acompaña de un post con esquema descargable.

**El patrón que ya funciona** (validado con GA4): vídeo de YouTube + post con el texto del artículo + PDF descargable. Replicar este formato es la prioridad de contenido.

## Stack

- **Astro 4.16.18** (sitio estático)
- **Markdown** para posts (en `src/content/blog/*.md`)
- **Netlify** despliega automático desde la rama `main`
- **Cloudflare** para DNS (CNAME → Netlify)
- **GA4** instalado

## Estructura del repo

```
esquemator-blog/
├── public/                      Archivos servidos desde la raíz del dominio
│   ├── images/                  Imágenes de posts
│   └── descargas/               PDFs descargables (slug.pdf)
├── src/
│   ├── components/              Astro components (Header, Footer, PostCard, EsquematorCTA)
│   ├── content/
│   │   ├── config.ts            Schema de los posts (validación del frontmatter)
│   │   └── blog/                ⭐ POSTS .md aquí
│   ├── layouts/
│   │   └── BaseLayout.astro     Layout principal (SEO, fuentes)
│   └── pages/
│       ├── index.astro
│       ├── blog/[...slug].astro
│       └── categoria/[categoria].astro
├── astro.config.mjs
├── netlify.toml
└── package.json
```

## Frontmatter de posts

```yaml
---
title: "Título del post"
description: "Meta description para SEO"
date: 2026-05-21
author: "Antonio Ferré"
category: "Derecho y BOE"    # u Oposiciones / Técnicas de estudio / Herramientas
tags: ["tag1", "tag2"]
image: "/images/post-slug.jpg"
imageAlt: "Alt SEO de la imagen"
draft: false
featured: false
---
```

`draft: true` no se publica. `featured: true` destaca en home.

## Comandos

```bash
npm install              # primera vez
npm run dev              # localhost:4321
npm run build            # build a /dist
```

## Despliegue

Push a `main` → Netlify rebuild en ~2 min → live en https://blog.esquemator.com.

## Convenciones de contenido

- **Sin email gate en descargas.** Antonio está en fase de activación, no de captación.
- **Incluir el texto literal del artículo** (BOE, dominio público) dentro del post — clave para SEO long-tail.
- **CTA al final** apuntando a `https://app.esquemator.com`.
- **Eventos GA4 para descargas** — en cada botón de descarga: `onclick="gtag('event','download_esquema',{esquema:'slug-articulo'})"`.

## Estado actual y siguientes pasos

Acabamos de publicar el primer post del patrón (art. 112 LPAC). En GA4 ya se ve:

- 38 usuarios únicos descargaron archivos en 28 días
- Organic Video genera el mayor engagement (2:13 min de media)
- Organic Search alcanza 73% de tasa de interacción

**Siguiente plan**: replicar el formato con 4-5 artículos más de leyes que más caen en oposiciones (especialmente las del Cuerpo Nacional de Policía y similares).

## Convenciones de trabajo con Antonio

- Resultados antes que proceso. Prefiere entregables completos sobre fases con vuelta atrás.
- Si hay que decidir entre "rápido y suficiente" o "perfecto y tarde", elegir rápido y suficiente.
- En texto legal, siempre verificar contra BOE antes de publicar definitivamente.
- Mac, zsh, Node 22.
