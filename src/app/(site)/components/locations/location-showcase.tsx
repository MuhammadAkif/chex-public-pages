const SHOWCASE_VIDEO_SRC =
  'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/chex-video.mp4'

export type LocationShowcaseProps = Record<string, unknown> & {
  video?: string
}

export function LocationShowcase({ video = SHOWCASE_VIDEO_SRC }: LocationShowcaseProps) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto min-h-[256px] max-w-[1240px] overflow-hidden rounded-[38px] border border-[#2563eb]/30 bg-[#d8e0e7] shadow-[0_22px_64px_0_rgba(30,27,75,0.08)] sm:min-h-[400px] lg:min-h-[515px]">
        <video
          src={video}
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          controls
          disablePictureInPicture
          disableRemotePlayback
        />
      </div>
    </section>
  )
}
