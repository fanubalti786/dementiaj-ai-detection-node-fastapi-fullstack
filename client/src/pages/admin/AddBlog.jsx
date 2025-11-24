import React, { useEffect, useRef, useState } from 'react'
import Quill from "quill"
import { assets, blogCategories } from '../../assets/assets'

export default function AddBlog() {

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  console.log(editorRef)

  const [image,setImage] = useState(false)
  const [title,setTitle] = useState('')
  const [subTitle,setSubTitle] = useState('')
  const [category,setCategory] = useState('Startup')
  const [isPublished,setIsPublished] = useState(false)

  const generateContent = () => {

  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  } 


  useEffect(() => {
    if(! quillRef.current && editorRef.current)
    {
      
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})

    }
  },[])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 overflow-scroll'>

      <div className='bg-white max-w-3xl p-4 md:p-10 m-1 sm:m-10 shadow rounded border'>

        <p>Upload thumbnail</p>
        <label htmlFor="image" className='inline-flex'>
          <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>

        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' required value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' />


        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' required value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 relative'>
          <div ref={editorRef} className=''></div>
          <button onClick={generateContent} type='button' 
          className='absolute bottom-1 right-2 text-xs text-white 
        bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>

        </div>

        <p className='mt-4'>Blog category</p>
        <select onChange={(e) => setCategory(e.target.value)} name="category "
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">Select category</option>
          {blogCategories.map((item,index) => {
            return <option value={item}>{item}</option>
          })}
        </select>


        <div className='flex items-center gap-2 mt-4'>
          <p>Publish Now</p>
          <input onChange={(e) => setIsPublished(e.target.checked)} type="checkbox"
          className='scale-125 cursor-pointer '
          checked={isPublished} />
        </div>

        <button className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
           Add Blog</button>


      </div>

    </form>
  )
}
