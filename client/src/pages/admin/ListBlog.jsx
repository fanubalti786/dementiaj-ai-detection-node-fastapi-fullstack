import { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { toast } from "react-toastify";

export default function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/api/v1/blogs/get-all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to load blogs");
        return;
      }
      setBlogs(data?.blogs);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong fetching blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All Blogs</h1>

      {loading && (
        <p className="text-gray-500 text-sm mt-2 animate-pulse">
          Loading blogs...
        </p>
      )}
      {!loading && blogs.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">No blogs found.</p>
      )}

      <div
        className="relative rounded-lg shadow bg-white 
        overflow-y-auto mt-4 scrollbar-hide"
      >
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>

              <th scope="col" className="px-2 py-4">
                Image
              </th>

              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>

              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>

              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>

              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {blogs?.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                index={index + 1}
                blog={blog}
                fetchBlogs={fetchBlogs}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
