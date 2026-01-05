import { useState, useEffect, useRef } from 'react';
import { Phone, X } from 'lucide-react';
import BUSINESS_INFO from '@/config/businessInfo';

const FloatingCallButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="fixed bottom-6 left-4 z-50">
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-charcoal-deep border border-gold/30 rounded-lg p-4 shadow-lg min-w-[220px] animate-fade-up">
          <p className="text-cream/60 text-xs uppercase tracking-wider mb-3">Call Us</p>
          {BUSINESS_INFO.locations.map((location) => (
            <a
              key={location.id}
              href={`tel:${location.phone.tel}`}
              className="flex flex-col py-3 border-b border-border last:border-b-0 hover:bg-gold/10 -mx-4 px-4 transition-colors"
            >
              <span className="text-cream font-medium text-sm">
                {location.id === 'lancaster-ave' ? 'Lancaster Ave' : 'Downtown Reading'}
              </span>
              <span className="text-gold text-base font-semibold flex items-center gap-2 mt-1">
                <Phone className="w-4 h-4" />
                {location.phone.formatted}
              </span>
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary rounded-full p-4 shadow-glow"
        aria-label="Call Smokies Cigar Lounge"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Phone className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default FloatingCallButton;
