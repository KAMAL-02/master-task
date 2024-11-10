import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalUsers: number;
  usersPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalUsers,
  usersPerPage,
  onPageChange,
}) => (
  <div className="flex justify-between items-center mt-4">
    <div>
      <span className="text-sm font-bold">
        Total: {totalUsers} users
      </span>
    </div>
    <div className="flex items-center">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 mr-2 border rounded-md bg-gray-200 hover:bg-gray-300 dark:text-black"
        >
          <ArrowLeft />
        </button>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage * usersPerPage >= totalUsers}
        className="px-4 py-2 ml-2 border rounded-md bg-gray-200 hover:bg-gray-300 dark:text-black"
      >
        <ArrowRight />
      </button>
    </div>
  </div>
);

export default React.memo(Pagination);