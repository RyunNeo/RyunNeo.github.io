import type { TocHeading } from "@/lib/types";
import { cn } from "@/lib/utils";

type TocProps = {
  items: TocHeading[];
};

export function Toc({ items }: TocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="surface-card sticky top-28 hidden rounded-[1.5rem] p-5 lg:block">
      <p className="text-sm font-semibold">文章目录</p>
      <nav className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            className={cn(
              "rounded-2xl border border-transparent px-3 py-2 text-sm leading-6 text-[color:var(--muted)] hover:border-[color:var(--border)] hover:bg-[color:var(--muted-soft)] hover:text-[color:var(--foreground)]",
              item.level > 2 && "ml-3",
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
