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


// Refined animated icon system (inline SVG; no external icon dependency)
const iconPaths = {
  home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/>',
  user:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-3.3 3-5 7-5s6.3 1.7 7 5"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/>',
  book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 16.5A2.5 2.5 0 0 1 6.5 14H20M8 7h8M8 10h6"/>',
  chart:'<path d="M4 20V4M4 20h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M16 6h4v4"/>',
  activity:'<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  images:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 20"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  scale:'<path d="M12 3v18M5 6h14M7 6l-4 7h8L7 6Zm10 0-4 7h8l-4-7ZM8 21h8"/>',
  award:'<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9"/>',
  road:'<path d="M8 3 5 21M16 3l3 18M12 5v3m0 4v3m0 3v2"/>',
  droplet:'<path d="M12 3s7 7.2 7 12a7 7 0 0 1-14 0c0-4.8 7-12 7-12Z"/><path d="M9 16a3 3 0 0 0 3 2"/>',
  heart:'<path d="M20.8 8.8c0 5-8.8 11-8.8 11s-8.8-6-8.8-11A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z"/>',
  graduation:'<path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6"/>',
  leaf:'<path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-7 11-16Z"/><path d="M4 20c3-5 7-8 12-11"/>',
  users:'<path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 4.5a3 3 0 0 1 0 6M17 14.5a4 4 0 0 1 4 4V20"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  shield:'<path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
  map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>',
  video:'<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
  star:'<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>'
};
function makeIcon(name, extra='') {
  const span = document.createElement('span');
  span.className = `ui-icon ${extra}`.trim();
  span.setAttribute('aria-hidden','true');
  span.innerHTML = `<svg viewBox="0 0 24 24" focusable="false">${iconPaths[name] || iconPaths.star}</svg>`;
  return span;
}
const navIcons = ['user','briefcase','book','chart','activity','images','mail'];
document.querySelectorAll('.nav a').forEach((link,i)=>link.prepend(makeIcon(navIcons[i] || 'star')));
const headingIcons = ['user','briefcase','graduation','chart','map','activity','video','images','mail'];
document.querySelectorAll('.section-heading').forEach((heading,i)=>heading.querySelector('.eyebrow')?.append(makeIcon(headingIcons[i] || 'star')));
const featureIcon = document.querySelector('.feature-icon');
if(featureIcon){featureIcon.textContent='';featureIcon.append(makeIcon('scale'));}
const degreeIcons=['book','award','star'];
document.querySelectorAll('.degree-card').forEach((card,i)=>card.prepend(makeIcon(degreeIcons[i]||'award')));
const programIcons=['road','droplet','heart','graduation','leaf','globe','chart','activity','leaf','shield'];
document.querySelectorAll('.program-grid article').forEach((card,i)=>card.prepend(makeIcon(programIcons[i]||'star')));
document.querySelectorAll('.activity-grid figure').forEach((figure)=>{
  const caption=figure.querySelector('figcaption');
  if(caption) caption.prepend(makeIcon('star'));
});
const quoteLabel=document.querySelector('.quote-card span');
if(quoteLabel) quoteLabel.prepend(makeIcon('star'));
const facebookLink=document.querySelector('.facebook-link');
if(facebookLink) facebookLink.prepend(makeIcon('users'));

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
