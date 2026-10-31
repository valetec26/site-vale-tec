// Configuração do Astro.
// `site` é obrigatório pro sitemap e pras URLs absolutas (canonical, Open Graph).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://valesolucoestec.com.br',
  // Gera /politica-de-privacidade/index.html (URL limpa, sem .html)
  build: {
    format: 'directory',
    // CSS vai embutido no HTML: 1 requisição a menos antes de mostrar a página
    inlineStylesheets: 'always',
  },
  integrations: [
    // O sitemap lista todas as páginas, menos a 404
    sitemap({
      filter: (page) => !page.includes('/404'),
      // As landing pages do Annymus são HTML puro em public/, então o Astro não as enxerga sozinho
      customPages: [
        'https://valesolucoestec.com.br/annymus/academia/',
        'https://valesolucoestec.com.br/annymus/personal/',
      ],
    }),
  ],
});
