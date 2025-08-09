import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";
import { navLinks } from "@/components/Navbar/navlinks";
import { useAuth } from "@/hooks/useAuth";

export default function MobileNav() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col space-y-2 p-6">
      <Link to="/" className="flex items-center space-x-2 pb-4">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs tracking-widest">
            GM
          </span>
        </div>
        <span className="font-bold">Grade Mate</span>
      </Link>

      <div className="space-y-3 ">
        <NavigationMenu
          className={"max-w-none static block w-full justify-start"}
        >
          <NavigationMenuList className={"w-full block"}>
            {/* eslint-disable-next-line no-unused-vars */}
            {navLinks.map(({ label, href, icon: Icon, privateLink }) => (
              <NavigationMenuItem
                className={!user && privateLink ? "hidden" : "block"}
                key={label}
              >
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} justify-start !px-0 w-full`}
                >
                  <Link
                    to={href}
                    className="!flex flex-row items-center gap-2 w-full"
                  >
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
      </div>
    </div>
  );
}
