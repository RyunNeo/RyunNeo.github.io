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

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Projects"
        title="把做过的东西认真摆出来"
        description="项目数据来自 GitHub，同时支持手动补充中文描述、技术栈和展示顺序。"
      />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.repo} project={project} />
        ))}
      </div>
    </div>
  );
}
