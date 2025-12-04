import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import BlogCard from "./BlogCard";
import { blogCategories } from "../assets/assets";

export default function BlogList() {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/v1/blogs/get-all"
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.blogs);
        const publishedBlogs =
          data.blogs?.filter((blog) => blog.isPublished)?.slice(0, 8) || [];
        setBlogs(publishedBlogs);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartScreening = () => {
    // Option 1: Navigate to screening page
    navigate("/login");
    
    // Option 2: Show onboarding modal if not logged in
    // if (!user) {
    //   showLoginModal();
    // } else {
    //   navigate("/assessment");
    // }
  };

  const filteredBlogs = blogs.filter((blog) => {
    // Category filter
    const categoryMatch = menu === "All" ? true : blog.category === menu;

    // Search filter
    const searchMatch =
      searchQuery.trim() === ""
        ? true
        : blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.category?.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <button
        className="max-w-lg mx-auto mt-8 w-full bg-primary text-white 
  py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium 
  flex items-center justify-center gap-2"
        onClick={handleStartScreening}
      >
        <Brain className="w-5 h-5" />
        Click to Start Dementia Screening
      </button>
      {/* Category Filter */}
      <div className="flex gap-4 justify-center my-10 sm:gap-8 flex-wrap">
        {blogCategories.map((item, index) => (
          <button
            key={index}
            onClick={() => setMenu(item)}
            className={`cursor-pointer text-gray-500 relative px-4 py-1
              ${
                menu === item &&
                "text-white px-5 pt-0.5 bg-primary rounded-full"
              }
            `}
          >
            {item}
            {menu === item && (
              <motion.div
                layoutId="underline"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-0 right-0 left-0 h-7 -z-1 bg-primary rounded-full"
              ></motion.div>
            )}
          </button>
        ))}
      </div>

      {/* Blog Grid or Empty State */}
      {filteredBlogs.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
         gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40"
        >
          {filteredBlogs.map((blog, index) => (
            <BlogCard key={blog._id || index} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] mx-8">
          <div className="bg-gray-50 rounded-lg p-12 text-center max-w-md">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Blogs Found
            </h3>
            <p className="text-gray-600">
              {searchQuery.trim() !== ""
                ? `No blogs found matching "${searchQuery}"`
                : menu === "All"
                ? "No published blogs available at the moment."
                : `No blogs found in the "${menu}" category.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
