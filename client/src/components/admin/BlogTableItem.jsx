import React, { useState } from "react";
import { toast } from "react-toastify";

export default function BlogTableItem({ blog, fetchBlogs, index }) {
  const [loading, setLoading] = useState(false);
  const { title, createdAt, image } = blog;
  const BlogDate = new Date(createdAt);

  const togglePublished = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/v1/blogs/toggle-published/${blog._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to update status");
        return;
      }
      toast.success("Blog status updated!");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      {/* index */}
      <th className="px-2 py-4 xl:px-6">{index}</th>

      {/* blog image */}
      <td className="px-2 py-4">
        <img
          src={image}
          alt={title}
          className="w-12 h-12 object-cover rounded"
        />
      </td>

      {/* title */}
      <td className="px-2 py-4">{title}</td>

      {/* date */}
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>

      {/* status */}
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>

      {/* actions */}
      <td className="px-2 py-4 flex text-xs gap-3 items-center">
        {/* toggle publish button */}
        <button
          onClick={togglePublished}
          disabled={loading}
          className={`px-2 py-1 rounded border 
            ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? "Updating..." : blog.isPublished ? "Unpublish" : "Publish"}
        </button>
      </td>
    </tr>
  );
}
