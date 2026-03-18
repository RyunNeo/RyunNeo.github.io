import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostNavigation } from "@/components/post-navigation";
import { TagPill } from "@/components/tag-pill";
import { Toc } from "@/components/toc";
import { compilePostMdx } from "@/lib/mdx";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      siteName: siteConfig.name,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const mdxContent = await compilePostMdx(post.content);
  const { previous, next } = getAdjacentPosts(post.slug);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <article className="space-y-8">
        <header className="surface-card rounded-[2rem] px-6 py-8 sm:px-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
            <span>·</span>
            <TagPill label={post.category} hrefBase="/categories" />
          </div>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--muted)]">
            {post.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagPill key={`${post.slug}-${tag}`} label={tag} />
            ))}
          </div>
        </header>

        <div className="surface-card rounded-[2rem] px-6 py-8 sm:px-8">
          <div className="prose max-w-none">{mdxContent}</div>
        </div>

        <PostNavigation previous={previous} next={next} />
      </article>
      <Toc items={post.toc} />
    </div>
  );
}
