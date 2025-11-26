import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { assets, blogCategories } from "../../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddBlog() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!title || !subTitle || !category || !image) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      const description = quillRef.current.root.innerHTML;

      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("category", category);
      formData.append("isPublished", isPublished);
      formData.append("description", description);

      const response = await fetch("http://localhost:3000/api/v1/blogs/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData, // <-- Send FormData (no JSON)
      });

      const res = await response.json();

      if (response.ok) {
        toast.success("Blog created successfully!");
        navigate("/admin/listBlog");
      } else {
        toast.error(res.message || "Blog creation failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initialize Quill
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 overflow-scroll"
    >
      <div className="bg-white max-w-3xl p-4 md:p-10 m-1 sm:m-10 shadow rounded border">
        <p>Upload thumbnail</p>
        <label htmlFor="image" className="inline-flex">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 relative">
          <div ref={editorRef}></div>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 rounded"
        >
          {blogCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="mt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
            />
            <span>Publish immediately</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating Blog..." : "Create Blog"}
        </button>
      </div>
    </form>
  );
}
