// ============================================================
// DADOS DA EMPRESA — fonte única da verdade.
// Mudou telefone, Instagram ou cidade? Muda só aqui que o site
// inteiro (botões, rodapé, SEO) acompanha.
// ============================================================

export const SITE = {
  nome: 'Vale Soluções Tecnológicas',
  marca: 'Vale Tec',
  razaoSocial: '60.499.733 ADAUTO RODRIGUES DOS SANTOS NETTO',
  cnpj: '60.499.733/0001-44',
  url: 'https://valesolucoestec.com.br',
  app: 'https://annymus.valesolucoestec.com.br', // sistema Annymus
  whatsapp: '5512988070341', // formato internacional, só números
  whatsappExibicao: '(12) 98807-0341',
  instagram: 'vale_tec_',
  email: 'vale.tec26@gmail.com',
  cidade: 'Tremembé',
  uf: 'SP',
  // Ordem da rota na seção "Onde atendemos"
  cidadesAtendidas: ['São José dos Campos', 'Taubaté', 'Tremembé', 'Pindamonhangaba'],
} as const;

/**
 * Monta o link do WhatsApp com a mensagem já escrita.
 * encodeURIComponent troca espaço por %20, "ã" por %C3%A3 etc.,
 * porque URL não aceita esses caracteres "crus".
 */
export function wa(mensagem: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
