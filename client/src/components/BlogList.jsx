import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";

export default function BlogList() {
  const [menu, setMenue] = useState("All");
  return (
    <div>
      <div className="flex gap-4 justify-center my-10 sm:gap-8">
        {blogCategories.map((item, index) => (
          <button
            onClick={() => setMenue(item)}
            className={`cursor-pointer text-gray-500 relative
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
       gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {blog_data?.filter((blog, index) => menu === "All"? true: blog.category === menu)
        ?.map((blog, index) => (
          <BlogCard key={index} blog={blog}/>
        ))}
      </div>
    </div>
  );
}
