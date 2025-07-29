import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-blue-500 py-10 px-6 mt-10 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Logo & Description */}
        <div>
          <Link to="/" className="text-2xl font-bold text-primary">
            Zello<span className="text-blue-500">.</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Find or list properties easily – Zello is your trusted rental
            platform.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/search/lagos" className="hover:underline">
                Search
              </Link>
            </li>
            <li>
              <Link to="/add" className="hover:underline">
                List Property
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@zello.ng
            </li>
            <li className="text-gray-500">Lagos, Nigeria</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#">
              <Facebook className="w-5 h-5 hover:text-blue-500" />
            </a>
            <a href="#">
              <Instagram className="w-5 h-5 hover:text-pink-500" />
            </a>
            <a href="#">
              <Twitter className="w-5 h-5 hover:text-sky-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-400 border-t pt-6">
        &copy; {new Date().getFullYear()} Zello. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
