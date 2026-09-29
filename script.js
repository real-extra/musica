/* ==========================================================
   ELIS REGINA & ADRIANA CALCANHOTTO — Script com Player Real
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- LOADER ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 900);
  });

  /* ---------- CURSOR CUSTOMIZADO ---------- */
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    }
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    if (follower) {
      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";
    }
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverTargets = document.querySelectorAll(
    "a, button, .artist-card, .album, .progress, .volume, .playlist-item"
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor?.classList.add("hover");
      follower?.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor?.classList.remove("hover");
      follower?.classList.remove("hover");
    });
  });

  /* ---------- HEADER SCROLL ---------- */
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  });

  /* ---------- MENU MOBILE ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-times");
    });
  });

  /* ---------- SCROLL SUAVE ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  /* ---------- EFEITO TILT 3D ---------- */
  const tiltElements = document.querySelectorAll(".tilt");
  tiltElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      el.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
      el.style.setProperty("--my", `${(y / rect.height) * 100}%`);
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  /* ---------- PARTÍCULAS ---------- */
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 1.8 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particleCount = Math.min(70, Math.floor(window.innerWidth / 25));
  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ---------- PARALLAX HERO ---------- */
  const heroContent = document.querySelector(".hero-content");
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight && heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
      heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.9);
    }
  });

  /* ==========================================================
     PLAYER REAL COM YOUTUBE IFRAME API
     ========================================================== */

  // Playlist com IDs reais dos vídeos
  const tracks = [
    // Elis Regina
    {
      id: "xRqI5R6L7ow",
      title: "Águas de Março",
      artist: "Elis Regina & Tom Jobim",
      artistKey: "elis",
      cover: "linear-gradient(135deg, #d4af37, #b76e79)",
      ytUrl: "https://www.youtube.com/watch?v=xRqI5R6L7ow"
    },
    {
      id: "2qqN4cEpPCw",
      title: "Como Nossos Pais",
      artist: "Elis Regina",
      artistKey: "elis",
      cover: "linear-gradient(135deg, #b76e79, #6b3f4a)",
      ytUrl: "https://www.youtube.com/watch?v=2qqN4cEpPCw"
    },
    {
      id: "iSDFEz2rWHg",
      title: "O Bêbado e a Equilibrista",
      artist: "Elis Regina",
      artistKey: "elis",
      cover: "linear-gradient(135deg, #d4af37, #8b6f1f)",
      ytUrl: "https://www.youtube.com/watch?v=iSDFEz2rWHg"
    },
    {
      id: "1g_p4Xcn5CE",
      title: "Madalena",
      artist: "Elis Regina",
      artistKey: "elis",
      cover: "linear-gradient(135deg, #f5e7a3, #d4af37)",
      ytUrl: "https://www.youtube.com/watch?v=1g_p4Xcn5CE"
    },
    {
      id: "Pa1u6EFy8i0",
      title: "Tiro ao Álvaro",
      artist: "Elis Regina & Adoniran Barbosa",
      artistKey: "elis",
      cover: "linear-gradient(135deg, #2a2a2a, #d4af37)",
      ytUrl: "https://www.youtube.com/watch?v=Pa1u6EFy8i0"
    },
    // Adriana Calcanhotto
    {
      id: "Hsmp8yR-AK8",
      title: "Vambora",
      artist: "Adriana Calcanhotto",
      artistKey: "adriana",
      cover: "linear-gradient(135deg, #b76e79, #f5e7a3)",
      ytUrl: "https://www.youtube.com/watch?v=Hsmp8yR-AK8"
    },
    {
      id: "6QVC5jX8QPI",
      title: "Devolva-me",
      artist: "Adriana Calcanhotto",
      artistKey: "adriana",
      cover: "linear-gradient(135deg, #d4af37, #b76e79)",
      ytUrl: "https://www.youtube.com/watch?v=6QVC5jX8QPI"
    },
    {
      id: "N7ZdCLtNrd8",
      title: "Esquadros",
      artist: "Adriana Calcanhotto",
      artistKey: "adriana",
      cover: "linear-gradient(135deg, #f5e7a3, #d4af37)",
      ytUrl: "https://www.youtube.com/watch?v=N7ZdCLtNrd8"
    },
    {
      id: "leL7KSkm97M",
      title: "Mentiras",
      artist: "Adriana Calcanhotto",
      artistKey: "adriana",
      cover: "linear-gradient(135deg, #b76e79, #6b3f4a)",
      ytUrl: "https://www.youtube.com/watch?v=leL7KSkm97M"
    },
    {
      id: "EeNUsrw8qA8",
      title: "Maresia",
      artist: "Adriana Calcanhotto",
      artistKey: "adriana",
      cover: "linear-gradient(135deg, #d4af37, #8b6f1f)",
      ytUrl: "https://www.youtube.com/watch?v=EeNUsrw8qA8"
    }
  ];

  let currentTrack = 0;
  let player = null;
  let playerReady = false;
  let isPlaying = false;
  let progressInterval = null;

  const nowTitle = document.getElementById("nowTitle");
  const nowArtist = document.getElementById("nowArtist");
  const nowCover = document.getElementById("nowCover");
  const playBtn = document.getElementById("playBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");
  const progress = document.getElementById("progress");
  const currentTimeEl = document.getElementById("currentTime");
  const totalTimeEl = document.getElementById("totalTime");
  const volumeBar = document.getElementById("volumeBar");
  const volumeEl = document.getElementById("volume");

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  // Carregar YouTube IFrame API
  function loadYouTubeAPI() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // Callback global da API
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("youtube-player", {
      height: "100%",
      width: "100%",
      videoId: tracks[0].id,
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        fs: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError
      }
    });
  };

  function onPlayerReady(event) {
    playerReady = true;
    loadTrack(0);
    player.setVolume(80);
  }

  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      isPlaying = true;
      playBtn.querySelector("i").className = "fas fa-pause";
      nowCover.classList.add("spinning");
      startProgress();
    } else if (
      event.data === YT.PlayerState.PAUSED ||
      event.data === YT.PlayerState.ENDED
    ) {
      isPlaying = false;
      playBtn.querySelector("i").className = "fas fa-play";
      nowCover.classList.remove("spinning");
      if (event.data === YT.PlayerState.ENDED) {
        nextTrack();
      }
      stopProgress();
    }
  }

  function onPlayerError(event) {
    console.warn("Erro no player:", event.data);
    // Tenta próxima música automaticamente
    setTimeout(() => nextTrack(), 1000);
  }

  function loadTrack(index) {
    currentTrack = index;
    const t = tracks[index];
    nowTitle.textContent = t.title;
    nowArtist.textContent = t.artist;
    nowCover.style.background = t.cover;
    progressBar.style.width = "0%";
    currentTimeEl.textContent = "0:00";
    totalTimeEl.textContent = "0:00";
    updatePlaylistHighlight();
  }

  function updatePlaylistHighlight() {
    document.querySelectorAll(".playlist-item").forEach((item, i) => {
      item.classList.toggle("active", i === currentTrack);
    });
  }

  function playTrack() {
    if (!playerReady) return;
    player.loadVideoById(tracks[currentTrack].id);
    player.playVideo();
  }

  function togglePlay() {
    if (!playerReady) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  function nextTrack() {
    const next = (currentTrack + 1) % tracks.length;
    loadTrack(next);
    playTrack();
  }

  function prevTrack() {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(prev);
    playTrack();
  }

  function startProgress() {
    stopProgress();
    progressInterval = setInterval(() => {
      if (player && playerReady) {
        const current = player.getCurrentTime() || 0;
        const duration = player.getDuration() || 0;
        if (duration > 0) {
          const pct = (current / duration) * 100;
          progressBar.style.width = pct + "%";
          currentTimeEl.textContent = formatTime(current);
          totalTimeEl.textContent = formatTime(duration);
        }
      }
    }, 250);
  }

  function stopProgress() {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }

  // Event listeners do player
  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);

  // Clique na barra de progresso
  progress.addEventListener("click", (e) => {
    if (!playerReady) return;
    const rect = progress.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const duration = player.getDuration() || 0;
    player.seekTo(pct * duration, true);
  });

  // Volume
  volumeEl.addEventListener("click", (e) => {
    if (!playerReady) return;
    const rect = volumeEl.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    player.setVolume(pct * 100);
    volumeBar.style.width = pct * 100 + "%";
  });

  // Gerar playlist na UI
  function renderPlaylist() {
    const elisList = document.getElementById("playlistElis");
    const adrianaList = document.getElementById("playlistAdriana");

    tracks.forEach((track, i) => {
      const li = document.createElement("li");
      li.className = "playlist-item";
      li.dataset.index = i;
      li.innerHTML = `
        <span class="track-num">${i + 1}</span>
        <div class="track-info">
          <div class="track-title">${track.title}</div>
          <div class="track-artist">${track.artist}</div>
        </div>
        <a href="${track.ytUrl}" target="_blank" rel="noopener" class="track-yt" title="Ver no YouTube">
          <i class="fab fa-youtube"></i>
        </a>
      `;

      // Evento de clique para tocar
      li.addEventListener("click", (e) => {
        if (e.target.closest(".track-yt")) return; // Ignora se clicou no link do YT
        loadTrack(i);
        playTrack();
      });

      if (track.artistKey === "elis") {
        elisList.appendChild(li);
      } else {
        adrianaList.appendChild(li);
      }
    });
  }

  renderPlaylist();
  loadYouTubeAPI();

  /* ---------- EASTER EGG: KONAMI CODE ---------- */
  const konami = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ];
  let konamiIndex = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key === konami[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konami.length) {
        document.body.style.animation = "spin 2s linear";
        setTimeout(() => (document.body.style.animation = ""), 2000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
});
