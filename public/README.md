# 静态资源存放架构说明 (Static Assets Architecture)

本项目采用现代前端标准的静态资源管理策略。**论文（PDF）、音乐（Audio）、相册图片（Photos）等大体积、固定路径或动态引用的资源全部推荐统一放在 `public/` 目录下**。

## 为什么放在 `public/` 而不是 `src/assets/`？

| 资源类别 | 推荐存放位置 | 引用路径示例 | 核心优势 |
| :--- | :--- | :--- | :--- |
| **论文 / 文档** | `public/papers/` | `/papers/2026_CVPR_xxx.pdf` | 文件名固定不变，保持对外学术链接稳定性，访客可直接下载/在线预览；零 JS 构建开销 |
| **音乐 / 音频** | `public/audio/` | `/audio/deep-focus.wav` | 支持浏览器 HTTP Range 范围请求分段流式播放，不被 Vite 打包进 bundle |
| **相册照片** | `public/images/albums/[album-id]/` | `/images/albums/singapore-journey/cover.jpg` | **按专辑独立文件夹归档**；新增照片只需丢进文件夹在配置中写路径，无需写几十行 `import` 语句 |
| **头像 / Profile** | `public/images/` | `/images/profile.png` | 路径直观清晰，方便随时替换更新 |

> **注：什么时候才放在 `src/assets/`？**
> 只有当小图标、SVG Logo 或与 UI 组件强绑定的首屏关键小图（< 4KB 需要内联 Base64 或由打包器做哈希缓存处理）时，才建议放在 `src/assets/` 中通过 `import icon from './assets/icon.svg'` 引用。

## 目录结构速查表

```text
public/
├── papers/                      # 所有学术论文 PDF 原文、技术报告、简历
│   ├── 2026_CVPR_xxx.pdf
│   └── README.md
├── audio/                       # 音乐天地音频文件 (.mp3, .wav, .flac)
│   ├── deep-focus.wav
│   └── README.md
├── images/                      # 图像根目录
│   ├── profile.png              # 个人肖像与头像
│   └── albums/                  # 相册专辑（按子目录彻底隔离）
│       ├── singapore-journey/       # 新加坡访学行迹专辑照片
│       ├── academic-conferences/    # 学术会议交流专辑照片
│       ├── campus-moments/          # 南开校园风物专辑照片
│       └── README.md
└── CNAME                        # GitHub Pages 自定义域名配置
```
