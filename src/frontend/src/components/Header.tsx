import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
          <Button
            onClick={() => navigate({ to: "/survey" })}
            data-ocid="nav.primary_button"
            size="sm"
            className="bg-cyan-500 text-white hover:bg-cyan-600 font-semibold border-0"
          >
            Start Survey
          </Button>
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
              <Button
                onClick={() => handleNavigation("/survey")}
                data-ocid="nav.mobile_primary_button"
                className="mt-4 bg-cyan-500 text-white hover:bg-cyan-600 font-semibold border-0"
              >
                Start Survey
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
