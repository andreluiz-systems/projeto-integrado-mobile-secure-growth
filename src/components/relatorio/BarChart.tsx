import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Svg, { G, Path, Rect, Text as T } from 'react-native-svg';
import { GastosPorMes } from '@/lib/relatorio/data/types';
import { COR, ICON, Tema } from '@/constants/relatorio-theme';
import { Chave, escala, rs, serie } from '@/lib/relatorio/utils';
import { Grid, Legend, VW } from './chartKit';

type Props = { g: GastosPorMes; keys: Chave[]; t: Tema };

export default function BarChart({ g, keys, t }: Props) {
  const [tap, setTap] = useState<string | null>(null);
  const n = keys.length;
  const { step, top } = escala(Math.max(...keys.flatMap((k) => serie(g, k))));
  const bw = n === 1 ? 20 : n === 2 ? 18 : n <= 4 ? 14 : 12;
  const slot = n * (bw + 2) + 14;
  const W = Math.max(VW, 56 + 5 * slot + 10);
  const H0 = 14;
  const CH = Math.min(330, 200 + Math.max(0, n - 3) * 14); // o gráfico cresce com os filtros ativos
  const Y = (v: number) => H0 + (1 - v / top) * CH;

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Svg width={W} height={CH + 40} viewBox={`0 0 ${W} ${CH + 40}`}>
          <Grid top={top} step={step} W={W} H0={H0} CH={CH} t={t} />
          {g.meses.map((m, i) => {
            const x0 = 60 + i * slot;
            const gw = n * (bw + 2) - 2;
            return (
              <G key={m}>
                <T x={x0 + gw / 2} y={H0 + CH + 18} fontSize={9} fill={t.mut} textAnchor="middle">{m}</T>
                {keys.map((k, j) => {
                  const v = serie(g, k)[i];
                  const x = x0 + j * (bw + 2);
                  const y = Y(v);
                  const h = Math.max(Y(0) - y, 0);
                  const id = `${k}|${i}`;
                  return (
                    <G key={id} onPress={() => setTap(tap === id ? null : id)}>
                      <Rect x={x} y={y} width={bw} height={h} rx={2} fill={COR[k]} />
                      {bw >= 14 && h > 20 && k !== 'Total' && (
                        <G transform={`translate(${x + bw / 2 - 6},${y + h / 2 - 6}) scale(0.5)`}>
                          <Path d={ICON[k]} fill="none" stroke="#fff" strokeOpacity={0.9} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </G>
                      )}
                      {(n <= 2 || tap === id) && (
                        <T x={x + bw / 2} y={y - 4} fontSize={n === 1 ? 8.5 : 7} fill={t.mut} textAnchor="middle">{rs(v)}</T>
                      )}
                    </G>
                  );
                })}
              </G>
            );
          })}
        </Svg>
      </ScrollView>
      <Legend t={t} items={keys.map((k) => ({ n: k, c: COR[k] }))} />
    </>
  );
}
