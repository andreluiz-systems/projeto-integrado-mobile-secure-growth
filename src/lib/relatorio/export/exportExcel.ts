import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as XLSX from 'xlsx';
import { Relatorio } from '@/lib/relatorio/data/types';
import { CATS } from '@/constants/relatorio-theme';

export async function exportarExcel({ g, s, n }: Relatorio) {
  const tot = n.itens.reduce((a, b) => a + b.v, 0);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Mês', ...CATS], ...g.meses.map((m, i) => [m, ...CATS.map((c) => g[c][i])])]), 'Gastos');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Período', 'Saldo', 'Gastos'], ...s.saldo.map((v, i) => [i + 1, v, s.gastos[i]])]), 'Saldo');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Categoria', 'Valor (R$)', '%'], ...n.itens.map((x) => [x.n, x.v, Math.round((x.v / tot) * 100)]), ['Total', tot, 100]]), 'Ganhos');

  const bytes = new Uint8Array(XLSX.write(wb, { bookType: 'xlsx', type: 'array' }));
  const file = new File(Paths.cache, 'relatorio-grafico.xlsx');
  file.create({ overwrite: true });
  file.write(bytes);
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri, { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }
}
