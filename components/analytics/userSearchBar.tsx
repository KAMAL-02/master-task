import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChange }) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={onChange}
      className="w-full sm:w-1/3 p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-100 shadow-sm"
    />
  </div>
);

export default React.memo(SearchBar);