"use client"
import Content from '@/components/Content'
import { useRouter } from 'next/navigation';
import React from 'react'

function page() {

  const router = useRouter();
  const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
        }
  return (
    <div className='w-full h-full'>
      
        
       <Content/>
    </div>
  )
}

export default page