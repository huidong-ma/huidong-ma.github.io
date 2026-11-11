# 相册专辑照片存放指南 (Album Photos Guide)

本项目中所有相册专辑的图片资源均存放在本目录 (`public/images/albums/`) 下，**每个专辑按文件夹独立隔离存放**。

## 目录结构 (Directory Structure)

```text
public/images/albums/
├── singapore-journey/          # 新加坡访学行迹 专辑
│   ├── cover.jpg               # 专辑封面图
│   ├── merlion.jpg             # 照片 1
│   ├── gardens-supertrees.jpg  # 照片 2
│   ├── jewel-changi.jpg        # 照片 3
│   ├── sentosa-bay.jpg         # 照片 4
│   └── clarke-quay.jpg         # 照片 5
├── academic-conferences/       # 学术会议与研讨交流 专辑
│   ├── cover.jpg
│   ├── poster-session.jpg
│   ├── panel-session.jpg
│   ├── urban-architecture.jpg
│   ├── award-ceremony.jpg
│   └── lab-collaboration.jpg
├── campus-moments/             # 南开园风物与求索行记 专辑
│   ├── cover.jpg
│   ├── spring-cherry.jpg
│   ├── horseshoe-lotus.jpg
│   ├── autumn-ginkgo.jpg
│   ├── campus-library.jpg
│   └── mountain-summit.jpg
└── README.md
```

## 如何添加一个新专辑？ (How to add a new album)

1. **新建文件夹**：在本目录下新建一个文件夹，如 `tokyo-trip`：
   `public/images/albums/tokyo-trip/`
2. **放入图片**：把封面和所有照片（.jpg, .png, .webp 等）直接拷贝到该文件夹内。
3. **在配置文件中登记**：
   打开 `src/data/siteData.ts`，在 `albums: [...]` 数组中添加一项，图片路径直接填写：
   - 封面：`/images/albums/tokyo-trip/cover.jpg`
   - 照片：`/images/albums/tokyo-trip/photo1.jpg`

无需任何繁琐的 `import` 导入，开箱即用，构建打包时零额外开销！
