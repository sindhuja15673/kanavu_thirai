import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { PackageDetail } from '@/data/packageDetails';

const whatsappUrl = 'https://wa.me/919087525767';

type Props = {
  pkg: PackageDetail;
  onBack: () => void;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  eventName: string;
  message: string;
};

const emptyForm: FormState = { name: '', phone: '', email: '', eventName: '', message: '' };

export default function PackageDetailPage({ pkg, onBack }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return;

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.eventName.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const formData = {
      package_name: pkg.name,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      event_name: form.eventName.trim(),
      message: form.message.trim() || null,
    };

    try {
      const { error: insertError } = await supabase.from('package_inquiries').insert(formData);

      if (insertError) throw insertError;

      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-inquiry-email`;
      fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      }).catch(() => {});

      setSubmitted(true);
      setForm(emptyForm);
    } catch {
      setError('Something went wrong. Please try again or message us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const accentClass = `pkg-${pkg.accent}`;

  return (
    <div className="site-shell site-shells">
      <header className="nav-wrap nav-solid">
        <div className="container nav-inner">
          {/* <button className="brand" onClick={onBack}>
            <span className="brand-mark"><Sparkles size={18} /></span>
            <span><strong>KANAVU</strong><em>THIRAI</em><small>EVENT FOR MEMORIES</small></span>
          </button> */}
          <button className="brand" onClick={onBack} aria-label="Return to Kanavu Thirai home">
  <img
    src="/images/thirai.jpeg"
    alt="Kanavu Thirai"
    className="brand-logo"
  />
</button>
          <button className="button button-small nav-quote" onClick={onBack}>
            <ArrowLeft size={15} /> Back to home
          </button>
        </div>
      </header>

      <section className={`pkg-hero ${accentClass}`}>
        <div className="pkg-hero-bg" style={{ backgroundImage: `url(${pkg.images[0]})` }} />
        <div className="pkg-hero-wash" />
        <div className="gold-corner top-left" />
        <div className="container pkg-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow">{pkg.tagline}</p>
            <h1>{pkg.name}</h1>
            <p className="pkg-hero-desc">{pkg.description}</p>
            <div className="pkg-hero-actions">
              <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={17} /> WhatsApp us
              </a>
              <button className="button button-outline" onClick={() => document.getElementById('pkg-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Enquire now <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pkg-about section-cream">
        <div className="container pkg-about-grid">
          <motion.div
            className="pkg-about-visual image-frame"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <img src={pkg.images[1]} alt={`${pkg.name} sample decoration`} />
          </motion.div>
          <motion.div
            className="pkg-about-copy"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="eyebrow">About this package</p>
            <h2>What makes {pkg.name.split(' ')[0]} special</h2>
            <p className="pkg-body-text">{pkg.longDescription}</p>
            <div className="pkg-ideal">
              <Sparkles size={18} />
              <p>{pkg.ideal}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pkg-features section-dark">
        <div className="container">
          <div className="section-heading section-heading-light">
            <span className="eyebrow">What's included</span>
            <h2>Package features</h2>
            <div className="ornament"><span /><Sparkles size={15} /><span /></div>
          </div>
          <div className="pkg-features-grid">
            {pkg.features.map((feature, index) => (
              <motion.div
                key={feature}
                className="pkg-feature-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Check size={18} />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pkg-gallery section-cream-dark">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Sample work</span>
            <h2>A glimpse of what we create</h2>
            <div className="ornament"><span /><Sparkles size={15} /><span /></div>
          </div>
          <div className="pkg-gallery-grid">
            {pkg.images.map((image, index) => (
              <motion.button
                key={index}
                className="pkg-gallery-item image-frame"
                onClick={() => setLightboxIndex(index)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <img src={image} alt={`${pkg.name} sample ${index + 1}`} />
                <span className="pkg-gallery-zoom"><ArrowUpRight size={20} /></span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section id="pkg-form" className="pkg-form-section section-dark">
        <div className="container pkg-form-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">Book your package</p>
            <h2>Interested in {pkg.name}?</h2>
            <p className="pkg-form-lead">
              Fill in the form and our team will get back to you with pricing, availability, and a customized plan for your celebration.
            </p>
            <div className="pkg-form-contact">
              <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Chat on WhatsApp</a>
              <a href="tel:9087525767"><Phone size={16} /> 9087525767</a>
              <a href="mailto:kanavuthirai03@gmail.com"><Mail size={16} /> kanavuthirai03@gmail.com</a>
              <span><MapPin size={16} /> Velachery, Chennai</span>
            </div>
          </motion.div>

          <motion.div
            className="pkg-form-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <div className="pkg-form-success">
                <CheckCircle2 size={52} />
                <h3>Thank you!</h3>
                <p>Your inquiry for {pkg.name} has been received. Our team will contact you shortly.</p>
                <button className="button" onClick={() => setSubmitted(false)}>Submit another inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pkg-form">
                <div className="pkg-form-row">
                  <label>
                    <span>Full name *</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </label>
                  <label>
                    <span>Phone number *</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Your phone number"
                      required
                    />
                  </label>
                </div>
                <div className="pkg-form-row">
                  <label>
                    <span>Email address *</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </label>
                  <label>
                    <span>Event name *</span>
                    <input
                      type="text"
                      value={form.eventName}
                      onChange={(e) => setForm({ ...form, eventName: e.target.value })}
                      placeholder="e.g. Birthday, Wedding..."
                      required
                    />
                  </label>
                </div>
                <label className="pkg-form-full">
                  <span>Message (optional)</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your event date, venue, number of guests..."
                    rows={3}
                  />
                </label>
                {error && <p className="pkg-form-error">{error}</p>}
                <button type="submit" className="button pkg-form-submit" disabled={submitting}>
                  {submitting ? <><Loader2 size={17} className="spin" /> Submitting...</> : <>Submit inquiry <ArrowRight size={17} /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <section className="cta">
        <div className="gold-corner bottom-right" />
        <div className="container cta-inner">
          <div className="cta-icon"><Sparkles size={34} /><Sparkles size={18} /></div>
          <div>
            <p className="eyebrow">Still deciding?</p>
            <h2>Let's plan your<br /><span>perfect celebration</span></h2>
            <p>Get a free custom quote tailored to your event.</p>
          </div>
          <div className="cta-buttons">
            <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp us</a>
            <button className="button button-outline" onClick={onBack}>Back to home <ArrowRight size={17} /></button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-bottom" style={{ marginTop: '50px' }}>
          <span>© 2026 Kanavu Thirai. All rights reserved.</span>
          <span>Made for moments that matter.</span>
        </div>
      </footer>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setLightboxIndex(null)}><X /></button>
              <img src={pkg.images[lightboxIndex]} alt={`${pkg.name} sample ${lightboxIndex + 1}`} />
              <div>
                <small>{pkg.name}</small>
                <h3>Sample work {lightboxIndex + 1}</h3>
              </div>
              {lightboxIndex > 0 && (
                <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}>
                  <ChevronLeft size={24} />
                </button>
              )}
              {lightboxIndex < pkg.images.length - 1 && (
                <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}>
                  <ChevronRight size={24} />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
