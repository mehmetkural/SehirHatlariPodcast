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
      '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,.6);font-size:.9rem;padding:32px;text-align:center">Hat bulunamadı.<br><br><a href="index.html" style="color:#4ae183;font-weight:700">Ana sayfaya dön</a></div>';
    return;
  }

  document.title = route.name + ' — Şehir Hatları Podcast';
  document.getElementById('header-title').textContent = route.name;
  document.getElementById('header-subtitle').textContent = route.subtitle;

  buildStopsList();
  initMap();
  renderStop(0);
});

/* ─── Tab Switching ─── */
function switchTab(tab) {
  activeTab = tab;

  // Panel display
  document.getElementById('panel-podcast').style.display = tab === 'podcast' ? 'flex'  : 'none';
  document.getElementById('panel-stops').style.display   = tab === 'stops'   ? 'flex'  : 'none';
  document.getElementById('panel-map').style.display     = tab === 'map'     ? 'block' : 'none';

  // Nav active state
  ['podcast', 'stops', 'map'].forEach(t => {
    document.getElementById('tab-' + t).classList.toggle('active', t === tab);
  });

  if (tab === 'map' && map) setTimeout(() => map.invalidateSize(), 80);
}

/* ─── Stops List ─── */
function buildStopsList() {
  const list = document.getElementById('stops-list');
  list.innerHTML = '';

  route.stops.forEach((stop, i) => {
    const isLast = i === route.stops.length - 1;
    const item = document.createElement('div');
    item.id = 'stop-item-' + i;
    item.className = 'stop-item';
    item.innerHTML =
      '<div class="stop-timeline-col">' +
        '<div class="stop-dot" id="dot-' + i + '"></div>' +
        (!isLast ? '<div class="stop-line"></div>' : '') +
      '</div>' +
      '<div class="stop-item-info">' +
        '<div class="stop-item-name font-headline" id="stopname-' + i + '">' + stop.name + '</div>' +
        '<div class="stop-item-time">' + stop.time + '. dakika</div>' +
      '</div>' +
      '<div class="stop-item-chevron"><span class="material-symbols-outlined">chevron_right</span></div>';

    item.addEventListener('click', () => { goToStop(i); switchTab('podcast'); });
    list.appendChild(item);
  });
}

function updateStopsList(activeIndex) {
  route.stops.forEach((_, i) => {
    const item = document.getElementById('stop-item-' + i);
    const dot  = document.getElementById('dot-' + i);
    if (!item) return;

    item.classList.toggle('active', i === activeIndex);
    dot.classList.remove('current', 'done');
    if (i === activeIndex) dot.classList.add('current');
    else if (i < activeIndex) dot.classList.add('done');
  });

  const active = document.getElementById('stop-item-' + activeIndex);
  if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/* ─── Render Stop ─── */
function renderStop(index) {
  currentStopIndex = index;
  const stop  = route.stops[index];
  const total = route.stops.length;

  // Progress bar
  const pct = total > 1 ? (index / (total - 1)) * 100 : 100;
  document.getElementById('progress-fill').style.width = pct + '%';

  // Meta
  document.getElementById('stop-badge').textContent = 'Durak ' + (index + 1) + ' / ' + total;
  document.getElementById('stop-time-badge').innerHTML =
    '<span class="material-symbols-outlined" style="font-size:14px">schedule</span> ' + stop.time + '. dakika';
  document.getElementById('stop-title').textContent = stop.name;

  // Paragraphs
  const container = document.getElementById('paragraphs');
  container.innerHTML = '';
  container.scrollTop = 0;

  stop.content.forEach((text, i) => {
    const p = document.createElement('p');
    p.textContent = text;
    const isQuote = i === 1 && stop.content.length > 1;
    p.className = 'para-anim stop-para' + (isQuote ? ' stop-para--quote' : '');
    container.appendChild(p);
    setTimeout(() => p.classList.add('show'), 60 + i * 130);
  });

  // Skip buttons
  const prev = document.getElementById('btn-prev');
  const next  = document.getElementById('btn-next');
  prev.classList.toggle('disabled', index === 0);
  next.classList.toggle('disabled', index === total - 1);

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
    color: route.color, weight: 4, opacity: .75, dashArray: '8 4',
  }).addTo(map);

  route.stops.forEach((stop, i) => {
    const m = L.circleMarker([stop.lat, stop.lng], {
      radius: 7, fillColor: '#fff', color: route.color, weight: 2.5, fillOpacity: 1,
    }).addTo(map).bindTooltip(stop.name, { direction: 'top', offset: [0, -8] });

    m.on('click', () => { goToStop(i); switchTab('podcast'); });
    stopMarkers.push(m);
  });

  map.fitBounds(poly.getBounds(), { padding: [32, 32] });
}

function updateMapFocus(index) {
  stopMarkers.forEach((m, i) => {
    m.setStyle({ fillColor: i <= index ? route.color : '#fff', radius: i === index ? 11 : 7 });
  });
  if (activeTab === 'map') {
    const stop = route.stops[index];
    map.setView([stop.lat, stop.lng], 14, { animate: true });
  }
}

/* ─── TTS ─── */
function toggleTTS() { isSpeaking ? cancelTTS() : startTTS(); }

function startTTS() {
  if (!window.speechSynthesis) { showToast('Sesli okuma desteklenmiyor.'); return; }
  const text = route.stops[currentStopIndex].content.join(' ');
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'tr-TR'; u.rate = 0.92;
  const trVoice = speechSynthesis.getVoices().find(v => v.lang.startsWith('tr'));
  if (trVoice) u.voice = trVoice;
  u.onstart = () => { isSpeaking = true;  updateTTSBtn(true); };
  u.onend   = () => { isSpeaking = false; updateTTSBtn(false); };
  u.onerror = () => { isSpeaking = false; updateTTSBtn(false); };
  speechSynthesis.speak(u);
}

function cancelTTS() {
  if (window.speechSynthesis) speechSynthesis.cancel();
  isSpeaking = false;
  updateTTSBtn(false);
}

function updateTTSBtn(playing) {
  const btn   = document.getElementById('tts-btn');
  const label = document.getElementById('tts-label');
  if (!label) return;
  label.textContent = playing ? 'Durdurmak için Tıkla' : 'Sesli Dinle';
  btn.classList.toggle('playing', playing);
}

/* ─── Auto Advance ─── */
function toggleAutoAdvance() {
  autoAdvanceEnabled = !autoAdvanceEnabled;
  document.getElementById('auto-toggle').classList.toggle('on', autoAdvanceEnabled);
  if (autoAdvanceEnabled) scheduleAutoAdvance(currentStopIndex);
  else cancelAutoAdvance();
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
function toggleGPS() { gpsWatchId !== null ? stopGPS() : startGPS(); }

function startGPS() {
  if (!navigator.geolocation) { showToast('Konum desteklenmiyor.'); return; }
  showToast('📍 GPS konumu izleniyor…');
  setGPSState(true);
  gpsWatchId = navigator.geolocation.watchPosition(
    pos => {
      let bestIdx = 0, bestDist = Infinity;
      route.stops.forEach((s, i) => {
        const d = haversine(pos.coords.latitude, pos.coords.longitude, s.lat, s.lng);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      if (bestDist < 0.8 && bestIdx !== currentStopIndex) {
        showToast('📍 ' + route.stops[bestIdx].name);
        renderStop(bestIdx);
      }
    },
    () => stopGPS(),
    { enableHighAccuracy: true, maximumAge: 10000 }
  );
}

function stopGPS() {
  if (gpsWatchId !== null) { navigator.geolocation.clearWatch(gpsWatchId); gpsWatchId = null; }
  setGPSState(false);
  showToast('GPS kapatıldı.');
}

function setGPSState(on) {
  document.getElementById('gps-dot').classList.toggle('on', on);
  const lbl = document.getElementById('gps-label');
  lbl.classList.toggle('on', on);
  lbl.textContent = on ? 'GPS Aktif' : 'GPS';
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371, r = Math.PI / 180;
  const a = Math.sin((lat2-lat1)*r/2)**2
    + Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin((lng2-lng1)*r/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

/* ─── Toast ─── */
let _toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('gps-notif');
  el.textContent = msg;
  el.style.opacity = '1';
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { el.style.opacity = '0'; }, 3000);
}
