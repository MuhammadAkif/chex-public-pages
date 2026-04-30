/* eslint-disable @next/next/no-img-element */

export type LocationOverviewProps = {
  title: string;
  paragraphs: ReadonlyArray<string>;
  image: string;
  imageAlt: string;
};

type OverviewBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

const BR_TAG_PATTERN = /<br\s*\/?>/gi;

function toOverviewBlocks(paragraphs: ReadonlyArray<string>): OverviewBlock[] {
  const blocks: OverviewBlock[] = [];
  let pendingListItems: string[] = [];

  const flushPendingList = () => {
    if (!pendingListItems.length) {
      return;
    }

    blocks.push({ items: pendingListItems, type: "list" });
    pendingListItems = [];
  };

  for (const paragraph of paragraphs) {
    const lines = paragraph
      .replace(BR_TAG_PATTERN, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    for (const line of lines) {
      const isCheckBullet = line.startsWith("✅");
      const isDashBullet = line.startsWith("- ");
      const isBullet = isCheckBullet || isDashBullet;

      if (isBullet) {
        const normalized = isCheckBullet
          ? line.replace(/^✅\s*/, "").trim()
          : line.replace(/^-+\s*/, "").trim();

        if (normalized) {
          pendingListItems.push(normalized);
        }
        continue;
      }

      flushPendingList();
      blocks.push({ text: line, type: "paragraph" });
    }
  }

  flushPendingList();

  return blocks;
}

export function LocationOverview({
  title,
  paragraphs,
  image,
  imageAlt,
}: LocationOverviewProps) {
  const blocks = toOverviewBlocks(paragraphs);

  return (
    <section className="relative bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute right-[7%] top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.18)_0%,_rgba(255,122,1,0)_72%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-6 left-[3%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(19,104,185,0.18)_0%,_rgba(19,104,185,0)_72%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1240px] rounded-t-[48px] bg-[#f0f6ff] px-6 py-10 sm:px-10 lg:px-14 lg:py-20">
        <h2 className="max-w-4xl font-display text-[34px] font-bold leading-normal tracking-[-1.76px] text-[#1b1c20] sm:text-[40px]">
          {title}
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_0.75fr] lg:items-start">
          <div className="type-location-body-relaxed space-y-4 text-justify text-[#1b1c20]">
            {blocks.map((block, index) => {
              if (block.type === "list") {
                return (
                  <ul
                    key={`list-${index}`}
                    className="space-y-2 pl-1 text-left"
                  >
                    {block.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span aria-hidden="true" className="text-[#16a34a]">
                          ✅
                        </span>
                        <span className="leading-[1.5]">{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={`paragraph-${index}`} className="leading-[1.55]">
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[16px] shadow-[0_22px_64px_0_rgba(30,27,75,0.08)]">
            <img
              src={image}
              alt={imageAlt}
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
