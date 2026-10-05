export type PackageDetail = {
  slug: string;
  name: string;
  accent: 'silver' | 'gold' | 'platinum';
  tagline: string;
  description: string;
  longDescription: string;
  ideal: string;
  features: string[];
  images: string[];
};

export const packageDetails: PackageDetail[] = [
  {
    slug: 'silver',
    name: 'Silver Package',
    accent: 'silver',
    tagline: 'Small and intimate celebrations',
    description: 'Perfect for small and intimate celebrations that still deserve a beautiful touch.',
    longDescription:
      'The Silver Package is designed for intimate gatherings where every detail matters. Whether it is a cozy birthday at home, a small baby shower, or a close-knit engagement, we bring creative balloon decorations, a themed backdrop, and warm lighting to make your space feel magical. Our team handles the setup so you can focus on enjoying the moment with your loved ones.',
    ideal: 'Best suited for home events, small birthday parties, and intimate gatherings up to 50 guests.',
    features: [
      'Basic Theme Decoration',
      'Balloon Decoration',
      'Backdrop Setup',
      'Basic Lighting',
      'Welcome Board',
      '2 Hours Event Support',
    ],
    images: [
      'https://images.pexels.com/photos/14457430/pexels-photo-14457430.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      'https://images.pexels.com/photos/11282245/pexels-photo-11282245.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      'https://images.pexels.com/photos/34260120/pexels-photo-34260120.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      'https://images.pexels.com/photos/8652621/pexels-photo-8652621.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    ],
  },
  {
    slug: 'gold',
    name: 'Gold Package',
    accent: 'gold',
    tagline: 'For celebrations that deserve a little more',
    description: 'Our most popular package — premium decor, photography, and full coordination.',
    longDescription:
      'The Gold Package is our most loved collection, crafted for celebrations that deserve an extra touch of elegance. With premium themed decoration, customized backdrops, floral arrangements, professional lighting, and dedicated photography, every moment is captured beautifully. Our event coordinator ensures everything runs seamlessly from start to finish, so you and your guests can simply celebrate.',
    ideal: 'Perfect for birthdays, engagements, baby showers, and mid-size celebrations up to 150 guests.',
    features: [
      'Premium Theme Decoration',
      'Customized Backdrop',
      'Balloon and Floral Decoration',
      'Professional Lighting',
      'Welcome Board',
      'Photography',
      'Event Coordination',
      '4 Hours Event Support',
    ],
    images: [
      'https://images.pexels.com/photos/33469001/pexels-photo-33469001.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      'https://images.pexels.com/photos/33914530/pexels-photo-33914530.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      'https://images.pexels.com/photos/33914531/pexels-photo-33914531.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      'https://images.pexels.com/photos/19439930/pexels-photo-19439930.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    ],
  },
  {
    slug: 'platinum',
    name: 'Platinum Package',
    accent: 'platinum',
    tagline: 'The complete luxury experience',
    description: 'The ultimate package for grand celebrations — luxury decor, photography, videography, and DJ.',
    longDescription:
      'The Platinum Package is our most premium offering, designed for grand weddings, milestone celebrations, and corporate galas where only the best will do. From luxury customized themes and premium stage decoration to advanced lighting, professional photography, videography, and a full DJ setup, we take care of every single detail. Our complete event planning and full coordination means you get a flawless, stress-free celebration from the first spark to the last dance.',
    ideal: 'Ideal for grand weddings, corporate events, and large celebrations with 150+ guests.',
    features: [
      'Luxury Customized Theme',
      'Premium Stage Decoration',
      'Floral Decoration',
      'Advanced Lighting Setup',
      'Customized Welcome Board',
      'Professional Photography',
      'Videography',
      'DJ / Music Setup',
      'Complete Event Planning',
      'Full Event Coordination',
    ],
    images: [
      'https://images.pexels.com/photos/39204572/pexels-photo-39204572.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      'https://images.pexels.com/photos/12688989/pexels-photo-12688989.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      'https://images.pexels.com/photos/37975405/pexels-photo-37975405.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      'https://images.pexels.com/photos/19439930/pexels-photo-19439930.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    ],
  },
];

export function getPackageBySlug(slug: string): PackageDetail | undefined {
  return packageDetails.find((p) => p.slug === slug);
}
