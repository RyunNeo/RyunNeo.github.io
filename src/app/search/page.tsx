import type { Metadata } from "next";
import { PostSearch } from "@/components/post-search";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索标题、摘要、分类和标签。",
};

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Search"
        title="按关键词找回文章"
        description="首版使用本地静态搜索，不依赖第三方服务。"
      />
      <PostSearch posts={posts} />
    </div>
  );
}
