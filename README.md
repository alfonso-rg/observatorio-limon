# Observatorio del limón en Murcia (2004-2024)

Aplicación web estática para consulta rápida del mercado limonero en Murcia con:

- Panel KPI por año.
- Gráficas de producción, superficie, rendimiento y precio en origen.
- Mapa territorial de intensidad productiva.
- Planos estratégicos de apoyo a decisión para perfil técnico y pequeña explotación.
- Módulo de noticias sectoriales (RSS en tiempo real con fallback de fuentes oficiales).

## Ejecutar

Al ser estática, basta abrir `index.html` con un navegador moderno.

## Fuentes de referencia utilizadas para estructurar el observatorio

1. Ministerio de Agricultura, Pesca y Alimentación (MAPA): Anuarios y estadísticas agrarias.
2. CARM / CREM: estadística agraria regional de Murcia.
3. Observatorio de Precios y Mercados (Región de Murcia).
4. Eurostat: series de producción agrícola regional.

> Nota: el panel integra series de carácter operativo para visualización y análisis comparativo. Para uso contractual/comercial, contrastar siempre con el boletín oficial más reciente de cada organismo.

## Despliegue en Cloudflare Pages (paso a paso, desde cero)

Si nunca has usado Cloudflare, esta es la opción más sencilla para publicar esta web estática.

### 1) Crear cuenta en Cloudflare

1. Entra en: https://dash.cloudflare.com/sign-up
2. Regístrate con email y contraseña.
3. Verifica tu correo.

> Para **Cloudflare Pages** no necesitas mover tu dominio ni tocar DNS al principio.

### 2) Subir el proyecto a GitHub (si aún no está)

Cloudflare Pages trabaja muy bien conectándose a un repositorio Git.

1. Crea un repositorio en GitHub (por ejemplo: `observatorio-limon`).
2. Desde tu carpeta local, sube el código:

```bash
git init
git add .
git commit -m "Primer despliegue observatorio limón"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/observatorio-limon.git
git push -u origin main
```

### 3) Crear el proyecto en Cloudflare Pages

1. En Cloudflare Dashboard: **Workers & Pages** → **Create application** → **Pages**.
2. Elige **Connect to Git**.
3. Autoriza Cloudflare con GitHub y selecciona tu repo.
4. Configura el build así:
   - **Framework preset**: `None`
   - **Build command**: *(vacío)*
   - **Build output directory**: `/` (raíz del proyecto)
5. Pulsa **Save and Deploy**.

En 1–2 minutos tendrás una URL tipo:
`https://observatorio-limon.pages.dev`

### 4) Publicar cambios futuros

Cada vez que hagas `git push` a `main`, Cloudflare redepliega automáticamente.

### 5) (Opcional) Conectar dominio propio

En el proyecto de Pages:
**Custom domains** → **Set up a custom domain**.

Si tu DNS no está en Cloudflare, te pedirá crear los registros necesarios (CNAME normalmente).

### 6) Recomendación importante para el bloque de noticias

El módulo de noticias actualmente intenta leer RSS vía proxy público (`api.allorigins.win`) y, si falla, muestra fuentes de respaldo.

Para entorno profesional, conviene mover esa consulta a una **Function** de Cloudflare (server-side) con caché. Así reduces problemas de CORS o caídas del proxy.

## Troubleshooting (Netlify / móvil): no aparecen los gráficos

Si en móvil ves un bloque vacío donde debería ir la sección de evolución histórica:

1. Abre la página en modo incógnito (para descartar bloqueadores/extensiones).
2. Comprueba conexión de datos/WiFi (los gráficos dependen de cargar Chart.js desde CDN).
3. Fuerza recarga completa (Ctrl+F5 o borrar caché del navegador móvil).
4. Revisa en DevTools si hay errores de carga de CDN.

La app incluye fallback de carga para Chart.js y Leaflet (CDNs alternativos) y mensaje de estado si aun así no se puede renderizar.
