'use client';

import React from 'react';
import MoonLoader from "react-spinners/MoonLoader";
import  SearchBar  from './userSearchBar';
import  UserRow  from './userTableRow';
import  Pagination  from './userPagination';
import { TableHeader } from './userTableHeader';
import { useUsers } from '../../hooks/useUsers';

const UserTable: React.FC = () => {
  const {
    currentUsers,
    filteredUsers,
    loading,
    error,
    searchTerm,
    currentPage,
    usersPerPage,
    handleSearchChange,
    setCurrentPage,
  } = useUsers();

  if (loading || error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <MoonLoader size={40} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="p-4 m-4">
      <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <TableHeader />
          <tbody>
            {currentUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalUsers={filteredUsers.length}
        usersPerPage={usersPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserTable;