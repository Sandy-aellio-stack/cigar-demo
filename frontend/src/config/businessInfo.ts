/**
 * Centralized Business Information for Smokies Cigar Lounge
 * SAFE + backward compatible version
 */

export interface Location {
  id: string;
  name: string;
  established: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  phone: {
    raw: string;
    formatted: string;
    tel: string;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: string;
    lng: string;
  };
  mapEmbedUrl: string;
  directionsUrl: string;
  features: string[];
  isPrimary: boolean;
}

export interface BusinessInfo {
  name: string;
  established: number; // 🔴 RESTORED
  ageRequirement: string;
  tagline: string;
  description: string;
  locations: Location[];
  social: {
    instagram: string;
    facebook: string;
  };
  features: string[]; // 🔴 RESTORED
  awards: string[];
  brandStatements: {
    selection: string;
    lounge: string;
    coffeeBar: string;
    byob: string;
    memberships: string;
    entertainment: string;
    events: string;
  };
}

const BUSINESS_INFO: BusinessInfo = {
  name: "Smokies Cigar Lounge",

  // 🔴 RESTORED FOR HERO + SEO
  established: 2012,

  ageRequirement: "21+ only",
  tagline: "Premium Cigar Lounge in Reading, PA",
  description:
    "Premium cigars, espresso bars, and climate-controlled humidors across two Smokies Cigar Lounge locations in Reading, Pennsylvania.",

  awards: ["Google Rated Best Cigar Shop in Reading, PA – 2025"],

  // 🔴 RESTORED (used by older sections)
  features: [
    "Largest selection of premium hand-rolled cigars",
    "Climate-controlled humidors",
    "Espresso & cappuccino bar",
    "BYOB service",
    "Membership lockers",
    "Pool table & shuffleboard",
    "Events and giveaways",
  ],

  locations: [
    {
      id: "lancaster-ave",
      name: "Smokies Cigar Lounge – Lancaster Ave",
      established: 2020,
      address: {
        street: "733 Lancaster Avenue, Unit G",
        city: "Reading",
        state: "PA",
        zip: "19607",
        full: "733 Lancaster Avenue, Unit G, Reading, PA 19607",
      },
      phone: {
        raw: "484-869-5821",
        formatted: "(484) 869-5821",
        tel: "+14848695821",
      },
      hours: {
        monday: "11am – 9pm",
        tuesday: "11am – 9pm",
        wednesday: "11am – 9pm",
        thursday: "11am – 9pm",
        friday: "11am – 10pm",
        saturday: "11am – 10pm",
        sunday: "12pm – 6pm",
      },
      coordinates: {
        lat: "40.3156",
        lng: "-75.9269",
      },
      mapEmbedUrl:
        "https://maps.google.com/maps?width=600&height=400&hl=en&q=733%20Lancaster%20Avenue%2C%20Unit%20G%2C%20Reading%2C%20PA%2019607&t=h&z=17&ie=UTF8&iwloc=B&output=embed",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=733+Lancaster+Avenue,+Unit+G,+Reading,+PA+19607",
      features: [
        "Premium cigars",
        "Espresso bar",
        "BYOB",
        "Climate-controlled humidors",
      ],
      isPrimary: true,
    },
    {
      id: "downtown-reading",
      name: "Smokies Cigar Lounge – Downtown Reading",
      established: 2025,
      address: {
        street: "35 North 6th Street",
        city: "Reading",
        state: "PA",
        zip: "19601",
        full: "35 North 6th Street, Reading, PA 19601",
      },
      phone: {
        raw: "484-878-8926",
        formatted: "(484) 878-8926",
        tel: "+14848788926",
      },
      hours: {
        monday: "12pm – 7pm",
        tuesday: "12pm – 7pm",
        wednesday: "12pm – 7pm",
        thursday: "12pm – 7pm",
        friday: "12pm – 7pm",
        saturday: "Closed",
        sunday: "Closed",
      },
      coordinates: {
        lat: "40.3356",
        lng: "-75.9269",
      },
      mapEmbedUrl:
        "https://maps.google.com/maps?width=600&height=400&hl=en&q=35%20North%206th%20Street%2C%20Reading%2C%20PA%2019601&t=h&z=17&ie=UTF8&iwloc=B&output=embed",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=35+North+6th+Street,+Reading,+PA+19601",
      features: [
        "Premium cigars",
        "Espresso bar",
        "Pool table",
        "Shuffleboard",
      ],
      isPrimary: false,
    },
  ],

  social: {
    instagram: "https://www.instagram.com/smokiescigarlounge",
    facebook: "https://www.facebook.com/smokiesstogie",
  },

  brandStatements: {
    selection: "Largest selection of premium hand-rolled cigars in the area",
    lounge: "Modern, relaxed cigar lounges",
    coffeeBar: "Espresso & cappuccino bars at both locations",
    byob: "BYOB service available",
    memberships: "Premium memberships with humidity-controlled lockers",
    entertainment: "Pool table, shuffleboard, sports, and events",
    events: "Events, raffles, and giveaways year-round",
  },
};

/* Helpers */
export const getPrimaryLocation = () =>
  BUSINESS_INFO.locations.find((l) => l.isPrimary) ||
  BUSINESS_INFO.locations[0];

export const getLocationById = (id: string) =>
  BUSINESS_INFO.locations.find((l) => l.id === id);

export default BUSINESS_INFO;
