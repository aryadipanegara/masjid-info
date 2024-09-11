"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const adminTabs = [
  { name: "Users", href: "/admin/users" },
  { name: "Masjid", href: "/admin/masjid" },
  { name: "Detail Masjid", href: "/admin/detailmasjid" },
  { name: "Sejarah", href: "/admin/sejarah" },
  { name: "Photos", href: "/admin/photos" },
  { name: "Categories", href: "/admin/categories" },
  { name: "MasjidCategories", href: "/admin/masjidcategories" },
  { name: "Discussions", href: "/admin/discussions" },
];

export default function AdminTabs() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentTab =
    adminTabs.find((tab) => tab.href === pathname) || adminTabs[0];

  return (
    <div className="w-full">
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        >
          <span>{currentTab.name}</span>
          <ChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {adminTabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <Tabs value={pathname} className="w-full">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="inline-flex w-max min-w-full">
              {adminTabs.map((tab) => (
                <TabsTrigger
                  key={tab.href}
                  value={tab.href}
                  asChild
                  className="flex-shrink-0"
                >
                  <Link
                    href={tab.href}
                    className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                  >
                    {tab.name}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}
