import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-sm  p-4 border rounded-lg border-primary/30 
      shadow-xl shadow-primary/15 '>
        <div className='flex flex-col'>
          <div className=' p-4 pt-8 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-primary'>Admin </span>Login</h1>
            <p className='font-light'>Enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleSubmit} className=' mt-6 text-gray-600 p-2 '>
              <div className='flex flex-col mb-6'>
                <label>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email"  placeholder='your email id'
                className='border-b-2 border-gray-300 p-2 outline-none' />
              </div>
              <div className='flex flex-col mb-6'>
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="Password"  placeholder='your password'
                className='border-b-2 border-gray-300 p-2 outline-none' />
              </div>
              <button onClick={() => navigate('/admin')} type='submit' className='w-full py-3 font-medium bg-primary 
              rounded text-white cursor-pointer hover:bg-primary/90 transition-all'>Login</button>
            </form>
          </div>

          
        
      </div>
      <Outlet/>
    </div>
  )
}
