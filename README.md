# Observatorio del Limón en Murcia

Portal web multipágina (HTML/CSS/JS) sobre el mercado del limón en Murcia para uso profesional y divulgativo.

## Estructura del sitio

- `index.html`: portada y visión general.
- `precios.html`: precios semanales con ventanas 1 mes / 3 meses / 1 año.
- `evolucion.html`: evolución 2004–2024 (producción, superficie, rendimiento).
- `mapa.html`: mapa interactivo embebido en Google Maps + zonas limoneras orientativas.
- `historia.html`: sección enciclopédica extensa con referencias por párrafo.
- `juegos.html`: hub del arcade con enlaces a minijuegos.
- `juego-trader.html`: simulador de trading semanal.
- `juego-logistica.html`: minijuego de rutas y márgenes.
- `juego-plagas.html`: gestión de eventos de riesgo en finca.
- `juego-riego.html`: optimización de riego semanal.
- `juego-quiz.html`: quiz experto con cronómetro.
- `juego-ranking.html`: simulador con ranking persistente.
- `fuentes.html`: inventario de enlaces de referencia.

## Ejecución local

```bash
python -m http.server 4173
```

Abrir `http://127.0.0.1:4173`.

## Fuentes de datos y contexto

- MAPA · Estadística agraria: https://www.mapa.gob.es/es/estadistica/temas/default.aspx
- MAPA · Superficies y producciones anuales: https://www.mapa.gob.es/es/estadistica/temas/estadisticas-agrarias/agricultura/superficies-producciones-anuales-cultivos/
- CARM · Observatorio de precios: https://www.carm.es/web/pagina?IDCONTENIDO=707&IDTIPO=100&RASTRO=c80$m22721
- CARM / CREM: https://econet.carm.es
- AILIMPO: https://www.ailimpo.com/
- Eurostat: https://ec.europa.eu/eurostat
- FAOSTAT: https://www.fao.org/faostat/
- Google Maps: https://maps.google.com
- Wikipedia (contexto):
  - https://es.wikipedia.org/wiki/Citrus_%C3%97_limon
  - https://es.wikipedia.org/wiki/Huerta_de_Murcia
  - https://es.wikipedia.org/wiki/Regi%C3%B3n_de_Murcia

- Imágenes libres (galería/portadas visuales): https://unsplash.com/license
