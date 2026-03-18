import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  hrefLabel?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)]">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 text-base leading-8 text-[color:var(--muted)]">{description}</p>
      </div>
      {href && hrefLabel ? (
        <Link
          href={href}
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-4 text-sm font-medium"
        >
          {hrefLabel}
          <ArrowUpRight size={16} />
        </Link>
      ) : null}
    </div>
  );
}
