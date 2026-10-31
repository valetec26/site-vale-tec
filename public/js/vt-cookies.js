/* ============================================================
   Vale Tec · aviso de cookies + Pixel da Meta (site e landing pages)

   COMO FUNCIONA (leia antes de mexer):
   1. A pessoa chega. Nada de rastreio roda. O aviso aparece embaixo.
   2. "Aceitar"  -> a escolha fica salva no navegador por 180 dias e o Pixel carrega.
      "Recusar"  -> a escolha fica salva e o Pixel NUNCA carrega (nem cookie da Meta).
   3. Com o Pixel ativo, dois eventos são enviados à Meta:
        - PageView: a pessoa viu a página;
        - Lead: a pessoa clicou em um botão de WhatsApp (é o "resultado" do anúncio).
   4. O rodapé tem "Preferências de cookies": a pessoa pode mudar de ideia quando quiser.

   ESTE ARQUIVO SÓ VALE PARA O SITE DA VALE. O sistema Annymus (subdomínio) não carrega isto.

   >>> PARA LIGAR: cole o ID do Pixel (só números) em PIXEL_ID, aqui embaixo. <<<
   Enquanto estiver vazio, NADA carrega e o aviso nem aparece (não há o que pedir consentimento).
   ============================================================ */
(function () {
  'use strict';

  var PIXEL_ID = '1772239897179447';                 // <- ID do Pixel da Meta (Gerenciador de Eventos). Ex.: '123456789012345'

  var CHAVE = 'vt_cookies';          // nome da gaveta no navegador onde a escolha fica guardada
  var VALIDADE_DIAS = 180;           // depois disso, perguntamos de novo
  var tag = document.currentScript;
  var ESTILO = (tag && tag.getAttribute('data-estilo')) || 'site';   // 'site' (cantos retos) ou 'lp' (arredondado)

  if (!/^\d{8,20}$/.test(PIXEL_ID)) {
    // Sem ID válido: não há rastreio, então não há aviso. Ainda assim, esconde os links de "Preferências".
    return;
  }

  /* ---------- escolha da pessoa (guardada no navegador, nada vai para servidor) ---------- */
  function lerEscolha() {
    try {
      var v = JSON.parse(localStorage.getItem(CHAVE));
      if (v && typeof v.ok === 'boolean' && Date.now() - v.t < VALIDADE_DIAS * 864e5) return v.ok;
    } catch (e) { /* navegador bloqueou o armazenamento: tratamos como "ainda não escolheu" */ }
    return null;
  }
  function gravarEscolha(ok) {
    try { localStorage.setItem(CHAVE, JSON.stringify({ ok: ok, t: Date.now() })); } catch (e) {}
  }

  /* ---------- de qual anúncio veio (mesma regra do botão do WhatsApp nas LPs) ---------- */
  function origem() {
    try {
      var p = new URLSearchParams(location.search);
      return (p.get('utm_content') || p.get('utm_campaign') || 'site').replace(/[^\w-]/g, '').slice(0, 40) || 'site';
    } catch (e) { return 'site'; }
  }

  /* ---------- Pixel da Meta (trecho oficial, em versão legível) ---------- */
  function carregarPixel() {
    if (window.fbq) return;
    var fbq = window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
  }

  /* Apaga os cookies da Meta (_fbp, _fbc) quando a pessoa recusa depois de ter aceitado */
  function apagarCookiesMeta() {
    var host = location.hostname;
    var pai = host.replace(/^www\./, '');
    ['_fbp', '_fbc'].forEach(function (nome) {
      [host, '.' + pai].forEach(function (dominio) {
        document.cookie = nome + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + dominio;
      });
      document.cookie = nome + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    });
  }

  /* ---------- evento "Lead": clique em qualquer botão de WhatsApp ---------- */
  document.addEventListener('click', function (e) {
    if (!window.fbq) return;                                   // sem consentimento = sem evento
    var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (!a) return;
    window.fbq('track', 'Lead', {
      content_name: a.getAttribute('data-msg') || 'site',      // qual botão (topo, hero, preco, contato, dock)
      content_category: origem(),                              // qual anúncio/criativo trouxe a pessoa
      page: location.pathname
    });
  }, true);

  /* ---------- aviso (banner) ---------- */
  var banner = null;

  function css() {
    var raio = ESTILO === 'lp' ? '16px' : 'var(--raio, 2px)';
    var el = document.createElement('style');
    el.textContent =
      '.vt-cb{position:fixed;z-index:200;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));max-width:720px;margin-inline:auto;' +
      'background:#0B3456;color:#fff;border-radius:' + raio + ';padding:16px 18px;box-shadow:0 18px 50px -12px rgba(0,0,0,.55);' +
      'font-size:14.5px;line-height:1.5;display:flex;flex-direction:column;gap:14px;border:1px solid rgba(255,255,255,.14)}' +
      '.vt-cb[hidden]{display:none}' +
      '.vt-cb p{margin:0;color:#fff}' +
      '.vt-cb a{color:#F7BE23;text-decoration:underline}' +
      '.vt-cb__acoes{display:flex;gap:10px}' +
      '.vt-cb button{flex:1;min-height:46px;padding:10px 16px;font:inherit;font-weight:700;border-radius:' + raio + ';cursor:pointer;border:0}' +
      '.vt-cb__nao{background:transparent;color:#fff;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.55)}' +
      '.vt-cb__sim{background:#F7BE23;color:#0B3456}' +
      '.vt-cb button:focus-visible{outline:3px solid #fff;outline-offset:2px}' +
      '@media (min-width:640px){.vt-cb{flex-direction:row;align-items:center}.vt-cb__acoes{flex:none;width:300px}}';
    document.head.appendChild(el);
  }

  function montarBanner() {
    if (banner) return banner;
    css();
    banner = document.createElement('div');
    banner.className = 'vt-cb';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.hidden = true;
    banner.innerHTML =
      '<p>Usamos o <strong>Pixel da Meta</strong> para medir os nossos anúncios e mostrar a Vale Tec para quem pode se interessar. ' +
      'Só ativamos se você aceitar, e você pode mudar de ideia a qualquer momento. ' +
      '<a href="/politica-de-privacidade/">Saiba mais</a></p>' +
      '<div class="vt-cb__acoes">' +
      '<button type="button" class="vt-cb__nao">Recusar</button>' +
      '<button type="button" class="vt-cb__sim">Aceitar</button></div>';
    banner.querySelector('.vt-cb__sim').addEventListener('click', function () { decidir(true); });
    banner.querySelector('.vt-cb__nao').addEventListener('click', function () { decidir(false); });
    document.body.appendChild(banner);
    return banner;
  }

  function abrir() {
    var b = montarBanner();
    b.hidden = false;
    b.querySelector('.vt-cb__sim').focus();
  }

  function decidir(ok) {
    var jaTinhaPixel = !!window.fbq;
    gravarEscolha(ok);
    if (banner) banner.hidden = true;
    if (ok) {
      carregarPixel();
    } else if (jaTinhaPixel) {
      apagarCookiesMeta();
      location.reload();            // descarrega o script da Meta da página
    } else {
      apagarCookiesMeta();
    }
  }

  /* ---------- links "Preferências de cookies" do rodapé ---------- */
  function ligarPreferencias() {
    document.querySelectorAll('[data-cookies-wrap]').forEach(function (el) { el.hidden = false; });
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-cookies]')) abrir();
    });
  }

  /* ---------- partida ---------- */
  function iniciar() {
    ligarPreferencias();
    var escolha = lerEscolha();
    if (escolha === true) carregarPixel();
    else if (escolha === null) { montarBanner().hidden = false; }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();

  window.valeCookies = { abrir: abrir };
})();
