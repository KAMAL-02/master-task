'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import MoonLoader from "react-spinners/MoonLoader";

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: string
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [usersPerPage] = useState<number>(10)

  useEffect(() => {
    const fetchUsers = async () => {
      const cachedUsers = localStorage.getItem('users')
      if (cachedUsers) {
        const cachedData = JSON.parse(cachedUsers)
        setUsers(cachedData)
        setFilteredUsers(cachedData)
        setLoading(false)
      } else {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_USERSAPI_URL}/api/v1/Users`)
          const fetchedUsers = response.data
          setUsers(fetchedUsers)
          setFilteredUsers(fetchedUsers)
          localStorage.setItem('users', JSON.stringify(fetchedUsers))
        } catch (err) {
          setError('Error fetching data')
          toast.error(
            "Unable to fetch users data. Please try another city.",
            {
              containerId: 'GlobalApplicationToast',
            }
          );
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUsers()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchTerm(query)

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query) ||
      user.website.toLowerCase().includes(query) ||
      user.company.toLowerCase().includes(query)
    )

    setFilteredUsers(filtered)
    setCurrentPage(1)
  }

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading || error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <MoonLoader size={50} color="#4A90E2" />
      </div>
    )
  }

  return (
    <div className="p-4 m-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full sm:w-1/3 p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-100 shadow-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
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
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-300 dark:hover:bg-gray-700">
                <td className="px-3 py-2 border-b text-left text-sm">{user.name}</td>
                <td className="px-3 py-2 border-b text-left text-sm">{user.username}</td>
                <td className="px-3 py-2 border-b text-left text-sm">{user.email}</td>
                <td className="px-3 py-2 border-b text-left text-sm">{user.phone}</td>
                <td className="px-3 py-2 border-b text-left text-sm">
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white cursor-pointer hover:underline"
                  >
                    {user.website}
                  </a>
                </td>
                <td className="px-3 py-2 border-b text-left text-sm">{user.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-sm font-bold">
            Total: {filteredUsers.length} users
          </span>
        </div>
        <div className="flex items-center">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-4 py-2 mr-2 border rounded-md bg-gray-200 hover:bg-gray-300 dark:text-black"
            >
              <ArrowLeft />
            </button>
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * usersPerPage >= filteredUsers.length}
            className="px-4 py-2 ml-2 border rounded-md bg-gray-200 hover:bg-gray-300 dark:text-black"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserTable
