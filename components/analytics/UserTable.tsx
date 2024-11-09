// app/components/UserTable.tsx

'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { ArrowLeft, ArrowRight } from 'lucide-react' // Import Lucide icons

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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]) // State for filtered users
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('') // State for search term
  const [currentPage, setCurrentPage] = useState<number>(1) // State for current page
  const [usersPerPage] = useState<number>(10) // Number of users per page

  // Fetch users from localStorage or API
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
          const response = await axios.get('https://672f81d166e42ceaf15dea8c.mockapi.io/api/v1/Users')
          const fetchedUsers = response.data
          setUsers(fetchedUsers)
          setFilteredUsers(fetchedUsers)
          localStorage.setItem('users', JSON.stringify(fetchedUsers))
        } catch (err) {
          setError('Error fetching data')
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUsers()
  }, [])

  // Handle search input change
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
    setCurrentPage(1) // Reset to the first page when search is applied
  }

  // Get current users for the page
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="p-4 m-4">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full sm:w-1/3 p-2 border rounded-md bg-gray-100 shadow-sm"
        />
      </div>

      {/* Table wrapped in a scrollable container for responsiveness */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-2 border-b text-left text-gray-500">Name</th>
              <th className="px-3 py-2 border-b text-left text-gray-500">Username</th>
              <th className="px-3 py-2 border-b text-left text-gray-500">Email</th>
              <th className="px-3 py-2 border-b text-left text-gray-500">Phone</th>
              <th className="px-3 py-2 border-b text-left text-gray-500">Website</th>
              <th className="px-3 py-2 border-b text-left text-gray-500">Company</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-300">
                <td className="px-3 py-2 border-b text-left text-sm">{user.name}</td>
                <td className="px-3 py-2 border-b text-left text-sm">{user.username}</td>
                <td className="px-3 py-2 border-b text-left text-sm">{user.email}</td>
                <td className="px-3 py-2 border-b text-left text-sm">{user.phone}</td>
                <td className="px-3 py-2 border-b text-left text-sm">
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black cursor-pointer hover:underline"
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

      {/* Pagination and Total */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-sm font-bold">
            Total: {filteredUsers.length} users
          </span>
        </div>
        <div className="flex items-center">
          {/* Display left arrow after clicking next */}
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 border rounded-md bg-gray-200 hover:bg-gray-300"
            >
              <ArrowLeft />
            </button>
          )}
          {/* Right arrow for next page */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * usersPerPage >= filteredUsers.length}
            className="px-4 py-2 ml-2 border rounded-md bg-gray-200 hover:bg-gray-300"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserTable
