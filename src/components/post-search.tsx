"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { PostSummary } from "@/lib/types";
import { formatDateShort } from "@/lib/utils";

type PostSearchProps = {
  posts: PostSummary[];
};

export function PostSearch({ posts }: PostSearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return posts;
    }

    return posts.filter((post) => {
      const haystack = [post.title, post.summary, post.category, ...post.tags]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [posts, query]);

  return (
    <div className="space-y-6">
      <label className="surface-card flex items-center gap-3 rounded-[1.5rem] px-4 py-3">
        <Search size={18} className="text-[color:var(--muted)]" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索标题、摘要、分类或标签"
          className="min-h-11 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
        />
      </label>
      <div className="grid gap-4">
        {results.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="surface-card rounded-[1.5rem] px-5 py-4"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-[color:var(--muted)]">
              <span>{formatDateShort(post.date)}</span>
              <span>·</span>
              <span>{post.category}</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl tracking-tight">{post.title}</h2>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">{post.summary}</p>
          </Link>
        ))}
        {results.length === 0 ? (
          <div className="surface-card rounded-[1.5rem] px-5 py-8 text-sm text-[color:var(--muted)]">
            没有找到匹配的文章，试试更短的关键词。
          </div>
        ) : null}
      </div>
    </div>
  );
}
