import React from 'react';
import { NewsItem } from '../../types/news/newsTypes';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
    <div className="relative w-full h-40 mb-2">
      <img
        src={news.imageUrl || "/fallback-image.jpg"}
        alt={news.title}
        className="rounded-md w-full h-full object-cover"
      />
    </div>
    <h2 className="text-lg font-bold mt-2">
      {news.title
        ? news.title.length > 80
          ? `${news.title.slice(0, 80)}...`
          : news.title
        : "No title"}
    </h2>
    <p className="text-xs text-gray-400 mt-1">
      by {news.author} -{" "}
      {new Date(news.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </p>
    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
      {news.description
        ? news.description.length > 100
          ? `${news.description.slice(0, 100)}...`
          : news.description
        : "No description available."}
    </p>
    <a
      href={news.articleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 text-sm mb-1"
    >
      Read More
    </a>
    <div className="text-center mt-4">
      <a href={news.articleUrl} className="text-blue-500 hover:underline">
        View More
      </a>
    </div>
  </div>
);

export default React.memo(NewsCard);