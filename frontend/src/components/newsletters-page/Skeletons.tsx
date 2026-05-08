export function FeaturedSkeleton() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-[40px] lg:gap-[50px] px-[24px] lg:px-[100px] py-[60px] lg:h-[774px] lg:py-0 animate-pulse">
      <div className="flex flex-col gap-[30px] lg:gap-[50px] items-start w-full lg:w-[639px] lg:shrink-0">
        <div className="flex flex-col gap-[20px] items-start w-full">
          <div className="h-[24px] w-[260px] bg-[#f4f4f4] rounded" />
          <div className="h-[64px] w-full bg-[#f4f4f4] rounded" />
          <div className="h-[64px] w-3/4 bg-[#f4f4f4] rounded" />
          <div className="h-[120px] w-full lg:w-[611px] bg-[#f4f4f4] rounded" />
        </div>
        <div className="h-[24px] w-[140px] bg-[#f4f4f4] rounded" />
      </div>
      <div className="w-full lg:w-[646px] aspect-[646/581] bg-[#f4f4f4] lg:shrink-0" />
    </section>
  );
}

export function ItemSkeleton() {
  return (
    <div className="flex flex-col gap-[20px] items-center justify-center animate-pulse w-full">
      <div className="w-full aspect-[415/302] bg-[#f4f4f4]" />
      <div className="flex flex-col gap-[10px] items-start w-full">
        <div className="h-[16px] w-[200px] bg-[#f4f4f4] rounded" />
        <div className="h-[32px] w-full bg-[#f4f4f4] rounded" />
        <div className="h-[32px] w-2/3 bg-[#f4f4f4] rounded" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-[50px] w-full">
      {Array.from({ length: count }).map((_, i) => (
        <ItemSkeleton key={i} />
      ))}
    </div>
  );
}
