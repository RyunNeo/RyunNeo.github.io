# 爱吃小饼干吧

一个部署到 `GitHub Pages` 的个人开发者博客，基于 `Next.js + MDX` 构建，使用纯 Markdown/MDX 维护文章。

## 特性

- `Next.js App Router` + 静态导出
- `MDX` 文章系统，支持代码高亮与目录
- 首页展示个人介绍、精选文章与精选项目
- 分类、标签、搜索、RSS、站点地图
- 明暗主题切换
- `GitHub Actions` 自动部署到 `GitHub Pages`

## 本地开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看站点。

## 构建静态站点

```bash
npm run build
```

构建完成后会输出到 `out/`，并额外生成：

- `out/rss.xml`
- `out/sitemap.xml`
- `out/robots.txt`

## 内容维护

- 文章位于 `src/content/posts`
- 项目补充配置位于 `src/content/projects.ts`
- 站点信息位于 `src/lib/site-config.ts`
- 常用修改说明位于 `docs/customize-and-deploy.md`

## 部署说明

- 将仓库名设置为 `RyunNeo.github.io`
- 推送到 `main` 分支
- 在 GitHub 仓库中启用 `Pages`
- Actions 工作流会自动构建并发布

如需切换到项目子路径部署，可设置环境变量 `NEXT_PUBLIC_BASE_PATH=/repo-name`。
