# Huidong Ma's Academic Homepage

使用 React、TypeScript、Vite 和 Tailwind CSS 构建的双语个人主页。

## 本地预览

建议使用 Node.js 24 LTS。在项目根目录的 PowerShell 中运行：

```powershell
npm.cmd ci
npm.cmd run dev
```

打开终端显示的地址，默认是 http://localhost:3000。保存修改后页面会自动更新。网站运行不需要配置 Gemini API Key。

## 编辑内容

- `src/data/siteData.ts`：个人资料、论文、新闻、荣誉和服务。新闻、论文、荣誉和服务按数组顺序显示。
- `public/papers/`：论文 PDF。
- `public/images/`：头像等图片。
- `public/CNAME`：自定义域名，目前为 `www.huidong.site`。

## 检查与构建

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

`dist/` 是构建结果；`public/` 中的文件会原样复制到其中。

## GitHub Pages 部署

仓库为 `huidong-ma/huidong-ma.github.io`。在 GitHub 仓库的 Settings → Pages 中，将 Source 设为 **GitHub Actions**，保留自定义域名 `www.huidong.site`。

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动安装依赖、检查类型、构建并发布 `dist/`。可在仓库的 Actions 页面查看部署结果。

提交源码、`public/`、`package-lock.json` 和部署配置；`node_modules/`、`dist/` 以及本地环境变量文件由 `.gitignore` 排除。
