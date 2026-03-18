import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "项目",
  description: "从 GitHub 读取并整理后的项目展示页。",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const highlightedProjects = projects.filter((project) => project.featured);
  const regularProjects = projects.filter((project) => !project.featured);

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Projects"
        title="把想展示的东西认真摆出来"
        description="这里展示我真正希望放进个人主页里的项目与作品，并支持按需隐藏不想公开陈列的仓库。"
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="surface-card rounded-[1.5rem] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">精选项目</p>
          <p className="mt-3 text-3xl font-semibold">{highlightedProjects.length}</p>
          <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
            优先放在首页和项目页顶部，代表我更想展示的内容。
          </p>
        </div>
        <div className="surface-card rounded-[1.5rem] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">公开仓库</p>
          <p className="mt-3 text-3xl font-semibold">{projects.length}</p>
          <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
            已过滤不想展示的仓库，只保留适合放进个人主页的内容。
          </p>
        </div>
        <div className="surface-card rounded-[1.5rem] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">开发方向</p>
          <p className="mt-3 text-sm leading-7">
            React、Vue、uni-app、React Native，偏向 Web 与跨端结合的实际项目场景。
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="精选作品"
          title="优先想展示的项目"
          description="这部分更像作品集，会优先展示更贴近你个人方向和经验的项目。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {highlightedProjects.map((project) => (
            <ProjectCard key={project.repo} project={project} />
          ))}
        </div>
      </section>

      {regularProjects.length > 0 ? (
        <section className="space-y-5">
          <SectionHeading
            eyebrow="更多仓库"
            title="其它适合公开展示的内容"
            description="如果后续有更多项目沉淀下来，也会继续统一整理到这里。"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {regularProjects.map((project) => (
              <ProjectCard key={project.repo} project={project} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
