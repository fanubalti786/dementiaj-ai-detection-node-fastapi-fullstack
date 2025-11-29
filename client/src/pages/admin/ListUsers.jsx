import { useEffect, useState } from "react";
import UserTableItem from "../../components/admin/UserTableItem";

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/v1/user/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) setUsers(data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (user.fullName || "").toLowerCase().includes(q) ||
      (user.email || "").toLowerCase().includes(q) ||
      (user.type || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <div className="max-w-md mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email or type..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="relative rounded-lg shadow bg-white overflow-y-auto mt-4 scrollbar-hide">
          <table className="w-full text-sm text-gray-600">
            <thead className="text-xs text-left uppercase bg-gray-50">
              <tr>
                <th className="px-2 py-4 xl:px-6">#</th>
                <th className="px-2 py-4">Avatar</th>
                <th className="px-2 py-4">Full Name</th>
                <th className="px-2 py-4 max-sm:hidden">Email</th>
                <th className="px-2 py-4 max-sm:hidden">Type</th>
                <th className="px-2 py-4 max-sm:hidden">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No users found
                    {searchQuery.trim() !== ""
                      ? ` matching "${searchQuery}"`
                      : ""}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <UserTableItem
                    key={user._id}
                    index={index + 1}
                    user={user}
                    fetchUsers={fetchUsers}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
