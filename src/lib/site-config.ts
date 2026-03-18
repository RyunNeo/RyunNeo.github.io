import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "爱吃小饼干吧",
  description: "一个聚焦前端开发与跨端实践的个人网站，记录 React、Vue、uni-app、React Native 以及真实项目经验。",
  url: "https://ryunneo.github.io",
  githubUsername: "RyunNeo",
  keywords: ["个人博客", "前端开发", "React", "Vue", "uni-app", "React Native"],
  profile: {
    experienceYears: 6,
    headlineStats: [
      {
        label: "经验年限",
        value: "6 年前端开发",
      },
      {
        label: "核心栈",
        value: "React / Vue / uni-app / React Native",
      },
      {
        label: "关注方向",
        value: "Web、跨端、工程化、体验优化",
      },
    ],
    strengths: [
      {
        title: "Web 开发",
        description: "基于 React 和 Vue 做业务页面、后台系统和内容型站点，兼顾交互体验与长期维护。",
      },
      {
        title: "跨端开发",
        description: "使用 uni-app 和 React Native 处理多端交付，让同一套业务思路可以落到更多终端场景。",
      },
      {
        title: "工程与体验",
        description: "关注可维护性、开发效率和用户体验，不只把功能做出来，也在意后续迭代是否稳定顺手。",
      },
    ],
  },
  heroTagline: "6 年前端开发经验，持续在 Web 与跨端之间打磨更顺手的产品体验。",
  heroDescription:
    "这里会记录我在 React、Vue、uni-app 和 React Native 里的实践经验，也会整理工程优化、项目落地和真实业务中的前端思考。",
  highlights: [
    {
      label: "工作经验",
      value: "6 年前端开发经验，长期参与真实项目落地与迭代。",
    },
    {
      label: "技术方向",
      value: "React、Vue、uni-app、React Native，覆盖 Web 与跨端场景。",
    },
    {
      label: "内容主题",
      value: "项目复盘、工程实践、跨端开发、前端体验优化。",
    },
  ],
  author: {
    name: "爱吃小饼干吧",
    role: "前端工程师 / 跨端开发者",
    motto: "把复杂的问题讲清楚，把能落地的方案做扎实。",
    avatar: "https://avatars.githubusercontent.com/u/152515076?v=4",
    avatarAlt: "爱吃小饼干吧 avatar",
    github: "https://github.com/RyunNeo",
  },
  navigation: [
    { label: "首页", href: "/" },
    { label: "博客", href: "/blog" },
    { label: "分类", href: "/categories" },
    { label: "标签", href: "/tags" },
    { label: "项目", href: "/projects" },
    { label: "关于", href: "/about" },
    { label: "搜索", href: "/search" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/RyunNeo" },
    { label: "RSS", href: "/rss.xml" },
  ],
  about: {
    intro:
      "我是一名前端工程师，已经工作 6 年，主要技术栈包括 React、Vue、uni-app 和 React Native。过去这些年，我长期在真实业务里做 Web 和跨端相关开发，也逐渐形成了自己对工程质量、用户体验和长期维护的理解。",
    details: [
      "这个网站主要用来记录我在前端开发中的实践和思考，包括 React、Vue、uni-app、React Native 相关的项目经验，也会整理一些工程化、跨端开发和性能优化方面的内容。",
      "做前端 6 年之后，我越来越在意的不只是功能能不能实现，而是方案是否清晰、体验够不够好、代码能不能稳定维护。这些也是我想持续写下来的原因。",
      "我希望这里不只是一个文章列表，而是一个可以长期积累内容、展示项目和表达技术理解的个人空间。",
    ],
    techStack: [
      "React",
      "Vue",
      "uni-app",
      "React Native",
      "Next.js",
      "TypeScript",
    ],
    currently: [
      "持续沉淀前端与跨端开发经验",
      "整理更适合长期写作的技术内容体系",
      "打磨项目展示方式，让这个网站更像自己的个人空间",
    ],
  },
};
