"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Presentation, BookOpen, Users } from "lucide-react";

const navItems = [
  { title: "Home", href: "/teacher", icon: LayoutDashboard },
  // { title: "Batches", href: "/teacher/batches", icon: Presentation },
  { title: "Classes", href: "/teacher/classes", icon: BookOpen },
  { title: "Attendance", href: "/teacher/students", icon: Users },
];

const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isDashboard = item.href === "/teacher" && pathname === "/teacher";
          const isBatches =
            item.href === "/teacher/batches" &&
            (pathname.startsWith("/teacher/batches") || pathname.startsWith("/teacher/batch"));
          const isClasses =
            item.href === "/teacher/classes" &&
            (pathname.startsWith("/teacher/classes") || pathname.startsWith("/class"));
          const isStudents =
            item.href === "/teacher/students" && pathname.startsWith("/teacher/students");
          const isActive = isDashboard || isBatches || isClasses || isStudents;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-xl transition-colors ${
                isActive
                  ? "text-purple-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <item.icon className={`size-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              <span className={`text-[10px] font-semibold ${isActive ? "text-purple-600" : "text-gray-400"}`}>
                {item.title}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-purple-600 -mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};

export default MobileBottomNav;
