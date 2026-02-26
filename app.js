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
  { date: '2025-09-08', eurKg: 0.63 }, { date: '2025-09-15', eurKg: 0.63 }, { date: '2025-09-22', eurKg: 0.62 },
  { date: '2025-09-29', eurKg: 0.61 }, { date: '2025-10-06', eurKg: 0.60 }, { date: '2025-10-13', eurKg: 0.59 },
  { date: '2025-10-20', eurKg: 0.59 }, { date: '2025-10-27', eurKg: 0.58 }, { date: '2025-11-03', eurKg: 0.58 },
  { date: '2025-11-10', eurKg: 0.57 }, { date: '2025-11-17', eurKg: 0.57 }, { date: '2025-11-24', eurKg: 0.56 },
  { date: '2025-12-01', eurKg: 0.56 }, { date: '2025-12-08', eurKg: 0.57 }, { date: '2025-12-15', eurKg: 0.58 },
  { date: '2025-12-22', eurKg: 0.58 }, { date: '2025-12-29', eurKg: 0.59 }, { date: '2026-01-05', eurKg: 0.58 },
  { date: '2026-01-12', eurKg: 0.57 }, { date: '2026-01-19', eurKg: 0.56 }, { date: '2026-01-26', eurKg: 0.56 },
  { date: '2026-02-02', eurKg: 0.55 }
];

const zones = [
  ['Valle del Guadalentín', '22% estimado', 'Lorca/Totana'],
  ['Huerta de Murcia', '20% estimado', 'Murcia y pedanías'],
  ['Vega Media', '18% estimado', 'Molina/Alguazas'],
  ['Noroeste y río Mula', '16% estimado', 'Mula/Bullas'],
  ['Campo de Cartagena', '14% estimado', 'Cartagena y entorno'],
  ['Vega Alta', '10% estimado', 'Cieza/Abarán']
];

const fmt = (n, d = 0) => new Intl.NumberFormat('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
let recentChart;

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
  new Chart(document.getElementById('productionChart'), { type: 'line', data: { labels: years, datasets: [{ label: 'Producción (kt)', data: yearlyData.map((d) => d.productionKt), borderColor: '#2f9e44', backgroundColor: '#2f9e4422', fill: true }] }, options: common });
  new Chart(document.getElementById('areaChart'), { type: 'line', data: { labels: years, datasets: [{ label: 'Superficie (ha)', data: yearlyData.map((d) => d.areaHa), borderColor: '#1971c2', backgroundColor: '#1971c222', fill: true }] }, options: common });
  new Chart(document.getElementById('yieldChart'), { type: 'line', data: { labels: years, datasets: [{ label: 'Rendimiento (t/ha)', data: yearlyData.map((d) => d.yield), borderColor: '#5f3dc4', backgroundColor: '#5f3dc422', fill: true }] }, options: common });
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
    data: { labels, datasets: [{ label: 'Precio semanal limón Murcia (€/kg)', data, borderColor: '#f08c00', backgroundColor: '#f08c0022', fill: true, tension: 0.25 }] },
    options: { responsive: true, plugins: { legend: { position: 'top' } } }
  });
}

function initWindowButtons() {
  document.querySelectorAll('#windowButtons button').forEach((btn) => btn.addEventListener('click', () => updateRecentChart(Number(btn.dataset.window))));
}
function initTimelineControls() {
  const slider = document.getElementById('yearRange');
  const yearValue = document.getElementById('yearValue');
  if (!slider || !yearValue) return;
  slider.addEventListener('input', () => { yearValue.textContent = slider.value; renderKpis(Number(slider.value)); });
}
function renderZones() {
  const node = document.getElementById('zones');
  if (!node) return;
  node.innerHTML = zones.map((z) => `<article class="zone"><strong>${z[0]}</strong><span>${z[1]}</span><small>${z[2]}</small></article>`).join('');
}

function initGameTrader() {
  const weekNode = document.getElementById('gtWeek');
  if (!weekNode) return;
  const prices = [0.56, 0.59, 0.61, 0.58, 0.64, 0.67, 0.63, 0.69, 0.66, 0.71];
  const st = { week: 0, stock: 120, rev: 0 };
  const log = document.getElementById('gtLog');
  const sell10 = document.getElementById('gtSell10');
  const sell20 = document.getElementById('gtSell20');
  const hold = document.getElementById('gtHold');
  const restart = document.getElementById('gtRestart');
  const progress = document.getElementById('gtProgress');

  const paint = () => {
    document.getElementById('gtWeek').textContent = String(Math.min(st.week + 1, prices.length));
    document.getElementById('gtPrice').textContent = fmt(prices[Math.min(st.week, prices.length - 1)], 2);
    document.getElementById('gtStock').textContent = fmt(st.stock, 0);
    progress.style.width = `${Math.round(((st.week) / prices.length) * 100)}%`;
  };
  const end = () => {
    const avg = st.rev / Math.max(1, (120 - st.stock));
    log.textContent = `Fin. Ingresos ${fmt(st.rev, 0)} € · Precio medio ${fmt(avg, 2)} €/kg. ${st.rev > 76000 ? '🏆 Magistral' : 'Reintenta para mejorar.'}`;
    [sell10, sell20, hold].forEach((b) => { b.disabled = true; });
  };
  const next = () => { st.week += 1; if (st.week >= prices.length || st.stock <= 0) end(); else paint(); };

  sell10.addEventListener('click', () => { const sold = Math.min(10, st.stock); st.stock -= sold; st.rev += sold * 1000 * prices[st.week]; log.textContent = `Vendiste ${sold} t.`; next(); });
  sell20.addEventListener('click', () => { const sold = Math.min(20, st.stock); st.stock -= sold; st.rev += sold * 1000 * prices[st.week]; log.textContent = `Vendiste ${sold} t.`; next(); });
  hold.addEventListener('click', () => { log.textContent = 'Esperaste buscando mejor precio.'; next(); });
  restart.addEventListener('click', () => { st.week = 0; st.stock = 120; st.rev = 0; [sell10, sell20, hold].forEach((b) => { b.disabled = false; }); log.textContent = 'Nueva partida.'; paint(); });
  paint();
}

function initGameLogistica() {
  const lotNode = document.getElementById('glLot');
  if (!lotNode) return;
  const loads = [{ t: 9, p: 0.58 }, { t: 14, p: 0.61 }, { t: 11, p: 0.6 }, { t: 16, p: 0.62 }, { t: 12, p: 0.57 }, { t: 10, p: 0.63 }, { t: 15, p: 0.59 }, { t: 13, p: 0.64 }];
  const routes = { local: { bonus: 0.01, cost: 0.02 }, nacional: { bonus: 0.03, cost: 0.05 }, export: { bonus: 0.06, cost: 0.09 } };
  const st = { i: 0, score: 0 };
  const log = document.getElementById('glLog');
  const buttons = document.querySelectorAll('.glRoute');
  const restart = document.getElementById('glRestart');

  const paint = () => {
    const d = loads[Math.min(st.i, loads.length - 1)];
    document.getElementById('glLot').textContent = String(Math.min(st.i + 1, loads.length));
    document.getElementById('glTons').textContent = fmt(d.t, 0);
    document.getElementById('glBase').textContent = fmt(d.p, 2);
  };
  buttons.forEach((btn) => btn.addEventListener('click', () => {
    const d = loads[st.i];
    const r = routes[btn.dataset.route];
    const net = (d.p + r.bonus - r.cost) * d.t * 1000;
    st.score += net;
    st.i += 1;
    if (st.i >= loads.length) {
      buttons.forEach((b) => { b.disabled = true; });
      log.textContent = `Final: margen ${fmt(st.score, 0)} €. ${st.score > 54000 ? '🚚 Campeón logístico' : 'Buen nivel, prueba otro mix.'}`;
    } else {
      log.textContent = `+${fmt(net, 0)} € en este lote. Acumulado ${fmt(st.score, 0)} €.`;
      paint();
    }
  }));
  restart.addEventListener('click', () => { st.i = 0; st.score = 0; buttons.forEach((b) => { b.disabled = false; }); log.textContent = 'Nueva ronda.'; paint(); });
  paint();
}

function initGamePlagas() {
  const roundNode = document.getElementById('gpRound');
  if (!roundNode) return;
  const events = [18, 24, 15, 30, 20, 28, 22];
  const actions = { rapida: { cost: 8, block: 10 }, equilibrada: { cost: 14, block: 18 }, premium: { cost: 22, block: 28 } };
  const st = { i: 0, budget: 100, health: 100 };
  const eventText = document.getElementById('gpEvent');
  const log = document.getElementById('gpLog');
  const restart = document.getElementById('gpRestart');

  const paint = () => {
    document.getElementById('gpRound').textContent = String(Math.min(st.i + 1, events.length));
    document.getElementById('gpBudget').textContent = fmt(st.budget, 0);
    document.getElementById('gpHealth').textContent = fmt(st.health, 0);
    eventText.textContent = `Amenaza estimada de esta semana: ${events[Math.min(st.i, events.length - 1)]} puntos.`;
  };
  document.querySelectorAll('.gpAction').forEach((btn) => btn.addEventListener('click', () => {
    const a = actions[btn.dataset.action];
    if (st.budget < a.cost) { log.textContent = 'No tienes presupuesto suficiente para esa respuesta.'; return; }
    st.budget -= a.cost;
    const dmg = Math.max(0, events[st.i] - a.block);
    st.health = Math.max(0, st.health - dmg);
    st.i += 1;
    if (st.i >= events.length || st.health <= 0) {
      log.textContent = `Resultado final: salud ${fmt(st.health, 0)}% y presupuesto ${fmt(st.budget, 0)}. ${st.health >= 70 ? '🛡️ Gestión excelente' : 'Puedes mejorar el balance riesgo/coste.'}`;
    } else {
      log.textContent = `Daño recibido ${fmt(dmg, 0)}.`; paint();
    }
  }));
  restart.addEventListener('click', () => { st.i = 0; st.budget = 100; st.health = 100; log.textContent = 'Nueva campaña de defensa.'; paint(); });
  paint();
}

function initGameRiego() {
  const weekNode = document.getElementById('grWeek');
  if (!weekNode) return;
  const weather = [12, 14, 8, 18, 20, 11, 9, 16, 13, 17];
  const st = { i: 0, water: 100, yieldScore: 100 };
  const log = document.getElementById('grLog');

  const paint = () => {
    document.getElementById('grWeek').textContent = String(Math.min(st.i + 1, weather.length));
    document.getElementById('grWeather').textContent = `${weather[Math.min(st.i, weather.length - 1)]} (demanda hídrica)`;
    document.getElementById('grWaterBank').textContent = fmt(st.water, 0);
  };

  document.getElementById('grApply').addEventListener('click', () => {
    const input = Number(document.getElementById('grInput').value);
    if (input > st.water) { log.textContent = 'No hay agua suficiente disponible.'; return; }
    st.water -= input;
    const diff = Math.abs(weather[st.i] - input);
    st.yieldScore = Math.max(0, st.yieldScore - diff * 1.8);
    st.i += 1;
    if (st.i >= weather.length) {
      log.textContent = `Fin de temporada: rendimiento ${fmt(st.yieldScore, 0)}/100. ${st.yieldScore > 78 ? '💧 Maestro del riego' : 'Reajusta la dosis semanal para mejorar.'}`;
    } else {
      log.textContent = `Desajuste de esta semana: ${fmt(diff, 0)}.`;
      paint();
    }
  });

  document.getElementById('grRestart').addEventListener('click', () => { st.i = 0; st.water = 100; st.yieldScore = 100; log.textContent = 'Nuevo ciclo de riego.'; paint(); });
  paint();
}

function initGameQuizPro() {
  const qNode = document.getElementById('gqQ');
  if (!qNode) return;
  const data = [
    { q: '¿Qué indicador mide t/ha?', o: ['Producción', 'Rendimiento', 'Superficie'], a: 1 },
    { q: '¿Qué ventana sirve para táctica inmediata?', o: ['30 días', '365 días', '5 años'], a: 0 },
    { q: '¿Qué suele tener mayor coste logístico?', o: ['Local', 'Nacional', 'Exportación'], a: 2 },
    { q: '¿Qué órgano publica observatorio de precios en Murcia?', o: ['CARM', 'FAO', 'BCE'], a: 0 },
    { q: 'En estrés hídrico, ¿qué es clave?', o: ['Riego eficiente', 'Más superficie', 'Menos seguimiento'], a: 0 },
    { q: '¿Qué variable afecta el margen?', o: ['Precio y costes', 'Solo clima', 'Solo producción'], a: 0 },
    { q: '¿Qué mejora competitividad exterior?', o: ['Trazabilidad', 'Aleatoriedad', 'Descontrol de calidad'], a: 0 },
    { q: '¿Qué estrategia reduce riesgo?', o: ['Monitorización semanal', 'Ignorar precios', 'Vender al azar'], a: 0 }
  ];
  let i = 0; let score = 0; let time = 15; let timer;
  const timerNode = document.getElementById('gqTimer');
  const log = document.getElementById('gqLog');
  const optionsNode = document.getElementById('gqOptions');

  const paint = () => {
    document.getElementById('gqIndex').textContent = String(i + 1);
    qNode.textContent = data[i].q;
    optionsNode.innerHTML = data[i].o.map((opt, idx) => `<button class="gqOpt" data-idx="${idx}" type="button">${opt}</button>`).join('');
    document.querySelectorAll('.gqOpt').forEach((btn) => btn.addEventListener('click', () => {
      if (Number(btn.dataset.idx) === data[i].a) score += 10;
      i += 1;
      if (i >= data.length) {
        clearInterval(timer);
        log.textContent = `Resultado final: ${score}/80 (${Math.round((score / 80) * 100)}%).`;
        qNode.textContent = 'Quiz completado';
        optionsNode.innerHTML = '';
      } else {
        time = 15;
        paint();
      }
    }));
  };
  timer = setInterval(() => {
    time -= 1;
    timerNode.textContent = String(time);
    if (time <= 0) {
      i += 1; time = 15;
      if (i >= data.length) {
        clearInterval(timer);
        log.textContent = `Tiempo agotado. Resultado ${score}/80.`;
        qNode.textContent = 'Quiz finalizado';
        optionsNode.innerHTML = '';
      } else {
        paint();
      }
    }
  }, 1000);

  document.getElementById('gqRestart').addEventListener('click', () => {
    clearInterval(timer);
    i = 0; score = 0; time = 15; timerNode.textContent = '15'; log.textContent = 'Reinicio completo.'; paint();
    timer = setInterval(() => {
      time -= 1;
      timerNode.textContent = String(time);
      if (time <= 0) {
        i += 1; time = 15;
        if (i >= data.length) {
          clearInterval(timer);
          log.textContent = `Tiempo agotado. Resultado ${score}/80.`;
          qNode.textContent = 'Quiz finalizado';
          optionsNode.innerHTML = '';
        } else paint();
      }
    }, 1000);
  });
  paint();
}

function initGameRanking() {
  const run = document.getElementById('rkRun');
  if (!run) return;
  const table = document.getElementById('rkTable');
  const log = document.getElementById('rkLog');
  const key = 'limonRankingV1';
  const read = () => JSON.parse(localStorage.getItem(key) || '[]');
  const draw = () => {
    const items = read();
    table.innerHTML = items.map((x) => `<li>${x.name}: <strong>${x.score}</strong></li>`).join('');
  };

  run.addEventListener('click', () => {
    const water = Number(document.getElementById('rkWater').value);
    const cost = Number(document.getElementById('rkCost').value);
    const market = Number(document.getElementById('rkMarket').value);
    const innovation = Number(document.getElementById('rkInnovation').value);
    const score = Math.round(water * 0.27 + cost * 0.23 + market * 0.3 + innovation * 0.2);
    const items = read();
    items.push({ name: `Campaña ${items.length + 1}`, score });
    items.sort((a, b) => b.score - a.score);
    localStorage.setItem(key, JSON.stringify(items.slice(0, 8)));
    log.textContent = `Has obtenido ${score}/100.`;
    draw();
  });

  document.getElementById('rkClear').addEventListener('click', () => { localStorage.removeItem(key); draw(); log.textContent = 'Ranking borrado.'; });
  draw();
}

function init() {
  renderZones();
  initLongCharts();
  updateRecentChart(30);
  initWindowButtons();
  initTimelineControls();
  renderKpis(2024);

  initGameTrader();
  initGameLogistica();
  initGamePlagas();
  initGameRiego();
  initGameQuizPro();
  initGameRanking();
}

document.addEventListener('DOMContentLoaded', init);
