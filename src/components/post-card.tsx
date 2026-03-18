import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostSummary } from "@/lib/types";
import { formatDateShort, slugify } from "@/lib/utils";
import { TagPill } from "./tag-pill";

type PostCardProps = {
  post: PostSummary;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className="surface-card rounded-[1.75rem] p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
        <span>{formatDateShort(post.date)}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
        <span>·</span>
        <Link href={`/categories/${slugify(post.category)}`} className="text-[color:var(--accent)]">
          {post.category}
        </Link>
      </div>
      <div className="mt-4 space-y-3">
        <Link href={`/blog/${post.slug}`} className="group inline-flex items-start gap-2">
          <h3 className={`font-serif tracking-tight ${featured ? "text-2xl" : "text-xl"}`}>
            {post.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-1 text-[color:var(--muted)] group-hover:text-[color:var(--accent)]"
          />
        </Link>
        <p className="text-[15px] leading-8 text-[color:var(--muted)]">{post.summary}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagPill key={`${post.slug}-${tag}`} label={tag} />
        ))}
      </div>
    </article>
  );
}
