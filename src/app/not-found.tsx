import Link from "next/link";

export default function NotFound() {
  return (
    <div className="surface-card mx-auto flex max-w-2xl flex-col items-center rounded-[2rem] px-6 py-14 text-center">
      <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)]">404</p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight">这页暂时迷路了</h1>
      <p className="mt-4 max-w-xl text-base leading-8 text-[color:var(--muted)]">
        你可以回到首页继续逛，或者去博客列表看看最近更新的内容。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full bg-[color:var(--foreground)] px-5 text-sm font-medium text-[color:var(--background)]"
        >
          返回首页
        </Link>
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center rounded-full border border-[color:var(--border)] px-5 text-sm font-medium"
        >
          查看文章
        </Link>
      </div>
    </div>
  );
}
