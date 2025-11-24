import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'

export default function ListBlog() {
    const [blogs,setBlogs] = useState([])

    const fetchBlogs = async () => {
        setBlogs(blog_data)
    }

    useEffect(() => {
        fetchBlogs();
    },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>

      <h1>All Blogs</h1>

      <div className='h-4/5 max-w-4xl relative rounded-lg shadow bg-white 
      overflow-y-auto mt-4 scrollbar-hide'>
                <table className='w-full text-sm text-gray-600'>
                  <thead className='text-xs text-left uppercase'>
                    <tr>
                      <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                      <th scope='col' className='px-2 py-4'>Blog Title</th>
                      <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                      <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                      <th scope='col' className='px-2 py-4'>Actions</th>
      
                    </tr>
                  </thead>
      
                  <tbody className=''>
                    {blogs.map((blog,index) => {
                    return <BlogTableItem key={index} blog={blog} fetchBlogs={fetchBlogs} index={index+1}/>
                    })}
                  </tbody>
                </table>
              </div>
      
    </div>
  )
}
