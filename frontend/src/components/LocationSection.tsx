import { useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BUSINESS_INFO from '@/config/businessInfo';

const LocationSection = () => {
  const [selectedLocation, setSelectedLocation] = useState(BUSINESS_INFO.locations[0].id);
  const currentLocation = BUSINESS_INFO.locations.find(loc => loc.id === selectedLocation) || BUSINESS_INFO.locations[0];

  return (
    <section className="py-20 bg-charcoal">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-gold font-medium mb-4 tracking-wide uppercase text-sm">
            Visit Our Lounges
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            Two Locations in Reading, PA
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the location that's most convenient for you
          </p>
        </div>

        <Tabs value={selectedLocation} onValueChange={setSelectedLocation} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            {BUSINESS_INFO.locations.map((location) => (
              <TabsTrigger key={location.id} value={location.id} className="text-sm">
                {location.isPrimary ? 'Lancaster Ave (Main)' : 'Downtown'}
              </TabsTrigger>
            ))}
          </TabsList>

          {BUSINESS_INFO.locations.map((location) => (
            <TabsContent key={location.id} value={location.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Map */}
                <div className="rounded-xl overflow-hidden shadow-card border border-border h-[400px]">
                  <iframe
                    src={location.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${BUSINESS_INFO.name} location at ${location.address.full}`}
                  />
                </div>

                {/* Info */}
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-2xl text-cream mb-4">
                      {location.isPrimary ? 'Main Location' : 'Downtown Location'}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {location.isPrimary 
                        ? 'Our flagship location featuring our full selection, two-level lounge, and all amenities.'
                        : 'Conveniently located in downtown Reading with our premium selection.'}
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-medium text-cream mb-1">Address</h4>
                        <address className="text-muted-foreground not-italic">
                          {location.address.street}<br />
                          {location.address.city}, {location.address.state} {location.address.zip}
                        </address>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-medium text-cream mb-1">Phone</h4>
                        <a
                          href={`tel:${location.phone.tel}`}
                          className="text-muted-foreground hover:text-gold transition-colors"
                        >
                          {location.phone.formatted}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-medium text-cream mb-1">Hours</h4>
                        <ul className="text-muted-foreground space-y-1">
                          {location.hours.saturday === 'Closed' && location.hours.sunday === 'Closed' ? (
                            <>
                              <li>Mon - Fri: {location.hours.monday}</li>
                              <li>Sat - Sun: Closed</li>
                            </>
                          ) : (
                            <>
                              <li>Mon - Thu: {location.hours.monday}</li>
                              <li>Fri - Sat: {location.hours.friday}</li>
                              <li>Sunday: {location.hours.sunday}</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={location.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex"
                  >
                    <Navigation className="w-5 h-5" />
                    Get Directions
                  </a>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default LocationSection;
