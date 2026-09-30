import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { articles, projects } from '@/lib/content';

export function SiteHeader() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  const onHero = pathname === '/' && !scrolled && !open;
  return <header className={`site-header ${onHero ? 'site-header--hero' : 'site-header--solid'}`}>
    <div className="shell header-inner">
      <Link to="/" className="brand" aria-label="Magiapix home">magiapix<span className="brand-period">.</span></Link>
      <nav className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="Main navigation">
        <Link to="/services" activeProps={{ className: 'nav-active' }}>Services</Link>
        <Link to="/our-works" activeProps={{ className: 'nav-active' }}>Our Works</Link>
        <Link to="/about" activeProps={{ className: 'nav-active' }}>About Us</Link>
        <Link to="/blog" activeProps={{ className: 'nav-active' }}>Journal</Link>
        <Button asChild variant="studio" size="studio"><a href="mailto:hello@magiapix.com?subject=Project%20enquiry">Start a project <ArrowRight size={14} /></a></Button>
      </nav>
      <Button variant="iconPlain" size="icon" className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</Button>
    </div>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell">
    <div className="footer-top"><div><Link to="/" className="footer-brand">magiapix<span className="brand-period">.</span></Link><p>Creative web development<br />for ambitious brands.</p></div><div className="footer-links"><Link to="/services">Services</Link><Link to="/our-works">Our Works</Link><Link to="/about">About Us</Link><Link to="/blog">Journal</Link></div><div className="footer-contact"><span className="eyebrow">HAVE SOMETHING IN MIND?</span><a href="mailto:hello@magiapix.com">hello@magiapix.com ↗</a></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} MAGIAPIX. ALL RIGHTS RESERVED.</span><span>DESIGNED WITH INTENTION.</span></div>
  </div></footer>;
}

export function ClosingCTA() {
  return <section className="closing-cta"><div className="shell closing-inner"><div><span className="eyebrow">LET'S MAKE SOMETHING MATTER</span><h2>Ready to make your brand <em>look the part?</em></h2><p>Let's build a digital presence as ambitious as your vision.</p></div><Button asChild variant="studio" size="studio"><a href="mailto:hello@magiapix.com?subject=Project%20enquiry">Let's talk <ArrowRight size={16} /></a></Button></div></section>;
}

export function SectionHeading({ label, title, link, linkText }: { label: string; title: string; link?: '/our-works' | '/services' | '/blog' | '/about'; linkText?: string }) {
  return <div className="section-heading"><div><span className="eyebrow">/ {label}</span><h2>{title}</h2></div>{link && <Link className="text-link" to={link}>{linkText || 'Explore all'} <ArrowRight size={17} /></Link>}</div>;
}

export function WorkGrid({ limit }: { limit?: number }) {
  return <div className="work-grid">{projects.slice(0, limit).map((project, i) => <Link to="/our-works/$slug" params={{ slug: project.slug }} className={`work-item work-item--${i}`} key={project.slug}>
    <div className="work-image"><img src={project.image} alt={`${project.name} visual concept`} loading="lazy" /><span className="work-overlay"><span>VIEW PROJECT <ArrowRight size={16} /></span></span></div>
    <div className="work-meta"><div><h3>{project.name}</h3><p>{project.category}</p></div><ArrowRight size={18} /></div>
  </Link>)}</div>;
}

export function JournalGrid({ limit }: { limit?: number }) {
  return <div className="journal-grid">{articles.slice(0, limit).map((article) => <Link to="/blog/$slug" params={{ slug: article.slug }} className="journal-item" key={article.slug}><div className="journal-image"><img src={article.image} alt="" loading="lazy" /></div><div className="journal-meta"><span>{article.category}</span><span>{article.date}</span></div><h3>{article.title}</h3><span className="text-link">Read story <ArrowRight size={16} /></span></Link>)}</div>;
}

export function BackLink({ to, children }: { to: '/blog' | '/our-works'; children: string }) { return <Link to={to} className="back-link"><ArrowLeft size={16} /> {children}</Link>; }
export { ArrowDown, ArrowRight };
