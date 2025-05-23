import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: "fas fa-home" },
    { href: "/birth-chart", label: "Charts", icon: "fas fa-chart-pie" },
    { href: "/predictions", label: "Predictions", icon: "fas fa-crystal-ball" },
    { href: "/compatibility", label: "Compatibility", icon: "fas fa-heart" },
  ];

  return (
    <nav className="bg-cosmic-800/80 backdrop-blur-md border-b border-mystical-800/30 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <i className="fas fa-star text-gold-400 text-2xl"></i>
            <span className="text-xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Astro
            </span>
          </Link>

          {/* Navigation Items */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 text-sm transition-colors ${
                    location === item.href
                      ? "text-gold-400"
                      : "text-cosmic-200 hover:text-gold-400"
                  }`}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-0">
                    <Avatar className="w-8 h-8 border-2 border-gold-400">
                      <AvatarImage 
                        src={user.profileImageUrl} 
                        alt={user.firstName || "User"} 
                      />
                      <AvatarFallback className="bg-mystical-600 text-white text-sm">
                        {(user.firstName?.[0] || user.email?.[0] || "U").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white hidden sm:block">
                      {user.firstName || user.email?.split("@")[0] || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="bg-cosmic-800 border-mystical-700 text-white"
                >
                  <DropdownMenuItem className="hover:bg-cosmic-700">
                    <i className="fas fa-user mr-2"></i>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-cosmic-700">
                    <i className="fas fa-cog mr-2"></i>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-mystical-700" />
                  <DropdownMenuItem className="hover:bg-cosmic-700">
                    <a href="/api/logout" className="flex items-center w-full">
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Logout
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a href="/api/login">
                <Button className="bg-mystical-gradient hover:shadow-lg hover:shadow-mystical-500/50 text-white">
                  Sign In
                </Button>
              </a>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden text-cosmic-200">
              <i className="fas fa-bars text-xl"></i>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
