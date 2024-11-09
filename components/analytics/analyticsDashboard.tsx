import React from "react";
import UserActivity from "./UserActivity";
import SalesPerformance from "./SalesPerformance";
import UserTable from "./UserTable";

function AnalyticsDashboard() {
  return (
    <div className="p-4">
      <h3 className="text-black font-medium text-2xl mb-6 ml-6 dark:text-gray-100">Analytics Dashboard</h3>
      <div className="flex flex-col items-center gap-4 lg:flex-row justify-around">
        <div className="flex-1 w-full  max-w-[600px]">
          <UserActivity />
        </div>
        <div className="flex-1 w-full max-w-[600px]">
          <SalesPerformance />
        </div>
      </div>
      <UserTable />
    </div>
  );
}

export default AnalyticsDashboard;
