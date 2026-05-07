import type { Metadata } from "next";
import { cache } from "react";
import config from "@payload-config";
import { getPayload } from "payload";

export const metadata: Metadata = {
  title: "Blog | Chex.AI",
  description: "Latest news, tips and insights from the Chex.AI team.",
};

const getPosts = cache(async () => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    depth: 0,
    draft: false,
    limit: 100,
    overrideAccess: true,
    sort: "-publishedAt",
  });
  return result.docs;
});

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#f4f8ff]">
      {/* Header */}
      <div className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1240px]">
          <p className="font-ui text-[14px] font-semibold uppercase tracking-[0.12em] text-[#ff7a01]">
            Our Blog
          </p>
          <h1 className="mt-3 font-display text-[40px] font-bold leading-tight tracking-[-0.03em] text-[#1b2f4b] sm:text-[52px]">
            Latest Insights
          </h1>
          <p className="mt-4 max-w-xl font-ui text-[18px] leading-relaxed text-[#41546e]">
            Tips, news and updates from the Chex.AI team.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1240px]">
          {posts.length === 0 ? (
            <p className="text-center font-ui text-[16px] text-[#41546e]">
              No posts published yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={`/blogs/${encodeURIComponent(post.slug)}`}
                  className="group flex flex-col overflow-hidden rounded-[16px] border border-[#e4ebf5] bg-white shadow-[0_8px_30px_-12px_rgba(27,47,75,0.15)] transition-shadow hover:shadow-[0_16px_40px_-12px_rgba(27,47,75,0.25)]"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[#e4ebf5]">
                    {post.postImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.postImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1368b9]/15 to-[#ff7a01]/10">
                        <span className="font-display text-[48px] font-bold text-[#1368b9]/30">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    {post.publishedAt && (
                      <p className="font-ui text-[13px] font-medium text-[#ff7a01]">
                        {formatDate(post.publishedAt)}
                      </p>
                    )}
                    <h2 className="mt-2 font-display text-[20px] font-bold leading-snug text-[#1b2f4b] transition-colors group-hover:text-[#1368b9]">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 flex-1 font-ui text-[15px] leading-relaxed text-[#41546e] line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-5 flex items-center gap-1 font-ui text-[14px] font-semibold text-[#1368b9]">
                      Read more
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
