import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  getCurrentUserId,
  getStoredEmail,
  signOut,
} from "../services/supabaseService";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Survey", path: "/survey" },
  { label: "Survey History", path: "/survey-history" },
  { label: "About Us", path: "/about" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isLoggedIn = Boolean(getCurrentUserId());
  const userEmail = getStoredEmail();

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    navigate({ to: "/login" });
  };

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setIsOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gray-200 backdrop-blur-md"
      style={{ background: "rgba(255,255,255,0.92)" }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          data-ocid="nav.home_button"
          className="flex items-center space-x-2"
          title="Go to Home"
        >
          <img
            src="/assets/uploads/IMG-20260303-WA0022-1.jpg"
            alt="Surearn Logo"
            className="h-12 w-12 object-contain sm:h-14 sm:w-14 rounded-full"
            loading="lazy"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              data-ocid="nav.link"
              className={`text-sm font-medium transition-colors ${
                currentPath === item.path
                  ? "text-cyan-600"
                  : "text-gray-600 hover:text-cyan-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          {isLoggedIn ? (
            <>
              {userEmail && (
                <span className="text-xs text-gray-500 max-w-[140px] truncate">
                  {userEmail}
                </span>
              )}
              <Button
                onClick={handleLogout}
                data-ocid="nav.logout_button"
                size="sm"
                variant="outline"
                className="flex items-center gap-1.5 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate({ to: "/login" })}
              data-ocid="nav.login_button"
              size="sm"
              className="flex items-center gap-1.5 bg-cyan-500 text-white hover:bg-cyan-600 font-semibold border-0"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] border-gray-200 bg-white"
          >
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`text-left text-lg font-medium transition-colors ${
                    currentPath === item.path
                      ? "text-cyan-600"
                      : "text-gray-600 hover:text-cyan-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {isLoggedIn ? (
                <>
                  {userEmail && (
                    <p className="text-sm text-gray-400 truncate">
                      {userEmail}
                    </p>
                  )}
                  <Button
                    onClick={handleLogout}
                    data-ocid="nav.mobile_logout_button"
                    variant="outline"
                    className="mt-2 border-gray-300 text-gray-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => handleNavigation("/login")}
                  data-ocid="nav.mobile_login_button"
                  className="mt-4 bg-cyan-500 text-white hover:bg-cyan-600 font-semibold border-0"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
