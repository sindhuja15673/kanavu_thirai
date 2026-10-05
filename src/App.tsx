import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  Briefcase,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Flower2,
  Gem,
  Heart,
  Instagram,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PartyPopper,
  Phone,
  Quote,
  Sparkles,
  Star,
  Target,
  Users,
  X,
  Youtube,
} from 'lucide-react';
import PackageDetailPage from '@/components/PackageDetailPage';
import WorksPage from '@/components/WorksPage';
import { getPackageBySlug } from '@/data/packageDetails';

type IconType = typeof Heart;
type GalleryItem = { title: string; category: string; image: string; images: string[] };

type RevealProps = { children: React.ReactNode; className?: string; delay?: number };

const whatsappUrl = 'https://wa.me/919087525767';

const images = {
  hero: 'https://images.pexels.com/photos/34079355/pexels-photo-34079355.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  about: 'https://images.pexels.com/photos/33417234/pexels-photo-33417234.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400',
  aboutSmall: 'https://images.pexels.com/photos/26186199/pexels-photo-26186199.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
};

const gallery: GalleryItem[] = [
  {
    title: 'The Royal Mandap',
    category: 'Wedding',
    image: '/images/works/reception and wedding/4.jpeg',
    images: [
      '/images/works/reception and wedding/4.jpeg',
      '/images/works/reception and wedding/1.jpeg',
      '/images/works/reception and wedding/2.jpeg',
      '/images/works/reception and wedding/3.jpeg',
      '/images/works/reception and wedding/5.jpeg',
    ],
  },
  {
    title: 'A Little Brighter',
    category: 'Birthday',
    image: '/images/works/birthday/Screenshot_20260815_135136_Instagram(1).jpg.jpeg',
    images: [
      '/images/works/birthday/1.jpg',
      '/images/works/birthday/2.jpg',
      '/images/works/birthday/3.jpg',
      '/images/works/birthday/5.jpg',
      '/images/works/birthday/6.jpg',
      '/images/works/birthday/7.jpg',
      '/images/works/birthday/10.jpg',
      '/images/works/birthday/14.jpg',
      '/images/works/birthday/jungle 1.png',
      '/images/works/birthday/kishna.png',
      '/images/works/birthday/mickey mouse.png',
      '/images/works/birthday/Screenshot_20260815_134909_Instagram(1).jpg.jpeg',
      '/images/works/birthday/Screenshot_20260815_135136_Instagram(1).jpg.jpeg',
      '/images/works/birthday/Screenshot_20260815_135151_Instagram(1).jpg.jpeg',
      '/images/works/birthday/WhatsApp Image 2026-07-26 at 10.17.54 PM (8).jpeg',
      '/images/works/birthday/IMG_20260815_172455_173.jpg.jpeg',
      '/images/works/birthday/IMG-20260814-WA0003.jpg.jpeg',

    ],
  },
  {
    title: 'Golden Hour',
    category: 'Engagement',
    image: '/images/works/enagement/003bf5341fca01fc387c7b563fc1ecba.jpg.jpeg',
    images: [
      '/images/works/enagement/003bf5341fca01fc387c7b563fc1ecba.jpg.jpeg',
      '/images/works/enagement/a.jpg',
      '/images/works/enagement/b.jpg',
      '/images/works/enagement/c.jpg',
      '/images/works/enagement/Snapchat-1290637267.jpg.jpeg',
    ],
  },
  {
    title: 'The Floral Story',
    category: 'Reception',
    image: '/images/works/reception and wedding/SKU-1305_0-1712199033486.jpg.jpeg',
    images: [
      '/images/works/reception and wedding/SKU-1305_0-1712199033486.jpg.jpeg',
      '/images/works/reception and wedding/52728474fe15da7efb29893783777353.jpg.jpeg',
      '/images/works/reception and wedding/images.jpeg',
      '/images/works/reception and wedding/IMG_20260731_192238_634.jpg.jpeg',
      '/images/works/reception and wedding/IMG-20260731-WA0034.jpg.jpeg',
      '/images/works/reception and wedding/jhalak-wedding-planner-bjb-nagar-bhubaneshwar-wedding-decorators-6s0v8omp4c.jpg.jpeg',
    ],
  },
  {
    title: 'Welcome Little One',
    category: 'Baby Shower',
    image: '/images/works/baby-shower/murugan.jpg.jpeg',
    images: [
      '/images/works/baby-shower/murugan.jpg.jpeg',
      '/images/works/baby-shower/a.jpg',
      '/images/works/baby-shower/b.jpg',
      '/images/works/baby-shower/c.jpg',
      '/images/works/baby-shower/d.jpg',
      '/images/works/baby-shower/e.jpg'
    ],
  },
  {
    title: 'An Evening to Remember',
    category: 'Corporate Event',
    image: 'https://images.pexels.com/photos/19439930/pexels-photo-19439930.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
    images: [
      'https://images.pexels.com/photos/19439930/pexels-photo-19439930.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
      'https://images.pexels.com/photos/29708240/pexels-photo-29708240.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
      'https://images.pexels.com/photos/37012314/pexels-photo-37012314.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
      'https://images.pexels.com/photos/17056964/pexels-photo-17056964.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
      'https://images.pexels.com/photos/34476625/pexels-photo-34476625.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
    ],
  },
];

const services: { title: string; description: string; icon: IconType }[] = [
  { title: 'Birthday', description: 'Make birthdays extra special with creative themes and beautiful decorations.', icon: PartyPopper },
  { title: 'Baby Shower', description: 'Celebrate the new beginning with beautiful setups and memorable moments.', icon: Baby },
  { title: 'Engagement', description: 'Elegant engagement decor that reflects your love story beautifully.', icon: Heart },
  { title: 'Wedding', description: 'From grand weddings to intimate affairs, we make every moment perfect.', icon: Gem },
  { title: 'Decoration', description: 'Stunning decorations designed according to your theme and vision.', icon: Flower2 },
  { title: 'Corporate Events', description: 'Professional event planning and corporate gatherings with perfection.', icon: Briefcase },
];

const packages = [
  { name: 'Silver Package', subtitle: 'Small and intimate celebrations.', accent: 'silver', items: ['Basic Theme Decoration', 'Balloon Decoration', 'Backdrop Setup', 'Basic Lighting', 'Welcome Board', '2 Hours Event Support'] },
  { name: 'Gold Package', subtitle: 'For celebrations that deserve a little more.', accent: 'gold', popular: true, items: ['Premium Theme Decoration', 'Customized Backdrop', 'Balloon and Floral Decoration', 'Professional Lighting', 'Welcome Board', 'Photography', 'Event Coordination', '4 Hours Event Support'] },
  { name: 'Platinum Package', subtitle: 'The complete luxury experience.', accent: 'platinum', items: ['Luxury Customized Theme', 'Premium Stage Decoration', 'Floral Decoration', 'Advanced Lighting Setup', 'Customized Welcome Board', 'Professional Photography', 'Videography', 'DJ / Music Setup', 'Complete Event Planning', 'Full Event Coordination'] },
];

const packageSlugMap: Record<string, string> = { Silver: 'silver', Gold: 'gold', Platinum: 'platinum' };

const testimonials = [
  { quote: 'Kanavu Thirai made our wedding day absolutely perfect. The decoration was beyond our expectations!', name: 'Priya & Aravind', detail: 'Wedding celebration', initials: 'PA' },
  { quote: 'The team was extremely creative and professional. They understood exactly what we wanted.', name: 'Sneha', detail: 'Engagement celebration', initials: 'S' },
  { quote: 'Everything was beautifully arranged and our guests were highly impressed. Thank you, Kanavu Thirai!', name: 'Karthik', detail: 'Birthday celebration', initials: 'K' },
];

function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65, delay }}>
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className={`section-heading ${light ? 'section-heading-light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <div className="ornament"><span /><Sparkles size={15} /><span /></div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [activePackageSlug, setActivePackageSlug] = useState<string | null>(null);
  const [showWorks, setShowWorks] = useState(false);
  const [worksFocusTitle, setWorksFocusTitle] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePackageSlug, showWorks]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  if (activePackageSlug) {
    const pkg = getPackageBySlug(activePackageSlug);
    if (pkg) return <PackageDetailPage pkg={pkg} onBack={() => setActivePackageSlug(null)} />;
  }

  if (showWorks) {
    return <WorksPage works={gallery} focusTitle={worksFocusTitle} onBack={() => { setShowWorks(false); setWorksFocusTitle(null); }} />;
  }

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <div className="container nav-inner">
        
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Kanavu Thirai home">
  <img
    src="/images/thirai.jpeg"
    alt="Kanavu Thirai"
    className="brand-logo"
  />
</button>
          <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            {['home', 'about', 'services', 'gallery', 'packages', 'testimonials', 'contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item)}>{item === 'home' ? 'Home' : item.replace('-', ' ')}</button>
            ))}
          </nav>
          <a className="button button-small nav-quote" href={whatsappUrl} target="_blank" rel="noreferrer">Get a quote <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} />
          <div className="hero-wash" />
          <div className="gold-corner top-left" />
          <div className="container hero-content">
            <Reveal>
              <div className="hero-copy">
                <p className="eyebrow">Curating celebrations with soul</p>
                <h1>Turning your<br /><span>special moments</span><br />into beautiful<br /><span>memories.</span></h1>
                <p className="hero-text">We plan, decorate, capture and create magical memories that last forever.</p>
                <div className="hero-actions">
                  <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp us</a>
                  <button className="button button-outline" onClick={() => scrollTo('gallery')}>Explore our work <ArrowRight size={17} /></button>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="hero-services container">
            {[['Birthday', PartyPopper], ['Wedding', Heart], ['Photography', Camera], ['Decoration', Flower2]].map(([label, Icon], index) => {
              const ServiceIcon = Icon as IconType;
              return <motion.div className="hero-service" key={label as string} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + index * 0.12 }}><ServiceIcon size={23} /><span>{label as string}</span></motion.div>;
            })}
          </div>
          <div className="scroll-note"><span /> Scroll to explore</div>
        </section>

        <section id="about" className="about section-dark">
          <div className="container about-grid">
            <Reveal className="about-visual">
              <div className="about-main-image image-frame"><img src={images.about} alt="A decorated wedding venue" /></div>
              <div className="about-floating image-frame"><img src={images.aboutSmall} alt="Bride at a decorated wedding stage" /></div>
              <div className="experience-badge"><strong>5+</strong><span>years of<br />creating</span></div>
            </Reveal>
            <Reveal className="about-copy" delay={0.1}>
              <p className="eyebrow">About Kanavu Thirai</p>
              <h2>We plan. We decorate.<br /><span>We click. You celebrate.</span></h2>
              <p>At Kanavu Thirai, we believe every celebration deserves to be extraordinary. From beautiful decorations to perfect planning and stunning photography, we take care of everything so you can celebrate without worries.</p>
              <div className="stats-grid">
                {[['200+', 'Happy clients', Users], ['300+', 'Events done', PartyPopper], ['1000+', 'Photoshoots', Camera], ['5+', 'Years experience', Star]].map(([number, label, StatIcon]) => { const SIcon = StatIcon as IconType; return <div className="stat" key={label as string}><SIcon size={20} /><strong>{number as string}</strong><span>{label as string}</span></div>; })}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="services" className="services section-cream">
          <div className="container"><SectionHeading eyebrow="Our services" title="We create magical experiences" />
            <div className="service-grid">{services.map(({ title, description, icon: Icon }, index) => <Reveal key={title} delay={index * 0.06}><article className="service-card"><div className="service-icon"><Icon size={24} /></div><h3>{title}</h3><p>{description}</p><span className="card-arrow"><ArrowUpRight size={17} /></span></article></Reveal>)}</div>
          </div>
        </section>

        <section className="why section-dark">
          <div className="container"><SectionHeading eyebrow="The Kanavu Thirai difference" title="Why choose Kanavu Thirai?" light /><div className="why-grid">{[
            ['Creative designs', 'Unique and innovative ideas for every celebration.', Lightbulb], ['Custom themes', 'Customized themes that match your style and vision.', Target], ['Budget friendly', 'Beautiful events that suit your budget perfectly.', Gem], ['Complete services', 'Decoration, photography, planning and more — all in one place.', Camera],
          ].map(([title, text, Icon], index) => { const WhyIcon = Icon as IconType; return <Reveal key={title as string} delay={index * 0.08}><div className="why-item"><WhyIcon size={31} /><div><h3>{title as string}</h3><p>{text as string}</p></div></div></Reveal>; })}</div></div>
        </section>

        <section id="packages" className="packages section-cream">
          <div className="container"><SectionHeading eyebrow="Our event packages" title="Choose your kind of magic" /><p className="section-intro">Thoughtfully crafted collections for celebrations big, small, and everything in between.</p>
            <div className="package-grid">{packages.map((pack, index) => <Reveal key={pack.name} delay={index * 0.08}><article className={`package-card ${pack.accent} ${pack.popular ? 'popular' : ''}`}>{pack.popular && <span className="popular-badge">Most popular</span>}<div className="package-top"><span className="package-dot"><Sparkles size={16} /></span><p>{pack.name}</p><h3>Contact us<br /><span>for pricing</span></h3><small>{pack.subtitle}</small></div><ul>{pack.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><button className={`button ${pack.popular ? '' : 'button-outline-dark'}`} onClick={() => setActivePackageSlug(packageSlugMap[pack.name.split(' ')[0]])}>View details <ArrowRight size={16} /></button></article></Reveal>)}</div>
            <p className="package-note">* Packages can be customized according to your event requirements and budget.</p><a className="button button-dark" href={whatsappUrl} target="_blank" rel="noreferrer">Get a custom quote <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section id="gallery" className="gallery section-cream-dark">
          <div className="container">
            <SectionHeading eyebrow="The gallery" title="Our recent works" />
            <div className="gallery-grid">{gallery.map((item, index) => <Reveal key={item.title} delay={index * 0.05}>
              <button className={`gallery-item gallery-${index + 1}`} onClick={() => { setWorksFocusTitle(item.title); setShowWorks(true); }}>
                <img src={item.image} alt={item.title} />
                <span className="gallery-overlay"><small>{item.category}</small><strong>{item.title}</strong><ArrowUpRight size={18} /></span></button></Reveal>)}
                </div>
                <button className="text-link" onClick={() => { setWorksFocusTitle(null); setShowWorks(true); }}>View all works <ArrowRight size={17} /></button>
            </div>
            </section>

        <section className="process section-cream"><div className="container"><SectionHeading eyebrow="Our process" title="How we create your perfect event" /><div className="process-grid">{[['01', 'Share your vision', 'Tell us about your dream event.'], ['02', 'We plan & design', 'Our creative team prepares the perfect concept.'], ['03', 'We create', 'We transform your venue into something magical.'], ['04', 'You celebrate', 'Relax and enjoy your special day.']].map(([number, title, text], index) => <Reveal key={number} delay={index * 0.08}><div className="process-step"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div></Reveal>)}</div></div></section>

        <section id="testimonials" className="testimonials section-dark"><div className="container testimonial-layout"><div><SectionHeading eyebrow="Kind words" title="What our clients say" light /><p className="testimonial-lead">Every celebration leaves a story. Here are a few of our favourites.</p><div className="slider-controls"><button onClick={() => setTestimonialIndex((testimonialIndex + testimonials.length - 1) % testimonials.length)}><ChevronLeft size={19} /></button><span>0{testimonialIndex + 1} <i>/ 0{testimonials.length}</i></span><button onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)}><ChevronRight size={19} /></button></div></div><AnimatePresence mode="wait"><motion.article className="testimonial-card" key={testimonialIndex} initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }} transition={{ duration: 0.35 }}><Quote size={35} /><div className="stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill="currentColor" />)}</div><p>“{testimonials[testimonialIndex].quote}”</p><div className="client"><span>{testimonials[testimonialIndex].initials}</span><div><strong>{testimonials[testimonialIndex].name}</strong><small>{testimonials[testimonialIndex].detail}</small></div></div></motion.article></AnimatePresence></div></section>

        <section className="instagram section-cream-dark"><div className="container instagram-header"><div><SectionHeading eyebrow="From our journal" title="Follow our journey" /><p>Follow us on Instagram to see our latest celebrations and creative decorations.</p></div><a className="button button-outline-dark" href="https://instagram.com/kanavu_thirai_" target="_blank" rel="noreferrer"><Instagram size={17} /> @kanavu_thirai_</a></div><div className="container instagram-grid">{gallery.map((item) => <a href="https://instagram.com/kanavu_thirai_" target="_blank" rel="noreferrer" key={item.title}><img src={item.image} alt={item.title} /><span><Instagram size={22} /></span></a>)}</div></section>

        <section id="contact" className="cta"><div className="gold-corner bottom-right" /><div className="container cta-inner"><div className="cta-icon"><Camera size={34} /><Sparkles size={18} /></div><div><p className="eyebrow">Your next chapter starts here</p><h2>Ready to plan your<br /><span>dream event?</span></h2><p>Let's create beautiful memories together.</p></div>
        <div className="cta-buttons">
          <a className="button button-outline" href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> WhatsApp us</a>
            {/*<a className="button button-outline" href="mailto:kanavuthirai03@gmail.com">Get a free quote <ArrowRight size={17} /></a>*/}
            </div></div></section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand"><button className="brand" onClick={() => scrollTo('home')}><span className="brand-mark"><Sparkles size={18} /></span><span><strong>KANAVU</strong><em>THIRAI</em><small>EVENT FOR MEMORIES</small></span></button><p>We plan, we decorate, we click, you celebrate.</p><div className="socials"><a href="https://instagram.com/kanavu_thirai_" target="_blank" rel="noreferrer"><Instagram size={17} /></a><a href="#contact"><Facebook size={17} /></a><a href="#contact"><Youtube size={17} /></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} /></a></div></div><div><h3>Quick links</h3>{['home', 'about', 'services', 'gallery', 'packages', 'testimonials', 'contact'].map((link) => <button className="footer-link" onClick={() => scrollTo(link)} key={link}>{link.replace('-', ' ')}</button>)}</div><div><h3>Our services</h3>{services.map((service) => <span className="footer-link" key={service.title}>{service.title}</span>)}</div><div className="contact-details"><h3>Contact us</h3><a href="tel:9087525767"><Phone size={15} /> 9087525767</a><a href="mailto:kanavuthirai03@gmail.com"><Mail size={15} /> kanavuthirai03@gmail.com</a><span><MapPin size={15} /> Velachery, Chennai</span><a href="https://instagram.com/kanavu_thirai_" target="_blank" rel="noreferrer"><Instagram size={15} /> @kanavu_thirai_</a><div className="qr"><img src="/images/WhatsApp Image 2026-09-28 at 2.06.33 PM.jpeg" alt="Scan to see our latest works" style={{ width: '70px', height: '70px', objectFit: 'contain' }} /><small>Scan to see our<br />latest works</small></div></div></div><div className="footer-bottom container"><span>© 2026 Kanavu Thirai. All rights reserved.</span><span>Made for moments that matter.</span></div></footer>

      <AnimatePresence>{selectedImage && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)}><motion.div className="lightbox-content" initial={{ scale: 0.92 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()}><button className="lightbox-close" onClick={() => setSelectedImage(null)}><X /></button><img src={selectedImage.image} alt={selectedImage.title} /><div><small>{selectedImage.category}</small><h3>{selectedImage.title}</h3></div></motion.div></motion.div>}</AnimatePresence>
      {showTop && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUpRight size={18} /></button>}
    </div>
  );
}

export default App;
