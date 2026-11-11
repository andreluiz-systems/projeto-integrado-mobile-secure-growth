import React from 'react';
import { G, Rect, Text as T } from 'react-native-svg';
import { GastosPorMes } from '@/lib/relatorio/data/types';
import { COR, Tema } from '@/constants/relatorio-theme';
import { Chave, escala, rs, serie } from '@/lib/relatorio/utils';
import { Canvas, Grid, Legend, VW } from './chartKit';

export default function StackedChart({ g, keys, t, w }: { g: GastosPorMes; keys: Chave[]; t: Tema; w: number }) {
  const tot = g.meses.map((_, i) => keys.reduce((a, k) => a + serie(g, k)[i], 0));
  const { step, top } = escala(Math.max(...tot));
  const H0 = 14, CH = 230;
  const Y = (v: number) => H0 + (1 - v / top) * CH;
  return (
    <>
      <Canvas w={w} vh={CH + 40}>
        <Grid top={top} step={step} W={VW} H0={H0} CH={CH} t={t} />
        {g.meses.map((m, i) => {
          const x = 62 + i * 62;
          let acc = 0;
          return (
            <G key={m}>
              {keys.map((k) => {
                const v = serie(g, k)[i];
                const y = Y(acc + v);
                const h = Y(acc) - y;
                acc += v;
                return <Rect key={k} x={x} y={y} width={32} height={h} fill={COR[k]} stroke={t.bg} strokeWidth={1} />;
              })}
              <T x={x + 16} y={Y(acc) - 5} fontSize={8} fill={t.mut} textAnchor="middle">{rs(acc)}</T>
              <T x={x + 16} y={H0 + CH + 18} fontSize={9} fill={t.mut} textAnchor="middle">{m}</T>
            </G>
          );
        })}
      </Canvas>
      <Legend t={t} items={keys.map((k) => ({ n: k, c: COR[k] }))} />
    </>
  );
}
