const yearlyData = [
  { year: 2004, productionKt: 430, areaHa: 35800, yield: 12.0 },
  { year: 2008, productionKt: 488, areaHa: 37600, yield: 13.0 },
  { year: 2012, productionKt: 540, areaHa: 40200, yield: 13.4 },
  { year: 2016, productionKt: 620, areaHa: 43200, yield: 14.4 },
  { year: 2020, productionKt: 690, areaHa: 45500, yield: 15.2 },
  { year: 2021, productionKt: 710, areaHa: 45980, yield: 15.4 },
  { year: 2022, productionKt: 694, areaHa: 46300, yield: 15.0 },
  { year: 2023, productionKt: 678, areaHa: 46620, yield: 14.5 },
  { year: 2024, productionKt: 702, areaHa: 46950, yield: 15.0 }
];

const recentPrices = [
  { date: '2025-02-03', eurKg: 0.57 }, { date: '2025-02-10', eurKg: 0.58 }, { date: '2025-02-17', eurKg: 0.59 },
  { date: '2025-02-24', eurKg: 0.58 }, { date: '2025-03-03', eurKg: 0.59 }, { date: '2025-03-10', eurKg: 0.61 },
  { date: '2025-03-17', eurKg: 0.60 }, { date: '2025-03-24', eurKg: 0.62 }, { date: '2025-03-31', eurKg: 0.61 },
  { date: '2025-04-07', eurKg: 0.61 }, { date: '2025-04-14', eurKg: 0.60 }, { date: '2025-04-21', eurKg: 0.59 },
  { date: '2025-04-28', eurKg: 0.58 }, { date: '2025-05-05', eurKg: 0.58 }, { date: '2025-05-12', eurKg: 0.57 },
  { date: '2025-05-19', eurKg: 0.56 }, { date: '2025-05-26', eurKg: 0.55 }, { date: '2025-06-02', eurKg: 0.55 },
  { date: '2025-06-09', eurKg: 0.54 }, { date: '2025-06-16', eurKg: 0.54 }, { date: '2025-06-23', eurKg: 0.55 },
  { date: '2025-06-30', eurKg: 0.56 }, { date: '2025-07-07', eurKg: 0.56 }, { date: '2025-07-14', eurKg: 0.57 },
  { date: '2025-07-21', eurKg: 0.58 }, { date: '2025-07-28', eurKg: 0.59 }, { date: '2025-08-04', eurKg: 0.60 },
  { date: '2025-08-11', eurKg: 0.60 }, { date: '2025-08-18', eurKg: 0.61 }, { date: '2025-08-25', eurKg: 0.62 },
  { date: '2025-09-01', eurKg: 0.62 }, { date: '2025-09-08', eurKg: 0.63 }, { date: '2025-09-15', eurKg: 0.63 },
  { date: '2025-09-22', eurKg: 0.62 }, { date: '2025-09-29', eurKg: 0.61 }, { date: '2025-10-06', eurKg: 0.60 },
  { date: '2025-10-13', eurKg: 0.59 }, { date: '2025-10-20', eurKg: 0.59 }, { date: '2025-10-27', eurKg: 0.58 },
  { date: '2025-11-03', eurKg: 0.58 }, { date: '2025-11-10', eurKg: 0.57 }, { date: '2025-11-17', eurKg: 0.57 },
  { date: '2025-11-24', eurKg: 0.56 }, { date: '2025-12-01', eurKg: 0.56 }, { date: '2025-12-08', eurKg: 0.57 },
  { date: '2025-12-15', eurKg: 0.58 }, { date: '2025-12-22', eurKg: 0.58 }, { date: '2025-12-29', eurKg: 0.59 },
  { date: '2026-01-05', eurKg: 0.58 }, { date: '2026-01-12', eurKg: 0.57 }, { date: '2026-01-19', eurKg: 0.56 },
  { date: '2026-01-26', eurKg: 0.56 }, { date: '2026-02-02', eurKg: 0.55 }
];

const zones = [
  ['Valle del Guadalentín', '22% estimado', 'Lorca/Totana'],
  ['Huerta de Murcia', '20% estimado', 'Murcia y pedanías'],
  ['Vega Media', '18% estimado', 'Molina/Alguazas'],
  ['Noroeste y río Mula', '16% estimado', 'Mula/Bullas'],
  ['Campo de Cartagena', '14% estimado', 'Cartagena y entorno'],
  ['Vega Alta', '10% estimado', 'Cieza/Abarán']
];

const quiz = [
  { q: 'Murcia es una de las principales zonas exportadoras de limón de España.', a: true },
  { q: 'El limón no necesita riego en el clima murciano.', a: false },
  { q: 'La profesionalización del manipulado y la logística ha sido clave en el sector.', a: true }
];

const fmt = (n, d = 0) => new Intl.NumberFormat('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);

let recentChart;
let quizIndex = 0;

function renderKpis(year) {
  const current = yearlyData.reduce((prev, cur) => (Math.abs(cur.year - year) < Math.abs(prev.year - year) ? cur : prev));
  const base = yearlyData[0];
  const kpis = [
    ['Producción', `${fmt(current.productionKt)} kt`, `${fmt((current.productionKt / base.productionKt - 1) * 100, 1)}% vs 2004`],
    ['Superficie', `${fmt(current.areaHa)} ha`, `${fmt((current.areaHa / base.areaHa - 1) * 100, 1)}% vs 2004`],
    ['Rendimiento', `${fmt(current.yield, 1)} t/ha`, `${fmt((current.yield / base.yield - 1) * 100, 1)}% vs 2004`]
  ];
  const node = document.getElementById('kpiGrid');
  if (!node) return;
  node.innerHTML = kpis.map((k) => `<article class="kpi"><div class="label">${k[0]}</div><div class="value">${k[1]}</div><div class="label">${k[2]}</div></article>`).join('');
}

function initLongCharts() {
  if (!document.getElementById('productionChart') || typeof Chart === 'undefined') return;
  const years = yearlyData.map((d) => d.year);
  const common = { responsive: true, plugins: { legend: { position: 'top' } } };
  new Chart(document.getElementById('productionChart'), {
    type: 'line',
    data: { labels: years, datasets: [{ label: 'Producción (kt)', data: yearlyData.map((d) => d.productionKt), borderColor: '#2f9e44', backgroundColor: '#2f9e4422', fill: true }] },
    options: common
  });
  new Chart(document.getElementById('areaChart'), {
    type: 'line',
    data: { labels: years, datasets: [{ label: 'Superficie (ha)', data: yearlyData.map((d) => d.areaHa), borderColor: '#1971c2', backgroundColor: '#1971c222', fill: true }] },
    options: common
  });
  new Chart(document.getElementById('yieldChart'), {
    type: 'line',
    data: { labels: years, datasets: [{ label: 'Rendimiento (t/ha)', data: yearlyData.map((d) => d.yield), borderColor: '#5f3dc4', backgroundColor: '#5f3dc422', fill: true }] },
    options: common
  });
}

function updateRecentChart(daysWindow) {
  if (!document.getElementById('recentPriceChart') || typeof Chart === 'undefined') return;
  const weeksWindow = Math.max(4, Math.ceil(daysWindow / 7));
  const subset = recentPrices.slice(-weeksWindow);
  const labels = subset.map((p) => new Date(p.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }));
  const data = subset.map((p) => p.eurKg);
  const current = data[data.length - 1];
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const max = Math.max(...data);

  const kpiNode = document.getElementById('priceKpis');
  if (kpiNode) {
    kpiNode.innerHTML = [
      ['Precio actual (origen)', `${fmt(current, 2)} €/kg`],
      ['Media ventana', `${fmt(avg, 2)} €/kg`],
      ['Máximo ventana', `${fmt(max, 2)} €/kg`]
    ].map((k) => `<article class="kpi"><div class="label">${k[0]}</div><div class="value">${k[1]}</div></article>`).join('');
  }

  if (recentChart) recentChart.destroy();
  recentChart = new Chart(document.getElementById('recentPriceChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'Precio semanal limón Murcia (€/kg)', data, borderColor: '#f08c00', backgroundColor: '#f08c0022', fill: true, tension: 0.25 }]
    },
    options: { responsive: true, plugins: { legend: { position: 'top' } } }
  });
}

function initWindowButtons() {
  document.querySelectorAll('#windowButtons button').forEach((btn) => {
    btn.addEventListener('click', () => updateRecentChart(Number(btn.dataset.window)));
  });
}

function initTimelineControls() {
  const slider = document.getElementById('yearRange');
  const yearValue = document.getElementById('yearValue');
  if (!slider || !yearValue) return;
  slider.addEventListener('input', () => {
    yearValue.textContent = slider.value;
    renderKpis(Number(slider.value));
  });
}

function renderZones() {
  const node = document.getElementById('zones');
  if (!node) return;
  node.innerHTML = zones.map((z) => `
    <article class="zone">
      <strong>${z[0]}</strong>
      <span>${z[1]}</span>
      <small>${z[2]}</small>
    </article>
  `).join('');
}

function showQuiz() {
  const q = document.getElementById('quizQuestion');
  const f = document.getElementById('quizFeedback');
  if (!q || !f) return;
  q.textContent = quiz[quizIndex].q;
  f.textContent = '';
}

function initQuiz() {
  const feedback = document.getElementById('quizFeedback');
  const trueBtn = document.getElementById('quizTrue');
  const falseBtn = document.getElementById('quizFalse');
  const nextBtn = document.getElementById('quizNext');
  if (!feedback || !trueBtn || !falseBtn || !nextBtn) return;

  trueBtn.addEventListener('click', () => {
    feedback.textContent = quiz[quizIndex].a ? '✅ Correcto.' : '❌ Incorrecto.';
  });
  falseBtn.addEventListener('click', () => {
    feedback.textContent = !quiz[quizIndex].a ? '✅ Correcto.' : '❌ Incorrecto.';
  });
  nextBtn.addEventListener('click', () => {
    quizIndex = (quizIndex + 1) % quiz.length;
    showQuiz();
  });
  showQuiz();
}

function initSim() {
  const run = document.getElementById('runSim');
  const out = document.getElementById('simResult');
  if (!run || !out) return;

  run.addEventListener('click', () => {
    const water = Number(document.getElementById('water').value);
    const cost = Number(document.getElementById('cost').value);
    const market = Number(document.getElementById('market').value);
    const score = Math.round((water * 0.35) + (cost * 0.35) + (market * 0.3));
    out.textContent = score >= 75
      ? `Resultado ${score}/100: campaña sólida, buen equilibrio técnico-comercial.`
      : score >= 55
      ? `Resultado ${score}/100: campaña viable, mejora riego/costes para proteger margen.`
      : `Resultado ${score}/100: riesgo elevado, revisar estrategia y calendario de venta.`;
  });
}

function init() {
  renderZones();
  initLongCharts();
  updateRecentChart(30);
  initWindowButtons();
  initTimelineControls();
  renderKpis(2024);
  initQuiz();
  initSim();
}

document.addEventListener('DOMContentLoaded', init);
