import React from 'react';
import { User } from '../../types/user/userTypes';

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => (
  <tr className="hover:bg-gray-300 dark:hover:bg-gray-700">
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
);

export default React.memo(UserRow);