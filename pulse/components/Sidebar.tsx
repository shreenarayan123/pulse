"use client";

import { LayoutGrid, LogOutIcon, SquareKanban } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState("Tasks");
  const router = useRouter();
  const menuOptions = [
    { id: 1, name: "Tasks", icon: LayoutGrid, href: "/home" },
    { id: 2, name: "Board", icon: SquareKanban, href: "/home/board" },
  ];

  interface itemInterface {
    id: number;
    name: string;
    icon: React.ElementType;
    href: string;
  }

  const handleActive = (item: itemInterface) => {
    setActive(item.name);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="bg-white h-full w-full  flex flex-col items-center justify-between gap-14 py-10">
      <div className="flex flex-col items-center gap-14 w-full">
        <div className="text-2xl font-bold text-purple-700">Pulse</div>
        <div className="flex flex-col items-center gap-10 px-4 w-full">
          {menuOptions.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.id}
                onClick={() => handleActive(item)}
                className={`flex w-full   items-center justify-center py-2 gap-5 font-semibold text-lg ${
                  active === item.name ? "text-purple-500 bg-purple-200" : ""
                } rounded-lg hover:text-purple-500 hover:bg-purple-200 cursor-pointer `}
              >
                <item.icon />
                <span className="hidden lg:flex">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center px-4 w-full">
        <span
          onClick={handleLogout}
          className="flex w-full items-center justify-center py-2 gap-5 font-semibold text-lg hover:text-purple-500 hover:bg-purple-200 rounded-lg  cursor-pointer "
        >
          <LogOutIcon />
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
