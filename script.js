// ============================================================
// Photo data — replace `src` with your own image paths/URLs.
// category: landscape | people
// ============================================================
const photos = [
  { src: "https://picsum.photos/id/1015/1200/1500", title: "Morning Mist",      cat: "landscape" },
  { src: "https://picsum.photos/id/1027/1200/1500", title: "Her Profile",       cat: "people"    },
  { src: "https://picsum.photos/id/1043/1200/1500", title: "Cat at the Corner", cat: "people"    },
  { src: "https://picsum.photos/id/1019/1200/1500", title: "Lake and Snow",     cat: "landscape" },
  { src: "https://picsum.photos/id/64/1200/1500",   title: "Studio Light",      cat: "people"    },
  { src: "https://picsum.photos/id/1059/1600/900",  title: "Coastline",         cat: "landscape" },
  { src: "https://picsum.photos/id/177/1200/1500",  title: "Evening Walk",      cat: "people"    },
  { src: "https://picsum.photos/id/1062/1200/1500", title: "Foggy Town",        cat: "landscape" },
  { src: "https://picsum.photos/id/823/1200/1500",  title: "Quiet Afternoon",   cat: "people"    },
  { src: "https://picsum.photos/id/325/1200/1500",  title: "Subway",            cat: "people"    },
  { src: "https://picsum.photos/id/249/1200/1500",  title: "Forest Path",       cat: "landscape" },
];

// ---------- Render grid ----------
const grid = document.getElementById("grid");
photos.forEach((p, i) => {
  const fig = document.createElement("figure");
  fig.dataset.cat = p.cat;
  fig.dataset.idx = i;
  fig.innerHTML = `
    <img src="${p.src}" alt="${p.title}" loading="lazy" />
    <figcaption>${p.title}</figcaption>
  `;
  grid.appendChild(fig);
});

// ---------- Filter ----------
const filters = document.querySelectorAll(".filter");
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    document.querySelectorAll(".grid figure").forEach(f => {
      f.classList.toggle("hidden", cat !== "all" && f.dataset.cat !== cat);
    });
  });
});

// ---------- Lightbox ----------
const lb       = document.getElementById("lightbox");
const lbImg    = document.getElementById("lb-img");
const lbCap    = document.getElementById("lb-caption");
let currentIdx = 0;

function openLightbox(idx) {
  currentIdx = idx;
  const p = photos[idx];
  lbImg.src = p.src;
  lbImg.alt = p.title;
  lbCap.textContent = p.title;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
}
function step(delta) {
  const visible = [...document.querySelectorAll(".grid figure:not(.hidden)")]
    .map(f => parseInt(f.dataset.idx, 10));
  if (!visible.length) return;
  const pos = visible.indexOf(currentIdx);
  const next = visible[(pos + delta + visible.length) % visible.length];
  openLightbox(next);
}

grid.addEventListener("click", e => {
  const fig = e.target.closest("figure");
  if (fig) openLightbox(parseInt(fig.dataset.idx, 10));
});
document.querySelector(".lb-close").addEventListener("click", closeLightbox);
document.querySelector(".lb-prev").addEventListener("click", () => step(-1));
document.querySelector(".lb-next").addEventListener("click", () => step(1));
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape")     closeLightbox();
  if (e.key === "ArrowLeft")  step(-1);
  if (e.key === "ArrowRight") step(1);
});
