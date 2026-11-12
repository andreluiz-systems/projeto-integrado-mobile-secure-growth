import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Relatorio } from '@/lib/relatorio/data/types';
import { CATS } from '@/constants/relatorio-theme';
import { brl, rs } from '@/lib/relatorio/utils';

export async function exportarPdf({ g, s, n }: Relatorio) {
  const tot = n.itens.reduce((a, b) => a + b.v, 0);
  const html = `<html><body style="font-family:Helvetica;padding:24px;color:#1E1A3A">
  <h1>Relatório Gráfico</h1><p>${n.mes}</p>
  <h2>Gastos por categoria</h2>
  <table border="1" cellspacing="0" cellpadding="5" style="border-collapse:collapse;font-size:12px">
   <tr><th></th>${g.meses.map((m) => `<th>${m}</th>`).join('')}</tr>
   ${CATS.map((c) => `<tr><td>${c}</td>${g[c].map((v) => `<td>${rs(v)}</td>`).join('')}</tr>`).join('')}
  </table>
  <h2>Saldo x Gastos</h2>
  <p>Saldo: ${s.saldo.map(rs).join(' · ')}</p><p>Gastos: ${s.gastos.map(rs).join(' · ')}</p>
  <h2>Ganhos — ${brl(tot)}</h2>
  ${n.itens.map((x) => `<p>${x.n}: ${brl(x.v)} (${Math.round((x.v / tot) * 100)}%)</p>`).join('')}
  </body></html>`;
  const { uri } = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(uri, { mimeType: 'application/pdf', UTI: 'com.adobe.pdf' });
}
