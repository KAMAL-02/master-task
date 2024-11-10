import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { User } from '../types/user/userTypes';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchUsers = async () => {
      const cachedUsers = localStorage.getItem('users');
      if (cachedUsers) {
        const cachedData = JSON.parse(cachedUsers);
        setUsers(cachedData);
        setFilteredUsers(cachedData);
        setLoading(false);
      } else {
        try {

          const response = await axios.get('/api/users');
          const fetchedUsers = response.data;
          
          setUsers(fetchedUsers);
          setFilteredUsers(fetchedUsers);
          localStorage.setItem('users', JSON.stringify(fetchedUsers));
        } catch (err) {
          setError('Error fetching data');
          toast.error(
            "Unable to fetch users data. Please try again later.",
            {
              containerId: 'GlobalApplicationToast',
            }
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query) ||
      user.website.toLowerCase().includes(query) ||
      user.company.toLowerCase().includes(query)
    );

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return {
    users,
    filteredUsers,
    loading,
    error,
    searchTerm,
    currentPage,
    usersPerPage,
    currentUsers,
    setCurrentPage,
    handleSearchChange,
  };
};