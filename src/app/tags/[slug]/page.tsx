import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllTags, getPostsByTagSlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getAllTags().find((item) => item.slug === slug);

  if (!tag) {
    return {};
  }

  return {
    title: `#${tag.label}`,
    description: `浏览和 ${tag.label} 相关的文章。`,
  };
}

export default async function TagDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getAllTags().find((item) => item.slug === slug);

  if (!tag) {
    notFound();
  }

  const posts = getPostsByTagSlug(slug);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Tag"
        title={`# ${tag.label}`}
        description={`当前标签下共有 ${tag.count} 篇文章。`}
      />
      <div className="grid gap-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
