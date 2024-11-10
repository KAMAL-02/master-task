export interface NewsItem {
    title: string;
    description: string;
    imageUrl: string;
    articleUrl: string;
    author: string;
    publishedAt: string;
  }
  
  export type ViewType = "list" | "grid";