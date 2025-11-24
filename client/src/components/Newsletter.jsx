import React from 'react'

export default function Newsletter() {
  return (
    <div className='flex flex-col justify-center items-center text-center 
    my-30 mt-36 space-y-2'>
      <h1 className='text-2xl md:text-4xl font-semibold'>Never Miss a Blog!</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to get the latest blog, new tech, and exclusive news.</p>
      <form className='flex items-center justify-between w-full max-w-2xl   h-12 md:h-13'>
        <input type="text" placeholder='Enter your emial id' required 
        className='border border-gray-300 rounded-md h-full outline-none
        w-full max-w-full px-3 text-gray-500 border-r-0 rounded-r-none bg-white '/>
        <button type='submit' className=' px-8 md:px-12 h-full text-white bg-primary/80
        hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none '>
            Subscribe
        </button>
      </form>
    </div>
  )
}
