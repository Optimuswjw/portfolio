// ============================================================
// 摄影作品数据 — 把 src 换成你自己的图片路径（或 CDN 链接）即可
// category: landscape | portrait | street | still
// ============================================================
const photos = [
  { src: "https://picsum.photos/id/1015/1200/1500", title: "山涧晨雾",     cat: "landscape" },
  { src: "https://picsum.photos/id/1027/1200/1500", title: "她的侧脸",     cat: "portrait"  },
  { src: "https://picsum.photos/id/1043/1200/1500", title: "巷口的猫",     cat: "street"    },
  { src: "https://picsum.photos/id/1080/1200/1500", title: "桌上的莓果",   cat: "still"     },
  { src: "https://picsum.photos/id/1019/1200/1500", title: "湖与雪",       cat: "landscape" },
  { src: "https://picsum.photos/id/64/1200/1500",   title: "工作室即兴",   cat: "portrait"  },
  { src: "https://picsum.photos/id/1059/1600/900",  title: "海岸线",       cat: "landscape" },
  { src: "https://picsum.photos/id/177/1200/1500",  title: "黄昏散步",     cat: "street"    },
  { src: "https://picsum.photos/id/225/1200/1500",  title: "茶与光",       cat: "still"     },
  { src: "https://picsum.photos/id/1062/1200/1500", title: "雾中老城",     cat: "landscape" },
  { src: "https://picsum.photos/id/823/1200/1500",  title: "无声的午后",   cat: "portrait"  },
  { src: "https://picsum.photos/id/1011/1200/1500", title: "雨后的窗",     cat: "still"     },
  { src: "https://picsum.photos/id/325/1200/1500",  title: "地铁里",       cat: "street"    },
  { src: "https://picsum.photos/id/249/1200/1500",  title: "森林路口",     cat: "landscape" },
];

// ---------- 渲染网格 ----------
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

// ---------- 分类筛选 ----------
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
  // 仅在当前可见的图片间循环
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
