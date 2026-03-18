import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览文章。",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Tags"
        title="快速定位感兴趣的话题"
        description="标签负责更灵活地组织文章，适合跨分类浏览。"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="surface-card rounded-[1.5rem] p-5"
          >
            <p className="font-serif text-2xl tracking-tight">{tag.label}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{tag.count} 篇相关文章</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
