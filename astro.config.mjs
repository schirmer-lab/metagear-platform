// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://schirmer-lab.github.io',
  base: '/metagear',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'MetaGEAR',
      description:
        'An integrated bioinformatics platform for microbiome research — pipelines, tooling, and a queryable atlas of microbial genes.',
      logo: {
        light: './src/assets/wordmark-light.svg',
        dark: './src/assets/wordmark-dark.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://schirmer-lab.github.io/metagear/og-image.png',
          },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:width', content: '1200' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:height', content: '630' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: 'MetaGEAR Platform' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: 'https://schirmer-lab.github.io/metagear/og-image.png',
          },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: 'anonymous',
          },
        },
        {
          tag: 'script',
          content: `
            // Tag the document with a class on the landing so we can hide
            // doc-only chrome (sidebar search etc.) without affecting other pages.
            (function () {
              if (typeof window === 'undefined') return;
              var p = location.pathname.replace(/\\/$/, '');
              if (p === '' || p.endsWith('/metagear')) {
                document.documentElement.classList.add('is-landing');
              }
            })();

            // Scroll-reveal for .mg-reveal — bails on reduced-motion or no IO.
            if (typeof window !== 'undefined' &&
                'IntersectionObserver' in window &&
                !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              const io = new IntersectionObserver((entries) => {
                for (const e of entries) {
                  if (e.isIntersecting) {
                    e.target.classList.add('is-in');
                    io.unobserve(e.target);
                  }
                }
              }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
              const observe = () => document.querySelectorAll('.mg-reveal').forEach((el) => io.observe(el));
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', observe, { once: true });
              } else { observe(); }
            } else if (typeof document !== 'undefined') {
              document.documentElement.classList.add('mg-no-reveal');
            }
          `.trim(),
        },
      ],
      social: {
        github: 'https://github.com/schirmer-lab',
      },
      customCss: ['./src/styles/custom.css'],
      components: {
        Footer: './src/components/Footer.astro',
      },
      sidebar: [
        { label: 'Home', link: '/' },
        { label: 'What is MetaGEAR', link: '/about/' },
        { label: 'Get started', link: '/get-started/' },
        {
          label: 'Components',
          items: [
            { label: 'MetaGEAR Workflows', link: '/workflows/' },
            { label: 'MetaGEAR Tools (CLI)', link: '/tools/' },
            { label: 'MetaGEAR Explorer', link: '/explorer/' },
          ],
        },
        { label: 'Cite & contact', link: '/cite/' },
        { label: 'News', link: '/news/' },
      ],
      lastUpdated: true,
      pagination: false,
    }),
  ],
});
