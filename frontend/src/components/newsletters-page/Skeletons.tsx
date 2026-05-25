export function FeaturedSkeleton() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-[40px] md:gap-[50px] px-[30px] md:px-[100px] pt-[50px] pb-[20px] md:py-0 md:h-[774px] animate-pulse">
      <div className="flex flex-col gap-[20px] md:gap-[50px] items-start w-full md:w-[639px] md:shrink-0">
        <div className="flex flex-col gap-[20px] items-start w-full">
          <div className="h-[20px] md:h-[24px] w-[200px] md:w-[260px] bg-[#f4f4f4] rounded" />
          <div className="h-[40px] md:h-[64px] w-full bg-[#f4f4f4] rounded" />
          <div className="h-[40px] md:h-[64px] w-3/4 bg-[#f4f4f4] rounded" />
          <div className="h-[60px] md:h-[120px] w-full md:w-[611px] bg-[#f4f4f4] rounded" />
        </div>
        <div className="hidden md:block h-[24px] w-[140px] bg-[#f4f4f4] rounded" />
      </div>
      <div className="w-full aspect-[342/158] md:w-[646px] md:aspect-[646/581] bg-[#f4f4f4] md:shrink-0" />
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
