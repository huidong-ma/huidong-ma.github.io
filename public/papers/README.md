# 论文与附件文件存放目录 (Papers & Documents Directory)

在此目录下存放你的论文 PDF 文件。在 Vite 构建与静态部署（如 GitHub Pages）时，`public/` 目录下的所有文件会被直接复制到网站根目录。

### 如何使用：
1. 将你的论文 PDF 放入本文件夹，例如：
   - `public/papers/paper-neurips2025.pdf`
   - `public/papers/paper-ieee2024.pdf`

2. 在 `src/data/siteData.ts` 中，将对应论文的 `paperUrl` 修改为相对路径：
   ```typescript
   paperUrl: '/papers/paper-neurips2025.pdf',
   ```
   或者在线 arXiv 链接、开放链接等均可。

3. 访客点击页面上的 **[Paper]** 按钮时，即可在浏览器中直接打开预览或下载该 PDF。
