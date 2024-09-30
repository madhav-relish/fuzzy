'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

const page = () => {
  return (
    <div>
    <h1>Sign in</h1>
    <button className='p-4 rounded-lg bg-white text-black' onClick={() => signIn("google")}>Sign in with Google</button>
  </div>
  )
}

export default page