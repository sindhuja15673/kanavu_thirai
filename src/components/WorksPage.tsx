import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Instagram, Sparkles, X } from 'lucide-react';

type WorkItem = {
  title: string;
  category: string;
  image: string;
  images: string[];
};

type WorksPageProps = {
  works: WorkItem[];
  focusTitle?: string | null;
  onBack: () => void;
};

export default function WorksPage({ works, focusTitle, onBack }: WorksPageProps) {
  const [activeEvent, setActiveEvent] = useState<WorkItem | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!focusTitle) return;
    const el = sectionRefs.current[focusTitle];
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    }
  }, [focusTitle]);

  const openLightbox = (work: WorkItem, index: number) => {
    setActiveEvent(work);
    setPhotoIndex(index);
  };

  const closeLightbox = () => setActiveEvent(null);

  const showPrev = () => {
    if (!activeEvent) return;
    setPhotoIndex((photoIndex - 1 + activeEvent.images.length) % activeEvent.images.length);
  };

  const showNext = () => {
    if (!activeEvent) return;
    setPhotoIndex((photoIndex + 1) % activeEvent.images.length);
  };

  return (
    <div className="site-shell works-page">
      <header className="nav-wrap nav-solid">
        <div className="container nav-inner">
          {/* <button className="brand" onClick={onBack} aria-label="Return to Kanavu Thirai home">
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

      <main>
        <section className="works-hero">
          <div className="gold-corner top-left" />
          <div className="container works-hero-content">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="eyebrow">A collection of memories</p>
              <h1>Our recent works</h1>
              <p>Explore the celebrations we have brought to life, from intimate birthdays to grand wedding stages.</p>
            </motion.div>
          </div>
        </section>

        <section className="works-list section-cream-dark">
          <div className="container">
            {works.map((work, index) => (
              <motion.article
                className="work-card"
                key={work.title}
                ref={(el) => { sectionRefs.current[work.title] = el; }}
                animate={{ opacity: 1, y: 0 }}
                // initial={{ opacity: 0, y: 24 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.06 }}
              >
                <div className="work-copy">
                  <p className="eyebrow">{work.category} event</p>
                  <h2>{work.title}</h2>
                  <p className="work-photo-count">{work.images.length} photos</p>
                </div>
                <div className="work-gallery">
                  {work.images.map((img, imgIndex) => (
                    <button
                      className="work-thumb image-frame"
                      key={imgIndex}
                      onClick={() => openLightbox(work, imgIndex)}
                      aria-label={`View ${work.title} photo ${imgIndex + 1}`}
                    >
                      <img src={img} alt={`${work.title} ${work.category} photo ${imgIndex + 1}`} />
                      <span className="work-thumb-zoom"><ArrowUpRight size={18} /></span>
                    </button>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="works-follow section-dark">
          <div className="container works-follow-inner">
            <div>
              <p className="eyebrow">More from our celebrations</p>
              <h2>Follow our journey on Instagram</h2>
            </div>
            <a className="button" href="https://instagram.com/kanavu_thirai_" target="_blank" rel="noreferrer">
              <Instagram size={17} /> @kanavu_thirai_
            </a>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {activeEvent && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox}>
            <motion.div className="lightbox-content" initial={{ scale: 0.92 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox} aria-label="Close image"><X /></button>
              <img src={activeEvent.images[photoIndex]} alt={`${activeEvent.title} ${activeEvent.category} photo ${photoIndex + 1}`} />
              <div>
                <small>{activeEvent.category} event</small>
                <h3>{activeEvent.title}</h3>
                <span className="lightbox-counter">{photoIndex + 1} / {activeEvent.images.length}</span>
              </div>
              <button className="lightbox-nav lightbox-prev" onClick={showPrev} aria-label="Previous image"><ChevronLeft size={24} /></button>
              <button className="lightbox-nav lightbox-next" onClick={showNext} aria-label="Next image"><ChevronRight size={24} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
