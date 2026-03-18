import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllCategories, getPostsByCategorySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getAllCategories().find((item) => item.slug === slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.label} 分类`,
    description: `浏览 ${category.label} 分类下的全部文章。`,
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getAllCategories().find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategorySlug(slug);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Category"
        title={category.label}
        description={`当前分类下共有 ${category.count} 篇文章。`}
      />
      <div className="grid gap-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
