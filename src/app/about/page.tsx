import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "关于",
  description: "关于这个博客和作者本人。",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {siteConfig.profile.headlineStats.map((item) => (
          <div key={item.label} className="surface-card rounded-[1.5rem] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
              {item.label}
            </p>
            <p className="mt-3 text-sm leading-7">{item.value}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="surface-card rounded-[2rem] px-6 py-8 sm:px-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)]">About</p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">关于我</h1>
        <p className="mt-5 text-base leading-8 text-[color:var(--muted)]">
          {siteConfig.about.intro}
        </p>
        <div className="mt-8 space-y-4">
          {siteConfig.about.details.map((detail) => (
            <p key={detail} className="text-[15px] leading-8 text-[color:var(--muted)]">
              {detail}
            </p>
          ))}
        </div>
      </section>

      <div className="space-y-6">
        <section className="surface-card rounded-[1.75rem] p-6">
          <p className="text-sm font-semibold">技术栈</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {siteConfig.about.techStack.map((item) => (
              <span
                key={item}
                className="inline-flex min-h-10 items-center rounded-full border border-[color:var(--border)] px-3 text-sm text-[color:var(--muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="surface-card rounded-[1.75rem] p-6">
          <p className="text-sm font-semibold">最近在做什么</p>
          <div className="mt-4 space-y-3">
            {siteConfig.about.currently.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-3 text-sm leading-7"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card rounded-[1.75rem] p-6">
          <p className="text-sm font-semibold">我更擅长什么</p>
          <div className="mt-4 space-y-3">
            {siteConfig.profile.strengths.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-4"
              >
                <p className="font-medium">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card rounded-[1.75rem] p-6">
          <p className="text-sm font-semibold">联系与链接</p>
          <div className="mt-4 space-y-3 text-sm">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="block rounded-2xl border border-[color:var(--border)] px-4 py-3 hover:bg-[color:var(--muted-soft)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
