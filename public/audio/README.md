# 本地音乐与音频文件存放目录 (Music & Audio Directory)

此目录存放网站上「音乐天地与原声」模块的音频文件。在 Vite 构建与静态部署（如 GitHub Pages）时，`public/audio/` 目录下的所有音频文件会直接发布至根路径。

### 当前已有本地音频：
- `public/audio/deep-focus.wav`: 沉浸研学氛围钢琴曲（附带时间轴同步歌词）
- `public/audio/late-night-lofi.wav`: 深夜序章 Lo-Fi 律动曲（附带时间轴同步歌词）

### 如何添加你自己的音乐 / 录音 / 播客：
1. 将你的音频文件（支持 `.mp3`、`.wav`、`.flac`、`.m4a`、`.ogg` 等）直接放入本文件夹，例如：
   ```text
   public/audio/my-favorite-song.mp3
   ```

2. 打开 `src/data/siteData.ts`，在 `music: [...]` 数组中添加或修改条目：
   ```typescript
   {
     id: 'track-custom',
     title: {
       zh: '你的歌曲名称',
       en: 'Your Track Title',
     },
     artist: {
       zh: '演唱者 / 演奏家',
       en: 'Artist Name',
     },
     album: {
       zh: '专辑名称',
       en: 'Album Name',
     },
     audioUrl: '/audio/my-favorite-song.mp3', // <-- 填入相对路径
     description: {
       zh: '这首歌的创作背景或推荐语',
       en: 'Description or personal note',
     },
     // 可选：标准 LRC 时间轴歌词格式 [分:秒.毫秒] 歌词内容
     lyrics: `[00:00.00] 歌曲前奏
   [00:05.20] 第一句歌词
   [00:10.80] 第二句歌词`,
   }
   ```

3. 访客即可在网页中直接**在线播放**、**点击歌词快速跳转播放进度**、**循环播放**以及**一键下载原音频文件**。
