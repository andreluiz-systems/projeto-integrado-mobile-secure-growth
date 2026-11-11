import React from 'react';
import { Circle, G, Polyline, Text as T } from 'react-native-svg';
import { Ganhos } from '@/lib/relatorio/data/types';
import { GCOR, Tema } from '@/constants/relatorio-theme';
import { brl } from '@/lib/relatorio/utils';
import { Canvas, Legend } from './chartKit';

// posição das linhas de chamada (cotovelo x/y e fim), na ordem horária a partir do topo
const RING: [string, { x: number; y: number; e: number }][] = [
  ['Horas Extras', { x: 278, y: 72, e: 384 }],
  ['Investimentos', { x: 272, y: 208, e: 384 }],
  ['Vendas Loja', { x: 184, y: 274, e: 344 }],
  ['Extra', { x: 112, y: 208, e: 8 }],
  ['Salário', { x: 112, y: 72, e: 8 }],
];

export default function GainsDonut({ n, t, w }: { n: Ganhos; t: Tema; w: number }) {
  const tot = n.itens.reduce((a, b) => a + b.v, 0);
  const cx = 195, cy = 150, r = 69, C = 2 * Math.PI * r;
  let off = 0, a0 = 0;
  return (
    <>
      <Canvas w={w} vh={310}>
        {RING.map(([nome, L]) => {
          const v = n.itens.find((x) => x.n === nome)?.v ?? 0;
          const f = v / tot, len = f * C, ang = (a0 + f / 2) * 2 * Math.PI;
          const dx = cx + r * Math.sin(ang), dy = cy - r * Math.cos(ang), mid = (L.x + L.e) / 2;
          const el = (
            <G key={nome}>
              <Circle cx={cx} cy={cy} r={r} fill="none" stroke={GCOR[nome]} strokeWidth={30}
                strokeDasharray={`${len - 1.5} ${C - len + 1.5}`} strokeDashoffset={-off}
                rotation={-90} originX={cx} originY={cy} />
              <Polyline points={`${dx},${dy} ${L.x},${L.y} ${L.e},${L.y}`} fill="none" stroke="#999" strokeWidth={0.8} />
              <Circle cx={dx} cy={dy} r={2.4} fill="#999" />
              <T x={mid} y={L.y - 17} fontSize={14} fontWeight="bold" fill="#6F3DF4" textAnchor="middle">{`${Math.round(f * 100)}%`}</T>
              <T x={mid} y={L.y - 5} fontSize={9.5} fill="#6F3DF4" textAnchor="middle">{`(${brl(v)})`}</T>
            </G>
          );
          off += len; a0 += f;
          return el;
        })}
        <T x={cx} y={cy - 8} fontSize={15} fontWeight="bold" fill={t.ink} textAnchor="middle">Ganhos</T>
        <T x={cx} y={cy + 9} fontSize={12} fill="#6F3DF4" textAnchor="middle">{brl(tot)}</T>
        <T x={cx} y={cy + 24} fontSize={8.5} fontWeight="bold" fill={t.ink} textAnchor="middle">{n.mes}</T>
      </Canvas>
      <Legend t={t} items={n.itens.map((x) => ({ n: x.n, c: GCOR[x.n] }))} />
    </>
  );
}
