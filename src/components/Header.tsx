'use client'
import React, {useCallback} from "react";
import {useRouter} from "next/navigation";
import {twMerge} from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi";
import Button from "@/components/Button";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({children, className}) => {
    const route = useRouter()

    const handleLogout = useCallback(() => {}, [])

  return (
      <div className={twMerge('h-fit bg-gradient-to-b from-yellow-800 p-6', className)}>
          <div className={'w-full mb-4 flex items-center justify-between'}>
              <div className={'hidden md:flex gap-x-2 items-center'}>
                  <button
                      onClick={() => route.back()}
                      className={'rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'}>
                      <RxCaretLeft className={'text-white'} size={35}/>
                  </button>

                  <button
                      onClick={() => route.forward()}
                      className={'rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'}>
                      <RxCaretRight className={'text-white'} size={35}/>
                  </button>
              </div>

              <div className={'flex md:hidden gap-x-2 items-center'}>
                  <button
                      className={'rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'}>
                      <HiHome className={'text-black'} size={20}/>
                  </button>

                  <button
                      className={'rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'}>
                      <BiSearch className={'text-black'} size={20}/>
                  </button>
              </div>

              <div className={'flex items-center justify-between gap-x-4'}>
                  <div>
                      <Button onClick={() => {}} className={'bg-transparent text-neutral-300 font-medium'}>
                          Sign up
                      </Button>
                  </div>

                  <div>
                      <Button onClick={() => {}} className={'bg-white px-6 py-2'}>
                          Log in
                      </Button>
                  </div>
              </div>
          </div>

          {children}
      </div>
  )
}

export default Header
