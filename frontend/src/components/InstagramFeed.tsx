import { useEffect, useState } from "react";
import { Instagram, ExternalLink } from "lucide-react";
import BUSINESS_INFO from "@/config/businessInfo";
import { API_BASE_URL } from "@/config/api";

interface InstagramPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/instagram/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-charcoal-deep">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gold uppercase tracking-wide text-sm mb-2">
              Instagram
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-cream">
              From Our Lounge
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

        {/* Loading State */}
        {loading && (
          <div className="text-muted-foreground">
            Loading latest posts…
          </div>
        )}

        {/* Carousel */}
        {!loading && posts.length > 0 && (
          <div className="relative overflow-hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {posts.slice(0, 10).map((post) => {
                const image =
                  post.media_type === "VIDEO"
                    ? post.thumbnail_url
                    : post.media_url;

                return (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative min-w-[240px] h-[240px] rounded-xl overflow-hidden border border-border bg-black"
                  >
                    <img
                      src={image}
                      alt="Smokies Cigar Lounge Instagram post"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Instagram className="text-cream" size={28} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile Follow */}
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
