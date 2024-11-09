import React from "react";
import UserActivity from "./UserActivity";
import SalesPerformance from "./SalesPerformance";
import UserTable from "./UserTable";

function AnalyticsDashboard() {
  return (
    <div>
      <h3 className="text-black ml-4 mt-4 font-medium text-2xl">Analytics DashBoard</h3>
    <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
        <UserActivity />
      </div>
      <div className="flex-1">
        <SalesPerformance />
      </div>
    </div>
    <UserTable />
    </div>
  );
}

export default AnalyticsDashboard;
