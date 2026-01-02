import { Instagram, ExternalLink } from "lucide-react";
import BUSINESS_INFO from "@/config/businessInfo";

const InstagramFeed = () => {
  return (
    <section className="py-20 bg-charcoal-deep">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gold uppercase tracking-wide text-sm mb-2">
              Follow Along
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-cream">
              Life at the Lounge
            </h2>
          </div>

          <a
            href={BUSINESS_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-gold hover:underline"
          >
            Follow Us <ExternalLink size={16} />
          </a>
        </div>

        <div className="bg-charcoal-medium rounded-xl p-12 border border-border text-center">
          <Instagram className="w-12 h-12 text-gold mx-auto mb-4" />
          <p className="text-cream text-lg mb-2">See what's happening at Smokies</p>
          <p className="text-muted-foreground mb-6">
            New arrivals, lounge vibes, and moments worth sharing.
          </p>
          <a
            href={BUSINESS_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <Instagram className="w-4 h-4" />
            Visit Our Instagram
          </a>
        </div>

        <div className="mt-6 sm:hidden">
          <a
            href={BUSINESS_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:underline"
          >
            Follow us on Instagram <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
