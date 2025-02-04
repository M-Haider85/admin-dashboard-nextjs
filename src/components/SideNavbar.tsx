"use client";

import { useState, useEffect } from "react";
import { Nav } from "./ui/nav";
import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  NotebookPen,
  LogOut
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import Image from "next/image";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false); // Ensure it's a client component
  const onlyWidth = useWindowWidth();
  const [mobileWidth, setMobileWidth] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure hydration matches
    setMobileWidth(onlyWidth < 768);
  }, [onlyWidth]);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-6 bg-white h-screen">
      {isClient && !mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}

      {/* Admin Profile Section */}
      <div className={`flex items-center gap-3 p-3 transition-all ${isCollapsed ? "justify-center" : "justify-start"}`}>
        <Image 
          src="/avatar1.jpg" // Change this to the correct path
          alt="Admin Avatar"
          width={60}
          height={60}
          className="rounded-full"
        />
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-gray-800">Haider Asghar</span>
            <span className="text-sm text-gray-400 underline">Administrator</span>
          </div>
        )}
      </div>

      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default"
          },
          {
            title: "Users",
            href: "/users",
            icon: UsersRound,
            variant: "ghost"
          },
          {
            title: "Orders",
            href: "/orders",
            icon: ShoppingCart,
            variant: "ghost"
          },
          {
            title: "Inventory",
            href: "/inventory",
            icon: NotebookPen,
            variant: "ghost"
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost"
          },
          {
            title: "Logout",
            href: "/logout",
            icon: LogOut,
            variant: "ghost"
          },
        ]}
      />
    </div>
  );
}


