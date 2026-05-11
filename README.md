# Esquemator Blog

Blog de Esquemator construido con [Astro](https://astro.build).

🌐 **URL**: https://blog.esquemator.com
📝 **Stack**: Astro + Markdown + Netlify
🎨 **Marca**: Navy #0F3D5C + Cyan #1FB7D8

## Estructura del proyecto

```
esquemator-blog/
├── public/                  Archivos estáticos (favicon, imágenes, etc.)
│   └── images/              Imágenes del blog (subir aquí)
├── src/
│   ├── components/          Componentes reutilizables
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro
│   │   └── EsquematorCTA.astro
│   ├── content/
│   │   ├── config.ts        Schema de los posts
│   │   └── blog/            ⭐ AQUÍ van los posts en .md
│   ├── layouts/
│   │   └── BaseLayout.astro Layout principal (SEO, fuentes)
│   └── pages/
│       ├── index.astro              Home del blog
│       ├── 404.astro
│       ├── rss.xml.js               RSS feed
│       ├── blog/
│       │   ├── index.astro          Lista de todos los posts
│       │   └── [...slug].astro      Post individual (dinámico)
│       └── categoria/
│           └── [categoria].astro    Categoría (dinámico)
├── astro.config.mjs
├── netlify.toml
└── package.json
```

## Cómo añadir un post nuevo

### 1. Crear el archivo

Crea un archivo `.md` en `src/content/blog/` con el nombre del slug que quieras.
Por ejemplo: `como-estudiar-derecho-administrativo.md`

### 2. Frontmatter obligatorio

Al principio del archivo, entre `---`:

```markdown
---
title: "Cómo estudiar Derecho Administrativo en 30 días"
description: "Una guía práctica con técnicas probadas para opositores."
date: 2026-05-15
author: "Antonio Ferré"
category: "Oposiciones"
tags: ["derecho-administrativo", "estudio", "oposiciones"]
image: "/images/post-derecho-admin.jpg"
imageAlt: "Persona estudiando con libros de derecho"
draft: false
featured: false
---
```

### 3. Contenido en Markdown

A partir de `---` cierre, escribes el post normal:

```markdown
# Introducción

Texto del post...

## Subtítulo

Más texto con **negrita**, *cursiva*, [enlaces](https://ejemplo.com).
```

### 4. Publicar

- `draft: true` → No se publica
- `draft: false` → Se publica al hacer push a GitHub
- `featured: true` → Aparece destacado en la home

## Desarrollo local

```bash
# Instalar dependencias (solo primera vez)
npm install

# Servidor de desarrollo en localhost:4321
npm run dev

# Build de producción
npm run build

# Previsualizar build
npm run preview
```

## Despliegue

El blog se despliega automáticamente en Netlify cada vez que se hace push a la rama `main`.

## Categorías predefinidas

- Oposiciones
- Técnicas de estudio
- Derecho y BOE
- Herramientas

Cualquier categoría nueva genera automáticamente su página en `/categoria/{slug}/`.

## Componentes especiales para posts

Los posts pueden ser `.md` (Markdown) o `.mdx` (Markdown + componentes). **Usa `.mdx` cuando quieras incluir mockups visuales**.

Al principio del archivo `.mdx`, importa los componentes que vayas a usar:

```mdx
---
title: "..."
description: "..."
date: 2026-05-15
category: "Oposiciones"
---

import EsquemaArticulo from '../../components/EsquemaArticulo.astro';
import EsquemaComparativa from '../../components/EsquemaComparativa.astro';

Texto normal del post...
```

### Componente 1: EsquemaArticulo

Simula visualmente cómo Esquemator estructura un artículo de ley. Muy útil para mostrar el producto en acción dentro del contenido.

**Sintaxis de pills coloreados** dentro del texto de cada apartado:

| Marcador  | Color | Uso típico                          |
|-----------|-------|-------------------------------------|
| `[texto]` | Cyan  | Sustantivos, instituciones, órganos |
| `{texto}` | Ámbar | Verbos clave, acciones              |
| `!texto!` | Rojo  | Importante: plazos, mayorías        |
| `@texto@` | Verde | Consecuencias, resultados           |

**Ejemplo de uso**:

```mdx
<EsquemaArticulo
  articulo="99"
  ley="Constitución Española"
  tiempo="1.4 segundos"
  apartados={[
    "El [Rey] {propondrá} un candidato a la [Presidencia del Gobierno].",
    "Si el [Congreso] otorgare !mayoría absoluta!, el [Rey] le @nombrará@ Presidente."
  ]}
/>
```

### Componente 2: EsquemaComparativa

Dos columnas lado a lado. Perfecto para ANTES/DESPUÉS, Sin/Con Esquemator, etc.

**Colores disponibles**: `red`, `green`, `navy`, `cyan`, `amber`

**Ejemplo de uso**:

```mdx
<EsquemaComparativa
  leftTitle="Estudio tradicional"
  leftSubtitle="Lo que NO funciona"
  leftItems={[
    "Lees y relees pasivamente",
    "Subrayas con colores",
  ]}
  leftColor="red"
  rightTitle="Con esquemas"
  rightSubtitle="Lo que SÍ funciona"
  rightItems={[
    "Estructura jerárquica clara",
    "Conceptos resaltados",
  ]}
  rightColor="green"
/>
```

### Ver ejemplo completo

El post `src/content/blog/como-memorizar-constitucion-espanola-30-dias.mdx` usa ambos componentes con ejemplos reales.
