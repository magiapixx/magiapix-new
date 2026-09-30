import { createFileRoute, notFound } from '@tanstack/react-router';
import { BackLink, ClosingCTA } from '@/components/site';
import { articles } from '@/lib/content';
export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => { const article = articles.find((a) => a.slug === params.slug); if (!article) throw notFound(); return article; },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.title} | Magiapix Journal` : 'Article Not Found | Magiapix' },
    { name: 'description', content: loaderData?.excerpt || 'Read the Magiapix journal.' },
    { property: 'og:title', content: loaderData ? `${loaderData.title} | Magiapix Journal` : 'Article Not Found | Magiapix' },
    { property: 'og:description', content: loaderData?.excerpt || 'Read the Magiapix journal.' },
    { property: 'og:type', content: 'article' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: ArticlePage,
});
function ArticlePage() { const article = Route.useLoaderData(); return <main><section className="detail-intro article-intro shell"><BackLink to="/blog">All stories</BackLink><span className="eyebrow">/ {article.category.toUpperCase()} · {article.read.toUpperCase()}</span><h1>{article.title}</h1><p>{article.excerpt}</p><span className="article-date">MAGIAPIX JOURNAL · {article.date.toUpperCase()}</span></section><div className="article-hero-image"><img src={article.image} alt="Editorial visual for article" /></div><article className="article-body shell">{article.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article><div className="shell article-end"><BackLink to="/blog">Back to journal</BackLink></div><ClosingCTA /></main>; }
