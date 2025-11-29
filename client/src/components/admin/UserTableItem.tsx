export default function UserTableItem({ user, fetchUsers, index }) {
  const { fullName, email, avatar, type, createdAt } = user;
  const userDate = new Date(createdAt);

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      {/* index */}
      <td className="px-2 py-4 xl:px-6 font-medium">{index}</td>

      {/* avatar */}
      <td className="px-2 py-4">
        {avatar ? (
          <img
            src={avatar}
            alt={fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full bg-primary/20 flex items-center 
            justify-center text-primary font-semibold"
          >
            {fullName?.charAt(0).toUpperCase()}
          </div>
        )}
      </td>

      {/* full name */}
      <td className="px-2 py-4 font-medium text-gray-900">{fullName}</td>

      {/* email */}
      <td className="px-2 py-4 max-sm:hidden text-gray-600">{email}</td>

      {/* type */}
      <td className="px-2 py-4 max-sm:hidden">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            type === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {type}
        </span>
      </td>

      {/* joined date */}
      <td className="px-2 py-4 max-sm:hidden text-gray-500 text-xs">
        {userDate.toDateString()}
      </td>
    </tr>
  );
}
