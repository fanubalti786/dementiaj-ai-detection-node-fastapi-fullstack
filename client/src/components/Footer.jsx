import React from "react";
import { assets, footer_data } from "../assets/assets";
import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <div className="px-6 md:px-16 lg:px-32 bg-primary/3">
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-10
      py-10 border-b border-gray-500/30 text-gray-500 "
      >
        {/* Logo replaced with Brain icon (lorem text unchanged) */}
        <div className="pb-4">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="p-1.5 bg-gradient-to-br from-primary to-indigo-600 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                AI Dementia
              </span>
              <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium -mt-0.5">
                Care Platform
              </span>
            </div>
          </div>

          {/* YOUR ORIGINAL LOREM TEXT — unchanged */}
          <p className="mt-6 max-w-[410px]">
            Early dementia signs can be subtle. Our AI tools help detect memory
            changes, provide quick assessments, and guide caregivers with
            simple, clear support.
          </p>
        </div>

        <div className="flex justify-between w-full md:w-[45%] gap-5 ">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h1 className="font-semibold text-base md:mb-5 mb-2 text-gray-900">
                {section.title}
              </h1>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a className="hover:underline transition" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center py-4 text-sm md:text-base text-gray-500/80 items-center">
        Copyright 2025 @ AIDementia CareStack - All Right Reserved.
      </p>
    </div>
  );
}
