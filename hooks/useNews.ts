// hooks/useNews.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NewsItem } from "../types/news/newsTypes";

export const useNews = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchNews = async (page: number) => {
    setLoading(true);
    try {
      // Updated to use our Next.js API route
      const response = await axios.get('/api/news', {
        params: {
          page: page,
          pageSize: 2,
        },
      });

      const articles = response.data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        imageUrl: article.urlToImage,
        articleUrl: article.url,
        author: article.author || "Unknown Author",
        publishedAt: article.publishedAt,
      }));
      
      setNewsItems(articles);

      localStorage.setItem("newsPage", page.toString());
      localStorage.setItem("newsItems", JSON.stringify(articles));
    } catch (error) {
      toast.error("Failed to fetch news", {
        containerId: "GlobalApplicationToast",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("newsPage");
    const savedNewsItems = localStorage.getItem("newsItems");

    if (savedPage && savedNewsItems) {
      setPage(Number(savedPage));
      setNewsItems(JSON.parse(savedNewsItems));
      setLoading(false);
    } else {
      fetchNews(page);
    }
  }, []);

  return {
    newsItems,
    loading,
    page,
    setPage,
    fetchNews,
  };
};