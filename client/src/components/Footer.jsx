import React from "react";
import { assets, footer_data } from "../assets/assets";

export default function Footer() {
  return (
    <div className="px-6 md:px-16 lg:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10
      py-10 border-b border-gray-500/30 text-gray-500 ">
        <div className="pb-4">
          <img src={assets.logo} alt="" className="w-32 sm:w-42" />
          <p className="mt-6 max-w-[410px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            sapiente tempora placeat, quam perspiciatis dicta, totam
            exercitationem?
          </p>
        </div>
        <div className="flex justify-between w-full md:w-[45%] gap-5 ">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h1 className="font-semibold text-base md:mb-5 mb-2 text-gray-900">{section.title}</h1>
              <ul className="text-sm space-y-1">
                {section.links.map((link,i) => (
                  <li key={i} >
                    <a className="hover:underline transition " href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center py-4 text-sm md:text-base text-gray-500/80 items-center">
        Copyright 2025 @ QuickBlog GreatStack - All Right Reserved.
      </p>
    </div>
  );
}
