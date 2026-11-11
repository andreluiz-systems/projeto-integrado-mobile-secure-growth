import { Relatorio } from './types';

export const mockRelatorio: Relatorio = {
  g: {
    meses: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI'],
    Mercado: [900, 700, 600, 1050, 890],
    Contas: [625, 380, 815, 540, 190],
    Saldo: [450, 520, 300, 780, 410],
    Bancos: [200, 150, 260, 310, 180],
    Lazer: [240, 310, 180, 420, 350],
    Transporte: [210, 190, 230, 260, 240],
    Saúde: [120, 90, 310, 140, 100],
    Educação: [350, 350, 350, 350, 350],
    Moradia: [800, 800, 800, 800, 800],
    Assinaturas: [89, 89, 119, 119, 119],
    Restaurantes: [280, 330, 260, 390, 310],
    Viagens: [0, 0, 450, 0, 620],
  },
  s: {
    saldo: [0, 2100, 2800, 3000, 3400, 4150, 3700, 3700, 3000, 4300],
    gastos: [0, 2100, 3000, 2500, 3100, 3650, 4300, 4300, 4300, 300],
  },
  n: {
    mes: 'JANEIRO 2026',
    itens: [
      { n: 'Salário', v: 2250 },
      { n: 'Horas Extras', v: 2100 },
      { n: 'Investimentos', v: 1575 },
      { n: 'Vendas Loja', v: 825 },
      { n: 'Extra', v: 750 },
    ],
  },
};
