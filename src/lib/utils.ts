import GithubSlugger from "github-slugger";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export function slugify(value: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (normalized) {
    return normalized;
  }

  const slugger = new GithubSlugger();
  return slugger.slug(value);
}

export function absoluteUrl(pathname: string) {
  const trimmed = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `https://ryunneo.github.io${trimmed}`;
}

export function compareDateDesc(left: string, right: string) {
  return new Date(right).getTime() - new Date(left).getTime();
}
