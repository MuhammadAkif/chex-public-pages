'use client'

type AnnouncementHeaderProps = {
  message: string
}

export function AnnouncementHeader({ message }: AnnouncementHeaderProps) {
  return (
    <div className="bg-[#1368b9] px-4 py-3 text-center text-white">
      <p className="font-ui text-sm font-normal leading-5 text-white sm:text-[20px] sm:leading-8">
        {message}
      </p>
    </div>
  )
}
