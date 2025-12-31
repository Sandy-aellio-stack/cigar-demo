import { Award, Leaf, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Brands',
    description: 'Curated selection of the finest cigars from around the world',
  },
  {
    icon: Leaf,
    title: 'Properly Stored',
    description: 'Climate-controlled humidors maintain perfect humidity and freshness',
  },
  {
    icon: Users,
    title: 'Expert Staff',
    description: 'Knowledgeable team ready to help you find your perfect smoke',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Every cigar is inspected for quality before reaching our shelves',
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 gradient-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold font-medium mb-4 tracking-wide uppercase text-sm">
            Why Cigar Lovers Choose Us
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-6">
            Trusted by Cigar Enthusiasts Across Reading
          </h2>
          <p className="text-muted-foreground text-lg">
            Serving the Reading, PA community and surrounding areas with premium tobacco products and exceptional hospitality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-8 border border-border card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-xl text-cream mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
