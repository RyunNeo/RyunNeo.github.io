import Link from "next/link";
import { slugify } from "@/lib/utils";

type TagPillProps = {
  label: string;
  hrefBase?: "/tags" | "/categories";
};

export function TagPill({ label, hrefBase = "/tags" }: TagPillProps) {
  return (
    <Link
      href={`${hrefBase}/${slugify(label)}`}
      className="inline-flex min-h-10 items-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-3 text-xs font-medium text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--foreground)]"
    >
      {label}
    </Link>
  );
}
