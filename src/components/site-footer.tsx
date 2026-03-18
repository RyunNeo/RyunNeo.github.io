import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 text-sm text-[color:var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} {siteConfig.name} · 用文字和代码慢慢发光。</p>
        <div className="flex flex-wrap gap-4">
          {siteConfig.socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-[color:var(--foreground)]"
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
