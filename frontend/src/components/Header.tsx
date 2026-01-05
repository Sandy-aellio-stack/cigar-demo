import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';
import BUSINESS_INFO, { getPrimaryLocation } from '@/config/businessInfo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCallMenuOpen, setIsCallMenuOpen] = useState(false);
  const callMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const primaryLocation = getPrimaryLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (callMenuRef.current && !callMenuRef.current.contains(event.target as Node)) {
        setIsCallMenuOpen(false);
      }
    };
    if (isCallMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCallMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Premium Cigar Brands', path: '/cigar-brands' },
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
            <div ref={callMenuRef} className="relative">
              <button
                onClick={() => setIsCallMenuOpen(!isCallMenuOpen)}
                className="btn-primary text-sm py-2 px-4"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </button>
              {isCallMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-charcoal-deep border border-gold/30 rounded-lg p-4 shadow-lg min-w-[260px] z-50">
                  <p className="text-cream/60 text-xs uppercase tracking-wider mb-3">CALL US</p>
                  {BUSINESS_INFO.locations.map((loc) => (
                    <a
                      key={loc.id}
                      href={`tel:${loc.phone.tel}`}
                      className="flex flex-col py-3 border-b border-border last:border-b-0 hover:bg-gold/10 -mx-4 px-4 transition-colors"
                    >
                      <span className="text-cream font-medium">
                        {loc.id === 'lancaster-ave' ? 'Lancaster Ave' : 'Downtown Reading'}
                      </span>
                      <span className="text-gold text-lg font-semibold flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4" />
                        {loc.phone.formatted}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
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
              </div>
            </div>
          </div>
        )}
      </nav>

    </header>
  );
};

export default Header;
