"use client";

import { useEffect, useState } from "react";

import {
  getAllNewsletters,
  getFeaturedNewsletter,
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

const PAGE_SIZE = 9;

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
    getFeaturedNewsletter()
      .then(setFeatured)
      .catch(() => setError("Failed to load featured newsletter"))
      .finally(() => setFeaturedLoading(false));
  }, []);

  useEffect(() => {
    setListLoading(true);
    const timer = setTimeout(() => {
      getAllNewsletters({ page: currentPage, limit: PAGE_SIZE, search, sortBy })
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

      <section className="flex flex-col gap-[50px] items-start pt-[50px] pb-[100px] w-full">
        <NewsletterFilter
          search={search}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        <div className="flex flex-col gap-[50px] items-center justify-center px-[24px] lg:px-[100px] w-full">
          {listLoading ? (
            <GridSkeleton count={PAGE_SIZE} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-[50px] w-full">
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
