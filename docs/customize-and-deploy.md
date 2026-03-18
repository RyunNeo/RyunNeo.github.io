# 红了的柠檬：个性化与上线清单

这份文档帮你快速完成三件事：

1. 改成你自己的站点文案
2. 新增文章和项目内容
3. 首次推送并部署到 `GitHub Pages`

## 1. 先改这几个文件

### 站点基本信息

文件：`src/lib/site-config.ts`

建议优先修改这些字段：

- `heroTagline`：首页主标题下的一句话
- `heroDescription`：首页简介
- `author.name`：你的展示名称
- `author.role`：你的身份描述
- `author.motto`：个人短句
- `about.intro`：关于页开头介绍
- `about.details`：关于页详细说明
- `about.currently`：你最近在做什么

### 项目展示

文件：`src/content/projects.ts`

这里适合手动补充：

- 中文项目描述
- 技术栈
- 是否精选 `featured`
- 首页展示顺序 `pinnedOrder`
- 演示地址 `demoUrl`

### 文章内容

目录：`src/content/posts`

每篇文章一个 `.mdx` 文件，文件名会成为文章链接。

## 2. 新文章模板

模板文件：`src/content/templates/post-template.mdx`

推荐流程：

- 复制模板
- 放进 `src/content/posts`
- 改文件名为英文短横线格式
- 修改 frontmatter
- 开始写正文

例如：

```bash
src/content/posts/my-first-real-post.mdx
```

## 3. 新项目模板

模板文件：`src/content/templates/project-template.ts`

把其中一段对象复制到 `src/content/projects.ts` 里即可。

## 4. 本地预览

```bash
npm run dev
```

打开：

```text
http://localhost:3000
```

## 5. 首次部署到 GitHub Pages

你的 GitHub 用户名是 `RyunNeo`，如果你要使用主页站点模式，仓库名建议固定为：

```text
RyunNeo.github.io
```

### 推送命令

如果你已经在 GitHub 上创建好了空仓库：

```bash
git branch -M main
git remote add origin https://github.com/RyunNeo/RyunNeo.github.io.git
git add .
git commit -m "feat: initialize personal blog"
git push -u origin main
```

### GitHub 侧检查

- 打开仓库 `Settings`
- 找到 `Pages`
- 确认 Source 使用 `GitHub Actions`

本项目已经内置工作流文件：

```text
.github/workflows/deploy.yml
```

推送后会自动构建并部署。

## 6. 如果你不是用主页仓库

如果你最后用的是：

```text
RyunNeo.github.io/仓库名
```

那么构建前需要设置环境变量：

```bash
$env:NEXT_PUBLIC_BASE_PATH="/你的仓库名"
npm run build
```

但如果你直接使用 `RyunNeo.github.io` 仓库，这一步不需要。

## 7. 上线前最后检查

- 首页一句话是不是你真正想表达的
- About 页有没有换成你自己的内容
- 项目页里是否保留了不想展示的仓库
- 文章分类和标签是否清晰
- GitHub 仓库名是否正确
- 首页头像是否需要替换成自定义图片

## 8. 头像替换建议

当前默认使用 GitHub 头像。

如果你想换成自己的图片，推荐做法：

- 把头像放到 `public/avatar.jpg`
- 然后把 `src/lib/site-config.ts` 里的 `author.avatar` 改成 `/avatar.jpg`

这样后续更稳定，也更方便自己控制。
