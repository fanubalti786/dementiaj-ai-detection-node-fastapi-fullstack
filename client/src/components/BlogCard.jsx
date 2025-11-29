import { useNavigate } from "react-router-dom";
export default function BlogCard({ blog }) {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25
    duration-300 cursor-pointer w-full bg-white"
    >
      <img
        src={image}
        alt={title || "Blog image"}
        className="aspect-video object-cover w-full"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x225?text=No+Image";
        }}
      />
      {category && (
        <span className="inline-block bg-primary/20 rounded-full ml-5 mt-4 py-1 px-3 text-xs text-primary">
          {category}
        </span>
      )}
      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900 line-clamp-2">
          {title || "Untitled Blog"}
        </h5>
        <p
          className="text-xs text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: description?.slice(0, 120) || "No description available.",
          }}
        ></p>
      </div>
    </div>
  );
}
