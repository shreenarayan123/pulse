"use client"
import Content from '@/components/Content'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function page() {

  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/');
    }
   
  }, []);
  return (
    <div className='w-full h-full'>
      
        
       <Content/>
    </div>
  )
}

export default page