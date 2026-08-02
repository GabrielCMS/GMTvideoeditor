/* =========================================================
   VITOR REELS — LANDING PAGE SCRIPTS
   Mobile menu, header on scroll, progress bar,
   animated timecode, portfolio filters,
   scroll reveal animations, and back-to-top button.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------
     1. FIXED HEADER + SCROLL PROGRESS BAR
  --------------------------------------------------- */
  const header = document.getElementById("header");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    header.classList.toggle("is-scrolled", scrollY > 40);
    backToTop.classList.toggle("is-visible", scrollY > 500);
    scrollProgress.style.width = progress + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ---------------------------------------------------
     2. MOBILE MENU
  --------------------------------------------------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu when a link is tapped (mobile)
  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------
     3. ANIMATED HERO TIMECODE (video-editor aesthetic)
  --------------------------------------------------- */
  const timecodeEl = document.getElementById("timecode");
  if (timecodeEl) {
    const startTime = performance.now();
    const FPS = 30;

    function pad(num, size) {
      return String(Math.floor(num)).padStart(size, "0");
    }

    function updateTimecode(now) {
      const elapsedMs = now - startTime;
      const totalFrames = Math.floor((elapsedMs / 1000) * FPS);

      const hours = Math.floor(totalFrames / (FPS * 3600));
      const minutes = Math.floor((totalFrames / (FPS * 60)) % 60);
      const seconds = Math.floor((totalFrames / FPS) % 60);
      const frames = totalFrames % FPS;

      timecodeEl.textContent = `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(frames, 2)}`;
      requestAnimationFrame(updateTimecode);
    }

    requestAnimationFrame(updateTimecode);
  }

  /* ---------------------------------------------------
     4. PORTFOLIO FILTERS (All / Horizontal / Vertical)
  --------------------------------------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const reelCards = document.querySelectorAll(".reel-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-selected", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");

      reelCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.format === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });

  /* ---------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS
  --------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Small staggered delay for elements close to one another
            setTimeout(() => entry.target.classList.add("is-visible"), index * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------
     6. CURRENT YEAR IN THE FOOTER
  --------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
