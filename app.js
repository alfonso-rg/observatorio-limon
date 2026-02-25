const sectorData = [
  { year: 2004, productionKt: 430, areaHa: 35800, yieldTnHa: 12.0, priceEurKg: 0.31, exportsKt: 305 },
  { year: 2005, productionKt: 462, areaHa: 36450, yieldTnHa: 12.7, priceEurKg: 0.36, exportsKt: 325 },
  { year: 2006, productionKt: 448, areaHa: 36800, yieldTnHa: 12.2, priceEurKg: 0.34, exportsKt: 318 },
  { year: 2007, productionKt: 475, areaHa: 37120, yieldTnHa: 12.8, priceEurKg: 0.41, exportsKt: 334 },
  { year: 2008, productionKt: 488, areaHa: 37600, yieldTnHa: 13.0, priceEurKg: 0.39, exportsKt: 345 },
  { year: 2009, productionKt: 455, areaHa: 38150, yieldTnHa: 11.9, priceEurKg: 0.29, exportsKt: 330 },
  { year: 2010, productionKt: 498, areaHa: 38800, yieldTnHa: 12.8, priceEurKg: 0.33, exportsKt: 360 },
  { year: 2011, productionKt: 506, areaHa: 39350, yieldTnHa: 12.9, priceEurKg: 0.35, exportsKt: 372 },
  { year: 2012, productionKt: 540, areaHa: 40200, yieldTnHa: 13.4, priceEurKg: 0.38, exportsKt: 396 },
  { year: 2013, productionKt: 565, areaHa: 41000, yieldTnHa: 13.8, priceEurKg: 0.43, exportsKt: 418 },
  { year: 2014, productionKt: 578, areaHa: 41750, yieldTnHa: 13.8, priceEurKg: 0.40, exportsKt: 430 },
  { year: 2015, productionKt: 602, areaHa: 42500, yieldTnHa: 14.2, priceEurKg: 0.45, exportsKt: 446 },
  { year: 2016, productionKt: 620, areaHa: 43200, yieldTnHa: 14.4, priceEurKg: 0.42, exportsKt: 458 },
  { year: 2017, productionKt: 645, areaHa: 43900, yieldTnHa: 14.7, priceEurKg: 0.37, exportsKt: 472 },
  { year: 2018, productionKt: 628, areaHa: 44550, yieldTnHa: 14.1, priceEurKg: 0.32, exportsKt: 465 },
  { year: 2019, productionKt: 670, areaHa: 45120, yieldTnHa: 14.8, priceEurKg: 0.39, exportsKt: 488 },
  { year: 2020, productionKt: 690, areaHa: 45500, yieldTnHa: 15.2, priceEurKg: 0.51, exportsKt: 505 },
  { year: 2021, productionKt: 710, areaHa: 45980, yieldTnHa: 15.4, priceEurKg: 0.48, exportsKt: 522 },
  { year: 2022, productionKt: 694, areaHa: 46300, yieldTnHa: 15.0, priceEurKg: 0.57, exportsKt: 515 },
  { year: 2023, productionKt: 678, areaHa: 46620, yieldTnHa: 14.5, priceEurKg: 0.62, exportsKt: 502 },
  { year: 2024, productionKt: 702, areaHa: 46950, yieldTnHa: 15.0, priceEurKg: 0.58, exportsKt: 519 }
];

const territory = [
  { name: 'Vega Media (Molina-Alguazas)', lat: 38.07, lng: -1.2, share: 18 },
  { name: 'Valle del Guadalentín (Lorca-Totana)', lat: 37.84, lng: -1.51, share: 22 },
  { name: 'Campo de Cartagena', lat: 37.71, lng: -0.96, share: 14 },
  { name: 'Vega Alta (Cieza-Abarán)', lat: 38.24, lng: -1.41, share: 10 },
  { name: 'Murcia y pedanías de huerta', lat: 37.99, lng: -1.14, share: 20 },
  { name: 'Río Mula y Noroeste', lat: 38.02, lng: -1.49, share: 16 }
];

const plans = [
  {
    title: 'Plan de eficiencia hídrica',
    text: 'Priorizar sensores de humedad, riego deficitario controlado y fertirrigación por bloques para reducir costes con riesgo moderado.'
  },
  {
    title: 'Plan comercial para pequeña finca',
    text: 'Diversificar calendario (Fino + Verna), reforzar acuerdos con cooperativa y canal corto local para estabilizar ingresos.'
  },
  {
    title: 'Plan de resiliencia climática',
    text: 'Mejorar cubierta vegetal, sombreo parcial y monitorización de golpes de calor ante mayor volatilidad interanual del rendimiento.'
  },
  {
    title: 'Plan de valor añadido',
    text: 'Evaluar certificaciones (GlobalG.A.P., producción integrada) y clasificación premium para diferenciar precio en origen.'
  }
];

const fallbackNews = [
  {
    title: 'Intercitrus y organizaciones del sector citrícola',
    source: 'Intercitrus',
    url: 'https://intercitrus.org/'
  },
  {
    title: 'Boletines de precios agrarios de la Región de Murcia',
    source: 'CARM',
    url: 'https://www.carm.es/web/pagina?IDCONTENIDO=707&IDTIPO=100&RASTRO=c80$m22721'
  },
  {
    title: 'Ministerio de Agricultura · estadísticas y mercados',
    source: 'MAPA',
    url: 'https://www.mapa.gob.es/es/estadistica/temas/default.aspx'
  }
];

const yearInput = document.getElementById('yearRange');
const yearValue = document.getElementById('yearValue');
const panelYear = document.getElementById('panelYear');

function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(value);
}

function getRecord(year) {
  return sectorData.find((r) => r.year === Number(year));
}

function setChartFallback(message) {
  document.querySelectorAll('.chart-grid canvas').forEach((canvas) => {
    canvas.replaceWith(Object.assign(document.createElement('div'), {
      className: 'chart-fallback',
      textContent: message
    }));
  });
}

function setMapFallback(message) {
  const mapEl = document.getElementById('map');
  mapEl.classList.add('map-fallback');
  mapEl.textContent = message;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    document.head.appendChild(script);
  });
}

async function ensureChartLib() {
  if (window.Chart) return true;
  const sources = [
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js',
    'https://unpkg.com/chart.js@4.4.2/dist/chart.umd.min.js'
  ];
  for (const src of sources) {
    try {
      await loadScript(src);
      if (window.Chart) return true;
    } catch (_error) {
      // try next source
    }
  }
  return false;
}

async function ensureLeafletLib() {
  if (window.L) return true;
  const sources = [
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js'
  ];
  for (const src of sources) {
    try {
      await loadScript(src);
      if (window.L) return true;
    } catch (_error) {
      // try next source
    }
  }
  return false;
}

function renderKpis(year) {
  const record = getRecord(year);
  const base = getRecord(2004);
  const kpis = [
    { label: 'Producción', value: `${formatNumber(record.productionKt)} kt`, delta: `+${formatNumber(((record.productionKt / base.productionKt - 1) * 100), 1)}% vs 2004` },
    { label: 'Superficie', value: `${formatNumber(record.areaHa)} ha`, delta: `+${formatNumber(((record.areaHa / base.areaHa - 1) * 100), 1)}% vs 2004` },
    { label: 'Rendimiento', value: `${formatNumber(record.yieldTnHa, 1)} t/ha`, delta: `+${formatNumber(((record.yieldTnHa / base.yieldTnHa - 1) * 100), 1)}% vs 2004` },
    { label: 'Precio en origen', value: `${formatNumber(record.priceEurKg, 2)} €/kg`, delta: `${record.priceEurKg > sectorData[sectorData.length - 2].priceEurKg ? '↗' : '↘'} respecto al año anterior` },
    { label: 'Exportaciones', value: `${formatNumber(record.exportsKt)} kt`, delta: `+${formatNumber(((record.exportsKt / base.exportsKt - 1) * 100), 1)}% vs 2004` }
  ];

  document.getElementById('kpiGrid').innerHTML = kpis
    .map((k) => `<article class="kpi"><div class="label">${k.label}</div><div class="value">${k.value}</div><div class="delta">${k.delta}</div></article>`)
    .join('');
}

function renderYearFacts(year) {
  const record = getRecord(year);
  panelYear.textContent = year;
  document.getElementById('yearFacts').innerHTML = `
    <li><strong>Producción:</strong> ${formatNumber(record.productionKt)} mil toneladas.</li>
    <li><strong>Superficie:</strong> ${formatNumber(record.areaHa)} ha en cultivo de limón.</li>
    <li><strong>Rendimiento medio:</strong> ${formatNumber(record.yieldTnHa, 1)} t/ha.</li>
    <li><strong>Precio medio en origen:</strong> ${formatNumber(record.priceEurKg, 2)} €/kg.</li>
    <li><strong>Exportación estimada:</strong> ${formatNumber(record.exportsKt)} mil toneladas.</li>
  `;
}

function initCharts() {
  const years = sectorData.map((d) => d.year);

  const commonOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  const build = (id, label, data, color, yLabel) => new Chart(document.getElementById(id), {
    type: 'line',
    data: {
      labels: years,
      datasets: [{ label, data, borderColor: color, backgroundColor: `${color}22`, fill: true, tension: 0.2, pointRadius: 2.5 }]
    },
    options: {
      ...commonOptions,
      scales: { y: { title: { display: true, text: yLabel } } }
    }
  });

  build('productionChart', 'Producción de limón en Murcia', sectorData.map((d) => d.productionKt), '#2f9e44', 'kt');
  build('priceChart', 'Precio medio en origen', sectorData.map((d) => d.priceEurKg), '#f08c00', '€/kg');
  build('areaChart', 'Superficie cultivada', sectorData.map((d) => d.areaHa), '#1c7ed6', 'ha');
  build('yieldChart', 'Rendimiento medio', sectorData.map((d) => d.yieldTnHa), '#5f3dc4', 't/ha');
}

function initMap() {
  const map = L.map('map').setView([37.95, -1.24], 8.5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  territory.forEach((zone) => {
    const marker = L.circleMarker([zone.lat, zone.lng], {
      radius: Math.max(8, zone.share * 0.7),
      color: '#1b6b3a',
      fillColor: '#8fd19e',
      fillOpacity: 0.65,
      weight: 1.6
    }).addTo(map);

    marker.bindPopup(`<strong>${zone.name}</strong><br/>Cuota productiva estimada: ${zone.share}%`);
  });
}

function renderPlans() {
  document.getElementById('plans').innerHTML = plans
    .map((plan) => `<article class="plan"><h3>${plan.title}</h3><p>${plan.text}</p></article>`)
    .join('');
}

async function loadNews() {
  const status = document.getElementById('newsStatus');
  const list = document.getElementById('newsList');
  status.textContent = 'Actualizando…';

  try {
    const url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://news.google.com/rss/search?q=lim%C3%B3n%20Murcia%20agricultura&hl=es&gl=ES&ceid=ES:es');
    const response = await fetch(url);
    if (!response.ok) throw new Error('No se pudo obtener RSS');
    const rssText = await response.text();
    const xml = new window.DOMParser().parseFromString(rssText, 'text/xml');
    const items = [...xml.querySelectorAll('item')].slice(0, 7);
    if (!items.length) throw new Error('RSS sin elementos');

    list.innerHTML = items
      .map((item) => {
        const title = item.querySelector('title')?.textContent ?? 'Titular';
        const link = item.querySelector('link')?.textContent ?? '#';
        const pubDate = new Date(item.querySelector('pubDate')?.textContent ?? Date.now());
        const source = item.querySelector('source')?.textContent ?? 'Prensa sectorial';
        return `<li><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a><p>${source} · ${pubDate.toLocaleDateString('es-ES')}</p></li>`;
      })
      .join('');

    status.textContent = 'Noticias actualizadas';
  } catch (_error) {
    list.innerHTML = fallbackNews
      .map((n) => `<li><a href="${n.url}" target="_blank" rel="noopener noreferrer">${n.title}</a><p>${n.source}</p></li>`)
      .join('');
    status.textContent = 'No fue posible obtener RSS en tiempo real; mostrando fuentes sectoriales.';
  }
}

function syncYear() {
  const year = Number(yearInput.value);
  yearValue.textContent = year;
  renderKpis(year);
  renderYearFacts(year);
}

async function bootstrap() {
  yearInput.addEventListener('input', syncYear);
  document.getElementById('refreshNews').addEventListener('click', loadNews);

  syncYear();
  renderPlans();
  loadNews();

  const chartReady = await ensureChartLib();
  if (chartReady) {
    try {
      initCharts();
    } catch (_error) {
      setChartFallback('No se pudieron renderizar los gráficos en este dispositivo. Revisa conexión o bloqueadores de contenido.');
    }
  } else {
    setChartFallback('No se pudo cargar la librería de gráficos (Chart.js). Comprueba conexión o bloqueadores de contenido.');
  }

  const mapReady = await ensureLeafletLib();
  if (mapReady) {
    try {
      initMap();
    } catch (_error) {
      setMapFallback('No se pudo inicializar el mapa en este dispositivo.');
    }
  } else {
    setMapFallback('No se pudo cargar la librería de mapas (Leaflet).');
  }
}

bootstrap();
