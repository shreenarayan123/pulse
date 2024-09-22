"use client"
import { SigninInput } from '@shreenarayan/medium-zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, FormEvent } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const page = () => {
  const [isUser, setIsUser] = useState(false);
  const [isPass, setIsPass] = useState(false);
  
  const router = useRouter();
  
  const [blogInputs, setBlogInputs] = useState<SigninInput>({
    username: "",
    password: "",
  });

  async function handleSignin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/signin', {
        email: blogInputs.username,
        password: blogInputs.password
      });
      
      const jwt = res.data.token;
      const user = JSON.stringify(res.data.user);
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", user);
      toast.success('Successfully signed in!');
      router.push('/home');    
    } catch (error: any) {
      if ( error.response.status === 400 ){
            
        toast.error("Invalid email or password");
      }else{
        toast.error("Something went wrong ! Please try again")
      }
    }
  }

  return (
    <div className='grid place-items-center h-screen bg-slate-100'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-screen flex justify-center flex-col">
        <div className="backdrop-blur-sm bg-white/40 w-96 p-7 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="text-center font-bold text-3xl">
            Welcome Back!
          </div> 
          <div className="text-slate-500 text-center">
            Don't have an account? <Link className='underline' href="/signup">Sign up</Link> here
          </div>
          
          <form onSubmit={handleSignin}>
            <LabelledInput 
              label='Username' 
              type='text' 
              placeholder='@John doe' 
              onChange={(e) => setBlogInputs({ ...blogInputs, username: e.target.value })}
              onFocus={() => setIsUser(true)} 
              onBlur={() => setIsUser(false)}  
            />
            <div className={isUser ? "text-black block" : "text-black hidden"}>
              <span className='text-3xl relative bottom-0.5 font-bold'>• </span> 
              <span>Enter A valid email</span>
            </div>
            
            <LabelledInput 
              label='Password' 
              onFocus={() => setIsPass(true)} 
              onBlur={() => setIsPass(false)} 
              placeholder='Password' 
              type='password' 
              onChange={(e) => setBlogInputs({ ...blogInputs, password: e.target.value })}  
            />
            <div className={isPass ? "text-black block" : "text-black hidden"}>
              <span className='text-3xl relative bottom-0.5 font-bold'>•</span> At least 6 characters
            </div>
            
            <button type="submit" className="text-gray-900 w-full my-5 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
              Sign in
            </button>
          </form>
        </div>
      </div> 
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange, onFocus, onBlur, type }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-bold pt-4">
        {label}
      </label>
      <input
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        type={type || "text"}
        className="backdrop-blur-sm group bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />      
    </div>
  );
}

export default page;