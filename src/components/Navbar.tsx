import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: t("Navbar.Home"), href: "/" },
    { name: t("Navbar.About"), href: "/about" },
    { name: t("Navbar.Posts"), href: "/posts" },
    { name: t("Navbar.Contact"), href: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-background-50 relative">
      <div className="font-bold text-xl">
        <a href="/" className="text-text-950 no-underline">
          GeofisicaBlog
        </a>
      </div>
      <button
        className="flex flex-col justify-center gap-1.5 w-8 h-8 bg-transparent border-none cursor-pointer md:hidden"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="block w-6 h-0.5 bg-white rounded"></span>
        <span className="block w-6 h-0.5 bg-white rounded"></span>
        <span className="block w-6 h-0.5 bg-white rounded"></span>
      </button>
      <ul
        className={`
                    flex gap-8 list-none m-0 p-0
                    md:flex
                    ${menuOpen ? "flex" : "hidden"}
                    flex-col absolute top-full right-0 bg-gray-900 w-44 shadow-lg md:static md:w-auto md:bg-transparent md:shadow-none md:flex-row md:items-center
                `}
      >
        {navLinks.map((link) => (
          <li
            key={link.name}
            className="md:border-none border-b border-gray-800 last:border-b-0"
          >
            <a
              href={link.href}
              className="block px-4 py-3 md:px-0 md:py-0 text-text-950 no-underline text-base hover:text-text-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
