import type { ProjectOverride } from "@/lib/types";

export const hiddenProjectRepos = ["blog", "RyunNeo.github.io"];

export const projectOverrides: ProjectOverride[] = [
  {
    repo: "alipay-china-city",
    name: "alipay-china-city",
    description: "支付宝小程序里的省市区选择组件，支持数据回显和面板式选择交互。",
    techStack: ["JavaScript", "小程序", "组件设计"],
    featured: true,
    pinnedOrder: 1,
  },
];
