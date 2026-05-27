import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { id: '/', label: 'About' },
  { id: '/education', label: 'Education' },
  { id: '/experience', label: 'Experience' },
  { id: '/publications', label: 'Publications' },
  { id: '/skills', label: 'Skills' },
  { id: '/service', label: 'Service' },
  { id: '/blogs', label: 'Blog' },
  { id: '/awards', label: 'Awards' },
  { id: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activePath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'shadow-xl' : ''
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--color-primary)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-16 ">
          <Link to="/" className="text-white font-bold text-lg tracking-wide flex-shrink-0 ">
            Dr. A.M. Sivakrishna
          </Link>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-1.5">
            {navLinks.map(link => (
              <Link
                key={link.id}
                to={link.id}
                className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activePath === link.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden text-white p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <div className="px-4 pb-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.id}
              to={link.id}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg font-medium transition-all ${
                activePath === link.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
