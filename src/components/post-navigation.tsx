import Link from "next/link";
import type { PostSummary } from "@/lib/types";

type PostNavigationProps = {
  previous: PostSummary | null;
  next: PostSummary | null;
};

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="surface-card rounded-[1.5rem] p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">较新文章</p>
        {previous ? (
          <Link href={`/blog/${previous.slug}`} className="mt-3 block font-serif text-xl tracking-tight">
            {previous.title}
          </Link>
        ) : (
          <p className="mt-3 text-sm text-[color:var(--muted)]">已经是最新一篇。</p>
        )}
      </div>
      <div className="surface-card rounded-[1.5rem] p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">较早文章</p>
        {next ? (
          <Link href={`/blog/${next.slug}`} className="mt-3 block font-serif text-xl tracking-tight">
            {next.title}
          </Link>
        ) : (
          <p className="mt-3 text-sm text-[color:var(--muted)]">已经到文章末尾。</p>
        )}
      </div>
    </div>
  );
}
