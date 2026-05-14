import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";

export type AboutChexProps = {
  title: string;
  description: string;
  videoPoster: SiteImageSource;
  videoPosterAlt: string;
  videoSrc: string;
};

export function AboutChex({
  title,
  description,
  videoPoster,
  videoPosterAlt,
  videoSrc,
}: AboutChexProps) {
  const posterSrc =
    typeof videoPoster === "string" ? videoPoster : videoPoster.src;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1260px]">
        <div className="text-center">
          <h2 className="font-display text-[34px] font-bold leading-tight text-[#1b2f4b] sm:text-[44px]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl font-ui text-[16px] leading-8 text-[#41546e] sm:text-[18px] lg:text-[20px]">
            {description}
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[20px] shadow-[0_60px_140px_-70px_rgba(19,104,185,0.65)]">
          <video
            poster={posterSrc}
            controls
            playsInline
            className="h-auto w-full"
          >
            <source src={videoSrc} type="video/mp4" />
            <SiteImage src={videoPoster} alt={videoPosterAlt} />
          </video>
        </div>
      </div>
    </section>
  );
}
