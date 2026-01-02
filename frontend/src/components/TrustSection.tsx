import { Award, Leaf, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Hand-Picked Selection',
    description: 'We smoke what we sell. Every cigar here earned its spot through taste, not trends.',
  },
  {
    icon: Leaf,
    title: 'Kept Just Right',
    description: 'Our humidors stay at 70/70 all year long. Your cigar draws smooth, burns even, and tastes the way it should.',
  },
  {
    icon: Users,
    title: 'Real People, Real Advice',
    description: 'Not sure what to try? We get it. Tell us what you like, and we will point you in the right direction.',
  },
  {
    icon: Shield,
    title: 'No Disappointments',
    description: 'We check every box that comes through the door. If it is not perfect, it does not hit the shelf.',
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 gradient-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold font-medium mb-4 tracking-wide uppercase text-sm">
            What Sets Us Apart
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-6">
            The Kind of Place You Keep Coming Back To
          </h2>
          <p className="text-muted-foreground text-lg">
            We have been here for years because we care about the details. Good cigars, good company, and a space that feels like yours.
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
