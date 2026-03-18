import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/lib/types";
import { formatDateShort } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className="surface-card flex h-full flex-col rounded-[1.75rem] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-serif tracking-tight ${compact ? "text-xl" : "text-2xl"}`}>
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{project.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {project.featured ? (
            <span className="inline-flex min-h-9 items-center rounded-full bg-[color:var(--foreground)] px-3 text-xs font-medium text-[color:var(--background)]">
              精选
            </span>
          ) : null}
          <span className="inline-flex min-h-9 items-center rounded-full bg-[color:var(--accent-soft)] px-3 text-xs font-medium text-[color:var(--accent)]">
            {project.source === "github" ? "GitHub" : "Local"}
          </span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={`${project.repo}-${tech}`}
            className="inline-flex min-h-10 items-center rounded-full border border-[color:var(--border)] px-3 text-xs text-[color:var(--muted)]"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[color:var(--muted)]">
        <span className="inline-flex items-center gap-1">
          <Star size={14} />
          {project.stars}
        </span>
        {project.updatedAt ? <span>更新于 {formatDateShort(project.updatedAt)}</span> : null}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-4 text-sm font-medium"
        >
          <Github size={16} />
          仓库
        </a>
        {project.demoUrl || project.homepage ? (
          <a
            href={project.demoUrl ?? project.homepage}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[color:var(--foreground)] px-4 text-sm font-medium text-[color:var(--background)]"
          >
            <ExternalLink size={16} />
            预览
          </a>
        ) : null}
      </div>
    </article>
  );
}
