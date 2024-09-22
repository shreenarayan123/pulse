"use client";

import { SignupInput } from "@shreenarayan/medium-zod";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { validateEmail } from "../../../lib/EmailValid";
import { PasswordStrength } from "../../../lib/PasswordStrength";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Page = () => {
  const [isUser, setIsUser] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<String>("");
  const router = useRouter();

  const handleUser = () => {};

  const handleBlurUser = () => {};

  const [blogInputs, setBlogInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  const CheckPasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validPassword = PasswordStrength(e.target.value);
    if (validPassword.length > 0) {
      setPasswordStrength("Weak");
    } else {
      setPasswordStrength("Strong");
    }
  };

  async function handleSignup() {
    if (blogInputs.name && blogInputs.username && blogInputs.password) {
      const validEmail = validateEmail(blogInputs.username);
      const validPassword = PasswordStrength(blogInputs.password);

      if (!validEmail) {
        toast.error("Invalid email");
      }
      if (validPassword.length > 0) {
        toast.error("Invalid password");
      }
      if (validEmail && validPassword.length === 0) {
        try {
          const res = await axios.post("api/user/signup", {
            username: blogInputs.name,
            email: blogInputs.username,
            password: blogInputs.password,
          });

          const jwt = res.data.token;
          const user = JSON.stringify(res.data.user);
          localStorage.setItem("token", jwt);
          localStorage.setItem("user", user);
          toast.success("Successfully signed up..!");
          router.push("/home");
        } catch (error: any) {
          if ( error.response.status === 400 ){
            
            toast.error("User already exists");
          }else{
            toast.error("Something went wrong ! Please try again")
          }
        }
      }
    } else {
      toast.error("Name , Username and Password are required !");
    }
  }
  return (
    <div className="grid place-items-center h-screen bg-slate-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-screen flex justify-center flex-col">
        <div className=" backdrop-blur-sm bg-white/40 w-96 p-7 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-center gap-4 pb-4">
            <span className="text-3xl font-bold">Join</span>
            <div className="text-2xl font-bold text-purple-700">Pulse</div>
          </div>
          <div className="text-slate-500 text-center  ">
            Already have an account ?{" "}
            <Link className="underline" href={"/signin"}>
              {" "}
              Sign in
            </Link>
          </div>
          <LabelledInput
            onFocus={() => handleUser()}
            onBlur={() => handleBlurUser}
            label="Name"
            type="text"
            placeholder="John doe"
            onChange={(e) => {
              setBlogInputs({
                ...blogInputs,
                name: e.target.value,
              });
            }}
          />

          <LabelledInput
            label="Email"
            type="text"
            placeholder="johndoe@gmail.com"
            onChange={(e) => {
              setBlogInputs({
                ...blogInputs,
                username: e.target.value,
              });
            }}
            onFocus={() => setIsUser(true)}
            onBlur={() => setIsUser(false)}
          />
          <div className={isUser ? "text-black  block" : "text-black  hidden"}>
           
          </div>

          <LabelledInput
            label="Password"
            onFocus={() => setIsPass(true)}
            onBlur={() => setIsPass(false)}
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setBlogInputs({
                ...blogInputs,
                password: e.target.value,
              });
              CheckPasswordStrength(e);
            }}
          />
          <div className={isPass ? "text-black  block" : "text-black  hidden"}>
            <span className="text-3xl relative bottom-0.5 font-bold">. </span>
            Password Strength : {passwordStrength}
          </div>

          <button
            type="button"
            onClick={handleSignup}
            className="text-gray-900 w-full my-5 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  type,
}: LabelledInputType) {
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

export default Page
