type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

type ListBlock = {
  type: "list";
  items: ReadonlyArray<string>;
};

type MailtoBlock = {
  type: "mailto";
  lead: string;
  email: string;
};

export type LegalBlock = ParagraphBlock | ListBlock | MailtoBlock;

export type LegalSection = {
  heading?: string;
  blocks: ReadonlyArray<LegalBlock>;
};

export type LegalPageContent = {
  title: string;
  sections: ReadonlyArray<LegalSection>;
  lastUpdated: string;
};

function renderBlock(block: LegalBlock, index: number) {
  if (block.type === "paragraph") {
    return (
      <p key={index} className="type-body-md mt-4 text-[#41546e]">
        {block.text}
      </p>
    );
  }
  if (block.type === "list") {
    return (
      <ul
        key={index}
        className="type-body-md mt-4 list-disc space-y-2 pl-6 text-[#41546e]"
      >
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <p key={index} className="type-body-md mt-4 text-[#41546e]">
      {block.lead}{" "}
      <a
        href={`mailto:${block.email}`}
        className="text-[#1b2f4b] underline underline-offset-2 hover:text-[#1368b9]"
      >
        {block.email}
      </a>
    </p>
  );
}

export function LegalPage({ content }: { content: LegalPageContent }) {
  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[820px]">
        <h1 className="font-display text-[32px] font-bold tracking-[-0.02em] text-[#1b2f4b] sm:text-[40px]">
          {content.title}
        </h1>

        {content.sections.map((section, sIdx) => (
          <section key={sIdx} className="mt-10">
            {section.heading && (
              <h2 className="font-display text-[20px] font-bold text-[#1b2f4b] underline underline-offset-4 sm:text-[22px]">
                {section.heading}
              </h2>
            )}
            {section.blocks.map((block, bIdx) => renderBlock(block, bIdx))}
          </section>
        ))}

        <p className="type-body-md mt-12 text-[#41546e]">{content.lastUpdated}</p>
      </div>
    </div>
  );
}
