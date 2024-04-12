"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings, Home, Calendar, List, BarChartBig } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn, isRoute } from "@/lib/utils";

const guestNavigation = [
  {
    href: "/dashboard",
    icon: Home,
    name: "Dashboard",
  },
  {
    href: "/test",
    icon: Calendar,
    name: "Test",
  },
];

const teacherNavigation = [
  {
    href: "/teacher/courses",
    icon: List,
    name: "Courses",
  },
  {
    href: "/teacher/analytics",
    icon: BarChartBig,
    name: "Analytics",
  },
];

export default function Sidebar({
  setSidebarOpen,
}: {
  setSidebarOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const isTeacherRoute = isRoute(pathname, "/teacher");
  const navigation = isTeacherRoute ? teacherNavigation : guestNavigation;

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center justify-start w-[40px] h-[40px]">
          <Image
            className="h-8 w-auto"
            src="/logo.svg"
            alt="company logo"
            width={40}
            height={40}
          />
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen && setSidebarOpen(false)}
                    className={cn(
                      item.href === pathname
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="mt-auto">
            <a
              href="#"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <Settings className="h-6 w-6 shrink-0" aria-hidden="true" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
