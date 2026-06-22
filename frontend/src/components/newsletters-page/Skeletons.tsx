export function FeaturedSkeleton() {
  return (
    <section className="flex animate-pulse flex-col-reverse items-center justify-between gap-[30px] px-[30px] pb-[40px] pt-[50px] xl:h-[774px] xl:flex-row xl:gap-[clamp(24px,3vw,50px)] xl:px-[100px] xl:py-0">
      <div className="flex w-full min-w-0 flex-col items-start gap-[24px] xl:max-w-[639px] xl:flex-1 xl:gap-[50px]">
        <div className="flex flex-col gap-[20px] items-start w-full">
          <div className="h-[20px] md:h-[24px] w-[200px] md:w-[260px] bg-[#f4f4f4] rounded" />
          <div className="h-[40px] md:h-[64px] w-full bg-[#f4f4f4] rounded" />
          <div className="h-[40px] md:h-[64px] w-3/4 bg-[#f4f4f4] rounded" />
          <div className="h-[60px] md:h-[120px] w-full md:w-[611px] bg-[#f4f4f4] rounded" />
        </div>
        <div className="h-[24px] w-[140px] rounded bg-[#f4f4f4]" />
      </div>
      <div className="aspect-[342/190] w-full rounded-[10px] bg-[#f4f4f4] md:aspect-[646/360] xl:aspect-[646/581] xl:w-[min(43vw,646px)] xl:min-w-[360px] xl:shrink" />
    </section>
  );
}

export function ItemSkeleton() {
  return (
    <div className="flex flex-col gap-[20px] items-center justify-center animate-pulse w-full">
      <div className="w-full aspect-[415/302] bg-[#f4f4f4]" />
      <div className="flex flex-col gap-[10px] items-start w-full">
        <div className="h-[16px] w-[200px] bg-[#f4f4f4] rounded" />
        <div className="h-[24px] md:h-[32px] w-full bg-[#f4f4f4] rounded" />
        <div className="h-[24px] md:h-[32px] w-2/3 bg-[#f4f4f4] rounded" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[24px] gap-y-[30px] md:gap-y-[50px] w-full">
      {Array.from({ length: count }).map((_, i) => (
        <ItemSkeleton key={i} />
      ))}
    </div>
  );
}
