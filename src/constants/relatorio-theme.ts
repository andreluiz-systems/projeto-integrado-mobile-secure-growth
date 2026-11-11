import { Categoria, Visao } from '@/lib/relatorio/data/types';

export const light = { bg: '#FFFFFF', ink: '#1E1A3A', mut: '#6B7280', grid: '#E4E2EE', axis: '#9A98AB', p: '#6A24D6', pl: '#F3F0FF', pb: '#CFC3F7' };
export const dark = { bg: '#14111F', ink: '#F2EFFF', mut: '#A6A3B8', grid: '#2E2A45', axis: '#6F6C88', p: '#6A24D6', pl: '#241F3D', pb: '#4A3F80' };
export type Tema = typeof light;

export const COR: Record<Categoria | 'Total', string> = {
  Mercado: '#6F3DF4', Contas: '#7B2CBF', Saldo: '#4B2BB8', Bancos: '#A34FE0', Lazer: '#8F6BFF', Transporte: '#5A189A',
  Saúde: '#9D4EDD', Educação: '#3C1A8F', Moradia: '#B28DFF', Assinaturas: '#7209B7', Restaurantes: '#C77DFF', Viagens: '#5E60CE', Total: '#6F3DF4',
};

const c = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
export const ICON: Record<Categoria, string> = {
  Mercado: `${c(8, 21, 1)}${c(19, 21, 1)}M2 2h2l2.7 12.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L22 7H5`,
  Contas: 'M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4',
  Saldo: `${c(12, 12, 9)}M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4`,
  Bancos: 'M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4z',
  Lazer: `${c(12, 12, 9)}M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01`,
  Transporte: 'M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 11h18M7 20v-3M17 20v-3',
  Saúde: 'M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z',
  Educação: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z',
  Moradia: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  Assinaturas: 'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',
  Restaurantes: 'M5 2v7a2 2 0 0 0 4 0V2M7 11v11M17 22V2c-2.5 1-4 4-4 8 0 2 1 3 4 3',
  Viagens: 'M17.8 19.2L16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2l-1.1 1.1 6.3 3.5-3 3-3-.5-1 1 4 2 2 4 1-1-.5-3 3-3 3.5 6.3z',
};

export const CATS = Object.keys(ICON) as Categoria[];
export const GASTO = CATS.filter((x) => x !== 'Saldo');
export const VIEWS: [Visao, string][] = [['bars', 'Gastos'], ['line', 'Saldo'], ['stack', 'Empilhado'], ['area', 'Área'], ['cats', 'Categorias']];
export const GCOR: Record<string, string> = { Salário: '#1D0038', 'Horas Extras': '#3A0A6E', Investimentos: '#56179B', 'Vendas Loja': '#6F22B3', Extra: '#8836CF' };
