import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";

import MobileNav from "@/components/Navbar/MobileNav";
import { navLinks } from "@/components/Navbar/navlinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";
import { toast } from "sonner";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { profileDropdown } from "./navlinks";

export function Navbar() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("light");
  const axiosInstance = useAxiosInstance();

  const handleLogout = async () => {
    try {
      await logout();
      await axiosInstance.post("/logout");
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error.message);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // In a real app, you'd implement theme switching logic here
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="container mx-auto flex h-16 items-center px-4">
      {/* Logo */}
      <div className="mr-4 hidden lg:flex">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs tracking-widest">
              GM
            </span>
          </div>
          <span className="hidden font-bold sm:inline-block">Grade Mate</span>
        </Link>
      </div>

      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MobileNav />
        </SheetContent>
      </Sheet>

      {/* Right side items */}
      <div className="flex flex-1 items-center justify-end space-x-2 lg:justify-end">
        {/* Desktop Navigation */}
        <NavigationMenu className={"hidden lg:block"}>
          <NavigationMenuList>
            {/* eslint-disable-next-line no-unused-vars */}
            {navLinks.map(({ label, href, icon: Icon, privateLink }) => (
              <NavigationMenuItem
                className={!user && privateLink ? "hidden" : "block"}
                key={label}
              >
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to={href} className="!flex flex-row items-center gap-2">
                    <span>
                      <Icon size={16} className="text-muted-foreground" />
                    </span>
                    <span>{label}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {user ? (
          <>
            {" "}
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9 ">
                    <AvatarImage src={user?.photoURL} alt="@username" />
                    <AvatarFallback>
                      {user?.displayName ? user?.displayName.slice(0, 1) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {profileDropdown.map(({ label, href }) => (
                  <DropdownMenuItem key={label}>
                    <Link to={href}>{label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button>
            <Link to="/login">Sign In / Sign Up</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
