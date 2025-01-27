import { useState } from "react";
import "../index.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <div
          className={`lg:flex items-center justify-between w-full lg:w-auto lg:order-1 ${isMenuOpen ? "block" : "hidden"} lg:block`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a
                href="#about"
                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#temoignages"
                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Témoignages
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Contactez nous
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
