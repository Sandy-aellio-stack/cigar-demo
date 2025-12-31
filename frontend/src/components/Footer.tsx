import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";
import BUSINESS_INFO from "@/config/businessInfo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-deep border-t border-border">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Smokies Cigar Lounge" className="h-16 w-auto" />
            <p className="font-display text-muted-foreground text-sm leading-relaxed tracking-wide">
              {BUSINESS_INFO.description}
            </p>
            <p className="text-gold text-xs font-medium">
              Est. {BUSINESS_INFO.established} • {BUSINESS_INFO.ageRequirement}
            </p>

            <div className="flex gap-4">
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-cream mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/cigar-brands", label: "Cigar Brands" },
                { to: "/top-quality", label: "Top Quality Cigars" },
                { to: "/why-us", label: "Why Our Shop" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-display text-muted-foreground hover:text-gold text-sm tracking-wide transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-lg text-cream mb-6">
              Our Locations
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BUSINESS_INFO.locations.map((location) => (
                <div key={location.id} className="space-y-3">
                  <p className="text-cream font-medium">
                    {location.name}
                  </p>

                  <p className="text-gold text-xs font-medium">
                    EST. {location.established}
                  </p>

                  {/* Address */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold mt-0.5" />
                    <p className="text-muted-foreground text-sm">
                      {location.address.full}
                    </p>
                  </div>

                  {/* Phone */}
                  <a
                    href={`tel:${location.phone.tel}`}
                    className="flex items-center gap-2 text-sm font-medium text-cream hover:text-gold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-gold" />
                    Call: {location.phone.formatted}
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-gold mt-0.5" />
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>Mon – Thu: {location.hours.monday}</li>
                      <li>Fri: {location.hours.friday}</li>
                      <li>Sat: {location.hours.saturday}</li>
                      <li>Sun: {location.hours.sunday}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-display text-muted-foreground text-sm tracking-wide">
              © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
            </p>
            <p className="font-display text-muted-foreground text-xs tracking-wide">
              Serving Reading, Pennsylvania
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
