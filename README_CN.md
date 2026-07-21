# Hycloud 博客主题

[**English**](README.md)

一个极简博客主题，基于 React、TypeScript 和 Tailwind CSS 构建。具备清晰排版、流畅动画和 Markdown 文章支持——为清晰易读而设计。

[![部署到 Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Witherwithwinter/Hycloud)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 功能特性

- **极简设计** — 干净排版搭配中性色彩，无干扰元素
- **GSAP 动画** — 滚动触发文字揭示、鼠标跟随乱码效果、流畅过渡
- **点击火花特效** — 全站任意位置点击产生火花动画
- **中英双语** — 支持 English / 中文 切换，语言偏好保存在 localStorage 中
- **Markdown 文章** — 使用 Markdown 撰写文章，支持前置元数据（标题、日期、分类、摘要）
- **目录导航** — 自动生成目录，支持滚动高亮和锚点平滑跳转
- **阅读进度条** — 可视化文章阅读进度
- **上/下一篇导航** — 按时间顺序轻松浏览文章
- **响应式布局** — 针对移动端、平板和桌面端优化
- **Cloudflare Pages 部署** — 预配置 `wrangler.toml`，一键部署

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | React 19 + TypeScript |
| 构建工具 | Vite 8 |
| 样式 | Tailwind CSS v4 |
| 路由 | React Router v7 |
| 动画 | GSAP (SplitText, ScrambledText, LineSidebar) |
| Markdown | remark + rehype pipeline |
| 部署 | Cloudflare Pages |

## 开始使用

```bash
# 克隆仓库
git clone https://github.com/Witherwithwinter/Hycloud.git

# 安装依赖
cd Hycloud
npm install

# 启动开发服务器
npm run dev
```

## 项目结构

```
content/posts/    # Markdown 博客文章
src/
  components/     # React 组件
    PillNav.tsx       # 药丸风格导航栏（含移动端菜单）
    Hero.tsx          # 首页英雄区域
    PostList.tsx      # 文章列表
    PostCard.tsx      # 单篇文章卡片
    ArticlePage.tsx   # 文章阅读页（含目录侧边栏）
    ArchivePage.tsx   # 归档页（含线条侧边栏）
    AboutPage.tsx     # 关于页（含乱码文字效果）
    Footer.tsx        # 站点页脚
    ClickSpark.tsx    # 全局点击火花 Canvas 特效
    ScrambledText.tsx # 基于 GSAP 的文字乱码动画
    SplitText.tsx     # 基于 GSAP 的字/词拆分动画
    LineSidebar.tsx   # 交互式线条侧边栏导航
  lib/              # Markdown 渲染工具
  assets/           # 全局样式与字体
```

## 双语支持

主题内置了基于 React Context 的中英文切换系统（无需外部依赖）。语言偏好会自动保存到 `localStorage` 中。

要添加自己的翻译内容，请编辑 `src/i18n/` 目录下的语言文件：

- `en.json` — 英文翻译
- `zh-CN.json` — 简体中文翻译

## 部署到 Cloudflare Pages

1. 将此仓库推送到 GitHub
2. 连接到 Cloudflare Pages
3. 框架预设：**React (Vite)**
4. 构建命令：`npm run build`
5. 输出目录：`dist`
6. 点击 **保存并部署**

已包含 `wrangler.toml` 文件以便快速部署。
