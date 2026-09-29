/* ==========================================================
   ELIS REGINA & ADRIANA CALCANHOTTO — Script principal
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

  // Efeito hover em elementos interativos
  const hoverTargets = document.querySelectorAll(
    "a, button, .artist-card, .album, .progress, .volume"
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

  /* ---------- EFEITO TILT 3D NOS CARDS ---------- */
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

  /* ---------- PARTÍCULAS (CANVAS) ---------- */
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

  /* ---------- PLAYER FAKE ---------- */
  const tracks = [
    { title: "Águas de Março", artist: "Elis Regina & Tom Jobim", duration: 225 },
    { title: "Como Nossos Pais", artist: "Elis Regina", duration: 260 },
    { title: "O Bêbado e a Equilibrista", artist: "Elis Regina", duration: 190 },
    { title: "Devolva-me", artist: "Adriana Calcanhotto", duration: 200 },
    { title: "Esquadros", artist: "Adriana Calcanhotto", duration: 215 },
    { title: "Vambora", artist: "Adriana Calcanhotto", duration: 245 },
  ];

  let currentTrack = 0;
  let isPlaying = false;
  let currentSeconds = 0;
  let intervalId = null;

  const trackTitle = document.getElementById("trackTitle");
  const trackArtist = document.getElementById("trackArtist");
  const playBtn = document.getElementById("playBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");
  const progress = document.getElementById("progress");
  const currentTimeEl = document.getElementById("currentTime");
  const totalTimeEl = document.getElementById("totalTime");
  const playerCover = document.getElementById("playerCover");

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function loadTrack(index) {
    currentSeconds = 0;
    const t = tracks[index];
    trackTitle.textContent = t.title;
    trackArtist.textContent = t.artist;
    totalTimeEl.textContent = formatTime(t.duration);
    progressBar.style.width = "0%";
    currentTimeEl.textContent = "0:00";
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    const icon = playBtn.querySelector("i");
    if (isPlaying) {
      icon.classList.remove("fa-play");
      icon.classList.add("fa-pause");
      playerCover.classList.add("spinning");
      startTimer();
    } else {
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");
      playerCover.classList.remove("spinning");
      clearInterval(intervalId);
    }
  }

  function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      currentSeconds++;
      const total = tracks[currentTrack].duration;
      if (currentSeconds >= total) {
        nextTrack();
        return;
      }
      progressBar.style.width = (currentSeconds / total) * 100 + "%";
      currentTimeEl.textContent = formatTime(currentSeconds);
    }, 1000);
  }

  function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) startTimer();
  }

  function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) startTimer();
  }

  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);

  // Clique na barra de progresso
  progress.addEventListener("click", (e) => {
    const rect = progress.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    currentSeconds = Math.floor(pct * tracks[currentTrack].duration);
    progressBar.style.width = pct * 100 + "%";
    currentTimeEl.textContent = formatTime(currentSeconds);
  });

  // Volume fake
  const volumeBar = document.getElementById("volumeBar");
  document.querySelector(".volume").addEventListener("click", (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    volumeBar.style.width = pct * 100 + "%";
  });

  loadTrack(0);

  /* ---------- PARALLAX HERO ---------- */
  const heroContent = document.querySelector(".hero-content");
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight && heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
      heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.9);
    }
  });

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
