import { BlogsModal } from "../models/blogs.js";
import ErrorHandler from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

export const addBlogs = asyncHandler(async (req, res) => {
  if (!req?.files?.image) throw new ErrorHandler("blog path is required", 400);
  const avatarPath = req.files.image.tempFilePath;
  if (!avatarPath) {
    throw new ErrorHandler("blog path is required", 400);
  }
  let uploaded = await uploadOnCloudinary(avatarPath, "Blogs Image");
  let image = uploaded.secure_url;
  const { title, subTitle, category, description, isPublished } = req.body;
  if (!title || !subTitle || !category || !description) {
    throw new ErrorHandler("All fields are required", 400);
  }
  await BlogsModal.create({
    title,
    subTitle,
    category,
    description,
    isPublished,
    image,
  });
  return res
    .status(201)
    .json({ success: true, message: "Successfully added blog" });
});
export const togglePublished = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await BlogsModal.findById(id);
  if (!blog) {
    throw new ErrorHandler("Blog not found", 404);
  }
  blog.isPublished = !blog.isPublished;
  await blog.save();
  return res
    .status(200)
    .json({ success: true, message: "Blog is published successfully" });
});
export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await BlogsModal.find();
  return res.status(200).json({ success: true, blogs });
});
