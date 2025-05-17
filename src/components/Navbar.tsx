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
    <nav className="flex items-center justify-between px-6 py-3 bg-slate-100 dark:bg-slate-900 relative">
      <div className="font-bold text-xl">
        <a href="/" className=" dark:text-white no-underline">
          GeofisicaBlog
        </a>
      </div>
      <button
        className="flex flex-col justify-center gap-1.5 w-8 h-8 bg-transparent border-none cursor-pointer md:hidden"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="block w-6 h-0.5 bg-black dark:bg-slate-300 rounded"></span>
        <span className="block w-6 h-0.5 bg-black dark:bg-slate-300 rounded"></span>
        <span className="block w-6 h-0.5 bg-black dark:bg-slate-300 rounded"></span>
      </button>
      <ul
        className={`
          flex gap-8 list-none m-0 p-0
          md:flex
          ${menuOpen ? "flex" : "hidden"}
          flex-col absolute top-full right-0
          bg-gray-900 dark:bg-slate-900 md:bg-transparent
          w-44 shadow-lg md:static md:w-auto md:shadow-none md:flex-row md:items-center
          ${!menuOpen ? "" : "bg-white dark:bg-slate-900"} 
        `}
      >
        {navLinks.map((link) => (
          <li
            key={link.name}
            className="md:border-none border-b border-slate-100 dark:border-slate-700 last:border-b-0"
          >
            <a
              href={link.href}
              className="block px-4 py-3 md:px-0 md:py-0 dark:text-white no-underline text-base hover:text-text-600 dark:hover:text-slate-300 transition-colors"
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
