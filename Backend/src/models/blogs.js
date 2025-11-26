import { Schema, model } from "mongoose";

const blogsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    subTitle: {
      type: String,
      required: [true, "Subtitle is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const BlogsModal = model("BlogsModal", blogsSchema);
