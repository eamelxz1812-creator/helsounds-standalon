/**
 * HELSOUNDS — script.js
 * Player real (HTML5 Audio + Web Audio API EQ),
 * playlists dinâmicas, equalizador, controles interativos.
 */

// ============================================================
//  DADOS
// ============================================================
const TRACKS = [
  // ── Billie Eilish — HIT ME HARD AND SOFT ──────────────────
  { id:  1, title: "LUNCH",              artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", emoji: "🍑", cover: 1, src: "/music/billie_lunch.mp3" },
  { id:  2, title: "WILDFLOWER",         artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", emoji: "🌸", cover: 2, src: "/music/billie_wildflower.mp3" },
  { id:  3, title: "CHIHIRO",            artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", emoji: "🦋", cover: 3, src: "/music/billie_chihiro.mp3" },
  { id:  4, title: "BIRDS OF A FEATHER", artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", emoji: "🐦", cover: 4, src: "/music/billie_birds_of_a_feather.mp3" },
  { id:  5, title: "BLUE",               artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", emoji: "🩵", cover: 5, src: "/music/billie_blue.mp3" },
  { id:  6, title: "SKINNY",             artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", emoji: "🕊️", cover: 6, src: "/music/billie_skinny.mp3" },
  { id:  7, title: "BITTERSUITE",        artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", emoji: "🎻", cover: 7, src: "/music/billie_bittersuite.mp3" },
  { id:  8, title: "THE DINER",          artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", emoji: "🍽️", cover: 8, src: "/music/billie_the_diner.mp3" },
  { id:  9, title: "THE GREATEST",       artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", emoji: "🏆", cover: 9, src: "/music/billie_the_greatest.mp3" },
  { id: 10, title: "L'AMOUR DE MA VIE",  artist: "Billie Eilish", album: "HIT ME HARD AND SOFT", emoji: "💙", cover: 0, src: "/music/billie_lamour_de_ma_vie.mp3" },
  // ── Costa Gold ────────────────────────────────────────────
  { id: 11, title: "Quem Tava Lá",       artist: "Costa Gold ft. Luccas Carlos & Marechal", album: "Single", emoji: "🎤", cover: 1, src: "/music/quem_tava_la.mp3" },
  { id: 12, title: "Doce Veneno",        artist: "Costa Gold",  album: "Single", emoji: "🐍", cover: 2, src: "/music/costa_doce_veneno.mp3" },
  { id: 13, title: "VAGO",               artist: "Costa Gold",  album: "Single", emoji: "🌫️", cover: 3, src: "/music/costa_vago.mp3" },
  { id: 14, title: "A História de João Gatilho", artist: "Costa Gold", album: "Single", emoji: "🔫", cover: 4, src: "/music/costa_joao_gatilho.mp3" },
  { id: 15, title: "Dás Arábia",         artist: "Costa Gold",  album: "Single", emoji: "🏜️", cover: 5, src: "/music/costa_das_arabia.mp3" },
  { id: 16, title: "DAMASSACLAN",        artist: "Costa Gold",  album: "TheCypherDeffect", emoji: "🎙️", cover: 6, src: "/music/costa_damassaclan.mp3" },
  { id: 17, title: "Chama os Mulekes",   artist: "Costa Gold",  album: "Single", emoji: "📢", cover: 7, src: "/music/costa_chama_os_mulekes.mp3" },
  // ── Michael Jackson ───────────────────────────────────────
  { id: 19, title: "A Place With No Name", artist: "Michael Jackson", album: "Xscape", emoji: "🌌", cover: 9, src: "/music/mj_a_place_with_no_name.mp3" },
  { id: 20, title: "Blue Gangsta",       artist: "Michael Jackson", album: "Xscape", emoji: "🔵", cover: 0, src: "/music/mj_blue_gangsta.mp3" },
  { id: 21, title: "Chicago",            artist: "Michael Jackson", album: "Xscape", emoji: "🏙️", cover: 1, src: "/music/mj_chicago.mp3" },
  // ── Djonga ────────────────────────────────────────────────
  { id: 22, title: "SOLTO pt. Hot",      artist: "Djonga",      album: "Single", emoji: "🔥", cover: 2, src: "/music/djonga_solto.mp3" },
  // ── Michael Jackson (mais) ────────────────────────────────
  { id: 23, title: "Love Never Felt So Good", artist: "Michael Jackson", album: "Xscape", emoji: "💛", cover: 3, src: "/music/mj_love_never_felt_so_good.mp3" },
  { id: 24, title: "Loving You",         artist: "Michael Jackson", album: "Xscape", emoji: "🤍", cover: 4, src: "/music/mj_loving_you.mp3" },
  { id: 25, title: "Do You Know Where Your Children Are", artist: "Michael Jackson", album: "Xscape", emoji: "🌙", cover: 5, src: "/music/mj_do_you_know.mp3" },
  // ── Chris Brown ───────────────────────────────────────────
  { id: 26, title: "No One Else",        artist: "Chris Brown ft. Fridayy", album: "Single", emoji: "🫀", cover: 6, src: "/music/chris_brown_no_one_else.mp3" },
  // ── Costa Gold (mais) ─────────────────────────────────────
  { id: 27, title: "Supremo",            artist: "Costa Gold",  album: "TKO", emoji: "👑", cover: 7, src: "/music/costa_supremo.mp3" },
  { id: 28, title: "The Cypher Deffect 2", artist: "Costa Gold ft. Kant, Chayco & Spinar", album: "Single", emoji: "🎙️", cover: 8, src: "/music/costa_cypher_deffect_2.mp3" },
  { id: 29, title: "Irmão DQbrada",      artist: "Costa Gold & Haikaiss", album: "Single", emoji: "🤝", cover: 9, src: "/music/costa_haikaiss_irmao_dqbrada.mp3" },
  { id: 30, title: "Capítulo 2 — Chapei", artist: "La Viela & Costa Gold", album: "Single", emoji: "🎩", cover: 0, src: "/music/la_viela_costa_chapei.mp3" },
  // ── Haikaiss ──────────────────────────────────────────────
  { id: 31, title: "A Praga",            artist: "Haikaiss",    album: "Single", emoji: "🐍", cover: 1, src: "/music/haikaiss_a_praga.mp3" },
  { id: 32, title: "RAP LORD",           artist: "Haikaiss ft. Jonas Bento", album: "Single", emoji: "👁️", cover: 2, src: "/music/haikaiss_rap_lord.mp3" },
  { id: 33, title: "Sem Graça",          artist: "Haikaiss",    album: "Single", emoji: "😶", cover: 3, src: "/music/haikaiss_sem_graca.mp3" },
  // ── Filipe Ret ────────────────────────────────────────────
  { id: 34, title: "Libertários Não Morrem", artist: "Filipe Ret ft. Funkero", album: "Single", emoji: "✊", cover: 4, src: "/music/filipe_ret_libertarios.mp3" },
  // ── Froid ─────────────────────────────────────────────────
  { id: 35, title: "Lamentável pt. III", artist: "Froid ft. Cynthia Luz", album: "Single", emoji: "😔", cover: 5, src: "/music/froid_lamentavel_3.mp3" },
  // ── Grego ─────────────────────────────────────────────────
  { id: 36, title: "Inevitável",         artist: "Grego",       album: "Single", emoji: "💔", cover: 6, src: "/music/grego_inevitavel.mp3" },
  // ── Cypher ────────────────────────────────────────────────
  { id: 37, title: "Reza Sincera",       artist: "Pablo Martins, MZ, Xamã, Knust, Pelé M", album: "Cypher", emoji: "🙏", cover: 7, src: "/music/cypher_reza_sincera.mp3" },
  // ── Class A ───────────────────────────────────────────────
  { id: 38, title: "Uma Dose",           artist: "Class A",     album: "Single", emoji: "🥃", cover: 8, src: "/music/class_a_uma_dose.mp3" },
  // ── MC Sid & Nog ──────────────────────────────────────────
  { id: 39, title: "Sítio do Tio Harry", artist: "MC Sid & Nog", album: "Single", emoji: "🏡", cover: 9, src: "/music/mc_sid_sitio_tio_harry.mp3" },
  // ── Imprevisto / Yago Oproprio ────────────────────────────
  { id: 40, title: "Imprevisto",         artist: "Yago Oproprio ft. Rô Rosa", album: "Single", emoji: "⚡", cover: 0, src: "/music/imprevisto_yago.mp3" },
  // ── Costa Gold / Predella / Maori / Bigu ─────────────────
  { id: 41, title: "Sessão de Rima",     artist: "Predella ft. Costa Gold, Maori & Bigu", album: "Single", emoji: "🎤", cover: 1, src: "/music/sessao_de_rima_predella.mp3" },
  // ── KayArchon ─────────────────────────────────────────────
  { id: 42, title: "She Goes By",        artist: "KayArchon",   album: "Single", emoji: "🌊", cover: 2, src: "/music/she_goes_by_kayarchon.mp3" },
  // ── Michael Jackson (Xscape album) ───────────────────────
  { id: 43, title: "Slave to the Rhythm", artist: "Michael Jackson", album: "Xscape", emoji: "🕺", cover: 3, src: "/music/mj_slave_to_the_rhythm.mp3" },
  { id: 44, title: "Xscape",             artist: "Michael Jackson", album: "Xscape", emoji: "🌌", cover: 4, src: "/music/mj_xscape.mp3" },
  { id: 45, title: "Love Never Felt So Good", artist: "Michael Jackson & Justin Timberlake", album: "Xscape", emoji: "💖", cover: 5, src: "/music/mj_jt_love_never_felt.mp3" },
  // ── N.A.D.A.B.O.M ─────────────────────────────────────────
  { id: 46, title: "N.A.D.A.B.O.M",     artist: "Costa Gold",  album: "Single", emoji: "🔥", cover: 6, src: "/music/nadabom.mp3" },
  // ── Noah Kahan ────────────────────────────────────────────
  { id: 47, title: "Orbiter",            artist: "Noah Kahan",  album: "Single", emoji: "🛸", cover: 7, src: "/music/noah_kahan_orbiter.mp3" },
  // ── Recayd Mob ────────────────────────────────────────────
  { id: 48, title: "Plaqtudum",          artist: "Recayd Mob ft. Jé Santiago, Derek & Dfideliz", album: "Single", emoji: "💣", cover: 8, src: "/music/recayd_mob_plaqtudum.mp3" },
  // ── Cova 66 ───────────────────────────────────────────────
  { id: 49, title: "Sacode o Pó (Rosa Caveira)", artist: "Cova 66", album: "Single", emoji: "💀", cover: 9, src: "/music/cova_66_sacode_po.mp3" },
  // ── 5 Pontos de Maria Navalha ─────────────────────────────
  { id: 50, title: "5 Pontos de Maria Navalha", artist: "Maria Navalha", album: "Single", emoji: "🌹", cover: 0, src: "/music/5_pontos_maria_navalha.mp3" },
];

// ============================================================
//  WEB AUDIO API — Equalizador
// ============================================================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let sourceNode = null;

const EQ_BANDS = [
  { id: "subbass",  freq: 60,    type: "lowshelf"  },
  { id: "bass",     freq: 250,   type: "peaking"   },
  { id: "lowmid",   freq: 500,   type: "peaking"   },
  { id: "mid",      freq: 1000,  type: "peaking"   },
  { id: "presence", freq: 4000,  type: "peaking"   },
  { id: "treble",   freq: 12000, type: "highshelf" },
];

const EQ_PRESETS = {
  flat:       [0, 0, 0, 0, 0, 0],
  bass:       [6, 5, 1, -1, 0, 0],
  vocal:      [-2, -1, 3, 4, 3, 1],
  electronic: [5, 3, -1, 2, 2, 4],
  acoustic:   [2, 2, 0, 2, 3, 3],
};

let eqFilters = [];

function initAudioCtx() {
  if (audioCtx) return;
  audioCtx = new AudioCtx();
  sourceNode = audioCtx.createMediaElementSource(audio);

  // Build EQ chain
  eqFilters = EQ_BANDS.map((band) => {
    const filter = audioCtx.createBiquadFilter();
    filter.type      = band.type;
    filter.frequency.value = band.freq;
    filter.gain.value      = 0;
    filter.Q.value         = 1;
    return filter;
  });

  // Connect chain: source → f0 → f1 → … → destination
  let prev = sourceNode;
  eqFilters.forEach((f) => { prev.connect(f); prev = f; });
  prev.connect(audioCtx.destination);
}

function setEqBand(bandIndex, gainDb) {
  initAudioCtx();
  if (eqFilters[bandIndex]) eqFilters[bandIndex].gain.value = gainDb;
}

function applyPreset(presetName) {
  const values = EQ_PRESETS[presetName] || EQ_PRESETS.flat;
  EQ_BANDS.forEach((band, i) => {
    const slider = document.getElementById(`eq-${band.id}`);
    const valEl  = document.getElementById(`val-${band.id}`);
    if (slider) slider.value = values[i];
    if (valEl)  valEl.textContent = (values[i] >= 0 ? "+" : "") + values[i];
    setEqBand(i, values[i]);
  });
}

// ============================================================
//  HTML5 AUDIO
// ============================================================
const audio = new Audio();
audio.preload = "metadata";
audio.volume  = 0.7;

// ============================================================
//  STATE
// ============================================================
const state = {
  currentIndex:  -1,
  isPlaying:     false,
  isShuffle:     false,
  isRepeat:      false,
  isMuted:       false,
  volume:        0.7,
  playbackRate:  1,
  likedTracks:   new Set(),
  playlists:     [],          // { name, trackIds[] }
  currentPlaylistIdx: -1,     // índice da playlist aberta na view
};

// ============================================================
//  DOM HELPERS
// ============================================================
const $ = (id) => document.getElementById(id);

const els = {
  trackList:      $("trackList"),
  featuredGrid:   $("featuredGrid"),
  libraryGrid:    $("libraryGrid"),
  searchResults:  $("searchResults"),
  searchEmpty:    $("searchEmpty"),
  searchInput:    $("searchInput"),
  searchClear:    $("searchClear"),
  greetingText:   $("greetingText"),
  playlistList:   $("playlistList"),
  // Player
  playerCover:    $("playerCover"),
  playerTitle:    $("playerTitle"),
  playerArtist:   $("playerArtist"),
  playBtn:        $("playBtn"),
  prevBtn:        $("prevBtn"),
  nextBtn:        $("nextBtn"),
  shufflePBtn:    $("shufflePBtn"),
  repeatBtn:      $("repeatBtn"),
  heartBtn:       $("heartBtn"),
  timeCurrent:    $("timeCurrent"),
  timeTotal:      $("timeTotal"),
  progressBar:    $("progressBar"),
  progressFill:   $("progressFill"),
  progressThumb:  $("progressThumb"),
  volumeBar:      $("volumeBar"),
  volumeFill:     $("volumeFill"),
  volumeThumb:    $("volumeThumb"),
  volumeBtn:      $("volumeBtn"),
  // Layout
  sidebar:              $("sidebar"),
  sidebarOverlay:       $("sidebarOverlay"),
  topbarMenuBtn:        $("topbarMenuBtn"),
  createPlaylistBtn:    $("createPlaylistBtn"),
  shuffleAllBtn:        $("shuffleAllBtn"),
  settingsBtn:          $("settingsBtn"),
  notifBtn:             $("notifBtn"),
  notifDot:             $("notifDot"),
  profileBtn:           $("profileBtn"),
  queueBtn:             $("queueBtn"),
  // Modals
  modalPlaylist:        $("modalPlaylist"),
  playlistName:         $("playlistName"),
  trackChecklist:       $("trackChecklist"),
  savePlaylistBtn:      $("savePlaylistBtn"),
  modalSettings:        $("modalSettings"),
  resetEqBtn:           $("resetEqBtn"),
  speedSlider:          $("speedSlider"),
  speedLabel:           $("speedLabel"),
  toast:                $("toast"),
  // Playlist view
  playlistViewTitle:    $("playlistViewTitle"),
  playlistViewCount:    $("playlistViewCount"),
  playlistTrackList:    $("playlistTrackList"),
  playlistPlayAllBtn:   $("playlistPlayAllBtn"),
  backFromPlaylist:     $("backFromPlaylist"),
  // Artists
  artistsGrid:          $("artistsGrid"),
  artistsCount:         $("artistsCount"),
  artistSearchInput:    $("artistSearchInput"),
  artistSearchClear:    $("artistSearchClear"),
  artistNoResults:      $("artistNoResults"),
  artistNoResultsTerm:  $("artistNoResultsTerm"),
  artistHeroAvatar:     $("artistHeroAvatar"),
  artistHeroName:       $("artistHeroName"),
  artistHeroMeta:       $("artistHeroMeta"),
  artistTrackList:      $("artistTrackList"),
  artistPlayAllBtn:     $("artistPlayAllBtn"),
  artistShuffleBtn:     $("artistShuffleBtn"),
  backFromArtist:       $("backFromArtist"),
};

// ============================================================
//  UTILS
// ============================================================
function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function setGreeting() {
  const h = new Date().getHours();
  let g = "Boa noite";
  if (h >= 5 && h < 12)  g = "Bom dia";
  else if (h >= 12 && h < 18) g = "Boa tarde";
  if (els.greetingText) els.greetingText.textContent = g;
}

function currentTrack() {
  return state.currentIndex >= 0 ? TRACKS[state.currentIndex] : null;
}

let toastTimer = null;
function showToast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2200);
}

// ============================================================
//  PROGRESS UI
// ============================================================
function setProgressUI(ratio) {
  const pct = Math.max(0, Math.min(ratio * 100, 100));
  els.progressFill.style.width = pct + "%";
  els.progressThumb.style.left = pct + "%";
}

// ============================================================
//  AUDIO EVENTS
// ============================================================
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  setProgressUI(audio.currentTime / audio.duration);
  els.timeCurrent.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  els.timeTotal.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", () => {
  if (state.isRepeat) { audio.currentTime = 0; audio.play().catch(() => {}); }
  else nextTrack();
});

// ============================================================
//  LOAD / PLAY / PAUSE
// ============================================================
function loadTrack(index) {
  const track = TRACKS[index];
  if (!track) return;

  audio.pause();
  state.currentIndex = index;
  state.isPlaying    = false;

  els.playerTitle.textContent  = track.title;
  els.playerArtist.textContent = track.artist;
  els.playerCover.innerHTML    = `
    <div class="cover-${track.cover}" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:26px">
      ${track.emoji}
    </div>`;

  setProgressUI(0);
  els.timeCurrent.textContent = "0:00";
  els.timeTotal.textContent   = "…";

  audio.src = track.src;
  audio.playbackRate = state.playbackRate;
  audio.load();

  updateHeartBtn();
  renderTrackList();
}

function play() {
  if (state.currentIndex < 0) { loadTrack(0); }
  state.isPlaying = true;
  els.playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';

  // Resume AudioContext if suspended (browser autoplay policy)
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();

  audio.play().catch((err) => {
    console.warn("Autoplay blocked:", err);
  });
  renderTrackList();
}

function pause() {
  state.isPlaying = false;
  els.playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
  audio.pause();
  renderTrackList();
}

function togglePlay() {
  if (state.currentIndex < 0) { loadTrack(0); play(); return; }
  state.isPlaying ? pause() : play();
}

function prevTrack() {
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  const idx = state.currentIndex <= 0 ? TRACKS.length - 1 : state.currentIndex - 1;
  loadTrack(idx);
  if (state.isPlaying) play();
}

function nextTrack() {
  let idx;
  if (state.isShuffle) {
    do { idx = Math.floor(Math.random() * TRACKS.length); }
    while (idx === state.currentIndex && TRACKS.length > 1);
  } else {
    idx = state.currentIndex >= TRACKS.length - 1 ? 0 : state.currentIndex + 1;
  }
  loadTrack(idx);
  if (state.isPlaying) play();
}

// ============================================================
//  PROGRESS BAR — seek
// ============================================================
function setupProgressBar() {
  let dragging = false;

  function seek(clientX) {
    const rect  = els.progressBar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1));
    setProgressUI(ratio);
    if (audio.duration) {
      audio.currentTime = ratio * audio.duration;
      els.timeCurrent.textContent = formatTime(audio.currentTime);
    }
  }

  els.progressBar.addEventListener("mousedown",  (e) => { dragging = true; seek(e.clientX); });
  document.addEventListener("mousemove",          (e) => { if (dragging) seek(e.clientX); });
  document.addEventListener("mouseup",            ()  => { dragging = false; });
  els.progressBar.addEventListener("touchstart",  (e) => { dragging = true; seek(e.touches[0].clientX); }, { passive: true });
  document.addEventListener("touchmove",          (e) => { if (dragging) seek(e.touches[0].clientX); }, { passive: true });
  document.addEventListener("touchend",           ()  => { dragging = false; });
}

// ============================================================
//  VOLUME
// ============================================================
function setupVolumeBar() {
  let dragging = false;

  function apply(clientX) {
    const rect  = els.volumeBar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1));
    state.volume  = ratio;
    state.isMuted = ratio === 0;
    audio.volume  = state.isMuted ? 0 : ratio;
    updateVolumeUI();
  }

  els.volumeBar.addEventListener("mousedown", (e) => { dragging = true; apply(e.clientX); });
  document.addEventListener("mousemove",       (e) => { if (dragging) apply(e.clientX); });
  document.addEventListener("mouseup",         ()  => { dragging = false; });
}

function updateVolumeUI() {
  const pct = state.isMuted ? 0 : state.volume * 100;
  els.volumeFill.style.width = pct + "%";
  els.volumeThumb.style.left = pct + "%";
  const icon = els.volumeBtn.querySelector("i");
  if (pct === 0)     icon.className = "bi bi-volume-mute-fill";
  else if (pct < 50) icon.className = "bi bi-volume-down-fill";
  else               icon.className = "bi bi-volume-up-fill";
}

function toggleMute() {
  state.isMuted = !state.isMuted;
  audio.volume  = state.isMuted ? 0 : state.volume;
  updateVolumeUI();
}

// ============================================================
//  SHUFFLE / REPEAT
// ============================================================
function toggleShuffle() {
  state.isShuffle = !state.isShuffle;
  els.shufflePBtn.classList.toggle("active", state.isShuffle);
  showToast(state.isShuffle ? "Modo aleatório ativado" : "Modo aleatório desativado");
}

function toggleRepeat() {
  state.isRepeat = !state.isRepeat;
  audio.loop     = state.isRepeat;
  els.repeatBtn.classList.toggle("active", state.isRepeat);
  showToast(state.isRepeat ? "Repetição ativada" : "Repetição desativada");
}

// ============================================================
//  HEART / LIKE
// ============================================================
function toggleHeart() {
  const t = currentTrack();
  if (!t) return;

  if (state.likedTracks.has(t.id)) {
    state.likedTracks.delete(t.id);
    showToast("Removido das curtidas");
  } else {
    state.likedTracks.add(t.id);
    showToast("❤️ Adicionado às curtidas");
  }

  // Pop animation
  els.heartBtn.classList.remove("pop");
  void els.heartBtn.offsetWidth; // reflow
  els.heartBtn.classList.add("pop");

  updateHeartBtn();
}

function updateHeartBtn() {
  const t = currentTrack();
  const liked = t && state.likedTracks.has(t.id);
  els.heartBtn.classList.toggle("liked", !!liked);
  els.heartBtn.querySelector("i").className = liked ? "bi bi-heart-fill" : "bi bi-heart";
}

// ============================================================
//  RENDER — TRACK LIST
// ============================================================
function renderTrackList(tracks, listEl, showIndex) {
  const target    = listEl  || els.trackList;
  const trackSet  = tracks  || TRACKS;
  if (!target) return;

  target.innerHTML = trackSet.map((t, i) => {
    const globalIdx = TRACKS.indexOf(t);
    const isActive  = state.currentIndex === globalIdx;
    const isPlaying = isActive && state.isPlaying;
    const num       = showIndex !== undefined ? showIndex[i] : (i + 1);

    return `
    <div class="track-row ${isActive ? "playing" : ""}"
         data-index="${globalIdx}" role="button" tabindex="0"
         aria-label="Reproduzir ${t.title}">
      <div class="col-num">
        <span class="track-num">${num}</span>
        <span class="track-play-inline">
          ${isPlaying
            ? '<span class="playing-indicator"><span></span><span></span><span></span></span>'
            : '<i class="bi bi-play-fill"></i>'}
        </span>
      </div>
      <div class="track-title-col">
        <div class="track-cover-sm cover-${t.cover}">${t.emoji}</div>
        <div class="track-meta">
          <div class="track-name">${t.title}</div>
          <div class="track-album">${t.album}</div>
        </div>
      </div>
      <span class="track-artist-label">${t.artist}</span>
      <span class="track-duration" id="dur-gl-${globalIdx}">—</span>
    </div>`;
  }).join("");

  // Load durations
  trackSet.forEach((t) => {
    const globalIdx = TRACKS.indexOf(t);
    const el = document.getElementById(`dur-gl-${globalIdx}`);
    if (!el || el.dataset.loaded) return;
    const tmp = new Audio();
    tmp.preload = "metadata";
    tmp.src = t.src;
    tmp.addEventListener("loadedmetadata", () => {
      if (el) { el.textContent = formatTime(tmp.duration); el.dataset.loaded = "1"; }
    });
  });

  // Click
  target.querySelectorAll(".track-row").forEach((row) => {
    row.addEventListener("click", () => {
      const idx = parseInt(row.dataset.index, 10);
      if (state.currentIndex === idx) togglePlay();
      else { loadTrack(idx); play(); }
    });
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); row.click(); }
    });
  });
}

// ============================================================
//  RENDER — FEATURED
// ============================================================
function renderFeatured() {
  if (!els.featuredGrid) return;
  els.featuredGrid.innerHTML = TRACKS.map((t) => {
    const idx = TRACKS.indexOf(t);
    return `
    <div class="featured-card" data-index="${idx}">
      <div class="featured-cover cover-${t.cover}">
        <span style="font-size:52px">${t.emoji}</span>
        <button class="featured-play" data-index="${idx}"><i class="bi bi-play-fill"></i></button>
      </div>
      <div class="featured-info">
        <div class="featured-title">${t.title}</div>
        <div class="featured-artist">${t.artist}</div>
      </div>
    </div>`;
  }).join("");

  els.featuredGrid.querySelectorAll(".featured-play").forEach((btn) => {
    btn.addEventListener("click", (e) => { e.stopPropagation(); loadTrack(parseInt(btn.dataset.index, 10)); play(); });
  });
  els.featuredGrid.querySelectorAll(".featured-card").forEach((card) => {
    card.addEventListener("click", () => { loadTrack(parseInt(card.dataset.index, 10)); play(); });
  });
}

// ============================================================
//  RENDER — LIBRARY
// ============================================================
function renderLibrary() {
  if (!els.libraryGrid) return;
  els.libraryGrid.innerHTML = TRACKS.map((t, i) => `
    <div class="featured-card" data-index="${i}">
      <div class="featured-cover cover-${t.cover}" style="height:160px">
        <span style="font-size:52px">${t.emoji}</span>
        <button class="featured-play" data-index="${i}"><i class="bi bi-play-fill"></i></button>
      </div>
      <div class="featured-info">
        <div class="featured-title">${t.title}</div>
        <div class="featured-artist">${t.artist}</div>
      </div>
    </div>`).join("");

  els.libraryGrid.querySelectorAll(".featured-card, .featured-play").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      loadTrack(parseInt(el.dataset.index, 10));
      play();
    });
  });
}

// ============================================================
//  PLAYLISTS
// ============================================================
function renderPlaylists() {
  if (!els.playlistList) return;
  if (!state.playlists.length) {
    els.playlistList.innerHTML = `<li class="playlist-item" style="color:var(--text-muted);font-size:12px;padding:10px 12px">Nenhuma playlist criada</li>`;
    return;
  }
  els.playlistList.innerHTML = state.playlists.map((pl, i) => `
    <li class="playlist-item" data-pl="${i}" role="button" tabindex="0">
      <i class="bi bi-music-note-list"></i>
      <span>${pl.name}</span>
      <span style="margin-left:auto;font-size:11px;color:var(--text-muted)">${pl.trackIds.length}</span>
    </li>`).join("");

  els.playlistList.querySelectorAll(".playlist-item[data-pl]").forEach((item) => {
    item.addEventListener("click", () => openPlaylistView(parseInt(item.dataset.pl, 10)));
  });
}

function openPlaylistView(plIdx) {
  const pl = state.playlists[plIdx];
  if (!pl) return;
  state.currentPlaylistIdx = plIdx;

  const tracks = pl.trackIds.map((id) => TRACKS.find((t) => t.id === id)).filter(Boolean);

  els.playlistViewTitle.textContent = pl.name;
  els.playlistViewCount.textContent = `${tracks.length} música${tracks.length !== 1 ? "s" : ""}`;

  renderTrackList(tracks, els.playlistTrackList, tracks.map((_, i) => i + 1));
  showSection("playlist");
}

// ── Modal: Criar Playlist ────────────────────────────────────
function openPlaylistModal() {
  // Build checklist
  els.trackChecklist.innerHTML = TRACKS.map((t) => `
    <label class="checklist-item" data-id="${t.id}">
      <input type="checkbox" value="${t.id}" />
      <span class="checklist-check"><i class="bi bi-check-lg"></i></span>
      <div class="checklist-thumb cover-${t.cover}">${t.emoji}</div>
      <div class="checklist-meta">
        <div class="checklist-title">${t.title}</div>
        <div class="checklist-artist">${t.artist}</div>
      </div>
    </label>`).join("");

  els.trackChecklist.querySelectorAll(".checklist-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const cb = item.querySelector("input");
      cb.checked = !cb.checked;
      item.classList.toggle("checked", cb.checked);
    });
  });

  els.playlistName.value = "";
  openModal("modalPlaylist");
  setTimeout(() => els.playlistName.focus(), 100);
}

function savePlaylist() {
  const name = els.playlistName.value.trim();
  if (!name) { els.playlistName.focus(); showToast("Digite um nome para a playlist"); return; }

  const checked = [...els.trackChecklist.querySelectorAll("input:checked")];
  const trackIds = checked.map((cb) => parseInt(cb.value, 10));

  if (!trackIds.length) { showToast("Selecione ao menos uma música"); return; }

  state.playlists.push({ name, trackIds });
  renderPlaylists();
  closeModal("modalPlaylist");
  showToast(`✅ Playlist "${name}" criada com ${trackIds.length} música${trackIds.length !== 1 ? "s" : ""}!`);
}

// ============================================================
//  SECTIONS
// ============================================================
function showSection(name) {
  document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById("section-" + name);
  if (target) target.classList.add("active");
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.section === name);
  });
  closeMobileSidebar();
}

// ============================================================
//  SEARCH
// ============================================================
function handleSearch(query) {
  query = query.trim().toLowerCase();
  els.searchClear.classList.toggle("visible", query.length > 0);

  if (!query) {
    if (els.searchEmpty) {
      els.searchEmpty.style.display = "flex";
      els.searchEmpty.querySelector("p").textContent = "Digite algo para buscar músicas ou artistas";
    }
    document.querySelectorAll(".search-result-row").forEach((el) => el.remove());
    return;
  }

  if (els.searchEmpty) els.searchEmpty.style.display = "none";
  showSection("search");
  document.querySelectorAll(".nav-item").forEach((i) => i.classList.remove("active"));
  document.querySelectorAll(".search-result-row").forEach((el) => el.remove());

  const results = TRACKS.filter((t) =>
    t.title.toLowerCase().includes(query) ||
    t.artist.toLowerCase().includes(query) ||
    t.album.toLowerCase().includes(query)
  );

  if (!results.length) {
    if (els.searchEmpty) {
      els.searchEmpty.style.display = "flex";
      els.searchEmpty.querySelector("p").textContent = `Nenhum resultado para "${query}"`;
    }
    return;
  }

  const container = document.createElement("div");
  container.className = "track-table search-result-row";
  container.innerHTML = `
    <div class="track-table-head">
      <span class="col-num">#</span><span class="col-title">Título</span>
      <span class="col-artist">Artista</span><span class="col-duration"><i class="bi bi-clock"></i></span>
    </div>
    <div class="track-list" id="searchTrackList"></div>`;
  els.searchResults.appendChild(container);

  const listEl = container.querySelector("#searchTrackList");
  renderTrackList(results, listEl, results.map((_, i) => i + 1));
}

// ============================================================
//  MODAL HELPERS
// ============================================================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("open");
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("open");
}

// Close on overlay click or data-modal button
document.addEventListener("click", (e) => {
  // Close button with data-modal
  const closeBtn = e.target.closest("[data-modal]");
  if (closeBtn) { closeModal(closeBtn.dataset.modal); return; }
  // Click outside modal box
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("open");
  }
});

// ============================================================
//  MOBILE SIDEBAR
// ============================================================
function openMobileSidebar() {
  els.sidebar.classList.add("open");
  els.sidebarOverlay.classList.add("visible");
}

function closeMobileSidebar() {
  els.sidebar.classList.remove("open");
  els.sidebarOverlay.classList.remove("visible");
}

// ============================================================
//  EQUALIZER SETUP
// ============================================================
function setupEqualizer() {
  EQ_BANDS.forEach((band, i) => {
    const slider = document.getElementById(`eq-${band.id}`);
    const valEl  = document.getElementById(`val-${band.id}`);
    if (!slider) return;

    slider.addEventListener("input", () => {
      const v = parseFloat(slider.value);
      if (valEl) valEl.textContent = (v >= 0 ? "+" : "") + v;
      setEqBand(i, v);
      // Deselect presets
      document.querySelectorAll(".preset-btn[data-preset]").forEach((b) => b.classList.remove("active"));
    });
  });

  // Presets
  document.querySelectorAll(".preset-btn[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".preset-btn[data-preset]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyPreset(btn.dataset.preset);
    });
  });

  // Reset
  els.resetEqBtn.addEventListener("click", () => {
    applyPreset("flat");
    document.querySelectorAll(".preset-btn[data-preset]").forEach((b) => b.classList.remove("active"));
    document.querySelector(".preset-btn[data-preset='flat']").classList.add("active");
  });

  // Speed
  els.speedSlider.addEventListener("input", () => {
    const v = parseFloat(els.speedSlider.value);
    state.playbackRate  = v;
    audio.playbackRate  = v;
    els.speedLabel.textContent = v + "×";
    document.querySelectorAll(".preset-btn[data-speed]").forEach((b) => {
      b.classList.toggle("active", parseFloat(b.dataset.speed) === v);
    });
  });

  document.querySelectorAll(".preset-btn[data-speed]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = parseFloat(btn.dataset.speed);
      state.playbackRate  = v;
      audio.playbackRate  = v;
      els.speedSlider.value = v;
      els.speedLabel.textContent = v + "×";
      document.querySelectorAll(".preset-btn[data-speed]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

// ============================================================
//  ARTISTS
// ============================================================

// Avatar colours — one per "slot" so each artist looks distinct
const ARTIST_COLORS = [
  "linear-gradient(135deg,#0f3460,#533483)",
  "linear-gradient(135deg,#1a1a2e,#e94560)",
  "linear-gradient(135deg,#2c2c54,#474787)",
  "linear-gradient(135deg,#192a56,#2f3640)",
  "linear-gradient(135deg,#1e272e,#485460)",
  "linear-gradient(135deg,#2d3436,#636e72)",
  "linear-gradient(135deg,#130f40,#6c5ce7)",
  "linear-gradient(135deg,#0d0d0d,#3d3d3d)",
  "linear-gradient(135deg,#2d132c,#ee4540)",
  "linear-gradient(135deg,#0c0c0c,#2c2c2c)",
];

/**
 * Extract the "primary" artist name — everything before ft./feat./part.
 * Keeps group names intact (e.g. "MC Sid & Nog" stays as-is).
 */
function getPrimaryArtist(str) {
  return str
    .split(/ ft\. | feat\. | part\. /i)[0]
    .trim();
}

/**
 * Build a map: primaryArtistName → { tracks[], colorIdx, emoji }
 * A track can appear under multiple primary artists when the `artist`
 * field contains comma/ampersand-separated names AND it's clearly a
 * collab (we split only on " & " when both names are ≥ 3 chars and
 * neither is "ft." style).
 */
function buildArtistMap() {
  const map = new Map(); // key: primaryArtistName → { tracks, colorIdx, emoji }
  let colorCursor = 0;

  TRACKS.forEach((track) => {
    const primary = getPrimaryArtist(track.artist);

    // Optionally also credit secondary artist in "&" collabs
    let names = [primary];
    // If the primary still contains " & " (duo group like "MC Sid & Nog" vs collab)
    // we only split if neither half is tiny (avoids splitting "MZ" etc.)
    if (primary.includes(" & ")) {
      const parts = primary.split(" & ").map((s) => s.trim());
      if (parts.every((p) => p.length >= 4)) {
        names = parts;
      }
    }

    names.forEach((name) => {
      if (!map.has(name)) {
        map.set(name, {
          tracks:   [],
          colorIdx: colorCursor++ % ARTIST_COLORS.length,
          emoji:    track.emoji,
        });
      }
      const entry = map.get(name);
      if (!entry.tracks.includes(track)) {
        entry.tracks.push(track);
      }
    });
  });

  // Sort by track count desc, then alphabetically
  return new Map(
    [...map.entries()].sort((a, b) => {
      const diff = b[1].tracks.length - a[1].tracks.length;
      return diff !== 0 ? diff : a[0].localeCompare(b[0], "pt");
    })
  );
}

function renderArtists() {
  if (!els.artistsGrid) return;
  const map = buildArtistMap();

  els.artistsCount.textContent = `${map.size} artistas`;

  els.artistsGrid.innerHTML = [...map.entries()].map(([name, data]) => {
    const n = data.tracks.length;
    return `
    <div class="artist-card" data-artist="${encodeURIComponent(name)}" role="button" tabindex="0">
      <div class="artist-avatar" style="background:${ARTIST_COLORS[data.colorIdx]}">
        ${data.emoji}
        <div class="artist-card-play"><i class="bi bi-play-fill"></i></div>
      </div>
      <div class="artist-card-name">${name}</div>
      <div class="artist-card-count">${n} música${n !== 1 ? "s" : ""}</div>
    </div>`;
  }).join("");

  els.artistsGrid.querySelectorAll(".artist-card").forEach((card) => {
    const handler = () => openArtistView(decodeURIComponent(card.dataset.artist));
    card.addEventListener("click", handler);
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handler(); } });
  });
}

let _currentArtistTracks = [];

function openArtistView(artistName) {
  const map = buildArtistMap();
  const data = map.get(artistName);
  if (!data) return;

  _currentArtistTracks = data.tracks;

  // Hero avatar
  els.artistHeroAvatar.style.background = ARTIST_COLORS[data.colorIdx];
  els.artistHeroAvatar.style.fontSize   = "48px";
  els.artistHeroAvatar.style.display    = "flex";
  els.artistHeroAvatar.style.alignItems = "center";
  els.artistHeroAvatar.style.justifyContent = "center";
  els.artistHeroAvatar.textContent      = data.emoji;

  els.artistHeroName.textContent  = artistName;
  const n = data.tracks.length;
  els.artistHeroMeta.textContent  = `${n} música${n !== 1 ? "s" : ""}`;

  // Render track list — show album column (override col-artist label)
  renderTrackList(data.tracks, els.artistTrackList, data.tracks.map((_, i) => i + 1));

  showSection("artist");
}

// ============================================================
//  ARTIST SEARCH / FILTER
// ============================================================
function filterArtists(query) {
  query = query.trim().toLowerCase();
  const cards = els.artistsGrid.querySelectorAll(".artist-card");
  let visible = 0;

  cards.forEach((card) => {
    const name = decodeURIComponent(card.dataset.artist).toLowerCase();
    const match = !query || name.includes(query);
    card.classList.toggle("hidden", !match);
    if (match) visible++;
  });

  // Update count label
  const total = cards.length;
  els.artistsCount.textContent = query
    ? `${visible} de ${total} artistas`
    : `${total} artistas`;

  // Show/hide no-results message
  const noRes = els.artistNoResults;
  if (noRes) {
    noRes.style.display = visible === 0 ? "flex" : "none";
    if (els.artistNoResultsTerm) els.artistNoResultsTerm.textContent = query;
  }

  // Clear button visibility
  els.artistSearchClear.classList.toggle("visible", query.length > 0);
}

// ============================================================
//  TOPBAR MENU (3 tracinhos)
// ============================================================
function handleTopbarMenu() {
  const isMobile = window.innerWidth <= 900;
  if (isMobile) {
    openMobileSidebar();
  } else {
    // Initialize AudioContext on user gesture
    initAudioCtx();
    openModal("modalSettings");
  }
}

// ============================================================
//  NOTIFICATIONS (demo)
// ============================================================
function setupNotifications() {
  // Show a dot after 3s
  setTimeout(() => {
    if (els.notifDot) els.notifDot.classList.add("visible");
  }, 3000);

  els.notifBtn.addEventListener("click", () => {
    if (els.notifDot) els.notifDot.classList.remove("visible");
    showToast("Sem novas notificações");
  });
}

// ============================================================
//  PROFILE
// ============================================================
function setupProfile() {
  els.profileBtn.addEventListener("click", () => {
    showToast("👤 Perfil em construção");
  });
}

// ============================================================
//  KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  switch (e.code) {
    case "Space":     e.preventDefault(); togglePlay();    break;
    case "ArrowRight": if (e.altKey) nextTrack();          break;
    case "ArrowLeft":  if (e.altKey) prevTrack();          break;
    case "KeyL":       toggleHeart();                      break;
    case "Escape":
      document.querySelectorAll(".modal-overlay.open").forEach((m) => m.classList.remove("open"));
      closeMobileSidebar();
      break;
  }
});

// ============================================================
//  INIT
// ============================================================
function init() {
  setGreeting();
  renderFeatured();
  renderTrackList();
  renderLibrary();
  renderArtists();
  renderPlaylists();
  setupProgressBar();
  setupVolumeBar();
  setupEqualizer();
  setupNotifications();
  setupProfile();
  updateVolumeUI();

  // Player
  els.playBtn.addEventListener("click", () => { initAudioCtx(); togglePlay(); });
  els.prevBtn.addEventListener("click", prevTrack);
  els.nextBtn.addEventListener("click", nextTrack);
  els.shufflePBtn.addEventListener("click", toggleShuffle);
  els.repeatBtn.addEventListener("click", toggleRepeat);
  els.heartBtn.addEventListener("click", toggleHeart);
  els.volumeBtn.addEventListener("click", toggleMute);
  els.queueBtn.addEventListener("click", () => showToast("Fila de reprodução em breve"));
  els.shuffleAllBtn.addEventListener("click", () => {
    const idx = Math.floor(Math.random() * TRACKS.length);
    state.isShuffle = true;
    els.shufflePBtn.classList.add("active");
    loadTrack(idx);
    play();
  });

  // Nav
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => { e.preventDefault(); showSection(item.dataset.section); });
  });

  // Search
  els.searchInput.addEventListener("input",  (e) => handleSearch(e.target.value));
  els.searchInput.addEventListener("focus",  () => showSection("search"));
  els.searchClear.addEventListener("click", () => {
    els.searchInput.value = "";
    handleSearch("");
    els.searchInput.focus();
  });

  // Topbar 3-lines = settings (desktop) / sidebar (mobile)
  els.topbarMenuBtn.addEventListener("click", handleTopbarMenu);
  window.addEventListener("resize", () => {}); // noop — handled per click

  // Settings button (sliders icon)
  els.settingsBtn.addEventListener("click", () => { initAudioCtx(); openModal("modalSettings"); });

  // Artist search filter
  els.artistSearchInput.addEventListener("input", (e) => filterArtists(e.target.value));
  els.artistSearchClear.addEventListener("click", () => {
    els.artistSearchInput.value = "";
    filterArtists("");
    els.artistSearchInput.focus();
  });

  // Artist view buttons
  els.backFromArtist.addEventListener("click", () => {
    showSection("artists");
    // Clear search when returning so grid shows fully
    // (keep query as user left it — they may want to continue)
  });
  els.artistPlayAllBtn.addEventListener("click", () => {
    if (!_currentArtistTracks.length) return;
    const first = TRACKS.indexOf(_currentArtistTracks[0]);
    if (first >= 0) { loadTrack(first); play(); }
  });
  els.artistShuffleBtn.addEventListener("click", () => {
    if (!_currentArtistTracks.length) return;
    const idx = Math.floor(Math.random() * _currentArtistTracks.length);
    const globalIdx = TRACKS.indexOf(_currentArtistTracks[idx]);
    state.isShuffle = true;
    els.shufflePBtn.classList.add("active");
    if (globalIdx >= 0) { loadTrack(globalIdx); play(); }
  });

  // Playlist
  els.createPlaylistBtn.addEventListener("click", openPlaylistModal);
  els.savePlaylistBtn.addEventListener("click", savePlaylist);

  // Playlist view buttons
  els.backFromPlaylist.addEventListener("click", () => showSection("home"));
  els.playlistPlayAllBtn.addEventListener("click", () => {
    const pl = state.playlists[state.currentPlaylistIdx];
    if (!pl || !pl.trackIds.length) return;
    const first = TRACKS.findIndex((t) => t.id === pl.trackIds[0]);
    if (first >= 0) { loadTrack(first); play(); }
  });

  // Mobile sidebar
  els.sidebarOverlay.addEventListener("click", closeMobileSidebar);
  els.sidebarLogo && document.getElementById("sidebarLogo").addEventListener("click", () => {
    if (window.innerWidth <= 900) closeMobileSidebar();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
