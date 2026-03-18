import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import type {
  CategoryCount,
  PostDetail,
  PostFrontmatter,
  PostSummary,
  TagCount,
  TocHeading,
} from "./types";
import { compareDateDesc, slugify } from "./utils";

const POSTS_DIRECTORY = path.join(process.cwd(), "src", "content", "posts");

function getPostFiles() {
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".mdx"));
}

function validateFrontmatter(slug: string, data: Partial<PostFrontmatter>): PostFrontmatter {
  const requiredFields: Array<keyof PostFrontmatter> = [
    "title",
    "date",
    "summary",
    "category",
    "tags",
  ];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      throw new Error(`文章 ${slug} 缺少必填字段：${field}`);
    }
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    throw new Error(`文章 ${slug} 的 tags 必须是非空数组`);
  }

  return {
    title: data.title!,
    date: data.date!,
    summary: data.summary!,
    category: data.category!,
    tags: data.tags,
    cover: data.cover,
    draft: Boolean(data.draft),
    featured: Boolean(data.featured),
  };
}

function extractToc(content: string) {
  const lines = content.split("\n");
  const slugger = new GithubSlugger();
  let inCodeBlock = false;
  const headings: TocHeading[] = [];

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    const matched = /^(##|###|####)\s+(.+)/.exec(line.trim());

    if (!matched) {
      continue;
    }

    const level = matched[1].length;
    const text = matched[2].trim();
    headings.push({
      level,
      text,
      slug: slugger.slug(text),
    });
  }

  return headings;
}

function parsePost(fileName: string): PostDetail {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = validateFrontmatter(slug, data as Partial<PostFrontmatter>);

  return {
    ...frontmatter,
    slug,
    content,
    toc: extractToc(content),
    readingTime: readingTime(content, {
      wordsPerMinute: 260,
    }).text.replace(" min read", " 分钟阅读"),
  };
}

function sortPosts(posts: PostSummary[]) {
  return posts.sort((left, right) => compareDateDesc(left.date, right.date));
}

export function getAllPosts(includeDraft = false): PostSummary[] {
  const posts = getPostFiles()
    .map(parsePost)
    .filter((post) => (includeDraft ? true : !post.draft))
    .map((post) => ({
      title: post.title,
      date: post.date,
      summary: post.summary,
      category: post.category,
      tags: post.tags,
      cover: post.cover,
      draft: post.draft,
      featured: post.featured,
      slug: post.slug,
      readingTime: post.readingTime,
    }));

  return sortPosts(posts);
}

export function getLatestPosts(limit = 4) {
  return getAllPosts().slice(0, limit);
}

export function getFeaturedPosts(limit = 3) {
  return getAllPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getPostBySlug(slug: string) {
  const fileName = `${slug}.mdx`;

  if (!getPostFiles().includes(fileName)) {
    return null;
  }

  const post = parsePost(fileName);
  if (post.draft) {
    return null;
  }

  return post;
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: posts[index - 1] ?? null,
    next: posts[index + 1] ?? null,
  };
}

export function getAllCategories(): CategoryCount[] {
  const categoryMap = new Map<string, number>();

  for (const post of getAllPosts()) {
    categoryMap.set(post.category, (categoryMap.get(post.category) ?? 0) + 1);
  }

  return [...categoryMap.entries()]
    .map(([label, count]) => ({
      label,
      slug: slugify(label),
      count,
    }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));
}

export function getAllTags(): TagCount[] {
  const tagMap = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }

  return [...tagMap.entries()]
    .map(([label, count]) => ({
      label,
      slug: slugify(label),
      count,
    }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));
}

export function getPostsByCategorySlug(categorySlug: string) {
  return getAllPosts().filter((post) => slugify(post.category) === categorySlug);
}

export function getPostsByTagSlug(tagSlug: string) {
  return getAllPosts().filter((post) => post.tags.some((tag) => slugify(tag) === tagSlug));
}
