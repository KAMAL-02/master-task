import React from "react";
import { Weather } from "@/components/weather/Weather";
import NewsFeed from "@/components/news/NewsFeed";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full px-4 py-3 space-y-8 lg:space-y-0 lg:space-x-4">
      <div className="w-full lg:w-1/3">
        <Weather />
      </div>
      <div className="w-full lg:w-2/3">
        <NewsFeed />
      </div>
    </div>
  );
};

export default page;
