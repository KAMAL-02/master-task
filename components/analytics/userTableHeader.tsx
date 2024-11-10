import React from 'react';

export const TableHeader: React.FC = () => (
  <thead>
    <tr>
      <th className="px-3 py-2 border-b text-left text-gray-500 dark:text-gray-300">Name</th>
      <th className="px-3 py-2 border-b text-left text-gray-500 dark:text-gray-300">Username</th>
      <th className="px-3 py-2 border-b text-left text-gray-500 dark:text-gray-300">Email</th>
      <th className="px-3 py-2 border-b text-left text-gray-500 dark:text-gray-300">Phone</th>
      <th className="px-3 py-2 border-b text-left text-gray-500 dark:text-gray-300">Website</th>
      <th className="px-3 py-2 border-b text-left text-gray-500 dark:text-gray-300">Company</th>
    </tr>
  </thead>
);
