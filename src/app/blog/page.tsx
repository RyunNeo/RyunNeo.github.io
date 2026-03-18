import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "按时间、分类和标签浏览全部文章。",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Blog"
        title="把思考写得更清楚一点"
        description="这里收录技术文章、内容工作流和开发过程中值得记下来的细节。"
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="space-y-6">
          <div className="surface-card rounded-[1.5rem] p-5">
            <p className="text-sm font-semibold">分类</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-xs font-medium text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--foreground)]"
                >
                  {category.label} · {category.count}
                </Link>
              ))}
            </div>
          </div>
          <div className="surface-card rounded-[1.5rem] p-5">
            <p className="text-sm font-semibold">标签</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-xs font-medium text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--foreground)]"
                >
                  {tag.label} · {tag.count}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
