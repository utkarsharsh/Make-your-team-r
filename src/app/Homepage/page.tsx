"use client"
import React, { useEffect } from 'react'
import loginimg from "../../../public/illustration.svg"
import Image from "next/image";
import { dbconnect } from '../../dbConfig/dbConfig'
import Sighup from '@/components/Sighup/Sighup';
const page = () => {


     
  return (
    
    <>
    <div className=' h-screen'>
      <div className='w-full h-full flex items-center justify-center'>

      <div className='w-[700px] h-[700px] border-4 border-gray-100 p-6 rounded-lg'>
    <Sighup/>
    </div>
    </div>
    </div>
    </>
  )
}

export default page