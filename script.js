// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(opened));
    menuButton.setAttribute("aria-label", opened ? "إغلاق القائمة" : "فتح القائمة");
    menuButton.textContent = opened ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "فتح القائمة");
    menuButton.textContent = "☰";
  }));
}

// Current year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Scroll reveal with staggered cards
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
  document.body.classList.add("motion-ready");
  const revealTargets = document.querySelectorAll(
    ".section-heading, .text-panel, .feature-card, .degree-grid, .program-grid, .map-panel, .activity-grid, .video-section video, .gallery-grid, .contact-section"
  );
  revealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    if (el.matches(".degree-grid, .program-grid, .activity-grid, .gallery-grid")) {
      el.classList.add("reveal-stagger");
    }
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach(el => observer.observe(el));
} else {
  document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => el.classList.add("is-visible"));
}

// Swipe-enabled gallery lightbox
const galleryImages = [...document.querySelectorAll(".gallery-grid img")];
if (galleryImages.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "عارض الصور");
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="إغلاق">×</button>
    <button class="lightbox-prev" type="button" aria-label="الصورة السابقة">‹</button>
    <img alt="">
    <button class="lightbox-next" type="button" aria-label="الصورة التالية">›</button>
    <span class="lightbox-count" aria-live="polite"></span>`;
  document.body.appendChild(lightbox);

  const preview = lightbox.querySelector("img");
  const count = lightbox.querySelector(".lightbox-count");
  let current = 0;
  let touchStartX = 0;

  function showImage(index) {
    current = (index + galleryImages.length) % galleryImages.length;
    preview.src = galleryImages[current].src;
    preview.alt = galleryImages[current].alt || "صورة من المعرض";
    count.textContent = `${current + 1} / ${galleryImages.length}`;
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `فتح الصورة: ${img.alt}`);
    img.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showImage(current - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(current + 1));
  lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(current + 1);
    if (event.key === "ArrowRight") showImage(current - 1);
  });
  lightbox.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener("touchend", event => {
    const delta = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 45) showImage(current + (delta > 0 ? -1 : 1));
  }, { passive: true });
}

// Touch gesture: swipe from the right edge to open the mobile menu; swipe left to close it.
let gestureStartX = 0;
let gestureStartY = 0;
document.addEventListener("touchstart", event => {
  if (!event.touches.length) return;
  gestureStartX = event.touches[0].clientX;
  gestureStartY = event.touches[0].clientY;
}, { passive: true });
document.addEventListener("touchend", event => {
  if (!menuButton || !nav || window.innerWidth > 760 || !event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - gestureStartX;
  const dy = event.changedTouches[0].clientY - gestureStartY;
  if (Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
  const fromRightEdge = gestureStartX > window.innerWidth - 35;
  if (fromRightEdge && dx < 0 && !nav.classList.contains("open")) menuButton.click();
  else if (nav.classList.contains("open") && dx > 65) menuButton.click();
}, { passive: true });
