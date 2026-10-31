// ============================================================
// SERVIÇOS — os cards do site saem daqui.
// Pra adicionar um serviço novo, é só copiar um objeto e editar.
// `icone` precisa existir em src/components/Icon.astro.
// `mensagem` é o texto que já vai escrito no WhatsApp.
// ============================================================

export type Modalidade = 'NO LOCAL' | 'BANCADA';

export interface Servico {
  titulo: string;
  texto: string;
  icone: string;
  mensagem: string;
  modalidades?: Modalidade[];
}

export const desenvolvimento: Servico[] = [
  {
    titulo: 'Sites institucionais',
    texto: 'Site profissional, rápido no celular e preparado pra aparecer no Google da sua região.',
    icone: 'site',
    mensagem: 'Olá! Quero orçamento de um site institucional.',
  },
  {
    titulo: 'Landing pages',
    texto: 'Página de venda focada em uma oferta, pronta pra receber tráfego de anúncio e virar contato no WhatsApp.',
    icone: 'landing',
    mensagem: 'Olá! Quero orçamento de uma landing page.',
  },
  {
    titulo: 'Sistemas sob medida',
    texto: 'Cadastro, agenda, financeiro, relatórios: o sistema que sua empresa precisa, do jeito que ela trabalha.',
    icone: 'chip',
    mensagem: 'Olá! Quero conversar sobre um sistema sob medida.',
  },
];

export const suporte: Servico[] = [
  {
    titulo: 'Formatação com backup',
    texto: 'Sistema limpo e rápido de novo, sem perder fotos, documentos e arquivos.',
    icone: 'hd',
    modalidades: ['NO LOCAL', 'BANCADA'],
    mensagem: 'Olá! Quero orçamento de formatação com backup.',
  },
  {
    titulo: 'Reparo em notebooks',
    texto: 'Diagnóstico e conserto de tela, teclado, carcaça, dobradiça e componentes.',
    icone: 'notebook',
    modalidades: ['BANCADA'],
    mensagem: 'Olá! Quero orçamento de reparo no meu notebook.',
  },
  {
    titulo: 'Planejamento e montagem de PC',
    texto: 'Peças certas pro seu uso e orçamento: trabalho, estudo ou jogos. Montado e testado.',
    icone: 'torre',
    modalidades: ['BANCADA'],
    mensagem: 'Olá! Quero planejar e montar um PC.',
  },
  {
    titulo: 'Windows e Office com licença original',
    texto: 'Instalação e ativação com licença original, sem risco de bloqueio ou vírus.',
    icone: 'escudo',
    modalidades: ['NO LOCAL', 'BANCADA'],
    mensagem: 'Olá! Quero instalar Windows/Office com licença original.',
  },
  {
    titulo: 'Restauração de arquivos',
    texto: 'Tentativa de recuperar arquivos apagados ou de HD e pendrive com defeito.',
    icone: 'restaurar',
    modalidades: ['BANCADA'],
    mensagem: 'Olá! Preciso recuperar arquivos.',
  },
  {
    titulo: 'Instalação de impressoras',
    texto: 'Impressora configurada no computador, no celular e na rede da casa ou do escritório.',
    icone: 'impressora',
    modalidades: ['NO LOCAL'],
    mensagem: 'Olá! Quero instalar uma impressora.',
  },
  {
    titulo: 'Limpeza de hardware',
    texto: 'Limpeza interna e troca de pasta térmica: menos barulho, menos calor, mais vida útil.',
    icone: 'vento',
    modalidades: ['BANCADA'],
    mensagem: 'Olá! Quero orçamento de limpeza do meu computador.',
  },
];
