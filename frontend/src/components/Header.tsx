import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';
import BUSINESS_INFO, { getPrimaryLocation } from '@/config/businessInfo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const primaryLocation = getPrimaryLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cigar Brands', path: '/cigar-brands' },
    { name: 'Top Quality', path: '/top-quality' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-charcoal-deep/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Smokies Cigar Lounge Reading PA"
              className="h-10 sm:h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-display text-sm tracking-wide transition-colors link-underline ${
                  isActive(link.path)
                    ? 'text-gold'
                    : 'text-cream-dark hover:text-cream'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={primaryLocation.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-2 px-4"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
            <a
              href={`tel:${primaryLocation.phone.tel}`}
              className="btn-primary text-sm py-2 px-4"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-cream"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-charcoal-deep/98 backdrop-blur-md rounded-lg mt-2 p-6 border border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-display text-base tracking-wide py-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-gold'
                      : 'text-cream-dark hover:text-cream'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-border pt-4 mt-2 flex flex-col gap-3">
                <a
                  href={primaryLocation.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
                <a
                  href={`tel:${primaryLocation.phone.tel}`}
                  className="btn-primary text-center"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Sticky Call Button on Scroll */}
      {isScrolled && (
        <a
          href={`tel:${primaryLocation.phone.tel}`}
          className="fixed bottom-6 right-6 lg:hidden btn-primary rounded-full p-4 shadow-glow animate-pulse-glow z-50"
          aria-label={`Call ${BUSINESS_INFO.name}`}
        >
          <Phone className="w-6 h-6" />
        </a>
      )}
    </header>
  );
};

export default Header;
