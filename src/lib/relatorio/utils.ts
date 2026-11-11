import { Categoria, GastosPorMes } from '@/lib/relatorio/data/types';
import { GASTO } from '@/constants/relatorio-theme';

export type Chave = Categoria | 'Total';
export const brl = (v: number) => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
export const rs = (v: number) => 'R$' + v.toLocaleString('pt-BR');

export function escala(mx: number) {
  const step = mx <= 1100 ? 100 : mx <= 2200 ? 200 : mx <= 5500 ? 500 : 1000;
  return { step, top: mx <= 1100 ? 1100 : Math.ceil(mx / step) * step };
}
export const serie = (g: GastosPorMes, k: Chave): number[] =>
  k === 'Total' ? g.meses.map((_, i) => GASTO.reduce((a, c) => a + g[c][i], 0)) : g[k];
