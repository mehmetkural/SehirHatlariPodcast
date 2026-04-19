/* ─── State ─── */
let route = null;
let currentStopIndex = 0;
let map = null;
let stopMarkers = [];
let gpsWatchId = null;
let isSpeaking = false;
let autoAdvanceEnabled = false;
let autoAdvanceTimer = null;
let activeTab = 'podcast';

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  route = ROUTES.find(r => r.id === params.get('route'));

  if (!route) {
    document.getElementById('panel-podcast').innerHTML =
      '<div class="flex items-center justify-center h-full text-white/60 text-sm p-8 text-center">Hat bulunamadı.<br><br><a href="index.html" class="underline">Ana sayfaya dön</a></div>';
    return;
  }

  document.title = `${route.name} — Şehir Hatları Podcast`;
  document.getElementById('header-title').textContent = route.name;
  document.getElementById('header-subtitle').textContent = route.subtitle;

  buildStopsList();
  initMap();
  renderStop(0);
});

/* ─── Tab Switching ─── */
function switchTab(tab) {
  activeTab = tab;
  const tabs = ['podcast', 'stops', 'map'];

  tabs.forEach(t => {
    const panel = document.getElementById(`panel-${t}`);
    const btn   = document.getElementById(`tab-${t}`);
    const ind   = document.getElementById(`ind-${t}`);
    const icon  = document.getElementById(`icon-${t}`);

    const isActive = t === tab;

    panel.classList.toggle('hidden', !isActive);

    btn.style.color = isActive ? '#fff' : '';
    btn.classList.toggle('text-white/40', !isActive);

    if (ind) ind.classList.toggle('hidden', !isActive);

    if (icon) {
      icon.style.color = isActive ? '#fff' : '';
      icon.style.fontVariationSettings = isActive
        ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
        : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
    }

    if (isActive && t === 'map' && map) {
      setTimeout(() => map.invalidateSize(), 60);
    }
  });
}

/* ─── Stops Sidebar ─── */
function buildStopsList() {
  const list = document.getElementById('stops-list');
  list.innerHTML = '';

  route.stops.forEach((stop, i) => {
    const isLast = i === route.stops.length - 1;
    const item = document.createElement('div');
    item.id = `stop-item-${i}`;
    item.className = 'flex items-start gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors hover:bg-surface-container';

    item.innerHTML = `
      <div class="flex flex-col items-center pt-0.5 flex-shrink-0 select-none">
        <div id="dot-${i}" class="w-3 h-3 rounded-full border-2 border-outline-variant bg-white transition-all duration-200 flex-shrink-0"></div>
        ${!isLast ? `<div class="w-0.5 h-8 bg-outline-variant/40 mt-1.5 rounded-full"></div>` : ''}
      </div>
      <div class="flex-1 min-w-0 pb-2">
        <div id="stopname-${i}" class="font-headline font-bold text-sm text-on-surface leading-tight">${stop.name}</div>
        <div class="text-[11px] text-outline mt-0.5">${stop.time}. dakika</div>
      </div>
      <span class="material-symbols-outlined text-[16px] text-outline/40 mt-0.5 flex-shrink-0 self-center">chevron_right</span>
    `;

    item.addEventListener('click', () => {
      goToStop(i);
      switchTab('podcast');
    });

    list.appendChild(item);
  });
}

function updateStopsList(activeIndex) {
  route.stops.forEach((_, i) => {
    const item = document.getElementById(`stop-item-${i}`);
    const dot  = document.getElementById(`dot-${i}`);
    const name = document.getElementById(`stopname-${i}`);
    if (!item) return;

    if (i === activeIndex) {
      item.style.background = 'rgba(0,93,144,0.07)';
      dot.style.background   = '#005d90';
      dot.style.borderColor  = '#005d90';
      dot.style.boxShadow    = '0 0 0 3px rgba(0,93,144,0.2)';
      name.style.color       = '#005d90';
    } else if (i < activeIndex) {
      item.style.background = '';
      dot.style.background   = '#0077b6';
      dot.style.borderColor  = '#0077b6';
      dot.style.boxShadow    = '';
      name.style.color       = '#1a1c1c';
    } else {
      item.style.background = '';
      dot.style.background   = '#fff';
      dot.style.borderColor  = '#bfc7d1';
      dot.style.boxShadow    = '';
      name.style.color       = '#1a1c1c';
    }
  });

  const active = document.getElementById(`stop-item-${activeIndex}`);
  if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/* ─── Render Stop ─── */
function renderStop(index) {
  currentStopIndex = index;
  const stop  = route.stops[index];
  const total = route.stops.length;

  // Progress
  const pct = total > 1 ? (index / (total - 1)) * 100 : 100;
  document.getElementById('progress-fill').style.width = pct + '%';

  // Meta
  document.getElementById('stop-badge').textContent = `Durak ${index + 1} / ${total}`;
  document.getElementById('stop-time-badge').innerHTML =
    `<span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:2px">schedule</span>${stop.time}. dakika`;
  document.getElementById('stop-title').textContent = stop.name;

  // Paragraphs
  const container = document.getElementById('paragraphs');
  container.innerHTML = '';
  container.scrollTop = 0;

  stop.content.forEach((text, i) => {
    const p = document.createElement('p');
    p.className = 'para-anim text-sm leading-relaxed';

    if (i === 1 && stop.content.length > 1) {
      // Middle para → blockquote style
      p.style.cssText = 'background:rgba(0,119,182,0.05);border-left:4px solid #0077b6;padding:12px 16px;border-radius:0 10px 10px 0;font-style:italic;font-weight:500;color:#1a1c1c';
    } else {
      p.style.color = '#3a4859';
    }

    p.textContent = text;
    container.appendChild(p);
    setTimeout(() => p.classList.add('show'), 60 + i * 130);
  });

  // Nav buttons
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  btnPrev.style.opacity        = index === 0 ? '0.25' : '0.6';
  btnPrev.style.pointerEvents  = index === 0 ? 'none' : 'auto';
  btnNext.style.opacity        = index === total - 1 ? '0.25' : '0.6';
  btnNext.style.pointerEvents  = index === total - 1 ? 'none' : 'auto';

  updateStopsList(index);
  updateMapFocus(index);
  cancelTTS();

  if (autoAdvanceEnabled) scheduleAutoAdvance(index);
}

function goToStop(index) {
  if (!route || index < 0 || index >= route.stops.length) return;
  cancelAutoAdvance();
  renderStop(index);
}

/* ─── Map ─── */
function initMap() {
  map = L.map('route-map');

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map);

  const latlngs = route.stops.map(s => [s.lat, s.lng]);

  const poly = L.polyline(latlngs, {
    color: route.color,
    weight: 4,
    opacity: 0.75,
    dashArray: '8 4',
  }).addTo(map);

  route.stops.forEach((stop, i) => {
    const m = L.circleMarker([stop.lat, stop.lng], {
      radius: 7,
      fillColor: '#fff',
      color: route.color,
      weight: 2.5,
      fillOpacity: 1,
    }).addTo(map)
      .bindTooltip(stop.name, { direction: 'top', offset: [0, -8] });

    m.on('click', () => { goToStop(i); switchTab('podcast'); });
    stopMarkers.push(m);
  });

  map.fitBounds(poly.getBounds(), { padding: [32, 32] });
}

function updateMapFocus(index) {
  const stop = route.stops[index];
  stopMarkers.forEach((m, i) => {
    m.setStyle({
      fillColor: i <= index ? route.color : '#fff',
      radius: i === index ? 11 : 7,
    });
  });
  if (activeTab === 'map') {
    map.setView([stop.lat, stop.lng], 14, { animate: true });
  }
}

/* ─── TTS ─── */
function toggleTTS() {
  isSpeaking ? cancelTTS() : startTTS();
}

function startTTS() {
  if (!window.speechSynthesis) { showNotif('Sesli okuma desteklenmiyor.'); return; }
  const stop = route.stops[currentStopIndex];
  const utterance = new SpeechSynthesisUtterance(stop.content.join(' '));
  utterance.lang  = 'tr-TR';
  utterance.rate  = 0.92;
  const trVoice = speechSynthesis.getVoices().find(v => v.lang.startsWith('tr'));
  if (trVoice) utterance.voice = trVoice;
  utterance.onstart = () => { isSpeaking = true;  updateTTSBtn(true); };
  utterance.onend   = () => { isSpeaking = false; updateTTSBtn(false); };
  utterance.onerror = () => { isSpeaking = false; updateTTSBtn(false); };
  speechSynthesis.speak(utterance);
}

function cancelTTS() {
  if (window.speechSynthesis) speechSynthesis.cancel();
  isSpeaking = false;
  updateTTSBtn(false);
}

function updateTTSBtn(speaking) {
  const label = document.getElementById('tts-label');
  const btn   = document.getElementById('tts-btn');
  if (!label) return;
  label.textContent = speaking ? 'Durdurmak için Tıkla' : 'Sesli Dinle';
  if (speaking) {
    btn.style.backgroundImage = 'linear-gradient(to right, #004b74, #005d90)';
  } else {
    btn.style.backgroundImage = '';
  }
}

/* ─── Auto Advance ─── */
function toggleAutoAdvance() {
  autoAdvanceEnabled = !autoAdvanceEnabled;
  const btn = document.getElementById('auto-toggle-btn');
  const dot = document.getElementById('auto-toggle-dot');
  if (autoAdvanceEnabled) {
    btn.style.background = '#008343';
    dot.style.transform  = 'translateX(20px)';
    scheduleAutoAdvance(currentStopIndex);
  } else {
    btn.style.background = '';
    dot.style.transform  = '';
    cancelAutoAdvance();
  }
}

function scheduleAutoAdvance(index) {
  cancelAutoAdvance();
  const next = route.stops[index + 1];
  if (!next) return;
  const ms = (next.time - route.stops[index].time) * 60 * 1000;
  autoAdvanceTimer = setTimeout(() => goToStop(index + 1), ms);
}

function cancelAutoAdvance() {
  if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
}

/* ─── GPS ─── */
function toggleGPS() {
  gpsWatchId !== null ? stopGPS() : startGPS();
}

function startGPS() {
  if (!navigator.geolocation) { showNotif('Konum desteklenmiyor.'); return; }
  showNotif('📍 GPS konumu izleniyor…');
  setGPSActive(true);
  gpsWatchId = navigator.geolocation.watchPosition(
    onGPSSuccess,
    () => stopGPS(),
    { enableHighAccuracy: true, maximumAge: 10000 }
  );
}

function stopGPS() {
  if (gpsWatchId !== null) { navigator.geolocation.clearWatch(gpsWatchId); gpsWatchId = null; }
  setGPSActive(false);
  showNotif('GPS kapatıldı.');
}

function setGPSActive(active) {
  const dot   = document.getElementById('gps-dot');
  const label = document.getElementById('gps-label');
  if (active) {
    dot.style.background  = '#6bfe9c';
    dot.style.boxShadow   = '0 0 8px rgba(107,254,156,0.9)';
    label.textContent     = 'GPS Aktif';
    label.style.color     = '#6bfe9c';
  } else {
    dot.style.background  = '';
    dot.style.boxShadow   = '';
    label.textContent     = 'GPS';
    label.style.color     = '';
  }
}

function onGPSSuccess(pos) {
  let bestIndex = 0, bestDist = Infinity;
  route.stops.forEach((stop, i) => {
    const d = haversine(pos.coords.latitude, pos.coords.longitude, stop.lat, stop.lng);
    if (d < bestDist) { bestDist = d; bestIndex = i; }
  });
  if (bestDist < 0.8 && bestIndex !== currentStopIndex) {
    showNotif(`📍 ${route.stops[bestIndex].name}`);
    renderStop(bestIndex);
  }
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371, d2r = Math.PI / 180;
  const a = Math.sin((lat2-lat1)*d2r/2)**2
    + Math.cos(lat1*d2r) * Math.cos(lat2*d2r) * Math.sin((lng2-lng1)*d2r/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

/* ─── Toast ─── */
let _notifTimer = null;
function showNotif(msg) {
  const el = document.getElementById('gps-notif');
  el.textContent = msg;
  el.style.opacity = '1';
  if (_notifTimer) clearTimeout(_notifTimer);
  _notifTimer = setTimeout(() => { el.style.opacity = '0'; }, 3000);
}
