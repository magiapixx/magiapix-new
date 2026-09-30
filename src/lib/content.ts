import atelierImage from '@/assets/work-atelier.jpg';
import formImage from '@/assets/work-form.jpg';
import objectsImage from '@/assets/work-objects.jpg';
import heroImage from '@/assets/hero-coast.jpg';

export const projects = [
  {
    slug: 'stillwater-residence', name: 'Stillwater Residence', category: 'Hospitality · Concept study', year: '2026', image: atelierImage,
    tagline: 'A quieter kind of presence.',
    summary: 'A digital direction for a coastal retreat, built around the feeling of arriving somewhere worth slowing down for.',
    scope: 'Art direction, brand visualization, website concept',
    challenge: 'How do you make a place feel tangible before a guest has ever set foot there? The answer starts with restraint: an image-first story, a clear sense of place, and room for the details to breathe.',
    approach: 'We imagined a visual system shaped by architecture, natural light, and the rhythm of the coast. The website concept puts the property first, with considered typography and a direct path from discovery to enquiry.',
    outcome: 'A concept study showing how considered digital storytelling can give a hospitality brand a distinct point of view.',
  },
  {
    slug: 'form-and-field', name: 'Form & Field', category: 'Objects · Concept study', year: '2026', image: formImage,
    tagline: 'Material, form, and everything between.',
    summary: 'An editorial commerce direction for a studio of objects made to be lived with.',
    scope: 'Digital identity, creative direction, commerce concept',
    challenge: 'Beautiful objects need more than a product grid. They need a setting that communicates scale, material, and intention without adding noise.',
    approach: 'We paired tactile imagery with a spare interface, giving each object room to stand on its own. Clear product pathways sit alongside an editorial story about process and material.',
    outcome: 'A concept study for a considered buying experience where the collection does the talking.',
  },
  {
    slug: 'another-space', name: 'Another Space', category: 'Digital product · Concept study', year: '2026', image: objectsImage,
    tagline: 'A new perspective on the everyday.',
    summary: 'A visual language and digital experience concept for a design-led creative platform.',
    scope: 'Experience design, motion direction, website concept',
    challenge: 'A platform with many ideas needs a coherent way to organize them without losing its personality.',
    approach: 'We developed a modular editorial direction that balances expressive art direction with intuitive navigation. Movement has a purpose: to guide attention, not demand it.',
    outcome: 'A concept study connecting strong visual character with a simple, usable structure.',
  },
  {
    slug: 'northline', name: 'Northline', category: 'Brand experience · Concept study', year: '2026', image: heroImage,
    tagline: 'Made for the long view.',
    summary: 'A cinematic web direction for a future-facing architecture practice.',
    scope: 'Brand visualization, website concept, art direction',
    challenge: 'Architecture is experienced in space. A website must suggest that scale without getting in the way of the work.',
    approach: 'We framed each project as a story told through environment, material, and light. The interface stays quiet so the images can carry the experience.',
    outcome: 'A concept study that lets the practice’s visual point of view lead.',
  },
];

export const articles = [
  {
    slug: 'your-website-is-a-first-impression', title: 'Your website is a first impression. Make it an honest one.', category: 'Perspective', date: 'Sep 18, 2026', read: '5 min read', image: atelierImage,
    excerpt: 'What a digital first impression says about the quality of the business behind it.',
    paragraphs: [
      'Before someone reads your story, they have already formed an opinion. The way a page moves, the clarity of its hierarchy, and the quality of its imagery all say something about your business.',
      'A premium digital presence is not a collection of expensive-looking effects. It is a series of deliberate decisions. What deserves attention first? What can wait? Which details make the brand unmistakably itself?',
      'Start with what is true about the business. Find the visual language that expresses it. Then build an experience that works as carefully as it looks. When the thinking is sound, the result feels natural rather than forced.',
      'The goal is not to look like everyone else in your category. It is to make the right people recognize the quality of what you do.'
    ],
  },
  {
    slug: 'the-case-for-digital-restraint', title: 'The case for digital restraint', category: 'Design notes', date: 'Aug 27, 2026', read: '4 min read', image: formImage,
    excerpt: 'Why leaving space around the important things can make a website work harder.',
    paragraphs: [
      'There is a temptation to make every part of a website speak at once. More movement, more messages, more ways to click. But attention is finite, and adding more rarely makes the important things clearer.',
      'Restraint is an active design decision. It means choosing a hierarchy and trusting it. It means allowing an image to occupy space, letting a headline finish its thought, and giving the visitor time to understand what comes next.',
      'This is not minimalism for its own sake. A quiet interface can hold a complex business, provided the structure underneath is precise. The work is in knowing what to remove without losing meaning.',
      'When every element has a job, the experience feels confident. That confidence is what people remember.'
    ],
  },
  {
    slug: 'designing-for-the-brand-behind-the-screen', title: 'Designing for the brand behind the screen', category: 'Process', date: 'Jul 09, 2026', read: '6 min read', image: objectsImage,
    excerpt: 'A good website begins by understanding the business, not by picking a layout.',
    paragraphs: [
      'A layout can be assembled quickly. A useful point of view takes more work. Before we open a design file, we want to know what the business makes possible for its customers and what makes its approach different.',
      'That understanding shapes the decisions that follow: the imagery we choose, the tone of the writing, the way information is grouped, and the interactions that help people find their way.',
      'Design and development are not separate conversations. How a page performs is part of how it feels. A considered experience should load quickly, behave reliably, and remain clear on a small screen.',
      'The finished site should feel like a natural extension of the business behind it. Not a template with a new name on top.'
    ],
  },
];

export const services = [
  { name: 'Creative Web Development', description: 'Custom-built websites that are fast, responsive, and designed to stand apart from templates and trends.', image: atelierImage, alt: 'Contemporary coastal architecture in mist' },
  { name: 'Brand Visualization', description: 'We translate your brand identity into a cohesive digital look and feel: visuals, layout, and interaction that say who you are before a word is read.', image: formImage, alt: 'Sculptural metal and glass brand study' },
  { name: 'Business Website Design', description: 'Strategic, conversion-minded websites that present your business with authority and turn visitors into clients.', image: objectsImage, alt: 'Abstract digital product still life' },
  { name: 'Digital Experience & Motion', description: 'Thoughtful animation and interaction design that makes your site feel alive, polished, and memorable.', image: heroImage, alt: 'Atmospheric architecture on a rugged coastline' },
];
