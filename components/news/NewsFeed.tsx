'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import NewsViewToggle from './NewsViewToggle'
import { useMediaQuery } from 'react-responsive'
import { Button } from '@/components/ui/button'
import { NewsSkeleton } from './NewsSkeleton'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NewsItem {
  title: string
  description: string
  imageUrl: string
  articleUrl: string
  author: string
  publishedAt: string
}

export default function NewsFeed() {
  const [view, setView] = useState<'list' | 'grid'>('grid')
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)

  const isMobile = useMediaQuery({ maxWidth: 767 })

  const fetchNews = async (page: number) => {
    setLoading(true)
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_NEWSAPI_URL!, {
        params: {
          country: 'us',
          apiKey: process.env.NEXT_PUBLIC_NEWSAPI_KEY!,
          language: 'en',
          page: page,
          pageSize: 2,
        },
      })
      const articles = response.data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        imageUrl: article.urlToImage,
        articleUrl: article.url,
        author: article.author || 'Unknown Author',
        publishedAt: article.publishedAt,
      }))
      setNewsItems(articles)
    } catch (error) {
      toast.error(
        "Unable to get the News. Please try another city.",
        {
          containerId: 'GlobalApplicationToast',
        }
      );
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(page)
  }, [page])

  useEffect(() => {
    if (isMobile) {
      setView('list')
    }
  }, [isMobile])

  const handleViewChange = (newView: 'list' | 'grid') => {
    if (!isMobile) {
      setView(newView)
    }
  }

  const handleNextPage = () => setPage((prevPage) => prevPage + 1)
  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1))

  return (
    <div className="container mx-auto p-4 bg-white mt-3 shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-2 mb-1">
        <h1 className="text-2xl font-semibold">What's happening around the world?</h1>
        {!isMobile && <NewsViewToggle view={view} onChange={handleViewChange} />}
      </div>

      <div className="min-h-[400px]"> {/* Fixed height container for both loading and content */}
        {loading ? (
          <NewsSkeleton /> 
        ) : newsItems.length === 0 ? (
          <p className="text-center text-lg">No news available.</p>
        ) : (
          <div className={`${view === 'list' ? 'max-h-96 overflow-hidden' : ''}`}>
            <div className={`grid gap-4 ${view === 'grid' && !isMobile ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
              {newsItems.map((news, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
                  <div className="relative w-full h-40 mb-2">
                    <img
                      src={news.imageUrl || '/fallback-image.jpg'}
                      alt={news.title}
                      className="rounded-md w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-lg font-bold mt-2">{news.title ? (news.title.length > 80 ? `${news.title.slice(0, 80)}...` : news.title) : "No title"}</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    by {news.author} - {new Date(news.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-200 mb-2">
                    {news.description ? (news.description.length > 100 ? `${news.description.slice(0, 100)}...` : news.description) : "No description available."}
                  </p>
                  <a
                    href={news.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm mb-1"
                  >
                    Read More
                  </a>
                  <div className="mt-2 flex flex-col items-center">
                    <a
                      href={news.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 px-4 py-2 rounded-md text-sm inline-block hover:text-blue-400 transition-colors"
                    >
                      View Full Article
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`flex ${page > 1 ? 'justify-between' : 'justify-end'} mt-4 space-x-2`}>
        {page > 1 && (
          <Button variant="secondary" onClick={handlePreviousPage} className="bg-slate-600 text-white hover:bg-slate-700 transition">
            Previous Page
          </Button>
        )}
        <Button variant="secondary" onClick={handleNextPage} className="bg-slate-600 text-white hover:bg-slate-700 transition">
          Next Page
        </Button>
      </div>
    </div>
  )
}