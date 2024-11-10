"use client";

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import MoonLoader from "react-spinners/MoonLoader";
import { NewsViewToggle } from "./NewsViewToggle";
import NewsCard  from "./NewsCard";
import { useNews } from "../../hooks/useNews";
import { ViewType } from "../../types/news/newsTypes";

export default function NewsFeed() {
  const [view, setView] = useState<ViewType>("grid");
  const { newsItems, loading, page, setPage, fetchNews } = useNews();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (isMobile) {
      setView("list");
    }
  }, [isMobile]);

  const handleViewChange = (newView: ViewType) => {
    if (!isMobile) {
      setView(newView);
    }
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchNews(newPage);
  };

  const handlePreviousPage = () => {
    const newPage = Math.max(page - 1, 1);
    setPage(newPage);
    fetchNews(newPage);
  };

  return (
    <div className="container mx-auto p-4 bg-white mt-3 shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-2 mb-1">
        <h1 className="text-2xl font-semibold">
          What's happening around the world?
        </h1>
        {!isMobile && (
          <NewsViewToggle view={view} onChange={handleViewChange} />
        )}
      </div>

      <div className="min-h-[400px]">
        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <MoonLoader size={40} />
          </div>
        ) : newsItems.length === 0 ? (
          <p className="text-center text-lg">No news available.</p>
        ) : (
          <div
            className={`${view === "list" ? "max-h-96 overflow-hidden" : ""}`}
          >
            <div
              className={`grid gap-4 ${
                view === "grid" && !isMobile ? "sm:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {newsItems.map((news, index) => (
                <NewsCard key={index} news={news} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className={`flex ${
          page > 1 ? "justify-between" : "justify-end"
        } mt-4 space-x-2`}
      >
        {page > 1 && (
          <Button
            variant="secondary"
            onClick={handlePreviousPage}
            className="bg-slate-600 text-white hover:bg-slate-700 transition"
          >
            Previous Page
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={handleNextPage}
          className="bg-slate-600 text-white hover:bg-slate-700 transition"
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}