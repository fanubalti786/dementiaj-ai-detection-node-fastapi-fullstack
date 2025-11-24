import React from 'react'
import { assets } from '../../assets/assets';

export default function BlogTableItem({blog,fetchBlogs,index}) {

    const {title,createdAt} = blog;
    const BlogDate = new Date(createdAt);
    console.log(blog.isPublished)

  return (
    <tr className='border-y border-gray-300 '>

        <th className='px-2 py-4 xl:px-6'>{index}</th>
        <td className='px-2 py-4'>{title}</td>
        <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
        <td className='px-2 py-4 max-sm:hidden'>
            <p className={`${blog.isPublished ? "text-green-600": "text-orange-700"}`}
            >{blog.isPublished ? "Published":"Unpublished" }</p>
        </td>
        <td className='px-2 py-4 flex text-xs gap-3'>
            <button className='px-2 py-0.5 rounded cursor-pointer border'
            >{blog.isPublished ? "Unpublished":"Published" }</button>
            <img src={assets.cross_icon} alt="" className='w-8 hover:scale-110 transition-all'/>

        </td>





    </tr>
  )
}
