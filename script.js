/* =============================================================
   OUR STORY — script.js
   Everything you'd want to personalize lives in the
   ===== EASY CUSTOMIZATION ===== block below.
   ============================================================= */

// ============================================================
// ===== EASY CUSTOMIZATION =====
// Change everything below to make this website yours.
// ============================================================

const CONFIG = {
  // Her name — shown big on the final birthday screen
  herName: "Kiruba ❤️",

  // Opening screen
  openingMessage1: "Hey... I made something for you.",
  openingMessage2Line1: "Before you see it,",
  openingMessage2Line2: "I want you to remember where our story began.",

  // Chapter 01 text (also editable directly in index.html #ch1-text)
  chapter01Text: "I didn't know that day... but meeting you was going to become one of the most beautiful parts of my life.",

  // Final surprise transition
  surpriseLine1: "But there's one memory I haven't shown you yet...",
  surpriseLine2: "It's the one we're going to create next.",

  // Final birthday screen
  birthdayEyebrow: "HAPPY BIRTHDAY",
  birthdayMessageHTML: "My favorite person,<br>my favorite memories,<br>and hopefully...<br>my favorite future.",

  // Personal letter — each string becomes its own paragraph.
  // Leave the empty string "" in the array wherever you want a blank line.
  letterParagraphs: [
    "Happy Birthday to the person who became one of the most beautiful parts of my life.",
    "These memories are only a small part of everything we've shared.",
    "Every laugh. Every conversation. Every silly moment. Every difficult day we got through. Every little thing that somehow became special because it was with you.",
    "These are all memories we've already made...",
    "But I can't wait to see all the memories we haven't made yet."
  ],
  letterSignoff: "I love you. ❤️",
};

// The little envelope memories in Chapter 05.
// Add or remove as many as you like — 10, 15, 20, doesn't matter.
const memories = [
  {
    icon: "💌",
    title: "My Favorite Person",
    image: "assets/photos/WhatsApp Image 2026-09-12 at 4.15.52 PM.jpeg",
    message: "My Girlfriend. My best friend. My favorite person. I love you."
  },
  {
    icon: "📷",
    title: "The Photo I Never Deleted",
    image: "assets/photos/WhatsApp Image 2026-09-12 at 4.15.48 PM.jpeg",
    message: "Your ugly photo. I never deleted it because I love it. I love you."
  },
  {
    icon: "😂",
    title: "The Laugh",
    image: "assets/photos/WhatsApp Image 2026-09-12 at 4.15.52 PM (2).jpeg",
    message: "It wasn't even that funny. But you laughed. And I loved it."
  },
  {
    icon: "❤️",
    title: "A Quiet Moment",
    image: "assets/photos/WhatsApp Image 2026-09-12 at 4.15.51 PM.jpeg",
    message: "we didn't need to say anything. We just sat there, together, and it was perfect."
  },
  {
    icon: "✨",
    title: "The Magic of Us",
    image: "assets/photos/WhatsApp Image 2026-09-12 at 4.15.51 PM (3).jpeg",
    message: "We Fighted. We laughed. We loved. And somehow, we made it through everything together."
  }
];

// "Reasons I love you" — add as many lines as you want.
const reasons = [
  "Your smile.",
  "The way you care about me.",
  "The way you make ordinary days special.",
  "Your stupid jokes 😂",
  "The way you understand me.",
  "How you remember the little things I forget.",
  "The way you say my name.",
  "You, on your worst days, still choosing to be kind."
];

// Adventure timeline (Chapter 04). Add/remove entries freely.
const timelineEvents = [
  { year: "2018", label: "Becoming Friends" },
  { year: "2019", label: "Loved Each Other" },
  { year: "2020", label: "Making More Love" },
  { year: "2021", label: "Making More Memories" },
  { year: "2022", label: "More Adventures" },
  { year: "2023", label: "More Fights" },
  { year: "2024", label: "More More Memories ❤️" },
  { year: "2025", label: "unforgettable days" },
  { year: "2026", label: "Still making memories" }
];

// "Our Story" vertical timeline near the end — each item scrolls
// to the matching chapter id when clicked.
const storyTimeline = [
  { icon: "❤️", label: "The Beginning", target: "chapter-01" },
  { icon: "📸", label: "First Memory", target: "chapter-02" },
  { icon: "❤️", label: "First Date", target: "chapter-04" },
  { icon: "📸", label: "Best Adventure", target: "chapter-04" },
  { icon: "❤️", label: "Our Favorite Day", target: "chapter-06" },
  { icon: "🎂", label: "Today — Her Birthday", target: "chapter-birthday" }
];

// ============================================================
// ===== END EASY CUSTOMIZATION =====
// ============================================================


(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     Populate simple text targets from CONFIG
     --------------------------------------------------------- */
  function applyConfig() {
    document.title = `Happy Birthday, ${CONFIG.herName !== "HER NAME" ? CONFIG.herName : "You"}`;

    setText("#opening-text-1 .opening__line", CONFIG.openingMessage1);
    const lines2 = document.querySelectorAll("#opening-text-2 .opening__line");
    if (lines2[0]) lines2[0].textContent = CONFIG.openingMessage2Line1;
    if (lines2[1]) lines2[1].textContent = CONFIG.openingMessage2Line2;

    setText("#ch1-text", CONFIG.chapter01Text);
    setText("#surprise-line-1", CONFIG.surpriseLine1);
    setText("#surprise-line-2", CONFIG.surpriseLine2);
    setText("#birthday-eyebrow", CONFIG.birthdayEyebrow);
    setText("#birthday-name", CONFIG.herName);
    setHTML("#birthday-message", CONFIG.birthdayMessageHTML);

    const letterBody = document.getElementById("letter-body");
    if (letterBody) {
      letterBody.innerHTML = "";
      CONFIG.letterParagraphs.forEach(p => {
        const para = document.createElement("p");
        para.textContent = p === "" ? "\u00A0" : p;
        letterBody.appendChild(para);
      });
      const signoff = document.createElement("p");
      signoff.className = "letter__signoff";
      signoff.textContent = CONFIG.letterSignoff;
      letterBody.appendChild(signoff);
    }
  }

  function setText(selector, value) {
    const el = document.querySelector(selector);
    if (el && value) el.textContent = value;
  }
  function setHTML(selector, value) {
    const el = document.querySelector(selector);
    if (el && value) el.innerHTML = value;
  }

  /* ---------------------------------------------------------
     Build dynamic sections from arrays
     --------------------------------------------------------- */
  function buildEnvelopes() {
    const grid = document.getElementById("envelope-grid");
    if (!grid) return;
    memories.forEach((mem, i) => {
      const wrap = document.createElement("div");
      wrap.className = "envelope";
      wrap.setAttribute("role", "listitem");

      const face = document.createElement("button");
      face.className = "envelope__face";
      face.type = "button";
      face.setAttribute("aria-haspopup", "dialog");
      face.innerHTML = `
        <span class="envelope__icon" aria-hidden="true">${mem.icon || "💌"}</span>
        <span class="envelope__label">${mem.title}</span>
      `;
      face.addEventListener("click", () => openEnvelope(mem));
      wrap.appendChild(face);
      grid.appendChild(wrap);
    });

    // build the shared modal once
    const modal = document.createElement("div");
    modal.className = "envelope-modal";
    modal.id = "envelope-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="envelope-modal__card">
        <img id="envelope-modal-img" src="" alt="">
        <h3 id="envelope-modal-title"></h3>
        <p id="envelope-modal-message"></p>
        <button class="envelope-modal__close" id="envelope-modal-close">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("envelope-modal-close").addEventListener("click", closeEnvelope);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeEnvelope(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeEnvelope();
    });
  }

  let lastFocusedEnvelope = null;
  function openEnvelope(mem) {
    const modal = document.getElementById("envelope-modal");
    const img = document.getElementById("envelope-modal-img");
    const title = document.getElementById("envelope-modal-title");
    const message = document.getElementById("envelope-modal-message");
    lastFocusedEnvelope = document.activeElement;

    img.src = mem.image;
    img.alt = mem.title;
    img.onerror = () => { img.style.display = "none"; };
    img.style.display = "";
    title.textContent = mem.title;
    message.textContent = mem.message;

    modal.classList.add("is-open");
    document.getElementById("envelope-modal-close").focus();
  }
  function closeEnvelope() {
    const modal = document.getElementById("envelope-modal");
    modal.classList.remove("is-open");
    if (lastFocusedEnvelope) lastFocusedEnvelope.focus();
  }

  function buildReasons() {
    const list = document.getElementById("reasons-list");
    if (!list) return;
    reasons.forEach(reason => {
      const li = document.createElement("li");
      li.textContent = reason;
      list.appendChild(li);
    });
  }

  function buildAdventureTimeline() {
    const ol = document.getElementById("adventure-timeline");
    if (!ol) return;
    timelineEvents.forEach(ev => {
      const li = document.createElement("li");
      li.innerHTML = `<div class="adv-year">${ev.year}</div><div class="adv-label">${ev.label}</div>`;
      ol.appendChild(li);
    });
  }

  function buildStoryTimeline() {
    const ol = document.getElementById("story-timeline-list");
    if (!ol) return;
    storyTimeline.forEach(item => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.innerHTML = `<span class="st-icon" aria-hidden="true">${item.icon}</span><span class="st-label">${item.label}</span>`;
      btn.addEventListener("click", () => {
        const target = document.getElementById(item.target);
        if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      });
      li.appendChild(btn);
      ol.appendChild(li);
    });
  }

  // side nav dots — one per chapter section
  function buildStoryNav() {
    const list = document.getElementById("timeline-nav-list");
    if (!list) return;
    const chapters = document.querySelectorAll("main .chapter");
    chapters.forEach(ch => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${ch.id}`;
      a.setAttribute("aria-label", ch.querySelector(".chapter__title")?.textContent || ch.id);
      a.dataset.target = ch.id;
      li.appendChild(a);
      list.appendChild(li);
    });

    const navLinks = list.querySelectorAll("a");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = list.querySelector(`a[data-target="${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    }, { threshold: 0.5 });
    chapters.forEach(ch => obs.observe(ch));
  }

  /* ---------------------------------------------------------
     Scroll-reveal for chapters, polaroids, cards, timeline items
     --------------------------------------------------------- */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      ".chapter__inner, .polaroid, .mini-card, .envelope__face, .reasons-list li, .adventure-timeline li"
    );
    if (prefersReducedMotion) {
      targets.forEach(t => t.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(t => obs.observe(t));
  }

  // apply random subtle tilt per polaroid via CSS var, unless data-tilt provided
  function initPolaroidTilts() {
    document.querySelectorAll(".polaroid").forEach(p => {
      const explicit = p.getAttribute("data-tilt");
      const deg = explicit !== null ? parseFloat(explicit) : (Math.random() * 6 - 3);
      p.style.setProperty("--tilt", `${deg}deg`);
    });
  }

  /* ---------------------------------------------------------
     Lightbox for full photo view
     --------------------------------------------------------- */
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("lightbox-close");
    let lastFocused = null;

    document.querySelectorAll(".polaroid img").forEach(photo => {
      photo.setAttribute("tabindex", "0");
      photo.setAttribute("role", "button");
      photo.setAttribute("aria-label", "View photo full screen");
      const open = () => {
        if (photo.closest(".polaroid").classList.contains("polaroid--placeholder")) return;
        lastFocused = document.activeElement;
        img.src = photo.src;
        img.alt = photo.alt;
        lightbox.hidden = false;
        closeBtn.focus();
      };
      photo.addEventListener("click", open);
      photo.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });

    function close() {
      lightbox.hidden = true;
      img.src = "";
      if (lastFocused) lastFocused.focus();
    }
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.hidden) close();
    });
  }

  /* ---------------------------------------------------------
     Typewriter effect (Chapter 01 text)
     --------------------------------------------------------- */
  function initTypewriter() {
    const el = document.querySelector("[data-typewriter]");
    if (!el) return;
    const fullText = el.textContent;
    if (prefersReducedMotion) return;

    let started = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          el.textContent = "";
          let i = 0;
          const speed = Math.max(12, Math.min(28, 1400 / fullText.length));
          (function tick() {
            el.textContent = fullText.slice(0, i);
            i++;
            if (i <= fullText.length) setTimeout(tick, speed);
          })();
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  }

  /* ---------------------------------------------------------
     Opening sequence
     --------------------------------------------------------- */
  function initOpening() {
    const text2 = document.getElementById("opening-text-2");
    const cta = document.getElementById("open-surprise");
    const hint = document.getElementById("opening-hint");

    setTimeout(() => {
      text2.hidden = false;
      hint.hidden = false;
      setTimeout(() => { cta.hidden = false; }, 500);
    }, 2200);

    cta.addEventListener("click", startExperience, { once: true });
  }

  function startExperience() {
    const opening = document.getElementById("opening");
    const story = document.getElementById("story");
    const musicToggle = document.getElementById("music-toggle");
    const music = document.getElementById("bg-music");

    // try to start music (user gesture just happened, so this is allowed)
    music.volume = 0.65;
    music.play().then(() => {
      musicToggle.setAttribute("aria-pressed", "true");
      musicToggle.querySelector(".music-icon").textContent = "♫";
      musicToggle.setAttribute("aria-label", "Pause our song");
    }).catch(() => {
      musicToggle.setAttribute("aria-pressed", "false");
    });
    musicToggle.hidden = false;

    opening.classList.add("is-leaving");
    setTimeout(() => {
      opening.hidden = true;
      story.hidden = false;
      story.scrollIntoView({ behavior: "auto" });
      // re-run reveal check for anything already in view
      window.dispatchEvent(new Event("scroll"));
    }, prefersReducedMotion ? 50 : 1050);
  }

  function initMusicToggle() {
    const btn = document.getElementById("music-toggle");
    const music = document.getElementById("bg-music");
    btn.addEventListener("click", () => {
      if (music.paused) {
        music.play().catch(() => {});
        btn.setAttribute("aria-pressed", "true");
        btn.querySelector(".music-icon").textContent = "♫";
        btn.setAttribute("aria-label", "Pause our song");
      } else {
        music.pause();
        btn.setAttribute("aria-pressed", "false");
        btn.querySelector(".music-icon").textContent = "♪";
        btn.setAttribute("aria-label", "Play our song");
      }
    });
  }

  /* ---------------------------------------------------------
     Final surprise -> birthday reveal
     --------------------------------------------------------- */
  function initSurprise() {
    const section = document.getElementById("chapter-surprise");
    const line2 = document.getElementById("surprise-line-2");
    const btn = document.getElementById("continue-btn");
    let triggered = false;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          setTimeout(() => { line2.hidden = false; }, 1400);
          setTimeout(() => { btn.hidden = false; }, 2400);
          obs.disconnect();
        }
      });
    }, { threshold: 0.6 });
    obs.observe(section);

    btn.addEventListener("click", () => {
      const birthday = document.getElementById("chapter-birthday");
      birthday.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      setTimeout(() => launchConfetti(), prefersReducedMotion ? 0 : 500);
    }, { once: true });
  }

  /* ---------------------------------------------------------
     Starfield / particle background (lightweight canvas)
     --------------------------------------------------------- */
  function initStarfield() {
    const canvas = document.getElementById("stars-canvas");
    const ctx = canvas.getContext("2d");
    let stars = [];
    let width, height;
    let raf;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.documentElement.scrollHeight;
    }

    function makeStars() {
      const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 16000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.25,
        speed: Math.random() * 0.4 + 0.15,
        phase: Math.random() * Math.PI * 2
      }));
    }

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, width, height);
      t += 0.01;
      stars.forEach(s => {
        const twinkle = s.baseAlpha + Math.sin(t * s.speed + s.phase) * 0.2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 247, 250, ${Math.max(0, twinkle)})`;
        ctx.fill();
      });
      if (!prefersReducedMotion) raf = requestAnimationFrame(draw);
    }

    resize();
    makeStars();
    draw();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); makeStars(); }, 200);
    });

    // recompute height as content loads / grows
    setTimeout(() => { resize(); makeStars(); }, 1500);
  }

  /* ---------------------------------------------------------
     Confetti — only at the final birthday reveal
     --------------------------------------------------------- */
  function launchConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas || canvas.dataset.done) return;
    canvas.dataset.done = "true";
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    const resize = () => { canvas.width = parent.offsetWidth; canvas.height = parent.offsetHeight; };
    resize();

    if (prefersReducedMotion) return; // respect reduced motion: skip particle burst

    const colors = ["#FF4F81", "#C084FC", "#FFD166", "#FFD6E5", "#FFF7FA"];
    const pieces = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 2 + 1.5,
      speedX: (Math.random() - 0.5) * 1.5,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 8
    }));

    let frame = 0;
    const maxFrames = 420;

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.spin;
        if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      frame++;
      if (frame < maxFrames) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    tick();

    window.addEventListener("resize", resize);
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    buildEnvelopes();
    buildReasons();
    buildAdventureTimeline();
    buildStoryTimeline();
    buildStoryNav();
    initPolaroidTilts();
    initScrollReveal();
    initLightbox();
    initTypewriter();
    initOpening();
    initMusicToggle();
    initSurprise();
    initStarfield();
  });
})();
