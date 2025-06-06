'use client';

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Find Students", href: "/users" },
  { name: "Projects", href: "/projects" },
  { name: "Resources", href: "/resources" },
  { name: "Skill Shoutouts", href: "/profile" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
  { name: "Help", href: "/help" },
];

const userMenuItems = [];

const Logo = ({ className }) => {
  return (
    <div className={cn("font-semibold text-xl flex items-center", className)}>
      <span className="bg-gradient-to-r from-[#9B99FE] to-[#2BC8B7] bg-clip-text text-transparent mr-1">
        Skill
      </span>
      <span>Sync</span>
    </div>
  );
};

export default function Navbar() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { user, logout } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      data-state={menuState && "active"}
      className="fixed z-20 w-full px-2 group"
    >
      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
          isScrolled &&
            "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
        )}
      >
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
          <div className="flex w-full justify-between lg:w-auto">
            <Link
              href="/"
              aria-label="home"
              className={cn(
                "flex items-center space-x-2",
                isScrolled && "lg:hidden"
              )}
            >
              <Logo />
            </Link>

            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState == true ? "Close Menu" : "Open Menu"}
              className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
            >
              <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
              <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
            </button>
          </div>

          <div className="absolute inset-0 m-auto hidden size-fit lg:block">
            <ul className="flex gap-8 text-sm">
              {menuItems.map((item, index) => (
                <li key={index} className={cn(isScrolled && item.name === "Home" && "lg:hidden")}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-accent-foreground block duration-150"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
              {user && userMenuItems.map((item, index) => (
                <li key={`user-${index}`}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-accent-foreground block duration-150"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
            <div className="lg:hidden">
              <ul className="space-y-6 text-base">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
                {user && userMenuItems.map((item, index) => (
                  <li key={`user-mobile-${index}`}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
              {user ? (
                <Button
                  onClick={logout}
                  size="sm"
                  className={cn(
                    "bg-white/10 hover:bg-white/20 text-white border-white/20",
                    isScrolled && "lg:hidden"
                  )}
                >
                  <span>Sign Out</span>
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    asChild
                    size="sm"
                    className={cn(
                      "bg-white/10 hover:bg-white/20 text-white border-white/20",
                      isScrolled && "lg:hidden"
                    )}
                  >
                    <Link href="/login" />
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className={cn(
                      "bg-white/10 hover:bg-white/20 text-white border-white/20",
                      isScrolled && "lg:hidden"
                    )}
                  >
                    <Link href="/signup" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 