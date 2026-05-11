"use client";

import { useEffect, useState } from "react";

import {
  getNewsletters,
  type Newsletter,
  type PaginatedNewsletters,
  type SortBy,
} from "@/api/newsletters";
import { NewsletterDescription } from "@/components/newsletters-page/NewsletterDescription";
import { NewsletterFilter } from "@/components/newsletters-page/NewsletterFilter";
import { NewsletterItem } from "@/components/newsletters-page/NewsletterItem";
import { Pagination } from "@/components/newsletters-page/Pagination";
import { FeaturedSkeleton, GridSkeleton } from "@/components/newsletters-page/Skeletons";
import { Toast } from "@/components/newsletters-page/Toast";

const PAGE_SIZE = 6;

export default function NewslettersPage() {
  const [featured, setFeatured] = useState<Newsletter | null>(null);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [list, setList] = useState<PaginatedNewsletters | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNewsletters({ featured: true, limit: 1 })
      .then((res) => setFeatured(res.data[0] ?? null))
      .catch(() => setError("Failed to load featured newsletter"))
      .finally(() => setFeaturedLoading(false));
  }, []);

  useEffect(() => {
    setListLoading(true);
    const timer = setTimeout(() => {
      getNewsletters({ page: currentPage, limit: PAGE_SIZE, search, sortBy })
        .then(setList)
        .catch(() => setError("Failed to load newsletters"))
        .finally(() => setListLoading(false));
    }, 400);
    return () => clearTimeout(timer);
  }, [search, sortBy, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortBy) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <main className="bg-white w-full flex flex-col">
      {featuredLoading ? (
        <FeaturedSkeleton />
      ) : featured ? (
        <NewsletterDescription newsletter={featured} />
      ) : null}

      <section className="flex flex-col gap-[30px] md:gap-[50px] items-start pt-[30px] md:pt-[50px] pb-[50px] md:pb-[100px] w-full">
        <NewsletterFilter
          search={search}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        <div className="flex flex-col gap-[30px] md:gap-[50px] items-center justify-center px-[30px] md:px-[100px] w-full">
          {!listLoading && search && list && (
            <p className="md:hidden font-dm-sans text-[14px] leading-[20px] text-[#1e1e1e] text-center w-full">
              {list.pagination.total} {list.pagination.total === 1 ? "result" : "results"} for{" "}
              <span className="font-semibold">‘{search}’</span>
            </p>
          )}

          {listLoading ? (
            <GridSkeleton count={PAGE_SIZE} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[24px] gap-y-[30px] md:gap-y-[50px] w-full">
              {list?.data.map((n) => (
                <NewsletterItem key={n._id} newsletter={n} />
              ))}
            </div>
          )}

          {!listLoading && list && list.pagination.pages > 1 && (
            <Pagination
              currentPage={list.pagination.page}
              totalPages={list.pagination.pages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>

      {error && <Toast message={error} onDismiss={() => setError(null)} />}
    </main>
  );
}
