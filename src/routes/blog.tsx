import { createFileRoute } from '@tanstack/react-router';
import { ClosingCTA, JournalGrid } from '@/components/site';
export const Route = createFileRoute('/blog')({ head: () => ({ meta: [
  { title: 'Journal | Magiapix' }, { name: 'description', content: 'Thoughts on creative web development, brand visualization, and digital craft from Magiapix.' },
  { property: 'og:title', content: 'Journal | Magiapix' }, { property: 'og:description', content: 'Notes on digital craft, design thinking, and building for ambitious brands.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
] }), component: BlogPage });
function BlogPage() { return <main><section className="page-intro shell"><span className="eyebrow">/ THE JOURNAL</span><h1>Ideas worth <em>thinking about.</em></h1><p>Notes on digital craft, considered design, and the details that make a brand feel like itself.</p></section><section className="shell blog-page-grid"><JournalGrid /></section><ClosingCTA /></main>; }
