'use client'
import { Book, Headphones, Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'


type Props = {}

const Infobar = (props: Props) => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black ">
      <span className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light text-gray-300">Credits</p>
        {/* {tier == 'Unlimited' ? (
          <span>Unlimited</span>
        ) : (
          <span>
            {credits}/{tier == 'Free' ? '10' : tier == 'Pro' && '100'}
          </span>
        )} */}
      </span>
      <span className="flex items-center rounded-full bg-muted px-4">
        <Search />
        <Input
          placeholder="Quick Search"
          className="border-none bg-transparent"
        />
      </span>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Headphones />
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Book />
          </TooltipTrigger>
          <TooltipContent>
            <p>Guide</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div>
      {/* <h2>Welcome, {session?.user?.name}!</h2>
      <p>Email: {session?.user?.email}</p> */}
      <button onClick={() => signOut({ callbackUrl: "/" })}>
        Log out
      </button>
      <Image className='rounded-full' width={40} height={40} src={session?.user?.image || "/default-avatar.png"} alt="Profile Picture" />
    </div>
    </div>
  )
}

export default Infobar