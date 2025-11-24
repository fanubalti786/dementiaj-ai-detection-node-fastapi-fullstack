import React from 'react'

export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <div className='animate-spin w-16 h-16 rounded-full border-4 border-t-white 
        border-gray-500 '>
        </div>
        <h1 className='ml-2 mt-2 text-xs text-gray-800'>Looding..</h1>
      
    </div>
  )
}
