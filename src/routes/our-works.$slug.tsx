import { createFileRoute, notFound } from '@tanstack/react-router';
import { BackLink, ClosingCTA } from '@/components/site';
import { projects } from '@/lib/content';
export const Route = createFileRoute('/our-works/$slug')({
  loader: ({ params }) => { const project = projects.find((p) => p.slug === params.slug); if (!project) throw notFound(); return project; },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.name} | Magiapix Works` : 'Project Not Found | Magiapix' },
    { name: 'description', content: loaderData?.summary || 'Explore Magiapix creative digital work.' },
    { property: 'og:title', content: loaderData ? `${loaderData.name} | Magiapix Works` : 'Project Not Found | Magiapix' },
    { property: 'og:description', content: loaderData?.summary || 'Explore Magiapix creative digital work.' },
    { property: 'og:type', content: 'article' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: ProjectPage,
});
function ProjectPage() { const project = Route.useLoaderData(); return <main><section className="detail-intro shell"><BackLink to="/our-works">All projects</BackLink><span className="eyebrow">/ {project.category.toUpperCase()}</span><h1>{project.name}<span className="detail-period">.</span></h1><p>{project.tagline}</p></section><div className="detail-hero-image"><img src={project.image} alt={`${project.name} visual direction`} /></div><section className="shell detail-content"><div className="detail-aside"><span className="eyebrow">PROJECT DETAILS</span><dl><dt>TYPE</dt><dd>Visual concept study</dd><dt>SCOPE</dt><dd>{project.scope}</dd><dt>YEAR</dt><dd>{project.year}</dd></dl></div><div className="detail-story"><h2>{project.summary}</h2><div><span className="eyebrow">/ THE QUESTION</span><p>{project.challenge}</p></div><div><span className="eyebrow">/ THE DIRECTION</span><p>{project.approach}</p></div><div><span className="eyebrow">/ THE RESULT</span><p>{project.outcome}</p></div></div></section><ClosingCTA /></main>; }
