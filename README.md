# Site Vale Tec — valesolucoestec.com.br

Site institucional da **Vale Soluções Tecnológicas**, feito em **Astro** (gera HTML estático:
rápido, barato de hospedar e ótimo pra SEO).

Resultado do Lighthouse (celular, antes de publicar): **Performance 95 · Acessibilidade 100 ·
Boas práticas 100 · SEO 100**.

---

## 1. Como o projeto é organizado

```
site-vale-tec/
├── astro.config.mjs        → configuração (domínio, sitemap)
├── render.yaml             → deploy no Render (hospedagem grátis)
├── vercel.json             → deploy na Vercel (alternativa)
├── scripts/                → rodam sozinhos antes do build (fontes das LPs e imagens PNG)
├── public/                 → arquivos copiados "como estão" (favicon, logo, og-image, robots.txt)
│   └── annymus/            → LANDING PAGES DO ANNYMUS (HTML puro, design próprio do produto)
│       ├── academia/index.html  → valesolucoestec.com.br/annymus/academia/
│       └── personal/index.html  → valesolucoestec.com.br/annymus/personal/
└── src/
    ├── data/               → O CONTEÚDO DO SITE MORA AQUI
    │   ├── site.ts         → telefone, CNPJ, Instagram, cidades, link do app
    │   ├── servicos.ts     → cards de Desenvolvimento e Suporte de TI
    │   └── faq.ts          → perguntas frequentes (também vira dado pro Google)
    ├── styles/global.css   → cores, fontes, botões, cards (os "tokens" da marca)
    ├── layouts/Base.astro  → <head> de todas as páginas (SEO, Open Graph, favicon)
    ├── components/         → cada seção da Home é um componente
    └── pages/              → cada arquivo vira uma URL
        ├── index.astro                    → /
        ├── politica-de-privacidade.astro  → /politica-de-privacidade
        └── 404.astro                      → página de erro
```

**Regra de ouro:** pra mudar TEXTO ou DADO, mexe em `src/data/`. Pra mudar VISUAL, mexe no
`<style>` do componente ou em `global.css`. Quase nunca precisa mexer nos dois.

### Exemplos do dia a dia

- **Trocar o WhatsApp:** `src/data/site.ts` → `whatsapp` e `whatsappExibicao`.
- **Novo serviço de TI:** copia um objeto em `src/data/servicos.ts` e edita. O card,
  o botão do WhatsApp com mensagem pronta e o dado pro Google saem sozinhos.
- **Nova pergunta no FAQ:** adiciona em `src/data/faq.ts`.
- **Mudar a ordem das seções:** `src/pages/index.astro`, lista dentro do `<main>`.

### Landing pages do Annymus (anúncios)

- São páginas soltas: não têm o menu do site, só o Annymus e o botão do WhatsApp. Quem clica no
  anúncio cai direto nelas e não vê o resto da Vale Tec.
- Pra editar: mexe direto no `index.html` de cada pasta. O WhatsApp e as mensagens prontas ficam no
  `<script>` no fim do arquivo (`WHATSAPP` e `MENSAGENS`).
- **Link do anúncio:** use sempre com `?utm_content=nome-do-criativo`, ex.:
  `https://valesolucoestec.com.br/annymus/academia/?utm_source=meta&utm_content=feed-inadimplencia`.
  O nome do criativo aparece no fim da mensagem do WhatsApp (`[feed-inadimplencia]`): você sabe
  qual anúncio trouxe cada contato.
- **Pixel da Meta (instalado e LIGADO, conjunto de dados "Pixel Site Vale Tec" da conta Vale Informatica):** o arquivo `public/js/vt-cookies.js`
  cuida do aviso de cookies e do Pixel, no site e nas 2 landing pages. O ID fica na linha
  `var PIXEL_ID = '...';` no topo do arquivo. Para desligar tudo, deixe a linha vazia (`''`): nada
  carrega e o aviso nem aparece. O Pixel só carrega depois do "Aceitar" e envia 2 eventos: `PageView` e
  `Lead` (clique em botão de WhatsApp, com o nome do criativo em `content_category`).
  **Só vale para o site da Vale: o sistema Annymus (subdomínio) não carrega isto.**
  A Política de Privacidade (seção 4) já descreve o Pixel; se trocar de ferramenta, atualize o texto.

---

## 2. Rodar no seu computador

Precisa do **Node.js 24 LTS** (https://nodejs.org).

> ⚠️ **Não rode `npm install` dentro da pasta do Google Drive.** Ele cria a pasta
> `node_modules` com milhares de arquivos e o Drive vai tentar sincronizar tudo.
> Clone o repositório do GitHub numa pasta fora do Drive, ex.:
> `C:\Users\Adauto Netto\Documents\GitHub\site-vale-tec`.

```bash
npm install      # instala as dependências (só na primeira vez)
npm run dev      # abre em http://localhost:4321 e atualiza sozinho quando você salva
npm run build    # gera a versão final na pasta dist/
npm run preview  # testa a versão final localmente
```

---

## 3. Publicar (deploy)

O fluxo é sempre: **código no GitHub → hospedagem puxa do GitHub → gera o site → publica.**
Cada `git push` na branch `main` publica de novo sozinho.

### Passo 0 — Subir pro GitHub
1. Cria um repositório novo (ex.: `site-vale-tec`), pode ser **privado**.
2. Na pasta do projeto:
   ```bash
   git init
   git add .
   git commit -m "Site Vale Tec v1"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/site-vale-tec.git
   git push -u origin main
   ```

### Opção A — Render (grátis) ✅ recomendado se o app também for pro Render
1. https://dashboard.render.com → **New → Blueprint** → escolhe o repositório.
2. O Render lê o `render.yaml` e cria o **Static Site** com build, headers de segurança,
   cache e página 404 já configurados.
3. Vai em **Settings → Custom Domains** do site: os domínios `valesolucoestec.com.br` e
   `www.valesolucoestec.com.br` já vêm do `render.yaml`. O Render mostra o que configurar no DNS.

### Opção B — Vercel (grátis)
1. https://vercel.com → **Add New → Project** → importa o repositório.
2. Ela detecta o Astro sozinha. Clica em **Deploy**.
3. **Settings → Domains** → adiciona `valesolucoestec.com.br` e segue o que ela pedir no DNS.

---

## 4. Apontar o domínio (Registro.br)

No Registro.br: **Domínio → DNS → Configurar zona DNS (modo avançado)**.

**Se for Render:**

| Tipo  | Nome  | Valor                                  |
|-------|-------|----------------------------------------|
| A     | (vazio / @) | `216.24.57.1`                    |
| CNAME | `www` | `site-vale-tec.onrender.com` (o endereço que o Render mostrar) |

- Apaga qualquer registro **AAAA** do domínio raiz (o Render pede isso).
- O HTTPS (cadeado) é emitido sozinho depois que o DNS propaga (de minutos a algumas horas).

**Subdomínio do sistema (depois):** quando o Annymus for publicado, cria um registro
`CNAME` com nome `annymus` apontando pro endereço que a hospedagem do sistema informar.
Ele é independente do site: um não derruba o outro.

---

## 5. Checklist antes de divulgar

- [ ] Abrir o site no celular e clicar em todos os botões de WhatsApp.
- [ ] Mandar o link pra você mesmo no WhatsApp e conferir o card (imagem `og-image.png`).
- [ ] Cadastrar o site no **Google Search Console** e enviar `https://valesolucoestec.com.br/sitemap-index.xml`.
- [ ] Criar/atualizar o **Google Meu Negócio** com o MESMO nome, telefone e cidade do site.
- [ ] Depois do deploy, testar o Pixel: abrir o site em janela anônima, ver o aviso, clicar "Aceitar" e
      conferir o evento no **Gerenciador de Eventos** da Meta (conta Vale Informatica).
- [ ] Se colocar OUTRA ferramenta (Google Analytics, formulário, outro pixel): **atualizar a Política de
      Privacidade** e o aviso de cookies antes de publicar.

---

## 6. Decisões técnicas (pra estudar)

- **Astro e não React/Next:** site institucional não precisa de JavaScript pra montar a tela.
  O Astro entrega HTML pronto, e o único JS do site é o menu do celular (~1 KB).
- **Fontes locais (`@fontsource`):** sem Google Fonts. Carrega mais rápido e não envia o IP do
  visitante pro Google (ponto de LGPD).
- **Só o subconjunto "latin" das fontes:** cobre português inteiro (ç, ã, é) e corta ~70% do peso.
- **CSS com escopo:** o `<style>` dentro de cada `.astro` só afeta aquele componente. Pra estilizar
  algo que vem de OUTRO componente (ex.: o `<svg>` do `Icon`), usa `:global(...)`.
- **Celular do Annymus:** a tela usa `position: absolute; inset: 11px` dentro da moldura. Se
  ficasse no fluxo normal, o conteúdo comprido esticaria o `aspect-ratio` e o celular ficaria gigante.
- **Dados estruturados (JSON-LD):** `LocalBusiness` + `FAQPage` em `index.astro`. É o que ajuda a
  aparecer com destaque nas buscas locais.
- **Fontes e imagens geradas no build:** `scripts/copiar-fontes-annymus.mjs` copia as fontes das LPs
  do `node_modules` e `scripts/gerar-imagens.mjs` desenha os PNGs (ícones e `og-image.png`) a partir de
  SVG com o `sharp`. Só gera o que estiver faltando em `public/`.
- **Botões do WhatsApp:** a função `wa()` em `site.ts` monta o link com `encodeURIComponent`,
  que converte acentos e espaços pro formato que URL aceita.
