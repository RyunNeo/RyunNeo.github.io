import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", ...props }) => {
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return <Link href={href} {...props} />;
    }

    return <a href={href} target="_blank" rel="noreferrer" {...props} />;
  },
};
