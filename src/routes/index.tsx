import { createFileRoute, Link } from '@tanstack/react-router';
import heroImage from '@/assets/hero-coast.jpg';
import formImage from '@/assets/work-form.jpg';
import objectsImage from '@/assets/work-objects.jpg';
import { ArrowDown, ArrowRight, ClosingCTA, JournalGrid, SectionHeading, WorkGrid } from '@/components/site';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Magiapix | Creative Web Development & Brand Visualization Agency' },
    { name: 'description', content: 'Magiapix is a premium digital agency crafting creative websites that visualize ambitious brands and businesses. Start your project today.' },
    { property: 'og:title', content: 'Magiapix | Creative Web Development & Brand Visualization Agency' },
    { property: 'og:description', content: 'Creative websites and digital brand experiences for ambitious brands.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: HomePage,
});

function HomePage() { return <main>
  <section className="home-hero"><img className="hero-image" src={heroImage} alt="Sculptural architecture on a dramatic rocky coastline" width={1920} height={1104} /><div className="hero-shade" /><div className="shell hero-content"><div className="hero-topline"><span>INDEPENDENT DIGITAL STUDIO</span><span>CREATIVE WEB DEVELOPMENT · BRAND VISUALIZATION</span></div><div className="hero-bottom"><div><h1>Where ambitious brands<br /><em>become unforgettable.</em></h1><span className="hero-caption">© MAGIAPIX — DIGITAL EXPERIENCES WITH CHARACTER</span></div><p>Magiapix is a digital agency crafting creative websites that visualize your brand with clarity, character, and impact.</p></div></div><a className="hero-scroll" href="#introduction" aria-label="Scroll to introduction"><ArrowDown size={17} /></a></section>
  <section className="intro-section section-pad" id="introduction"><div className="shell"><span className="eyebrow">/ ABOUT MAGIAPIX</span><div className="intro-copy"><p>Your brand is more than a logo. It's a story, a standard, and a promise.</p><strong>We turn it into a digital experience that looks as premium as your business is.</strong><Link to="/about" className="text-link">Meet the studio <ArrowRight size={17} /></Link></div></div></section>
  <section className="proof-section"><div className="shell proof-grid"><div className="proof-copy"><span className="eyebrow">/ WHAT WE BELIEVE</span><h2>Premium is in <em>the details.</em></h2><p>We focus on creative web development and brand visualization, shaping digital spaces where every detail reflects the quality of the business behind it.</p><div className="proof-list"><div><span>01</span><p>Specialized, not scattered.</p></div><div><span>02</span><p>Design meets performance.</p></div><div><span>03</span><p>Built for ambition.</p></div></div><Link to="/services" className="text-link">How we work <ArrowRight size={17} /></Link></div><div className="proof-visuals"><img src={formImage} alt="Sculptural metal and glass study" loading="lazy" /><img src={objectsImage} alt="Abstract objects and material study" loading="lazy" /></div></div></section>
  <section className="section-pad"><div className="shell"><SectionHeading label="SELECTED WORK" title="Made to be felt." link="/our-works" linkText="All projects" /><WorkGrid limit={3} /><p className="concept-note">Selected visual concept studies created for this site; not commissioned client projects.</p></div></section>
  <section className="services-preview section-pad"><div className="shell"><SectionHeading label="OUR CAPABILITIES" title="What we do best." link="/services" linkText="Explore services" /><div className="service-lines"><Link to="/services"><span>Creative Web Development</span><ArrowRight /></Link><Link to="/services"><span>Brand Visualization</span><ArrowRight /></Link><Link to="/services"><span>Business Website Design</span><ArrowRight /></Link><Link to="/services"><span>Digital Experience & Motion</span><ArrowRight /></Link></div></div></section>
  <section className="section-pad"><div className="shell"><SectionHeading label="THE JOURNAL" title="Notes from the studio." link="/blog" linkText="All stories" /><JournalGrid limit={2} /></div></section>
  <ClosingCTA />
</main>; }
