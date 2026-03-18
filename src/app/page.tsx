import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpenText, FolderKanban, Sparkles } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedPosts, getLatestPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export default async function Home() {
  const [featuredPosts, latestPosts, featuredProjects] = await Promise.all([
    Promise.resolve(getFeaturedPosts(2)),
    Promise.resolve(getLatestPosts(4)),
    getFeaturedProjects(3),
  ]);

  return (
    <div className="space-y-14 pb-8">
      <section className="surface-card grid gap-8 rounded-[2rem] px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.9fr] lg:px-10 lg:py-10">
        <div className="space-y-6">
          <span className="inline-flex min-h-11 items-center rounded-full border border-[color:var(--border)] bg-[color:var(--accent-soft)] px-4 text-sm font-medium text-[color:var(--accent)]">
            一个开发者的内容花园
          </span>
          <div className="space-y-4">
            <p className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {siteConfig.name}
            </p>
            <p className="max-w-2xl text-lg leading-9 text-[color:var(--muted)] sm:text-xl">
              {siteConfig.heroTagline}
            </p>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
              {siteConfig.heroDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[color:var(--foreground)] px-5 text-sm font-medium text-[color:var(--background)] hover:-translate-y-0.5 hover:opacity-92"
            >
              开始阅读
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-5 text-sm font-medium hover:-translate-y-0.5"
            >
              看看作品
              <FolderKanban size={16} />
            </Link>
          </div>
          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            {siteConfig.highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-7">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="surface-strong flex flex-col justify-between rounded-[1.75rem] p-6">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Image
                src={siteConfig.author.avatar}
                alt={siteConfig.author.avatarAlt ?? `${siteConfig.author.name} avatar`}
                width={80}
                height={80}
                className="h-20 w-20 rounded-[1.5rem] object-cover ring-4 ring-white/50 dark:ring-white/5"
              />
              <div>
                <p className="text-xl font-semibold">{siteConfig.author.name}</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  {siteConfig.author.role}
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-[color:var(--muted-soft)] px-4 py-4 text-sm leading-7 text-[color:var(--muted)]">
              “{siteConfig.author.motto}”
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/search"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 text-sm font-medium"
            >
              <BookOpenText size={16} />
              站内搜索
            </Link>
            <a
              href={siteConfig.author.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 text-sm font-medium"
            >
              <Sparkles size={16} />
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <SectionHeading
            eyebrow="精选文章"
            title="近期值得读的内容"
            description="挑几篇能代表这个博客气质的文章，先从这里认识我。"
            href="/blog"
            hrefLabel="查看全部文章"
          />
          <div className="grid gap-5">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <SectionHeading
            eyebrow="精选项目"
            title="值得展示的项目与作品"
            description="只展示真正想放进个人主页里的内容，保留手工整理过的介绍与重点。"
            href="/projects"
            hrefLabel="查看全部项目"
          />
          <div className="grid gap-5">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.repo} project={project} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="最近更新"
          title="保持轻量但持续输出"
          description="最新文章按时间排序，保留清晰的分类与标签结构。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
