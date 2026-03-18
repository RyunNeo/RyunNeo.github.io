import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getAllCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "分类",
  description: "按主题分类浏览文章。",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Categories"
        title="文章的主题归档"
        description="每篇文章只保留一个主分类，让浏览和归档都更清晰。"
      />
      <div className="grid gap-5 md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="surface-card rounded-[1.75rem] p-6"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
              分类
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight">{category.label}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              当前共收录 {category.count} 篇文章。
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
