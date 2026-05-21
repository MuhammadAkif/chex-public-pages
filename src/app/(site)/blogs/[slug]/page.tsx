import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import config from "@payload-config";
import { getPayload } from "payload";
import type { Post } from "@/payload-types";
import { slugify } from "@/lib/slugify";
import type { ReactNode } from "react";

const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    depth: 0,
    draft: false,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  });
  return result.docs[0] ?? null;
});

const getPostByNormalizedSlug = cache(
  async (normalizedSlug: string): Promise<Post | null> => {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      depth: 0,
      draft: false,
      limit: 1000,
      overrideAccess: true,
    });

    return (
      result.docs.find((post) => slugify(post.slug) === normalizedSlug) ?? null
    );
  },
);

const getPostFromRouteSlug = cache(async (slug: string) => {
  const decoded = decodeURIComponent(slug);
  const exactPost = await getPostBySlug(decoded);

  if (exactPost) {
    return {
      canonicalSlug: slugify(exactPost.slug),
      post: exactPost,
    };
  }

  const normalized = slugify(decoded);
  const normalizedPost =
    normalized && normalized !== decoded
      ? (await getPostBySlug(normalized)) ??
        (await getPostByNormalizedSlug(normalized))
      : null;

  return {
    canonicalSlug: normalized,
    post: normalizedPost,
  };
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPostFromRouteSlug(slug);
  if (!post) return { title: "Post not found | Chex.AI" };
  const canonicalSlug = slugify(post.slug);

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `/blogs/${encodeURIComponent(canonicalSlug)}`,
    },
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

type RichTextNode = {
  type: string;
  children?: unknown;
  fields?: unknown;
  format?: unknown;
  listType?: unknown;
  tag?: unknown;
  text?: unknown;
  url?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isRichTextNode = (value: unknown): value is RichTextNode =>
  isRecord(value) && typeof value.type === "string";

const getChildren = (node: RichTextNode) =>
  Array.isArray(node.children) ? node.children.filter(isRichTextNode) : [];

const renderChildren = (node: RichTextNode) =>
  getChildren(node).map((child, i) => renderNode(child, i));

const hasRenderableContent = (node: RichTextNode) =>
  getChildren(node).some((child) => {
    if (typeof child.text === "string" && child.text.trim()) return true;
    return getChildren(child).length > 0;
  });

const headingTag = (tag: unknown) =>
  tag === "h1" || tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6"
    ? tag
    : "h2";

const nodeFields = (node: RichTextNode) =>
  isRecord(node.fields) ? node.fields : {};

function renderNode(node: unknown, key: number | string): ReactNode {
  if (!isRichTextNode(node)) return null;

  switch (node.type) {
    case "root":
      return renderChildren(node);

    case "paragraph": {
      if (!hasRenderableContent(node)) return <br key={key} />;
      return (
        <p key={key} className="mb-5 leading-[1.8] text-[#2d3e50]">
          {renderChildren(node)}
        </p>
      );
    }

    case "heading": {
      const tag = headingTag(node.tag);
      const sizeMap: Record<typeof tag, string> = {
        h1: "mt-10 mb-4 font-display text-[36px] font-bold tracking-tight text-[#1b2f4b]",
        h2: "mt-8 mb-3 font-display text-[28px] font-bold tracking-tight text-[#1b2f4b]",
        h3: "mt-6 mb-2 font-display text-[22px] font-bold text-[#1b2f4b]",
        h4: "mt-5 mb-2 font-display text-[18px] font-bold text-[#1b2f4b]",
        h5: "mt-4 mb-1 font-display text-[16px] font-bold text-[#1b2f4b]",
        h6: "mt-3 mb-1 font-display text-[14px] font-bold text-[#1b2f4b]",
      };
      const cls = sizeMap[tag];
      const kids = renderChildren(node);

      if (tag === "h1") return <h1 key={key} className={cls}>{kids}</h1>;
      if (tag === "h3") return <h3 key={key} className={cls}>{kids}</h3>;
      if (tag === "h4") return <h4 key={key} className={cls}>{kids}</h4>;
      if (tag === "h5") return <h5 key={key} className={cls}>{kids}</h5>;
      if (tag === "h6") return <h6 key={key} className={cls}>{kids}</h6>;
      return <h2 key={key} className={cls}>{kids}</h2>;
    }

    case "text": {
      let content: ReactNode = typeof node.text === "string" ? node.text : "";
      const fmt = typeof node.format === "number" ? node.format : 0;
      if (fmt & 1) content = <strong>{content}</strong>;
      if (fmt & 2) content = <em>{content}</em>;
      if (fmt & 4) content = <s>{content}</s>;
      if (fmt & 8) content = <u>{content}</u>;
      if (fmt & 16) {
        content = (
          <code className="rounded bg-[#f0f4ff] px-1.5 py-0.5 font-mono text-[14px] text-[#1368b9]">
            {content}
          </code>
        );
      }
      return <span key={key}>{content}</span>;
    }

    case "linebreak":
      return <br key={key} />;

    case "link": {
      const fields = nodeFields(node);
      const href =
        typeof fields.url === "string"
          ? fields.url
          : typeof node.url === "string"
            ? node.url
            : "#";
      const newTab = fields.newTab === true;
      return (
        <a
          key={key}
          href={href}
          className="font-semibold text-[#1368b9] underline underline-offset-2 hover:text-[#3d8fd9]"
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
        >
          {renderChildren(node)}
        </a>
      );
    }

    case "list": {
      const isNumbered = node.listType === "number";
      const Tag = isNumbered ? "ol" : "ul";
      return (
        <Tag
          key={key}
          className={`mb-5 pl-6 ${isNumbered ? "list-decimal" : "list-disc"} space-y-1 text-[#2d3e50]`}
        >
          {renderChildren(node)}
        </Tag>
      );
    }

    case "listitem":
      return (
        <li key={key} className="leading-[1.8]">
          {renderChildren(node)}
        </li>
      );

    case "quote":
      return (
        <blockquote
          key={key}
          className="my-6 border-l-4 border-[#ff7a01] pl-5 font-ui text-[18px] italic leading-relaxed text-[#41546e]"
        >
          {renderChildren(node)}
        </blockquote>
      );

    default:
      return renderChildren(node);
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const { canonicalSlug, post } = await getPostFromRouteSlug(slug);
  if (!post) notFound();
  if (canonicalSlug && decoded !== canonicalSlug) {
    permanentRedirect(`/blogs/${encodeURIComponent(canonicalSlug)}`);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f4f8ff] px-4 pt-14 pb-0 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[800px]">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1 font-ui text-[14px] font-medium text-[#1368b9] hover:text-[#3d8fd9]"
          >
            Back to Blog
          </Link>
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

      <article className="px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[800px] font-ui text-[17px] leading-[1.8]">
          {post.content?.root ? (
            renderNode(post.content.root, 0)
          ) : (
            <p className="text-[#41546e]">No content available.</p>
          )}
        </div>
      </article>

      <div className="border-t border-[#e4ebf5] px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[800px] items-center justify-between gap-4">
          <Link
            href="/blogs"
            className="font-ui text-[15px] font-semibold text-[#1368b9] hover:text-[#3d8fd9]"
          >
            All posts
          </Link>
        </div>
      </div>
    </div>
  );
}
