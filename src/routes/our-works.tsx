import { createFileRoute } from '@tanstack/react-router';
import { ClosingCTA, WorkGrid } from '@/components/site';
export const Route = createFileRoute('/our-works')({ head: () => ({ meta: [
  { title: 'Our Works | Magiapix' }, { name: 'description', content: 'Explore visual concept studies in brand visualization, digital experience, and creative web development by Magiapix.' },
  { property: 'og:title', content: 'Our Works | Magiapix' }, { property: 'og:description', content: 'A collection of digital and visual concept studies from Magiapix.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
] }), component: WorksPage });
function WorksPage() { return <main><section className="page-intro shell"><span className="eyebrow">/ SELECTED WORK</span><h1>Work with <em>a point of view.</em></h1><p>A collection of visual directions for brands that want their digital presence to say something meaningful.</p></section><section className="shell works-page-grid"><WorkGrid /><p className="concept-note">These are visual concept studies created for this website. They are not presented as commissioned client work.</p></section><ClosingCTA /></main>; }
