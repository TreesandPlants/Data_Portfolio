/* =====================================================
   DataLeaf Portfolio — Interactions
   ===================================================== */
(function () {
  'use strict';

  /* ---------- Loader ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) setTimeout(() => loader.classList.add('hide'), 500);
    document.body.classList.add('has-loaded');
    if (window.AOS) AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  });

  /* ---------- Year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Navbar scroll + back-to-top + progress ---------- */
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backToTop');
  const progress = document.getElementById('scrollProgress');

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 30);
    backTop.classList.toggle('show', y > 500);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (y / h) * 100 + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
if (backTop){
     backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
 

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
   if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

  /* ---------- Theme toggle ---------- */
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const applyTheme = (t) => {
    document.documentElement.dataset.theme = t;
    themeBtn.innerHTML = t === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  };
  if (themeBtn) {
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const next =
      document.documentElement.dataset.theme === 'dark'
        ? 'light'
        : 'dark';

    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}

  /* ---------- Cursor glow ---------- */
  const glow = document.getElementById('cursorGlow');
  let mx = 0, my = 0, gx = 0, gy = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  (function animateGlow() {
    gx += (mx - gx) * 0.15; gy += (my - gy) * 0.15;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
  })();

  /* ---------- Typing animation ---------- */
  const phrases = [
    'Data for a Better Future',
    'Turning Data into Meaningful Insights',
    'SQL · Python · Excel'
  ];
  const typedEl = document.getElementById('typed');
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const cur = phrases[pi];
    typedEl.textContent = cur.slice(0, ci);
    if (!deleting && ci < cur.length) { ci++; setTimeout(type, 60); }
    else if (deleting && ci > 0) { ci--; setTimeout(type, 30); }
    else {
      deleting = !deleting;
      if (!deleting) pi = (pi + 1) % phrases.length;
      setTimeout(type, deleting ? 1500 : 300);
    }
  }
  type();

  /* ---------- Parallax hero ---------- */
  const parallax = document.querySelector('[data-parallax]');
  document.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (parallax && y < window.innerHeight) {
      parallax.style.transform = `translateY(${y * 0.25}px)`;
      parallax.style.opacity = 1 - y / (window.innerHeight * 0.9);
    }
  }, { passive: true });

  /* ---------- Particles ---------- */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  function createParticles() {
    const count = Math.min(80, Math.floor(canvas.width / 18));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.5 + 0.2
    }));
  }
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(94, 234, 212, ${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  resizeCanvas(); createParticles(); drawParticles();
  window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll('.num');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      let n = 0; const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        n += step;
        if (n >= target) { el.textContent = target; return; }
        el.textContent = n;
        requestAnimationFrame(tick);
      };
      tick();
      countObs.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => countObs.observe(c));

  /* ---------- Skill bars reveal ---------- */
  const tracks = document.querySelectorAll('.track');
  const trackObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); });
  }, { threshold: 0.3 });
  tracks.forEach(t => trackObs.observe(t));

  /* ---------- Lightbox gallery ---------- */
  const gallery = document.getElementById('gallery');
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  if (gallery){
      gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      lbImg.src = e.target.src;
      lbImg.alt = e.target.alt;
      lb.hidden = false;
    }
  });
  }
  
  lb.addEventListener('click', () => { lb.hidden = true; lbImg.src = ''; });

  /* ---------- Project tilt ---------- */
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
  /* ---------- Contact form (validation + EmailJS-ready) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
   if (form && status) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    if (!data.name || data.name.length < 2 || !emailOk || !data.subject || !data.message) {
      status.textContent = 'Please fill in all fields with valid information.';
      status.className = 'form-status error';
      return;
    }
    // EmailJS integration ready — uncomment & configure:
    // emailjs.send('service_id', 'template_id', data).then(...);
    status.textContent = '✓ Message sent! I will get back to you soon.';
    status.className = 'form-status success';
    form.reset();
    setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
  });
   }
  /* ---------- Smooth anchor scroll (native via CSS, fallback for offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
        }
      }
    });
  });

})();
