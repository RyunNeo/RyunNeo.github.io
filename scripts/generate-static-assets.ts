import fs from "node:fs";
import path from "node:path";
import { getAllCategories, getAllPosts, getAllTags } from "../src/lib/posts";
import { siteConfig } from "../src/lib/site-config";

const outDir = path.join(process.cwd(), "out");

function ensureOutDir() {
  if (!fs.existsSync(outDir)) {
    throw new Error("构建目录 out 不存在，请先运行 next build");
  }
}

function writeFile(fileName: string, content: string) {
  fs.writeFileSync(path.join(outDir, fileName), content, "utf8");
}

function generateRss() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (post) => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${siteConfig.url}/blog/${post.slug}/</link>
    <guid>${siteConfig.url}/blog/${post.slug}/</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description><![CDATA[${post.summary}]]></description>
  </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${siteConfig.name}]]></title>
    <link>${siteConfig.url}</link>
    <description><![CDATA[${siteConfig.description}]]></description>
    <language>zh-CN</language>
    ${items}
  </channel>
</rss>`;
}

function generateSitemap() {
  const staticRoutes = ["/", "/blog/", "/categories/", "/tags/", "/projects/", "/about/", "/search/"];
  const posts = getAllPosts().map((post) => `/blog/${post.slug}/`);
  const categories = getAllCategories().map((item) => `/categories/${item.slug}/`);
  const tags = getAllTags().map((item) => `/tags/${item.slug}/`);

  const routes = [...staticRoutes, ...posts, ...categories, ...tags];
  const items = routes
    .map((route) => `<url><loc>${siteConfig.url}${route}</loc></url>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${items}
</urlset>`;
}

function generateRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml
`;
}

ensureOutDir();
writeFile("rss.xml", generateRss());
writeFile("sitemap.xml", generateSitemap());
writeFile("robots.txt", generateRobots());
