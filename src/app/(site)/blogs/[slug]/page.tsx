import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import config from "@payload-config";
import { getPayload } from "payload";
import type { Post } from "@/payload-types";
import type { ReactNode } from "react";

const getPost = cache(async (slug: string): Promise<Post | null> => {
  const payload = await getPayload({ config });
  const decoded = decodeURIComponent(slug);
  const result = await payload.find({
    collection: "posts",
    depth: 0,
    draft: false,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: decoded } },
  });
  return (result.docs[0] as Post) ?? null;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found | Chex.AI" };
  return {
    title: `${post.title} | Chex.AI Blog`,
    description: post.excerpt ?? undefined,
  };
}

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Rich text renderer ──────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderNode(node: any, key: number | string): ReactNode {
  if (!node) return null;

  switch (node.type) {
    case "root":
      return node.children?.map((child: any, i: number) => renderNode(child, i));

    case "paragraph": {
      const children = node.children?.map((c: any, i: number) => renderNode(c, i));
      const isEmpty = !node.children?.some((c: any) => c.text?.trim() || c.children?.length);
      if (isEmpty) return <br key={key} />;
      return (
        <p key={key} className="mb-5 leading-[1.8] text-[#2d3e50]">
          {children}
        </p>
      );
    }

    case "heading": {
      const tag = node.tag ?? "h2";
      const sizeMap: Record<string, string> = {
        h1: "mt-10 mb-4 font-display text-[36px] font-bold tracking-tight text-[#1b2f4b]",
        h2: "mt-8 mb-3 font-display text-[28px] font-bold tracking-tight text-[#1b2f4b]",
        h3: "mt-6 mb-2 font-display text-[22px] font-bold text-[#1b2f4b]",
        h4: "mt-5 mb-2 font-display text-[18px] font-bold text-[#1b2f4b]",
        h5: "mt-4 mb-1 font-display text-[16px] font-bold text-[#1b2f4b]",
        h6: "mt-3 mb-1 font-display text-[14px] font-bold text-[#1b2f4b]",
      };
      const cls = sizeMap[tag] ?? sizeMap.h2;
      const kids = node.children?.map((c: any, i: number) => renderNode(c, i));
      if (tag === "h1") return <h1 key={key} className={cls}>{kids}</h1>;
      if (tag === "h3") return <h3 key={key} className={cls}>{kids}</h3>;
      if (tag === "h4") return <h4 key={key} className={cls}>{kids}</h4>;
      if (tag === "h5") return <h5 key={key} className={cls}>{kids}</h5>;
      if (tag === "h6") return <h6 key={key} className={cls}>{kids}</h6>;
      return <h2 key={key} className={cls}>{kids}</h2>;
    }

    case "text": {
      let content: ReactNode = node.text;
      const fmt = node.format ?? 0;
      if (fmt & 1) content = <strong>{content}</strong>;
      if (fmt & 2) content = <em>{content}</em>;
      if (fmt & 4) content = <s>{content}</s>;
      if (fmt & 8) content = <u>{content}</u>;
      if (fmt & 16)
        content = (
          <code className="rounded bg-[#f0f4ff] px-1.5 py-0.5 font-mono text-[14px] text-[#1368b9]">
            {content}
          </code>
        );
      return <span key={key}>{content}</span>;
    }

    case "linebreak":
      return <br key={key} />;

    case "link": {
      const href = node.fields?.url ?? node.url ?? "#";
      return (
        <a
          key={key}
          href={href}
          className="font-semibold text-[#1368b9] underline underline-offset-2 hover:text-[#3d8fd9]"
          target={node.fields?.newTab ? "_blank" : undefined}
          rel={node.fields?.newTab ? "noopener noreferrer" : undefined}
        >
          {node.children?.map((c: any, i: number) => renderNode(c, i))}
        </a>
      );
    }

    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return (
        <Tag
          key={key}
          className={`mb-5 pl-6 ${node.listType === "number" ? "list-decimal" : "list-disc"} space-y-1 text-[#2d3e50]`}
        >
          {node.children?.map((c: any, i: number) => renderNode(c, i))}
        </Tag>
      );
    }

    case "listitem":
      return (
        <li key={key} className="leading-[1.8]">
          {node.children?.map((c: any, i: number) => renderNode(c, i))}
        </li>
      );

    case "quote":
      return (
        <blockquote
          key={key}
          className="my-6 border-l-4 border-[#ff7a01] pl-5 font-ui text-[18px] italic leading-relaxed text-[#41546e]"
        >
          {node.children?.map((c: any, i: number) => renderNode(c, i))}
        </blockquote>
      );

    default:
      if (node.children)
        return node.children.map((c: any, i: number) => renderNode(c, i));
      return null;
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#f4f8ff] px-4 pt-14 pb-0 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[800px]">
          <a
            href="/blogs"
            className="inline-flex items-center gap-1 font-ui text-[14px] font-medium text-[#1368b9] hover:text-[#3d8fd9]"
          >
            ← Back to Blog
          </a>
          {post.publishedAt && (
            <p className="mt-6 font-ui text-[13px] font-semibold uppercase tracking-[0.12em] text-[#ff7a01]">
              {formatDate(post.publishedAt)}
            </p>
          )}
          <h1 className="mt-3 font-display text-[36px] font-bold leading-tight tracking-[-0.03em] text-[#1b2f4b] sm:text-[48px]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 font-ui text-[18px] leading-relaxed text-[#41546e]">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Featured image */}
      {post.postImage && (
        <div className="px-4 pt-10 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[800px] overflow-hidden rounded-[16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.postImage}
              alt={post.title}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[800px] font-ui text-[17px] leading-[1.8]">
          {post.content?.root ? renderNode(post.content.root, 0) : (
            <p className="text-[#41546e]">No content available.</p>
          )}
        </div>
      </article>

      {/* Footer CTA */}
      <div className="border-t border-[#e4ebf5] px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[800px] items-center justify-between gap-4">
          <a
            href="/blogs"
            className="font-ui text-[15px] font-semibold text-[#1368b9] hover:text-[#3d8fd9]"
          >
            ← All posts
          </a>
          <a
            href="/home"
            className="inline-flex items-center justify-center rounded-[4px] bg-[#ff7a01] px-6 py-2.5 font-ui text-[14px] font-bold text-white hover:bg-[#eb7200]"
          >
            Start My Inspection
          </a>
        </div>
      </div>
    </div>
  );
}
