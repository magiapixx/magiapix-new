import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { BackLink, ClosingCTA } from '@/components/site';
import { projects } from '@/lib/content';

export const Route = createFileRoute('/our-works/$slug')({
  loader: ({ params }) => {
    const index = projects.findIndex((p) => p.slug === params.slug);
    if (index === -1) throw notFound();
    return { project: projects[index], next: projects[(index + 1) % projects.length] };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.project.name} | Magiapix Works` : 'Project Not Found | Magiapix' },
      { name: 'description', content: loaderData?.project.summary || 'Explore Magiapix creative digital work.' },
      { property: 'og:title', content: loaderData ? `${loaderData.project.name} | Magiapix Works` : 'Project Not Found | Magiapix' },
      { property: 'og:description', content: loaderData?.project.summary || 'Explore Magiapix creative digital work.' },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <main>
      <section className="detail-intro shell">
        <BackLink to="/our-works">All projects</BackLink>
        <span className="eyebrow">/ {(project.category ?? '').toUpperCase()}</span>
        <h1>
          {project.name}
          <span className="detail-period">.</span>
        </h1>
        <p>{project.tagline}</p>
      </section>

      <div className="detail-hero-image">
        <img src={project.image} alt={`${project.name} visual direction`} />
      </div>

      <section className="shell detail-content">
        <div className="detail-aside">
          <span className="eyebrow">PROJECT DETAILS</span>
          <dl>
            <dt>TYPE</dt>
            <dd>Visual concept study</dd>
            <dt>SCOPE</dt>
            <dd>{project.scope}</dd>
            <dt>YEAR</dt>
            <dd>{project.year}</dd>
            <dt>DELIVERABLES</dt>
            <dd>
              <ul className="detail-deliverables">
                {project.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
        <div className="detail-story">
          <h2>{project.summary}</h2>
          <div>
            <span className="eyebrow">/ THE QUESTION</span>
            <p>{project.challenge}</p>
          </div>
          <div>
            <span className="eyebrow">/ THE DIRECTION</span>
            <p>{project.approach}</p>
          </div>
        </div>
      </section>

      <section className="shell detail-gallery">
        <div className="detail-gallery-grid">
          {project.gallery.map((img, i) => (
            <figure key={i}>
              <img src={img} alt={`${project.name} study ${i + 1}`} />
            </figure>
          ))}
        </div>
      </section>

      <div className="detail-wide-image">
        <img src={project.wideImage} alt={`${project.name} atmosphere`} />
      </div>

      <section className="shell detail-language">
        <span className="eyebrow">/ A VISUAL LANGUAGE OF {project.name.split(' ')[0].toUpperCase()}</span>
        <div className="detail-language-grid">
          <div className="detail-palette">
            {project.palette.map((color) => (
              <div key={color.hex} className="detail-swatch">
                <span className="detail-swatch-color" style={{ backgroundColor: color.hex }} />
                <span className="detail-swatch-name">{color.name}</span>
                <span className="detail-swatch-hex">{color.hex}</span>
              </div>
            ))}
          </div>
          <p className="detail-language-note">
            Every color, typeface, and image treatment in this concept was chosen to express the character of the
            brand before a single word is read.
          </p>
        </div>
      </section>

      <section className="detail-keywords">
        <div className="shell">
          {project.keywords.map((word, i) => (
            <span key={word} className={i % 2 === 1 ? 'detail-keyword detail-keyword--alt' : 'detail-keyword'}>
              {word}
            </span>
          ))}
        </div>
      </section>

      <section className="shell detail-process">
        <span className="eyebrow">/ A PROCESS OF EXPLORATION</span>
        <div className="detail-process-grid">
          {project.process.map((step, i) => (
            <div key={step.title} className="detail-process-step">
              <span className="detail-process-number">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell detail-result">
        <span className="eyebrow">/ THE RESULT</span>
        <p>{project.outcome}</p>
      </section>

      <Link to="/our-works/$slug" params={{ slug: next.slug }} className="detail-next">
        <span className="eyebrow">/ NEXT PROJECT</span>
        <span className="detail-next-name">
          {next.name}
          <span className="detail-period">.</span>
        </span>
        <span className="detail-next-category">{next.category}</span>
      </Link>

      <ClosingCTA />
    </main>
  );
}
