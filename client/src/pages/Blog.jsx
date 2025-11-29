import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "moment";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

export default function Blog() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/v1/blogs/get-all",
      );
      const result = await response.json();

      if (response.ok) {
        // Filter to find the specific blog by id
        const blog = result.blogs?.find((item) => item._id === id);
        setData(blog);
        console.log(blog);
      }
    } catch (err) {
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentsData = async () => {
    setComments([]);
  };

  const addComment = async (e) => {
    e.preventDefault();
    console.log({ name, content });
  };

  useEffect(() => {
    fetchBlogData();
    fetchCommentsData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Blog Not Found
          </h2>
          <p className="text-gray-600">
            The blog you're looking for doesn't exist.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="relative">
      <Navbar />

      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 opacity-50 -z-1"
      />
      <div className="text-center text-gray-700 mt-20">
        <p className="font-medium text-primary py-4">
          Published on {Moment(data.createdAt).format("MMM Do YYYY")}
        </p>
        <h1
          className="text-2xl font-semibold max-w-2xl mx-auto sm:text-5xl px-1 
        text-gray-900"
        >
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg mx-auto truncate px-1">{data.subTitle}</h2>
        <p
          className="inline-block border font-medium px-4 py-1 rounded-full text-sm
        mb-7 border-primary/35 bg-primary/6 text-primary"
        >
          fanubalti786
        </p>
      </div>
      <div className="max-w-5xl lg:mx-auto mx-5 mt-6 mb-10">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* <div className="max-w-3xl mx-auto mt-14 mb-10"> */}
        {/*   <p className="font-semibold mb-4">Comments ({comments.length})</p> */}
        {/*   <div className="flex flex-col gap-4"> */}
        {/*     {comments.map((item, index) => ( */}
        {/*       <div */}
        {/*         key={index} */}
        {/*         className="relative max-w-xl border bg-primary/2 */}
        {/*         border-primary/5 p-4 rounded text-gray-600" */}
        {/*       > */}
        {/*         <div className="flex gap-2 mb-2 items-center"> */}
        {/*           <img src={assets.user_icon} alt="" className="w-6" /> */}
        {/*           <p className="font-medium">{item.name}</p> */}
        {/*         </div> */}
        {/*         <div className="text-sm max-w-md ml-8 mb-4">{item.content}</div> */}
        {/*         <div className="absolute right-4 bottom-2 text-xs flex gap-2 items-center"> */}
        {/*           {Moment(item.createdAt).fromNow()} */}
        {/*         </div> */}
        {/*       </div> */}
        {/*     ))} */}
        {/*   </div> */}
        {/* </div> */}
      </div>
      {/* <div className="max-w-3xl mx-auto"> */}
      {/*   <p className="font-semibold mb-4">Add your comment</p> */}
      {/*   <form */}
      {/*     onSubmit={addComment} */}
      {/*     className="flex flex-col items-start max-w-lg gap-4" */}
      {/*   > */}
      {/*     <input */}
      {/*       onChange={(e) => setName(e.target.value)} */}
      {/*       value={name} */}
      {/*       type="text" */}
      {/*       placeholder="name" */}
      {/*       required */}
      {/*       className="w-full rounded border  */}
      {/*       border-gray-300 outline-none p-2" */}
      {/*     /> */}
      {/*     <textarea */}
      {/*       onChange={(e) => setContent(e.target.value)} */}
      {/*       value={content} */}
      {/*       placeholder="Comment" */}
      {/*       className="w-full p-2 border border-gray-300  */}
      {/*       outline-none rounded h-48" */}
      {/*       required */}
      {/*     ></textarea> */}
      {/*     <button */}
      {/*       type="submit" */}
      {/*       className="bg-primary text-white rounded p-2 px-8 hover:scale-102 */}
      {/*        transition-all cursor-pointer" */}
      {/*     > */}
      {/*       Submit */}
      {/*     </button> */}
      {/*   </form> */}
      {/**/}
      {/*   <div className="my-24"> */}
      {/*     <p className="font-semibold my-4"> */}
      {/*       share this article on social media */}
      {/*     </p> */}
      {/*     <div className="flex gap-1"> */}
      {/*       <img src={assets.facebook_icon} width={50} alt="" /> */}
      {/*       <img src={assets.twitter_icon} width={50} alt="" /> */}
      {/*       <img src={assets.googleplus_icon} width={50} alt="" /> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}
      <Footer />
    </div>
  );
}
