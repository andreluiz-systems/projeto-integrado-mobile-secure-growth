import React from 'react';
import { Circle, G, Polygon, Polyline, Text as T } from 'react-native-svg';
import { GastosPorMes } from '@/lib/relatorio/data/types';
import { COR, Tema } from '@/constants/relatorio-theme';
import { Chave, escala, rs, serie } from '@/lib/relatorio/utils';
import { Canvas, Grid, Legend, VW } from './chartKit';

export default function AreaChart({ g, keys, t, w }: { g: GastosPorMes; keys: Chave[]; t: Tema; w: number }) {
  const { step, top } = escala(Math.max(...keys.flatMap((k) => serie(g, k))));
  const H0 = 14, CH = 230;
  const Y = (v: number) => H0 + (1 - v / top) * CH;
  const X = (i: number) => 66 + i * 72;
  const last = g.meses.length - 1;
  return (
    <>
      <Canvas w={w} vh={CH + 40}>
        <Grid top={top} step={step} W={VW} H0={H0} CH={CH} t={t} />
        {keys.map((k) => {
          const a = serie(g, k);
          const p = a.map((v, i) => `${X(i)},${Y(v)}`).join(' ');
          return (
            <G key={k}>
              <Polygon points={`${X(0)},${Y(0)} ${p} ${X(last)},${Y(0)}`} fill={COR[k]} fillOpacity={keys.length > 3 ? 0.08 : 0.16} />
              <Polyline points={p} fill="none" stroke={COR[k]} strokeWidth={2} strokeLinejoin="round" />
              {a.map((v, i) => (
                <G key={i}>
                  <Circle cx={X(i)} cy={Y(v)} r={3} fill={COR[k]} />
                  {keys.length === 1 && <T x={X(i)} y={Y(v) - 8} fontSize={8} fill={t.mut} textAnchor="middle">{rs(v)}</T>}
                </G>
              ))}
            </G>
          );
        })}
        {g.meses.map((m, i) => (
          <T key={m} x={X(i)} y={H0 + CH + 18} fontSize={9} fill={t.mut} textAnchor="middle">{m}</T>
        ))}
      </Canvas>
      <Legend t={t} items={keys.map((k) => ({ n: k, c: COR[k] }))} />
    </>
  );
}
