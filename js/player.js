/* ─── State ─── */
let route = null;
let currentStopIndex = 0;
let map = null;
let routePolyline = null;
let stopMarkers = [];
let currentMarker = null;
let gpsWatchId = null;
let ttsUtterance = null;
let isSpeaking = false;
let autoAdvanceEnabled = false;
let autoAdvanceTimer = null;
let activeMobileTab = 'podcast';

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const routeId = params.get('route');

  route = ROUTES.find(r => r.id === routeId);
  if (!route) {
    document.getElementById('podcast-content').innerHTML =
      '<div class="status-message">Hat bulunamadı. <a href="index.html">Anasayfa</a>\'ya dönün.</div>';
    return;
  }

  document.title = `${route.name} — Şehir Hatları Podcast`;
  document.getElementById('header-title').textContent = route.name;
  document.getElementById('header-subtitle').textContent = route.subtitle;

  buildStopsList();
  initMap();
  renderStop(0);
  setupMobileTabs();
  setupGPSButton();
});

/* ─── Stops sidebar ─── */
function buildStopsList() {
  const list = document.getElementById('stops-list');
  list.innerHTML = '';

  route.stops.forEach((stop, i) => {
    const item = document.createElement('div');
    item.className = 'stop-item';
    item.id = `stop-item-${i}`;
    item.innerHTML = `
      <div class="stop-dot-wrap">
        <div class="stop-dot"></div>
        <div class="stop-line"></div>
      </div>
      <div class="stop-info">
        <div class="stop-item-name">${stop.name}</div>
        <div class="stop-item-time">${stop.time} dk</div>
      </div>
    `;
    item.addEventListener('click', () => goToStop(i));
    list.appendChild(item);
  });
}

function updateStopsList(activeIndex) {
  route.stops.forEach((_, i) => {
    const item = document.getElementById(`stop-item-${i}`);
    if (!item) return;
    item.classList.toggle('active', i === activeIndex);
    item.classList.toggle('visited', i < activeIndex);
  });

  const activeItem = document.getElementById(`stop-item-${activeIndex}`);
  if (activeItem) {
    activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

/* ─── Map ─── */
function initMap() {
  map = L.map('route-map', { zoomControl: true });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map);

  const latlngs = route.stops.map(s => [s.lat, s.lng]);

  routePolyline = L.polyline(latlngs, {
    color: route.color,
    weight: 4,
    opacity: 0.7,
    dashArray: '8, 4',
  }).addTo(map);

  route.stops.forEach((stop, i) => {
    const marker = L.circleMarker([stop.lat, stop.lng], {
      radius: 7,
      fillColor: '#fff',
      color: route.color,
      weight: 2.5,
      fillOpacity: 1,
    })
      .addTo(map)
      .bindTooltip(stop.name, { direction: 'top', offset: [0, -8] });

    marker.on('click', () => goToStop(i));
    stopMarkers.push(marker);
  });

  map.fitBounds(routePolyline.getBounds(), { padding: [30, 30] });
}

function updateMapFocus(stopIndex) {
  const stop = route.stops[stopIndex];

  stopMarkers.forEach((m, i) => {
    m.setStyle({
      fillColor: i <= stopIndex ? route.color : '#fff',
      radius: i === stopIndex ? 10 : 7,
    });
  });

  map.setView([stop.lat, stop.lng], 14, { animate: true });

  const overlay = document.getElementById('map-overlay');
  overlay.style.display = 'block';
  document.getElementById('overlay-stop').textContent = stop.name;
  document.getElementById('overlay-desc').textContent =
    stop.content[0].slice(0, 90) + '…';
}

/* ─── Render stop ─── */
function renderStop(index) {
  currentStopIndex = index;
  const stop = route.stops[index];
  const total = route.stops.length;

  // Progress bar
  const pct = total > 1 ? (index / (total - 1)) * 100 : 100;
  document.getElementById('progress-fill').style.width = pct + '%';

  // Podcast content
  const content = document.getElementById('podcast-content');
  content.innerHTML = `
    <div class="stop-header">
      <span class="stop-number">Durak ${index + 1} / ${total}</span>
    </div>
    <h1 class="stop-title">${stop.name}</h1>
    <div class="stop-time-badge">⏱ Yaklaşık ${stop.time}. dakika</div>

    <div style="display:flex; gap:10px; margin-bottom:24px; flex-wrap:wrap;">
      <button class="tts-btn" id="tts-btn" onclick="toggleTTS()">
        🔊 Sesli Dinle
      </button>
    </div>

    <div class="podcast-paragraphs" id="paragraphs">
      ${stop.content.map((p, i) => `
        <p class="podcast-para" data-index="${i}">${p}</p>
      `).join('')}
    </div>

    <div class="podcast-nav">
      <button class="nav-btn nav-btn-prev" onclick="goToStop(${index - 1})" ${index === 0 ? 'disabled' : ''}>
        ← Önceki
      </button>
      <button class="nav-btn nav-btn-next" onclick="goToStop(${index + 1})" ${index === total - 1 ? 'disabled' : ''}>
        ${index === total - 1 ? 'Son Durak ✓' : 'Sonraki →'}
      </button>
      <div class="auto-advance">
        <label class="toggle-switch" title="Otomatik ilerleme">
          <input type="checkbox" id="auto-toggle" ${autoAdvanceEnabled ? 'checked' : ''} onchange="toggleAutoAdvance(this.checked)">
          <span class="toggle-slider"></span>
        </label>
        <span>Otomatik</span>
      </div>
    </div>
  `;

  // Animate paragraphs in
  const paras = content.querySelectorAll('.podcast-para');
  paras.forEach((p, i) => {
    setTimeout(() => p.classList.add('visible'), 80 + i * 140);
  });

  // Highlight first paragraph
  if (paras.length > 0) {
    setTimeout(() => paras[0].classList.add('playing'), 300);
    setTimeout(() => paras[0].classList.remove('playing'), 3500);
  }

  updateStopsList(index);
  updateMapFocus(index);
  cancelTTS();

  if (autoAdvanceEnabled) {
    scheduleAutoAdvance(index);
  }

  // Scroll podcast panel to top
  document.getElementById('podcast-content').parentElement.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToStop(index) {
  if (index < 0 || index >= route.stops.length) return;
  cancelAutoAdvance();
  renderStop(index);
}

/* ─── Text-to-Speech ─── */
function toggleTTS() {
  if (isSpeaking) {
    cancelTTS();
    return;
  }
  startTTS();
}

function startTTS() {
  if (!window.speechSynthesis) {
    showNotif('Tarayıcınız sesli okumayı desteklemiyor.');
    return;
  }

  const stop = route.stops[currentStopIndex];
  const fullText = stop.content.join(' ');

  ttsUtterance = new SpeechSynthesisUtterance(fullText);
  ttsUtterance.lang = 'tr-TR';
  ttsUtterance.rate = 0.92;
  ttsUtterance.pitch = 1;

  const voices = speechSynthesis.getVoices();
  const trVoice = voices.find(v => v.lang.startsWith('tr'));
  if (trVoice) ttsUtterance.voice = trVoice;

  ttsUtterance.onstart = () => {
    isSpeaking = true;
    updateTTSButton(true);
    highlightParasWhileSpeaking();
  };

  ttsUtterance.onend = () => {
    isSpeaking = false;
    updateTTSButton(false);
  };

  ttsUtterance.onerror = () => {
    isSpeaking = false;
    updateTTSButton(false);
  };

  speechSynthesis.speak(ttsUtterance);
}

function cancelTTS() {
  if (window.speechSynthesis) speechSynthesis.cancel();
  isSpeaking = false;
  updateTTSButton(false);
}

function updateTTSButton(speaking) {
  const btn = document.getElementById('tts-btn');
  if (!btn) return;
  if (speaking) {
    btn.innerHTML = `<span class="pulse"></span> Duraksatmak için Tıkla`;
    btn.classList.add('speaking');
  } else {
    btn.innerHTML = '🔊 Sesli Dinle';
    btn.classList.remove('speaking');
  }
}

function highlightParasWhileSpeaking() {
  const paras = document.querySelectorAll('.podcast-para');
  const stop = route.stops[currentStopIndex];
  const durations = stop.content.map(p => Math.max(3000, p.length * 60));
  const totalDuration = durations.reduce((a, b) => a + b, 0);

  let elapsed = 0;
  paras.forEach((p, i) => {
    const delay = elapsed;
    elapsed += durations[i];
    setTimeout(() => {
      if (!isSpeaking) return;
      paras.forEach(el => el.classList.remove('playing'));
      p.classList.add('playing');
      p.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, delay);
  });
}

/* ─── Auto advance ─── */
function toggleAutoAdvance(enabled) {
  autoAdvanceEnabled = enabled;
  if (enabled) {
    scheduleAutoAdvance(currentStopIndex);
  } else {
    cancelAutoAdvance();
  }
}

function scheduleAutoAdvance(index) {
  cancelAutoAdvance();
  const stop = route.stops[index];
  const nextStop = route.stops[index + 1];
  if (!nextStop) return;

  const waitMs = (nextStop.time - stop.time) * 60 * 1000;
  autoAdvanceTimer = setTimeout(() => {
    goToStop(index + 1);
  }, waitMs);
}

function cancelAutoAdvance() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

/* ─── GPS ─── */
function setupGPSButton() {
  document.getElementById('gps-btn').addEventListener('click', () => {
    if (gpsWatchId !== null) {
      stopGPS();
    } else {
      startGPS();
    }
  });
}

function startGPS() {
  if (!navigator.geolocation) {
    showNotif('Tarayıcınız konum özelliğini desteklemiyor.');
    return;
  }

  showNotif('📍 Konum izleniyor…');
  document.getElementById('gps-btn').classList.add('active');
  document.getElementById('gps-btn').textContent = '📍 GPS Aktif';

  gpsWatchId = navigator.geolocation.watchPosition(
    onGPSSuccess,
    onGPSError,
    { enableHighAccuracy: true, maximumAge: 10000 }
  );
}

function stopGPS() {
  if (gpsWatchId !== null) {
    navigator.geolocation.clearWatch(gpsWatchId);
    gpsWatchId = null;
  }
  document.getElementById('gps-btn').classList.remove('active');
  document.getElementById('gps-btn').innerHTML = '📍 GPS';
  showNotif('GPS kapatıldı.');
}

function onGPSSuccess(pos) {
  const userLat = pos.coords.latitude;
  const userLng = pos.coords.longitude;

  // Find nearest stop
  let bestIndex = 0;
  let bestDist = Infinity;
  route.stops.forEach((stop, i) => {
    const d = haversine(userLat, userLng, stop.lat, stop.lng);
    if (d < bestDist) {
      bestDist = d;
      bestIndex = i;
    }
  });

  // Only jump if within 800 m of a stop
  if (bestDist < 0.8 && bestIndex !== currentStopIndex) {
    showNotif(`📍 ${route.stops[bestIndex].name}\'a geçiliyor`);
    renderStop(bestIndex);
  }
}

function onGPSError(err) {
  showNotif('Konum alınamadı. İzinleri kontrol edin.');
  stopGPS();
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

/* ─── Mobile tabs ─── */
function setupMobileTabs() {
  const tabs = document.querySelectorAll('#player-tabs .tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      activeMobileTab = btn.dataset.target;
      updateMobileTabVisibility();
    });
  });
  updateMobileTabVisibility();
}

function updateMobileTabVisibility() {
  const panels = {
    podcast: document.getElementById('podcast-panel'),
    stops: document.getElementById('stops-panel'),
    map: document.getElementById('map-panel'),
  };

  Object.entries(panels).forEach(([key, el]) => {
    if (!el) return;
    if (key === activeMobileTab) {
      el.classList.add('tab-active');
      el.style.display = key === 'map' ? 'block' : 'flex';
      if (key === 'map' && map) setTimeout(() => map.invalidateSize(), 50);
    } else {
      el.classList.remove('tab-active');
      if (window.innerWidth <= 700) el.style.display = 'none';
    }
  });
}

/* ─── Notification helper ─── */
let notifTimer = null;
function showNotif(msg) {
  const el = document.getElementById('gps-notif');
  el.textContent = msg;
  el.classList.add('show');
  if (notifTimer) clearTimeout(notifTimer);
  notifTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

// Restore stops-panel display on larger screens
window.addEventListener('resize', () => {
  if (window.innerWidth > 700) {
    document.getElementById('stops-panel').style.display = '';
    document.getElementById('podcast-panel').style.display = 'flex';
    document.getElementById('map-panel').style.display = '';
    if (map) map.invalidateSize();
  }
});
