import type { ProjectOverride } from "@/lib/types";

export const projectOverrides: ProjectOverride[] = [
  {
    repo: "blog",
    name: "blog",
    description: "个人博客相关实验仓库，用来尝试内容组织、页面结构和静态部署方案。",
    techStack: ["Next.js", "MDX", "Tailwind CSS"],
    featured: true,
    pinnedOrder: 1,
  },
  {
    repo: "alipay-china-city",
    name: "alipay-china-city",
    description: "支付宝小程序里的省市区选择组件，支持数据回显与面板式选择交互。",
    techStack: ["JavaScript", "小程序", "组件设计"],
    featured: true,
    pinnedOrder: 2,
  },
];
