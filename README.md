# 个人摄影作品集网站

零构建、纯静态。三个文件搞定：`index.html` / `styles.css` / `script.js`。

## 本地预览

直接双击 `index.html`，或在目录下起个简单服务器：

```bash
cd /Users/wangjiawei167/photography-site
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 把示例图换成你自己的照片

打开 `script.js`，编辑顶部 `photos` 数组：

```js
const photos = [
  { src: "images/01.jpg", title: "山涧晨雾", cat: "landscape" },
  { src: "images/02.jpg", title: "她的侧脸", cat: "portrait"  },
  // ...
];
```

- `cat` 可选：`landscape` / `portrait` / `street` / `still`，需要新分类就在 `index.html` 的 `.filters` 里加按钮，再补一个 `data-filter` 值即可。
- 想换 Hero 大图：编辑 `styles.css` 里 `.hero` 的 `background-image`。
- 想换头像：编辑 `index.html` 里 `.about-inner img` 的 `src`。
- 文案、姓名、社媒链接都在 `index.html` 里直接改。

## 建议的照片规格

- 长边 1600–2400px，JPG 质量 80，单图控制在 300KB 内
- 命名按拍摄日期 + 序号，方便排序：`2026-03-12_01.jpg`
- 想要更快加载，可以再做一份 800px 的缩略图给网格用，点击放大再换大图

## 部署

任何静态托管都行：
- **Vercel / Netlify** — 拖文件夹进去即可，自动给 HTTPS
- **GitHub Pages** — 推到 `main` 分支，仓库设置里开 Pages
- **Cloudflare Pages** — 国内访问体验最好

域名指过去就完事了。
