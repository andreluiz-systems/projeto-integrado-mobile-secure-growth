import { supabase } from '@/lib/supabase'; // client do Supabase do projeto
import { Categoria, RelatorioRepository } from './types';

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const CATS: Categoria[] = ['Mercado', 'Contas', 'Saldo', 'Bancos', 'Lazer', 'Transporte', 'Saúde', 'Educação', 'Moradia', 'Assinaturas', 'Restaurantes', 'Viagens'];

export const supabaseRepository: RelatorioRepository = {
  async carregar() {
    const [gastos, saldos, ganhos] = await Promise.all([
      supabase.from('gastos_mensais').select('mes,categoria,valor').order('mes'),
      supabase.from('saldo_periodos').select('periodo,saldo,gastos').order('periodo'),
      supabase.from('ganhos').select('mes_ref,categoria,valor'),
    ]);
    const erro = gastos.error || saldos.error || ganhos.error;
    if (erro) throw erro;

    const usados = Math.max(...(gastos.data ?? []).map((r) => r.mes), 1);
    const g: any = { meses: MESES.slice(0, usados) };
    CATS.forEach((c) => (g[c] = Array(usados).fill(0)));
    (gastos.data ?? []).forEach((r) => (g[r.categoria][r.mes - 1] += Number(r.valor)));

    const mesRef = ganhos.data?.[0]?.mes_ref ?? '';
    return {
      g,
      s: {
        saldo: (saldos.data ?? []).map((r) => Number(r.saldo)),
        gastos: (saldos.data ?? []).map((r) => Number(r.gastos)),
      },
      n: {
        mes: String(mesRef),
        itens: (ganhos.data ?? []).map((r) => ({ n: r.categoria, v: Number(r.valor) })),
      },
    };
  },
};
