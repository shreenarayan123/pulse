
import { Button } from "@/components/ui/button";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import Homee from "../app/assets/Home.png";
import Board from "../app/assets/Board.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-200 px-10">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-700">Pulse</div>
        <Link href={"/signin"}><Button variant="outline">Log In</Button></Link>
      </header>

      <main className="container mx-auto px-4 pt-12 pb-5 flex flex-col items-center">
        <section className="w-full flex items-center justify-between h-full">
          <div className="text-start flex flex-col items-center gap-4 w-full lg:w-1/2">
            <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 tracking-tighter leading-12">
              Simplify task management and prioritize work
            </h1>
            <h2 className="text-xl text-gray-600 text-start">
              Boost your productivity, streamline your workflow, and stay on top of 
              your tasks with Pulse - the intelligent task management solution that keeps you in sync with your goals
            </h2>
            <div className="flex justify-center mb-20">
              <Link href={"/signup"}><Button size="lg" className="flex items-center gap-2">Get Started <MoveRightIcon/></Button></Link>
            </div>
          </div>
          <div className="hidden md:block lg:block ">
            <div className="shadow-2xl">
              <Image className="rounded-2xl "
                src={Homee}
                alt="Home"
                width={800}
                height={800}
                priority
              />
              <div className="absolute top-28 right-10  shadow-2xl">
                <Image className="rounded-2xl"
                  src={Board}
                  alt="Board"
                  width={500}
                  height={500}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; 2024 Pulse. All rights reserved.</p>
      </footer>
    </div>
  );
}