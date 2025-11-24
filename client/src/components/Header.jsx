import React from "react";
import { assets } from "../assets/assets";

export default function Header() {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative ">
      <div className="text-center mt-20 mb-8">
        <div
          className="inline-flex items-center justify-center rounded-full text-sm
        gap-4 px-6 py-1.5 border border-primary/40 bg-primary/10 text-primary
        mb-4"
        >
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="" className="w-2.5" />
        </div>
        <h1 className="text-3xl sm:text-6xl text-gray-700 font-semibold 
        sm:leading-16 font-Poppins">
          Your own <span className="text-primary ">blogging</span> <br />
          platform.
        </h1>
        <p className="my-6 sm-my-8 max-w-2xl mx-auto max-sm:text-xs mt-8 text-black/60">
          this is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          start right here.
        </p>
        <form className=" max-w-lg flex justify-between mx-auto bg-white
        border border-gray-300 rounded mt-8">
            <input type="text" name="" id=""  placeholder="search for blogs" required
            className="w-full pl-4 outline-none"/>
            <button type="submit" className="bg-primary text-white px-8 py-2 
            m-1.5 rounded hover:scale-105 transition-all cursor-pointer">Search</button>
        </form>
        <img
          src={assets.gradientBackground}
          alt=""
          className="absolute -top-50 
        -z-1 opacity-50 "
        />
      </div>
    </div>
  );
}
