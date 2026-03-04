import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-lg font-bold text-gray-900">SurveyHub</span>
            </div>
            <p className="text-sm text-gray-500">
              Professional survey platform for gathering insights and feedback.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/survey"
                  className="text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  Survey
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">
              Connect
            </h3>
            <p className="text-sm text-gray-500">
              Get in touch with us for any inquiries or support.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center gap-1">
            © {new Date().getFullYear()}. Built with{" "}
            <Heart className="h-4 w-4 text-cyan-500 fill-cyan-500" /> using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "surearn-survey")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cyan-600 hover:text-cyan-700 hover:underline transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
