import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Clock } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'services', 'faq', 'temoignages', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleLinkClick();
  };

  const navItems = [
    { id: 'about', label: 'À Propos', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
    { id: 'temoignages', label: 'Témoignages', href: '#temoignages' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-blue-600 text-white py-2 text-sm hidden md:block">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>+216 XX XXX XXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>Tunis, Tunisie</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>Lun-Ven: 8h-17h</span>
            </div>
          </div>
          <div className="text-right">
            <span>Urgences: 24h/24</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
            : 'bg-white border-b border-gray-200'
        } dark:bg-gray-900 dark:border-gray-700`}
      >
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto py-3">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Cabinet PSY
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Psychiatrie Enfant & Adolescent
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-2 px-1 font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform scale-x-100 transition-transform duration-300"></span>
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
            >
              Prendre RDV
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-lg dark:text-white dark:hover:text-blue-400 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'
          } overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700`}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile CTA */}
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-4"
            >
              Prendre Rendez-vous
            </button>

            {/* Mobile Contact Info */}
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                <span>+216 XX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <Clock size={16} />
                <span>Lun-Ven: 8h-17h | Urgences: 24h/24</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;