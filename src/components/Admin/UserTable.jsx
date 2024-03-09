import { useEffect, useState } from "react";
import {
  useBlockUserMutation,
  useSearchUserMutation,
  useUnBlockUserMutation,
} from "../../slices/admin/adminApiSlice";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [blockUser, blockstates] = useBlockUserMutation();
  const [unBlockUser, unBlockstate] = useUnBlockUserMutation();
  const [searchUser, searchStates] = useSearchUserMutation();
  const [queryString, setQueryString] = useState("");

  const handleBlockUser = async (userId) => {
    const response = await blockUser([userId]);
    console.log("block response", response.data);
  };

  const handleUnblockUser = async (userId) => {
    const response = await unBlockUser([userId]);
    console.log("block response", response.data);
  };

  console.log({ searchStates });

  const searchUsers = (event) => {
    setQueryString(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const res = await searchUser(queryString);
      if (res.data.success) setUsers(res.data.users);
    })();
  }, [queryString,blockstates.isLoading,unBlockstate.isLoading]);

  return (
    <>
      <div className="w-full flex items-center justify-center p-3">
        <input
          type="text"
          className="w-3/4 m-auto border border-gray-200 shadow py-2 outline-none px-4 "
          placeholder="Search Users"
          onChange={searchUsers}
        />
      </div>

      <table className="p-4 min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Fullname
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.fullname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>

              <td className="px-6 py-4 whitespace-nowrap">
                {user.isBlocked ? (
                  <button
                    onClick={() => handleUnblockUser(user._id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlockUser(user._id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserTable;
