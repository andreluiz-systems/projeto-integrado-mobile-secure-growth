import React, { useState } from 'react';
import { Circle, G, Line, Polyline, Rect, Text as T } from 'react-native-svg';
import { SaldoSerie } from '@/lib/relatorio/data/types';
import { Tema } from '@/constants/relatorio-theme';
import { brl } from '@/lib/relatorio/utils';
import { Canvas, Legend } from './chartKit';

const X = [66, 93, 123, 155, 184, 212, 239, 267, 294, 322];
const Y = (v: number) => 250 - (v / 4600) * 232;
const VERDE = '#16A22A', VERM = '#FF0000';

export default function LineChart({ s, t, w }: { s: SaldoSerie; t: Tema; w: number }) {
  const [i, setI] = useState(1);
  const pts = (a: number[]) => a.map((v, k) => `${X[k]},${Y(v)}`).join(' ');
  const last = s.saldo.length - 1;
  const ys = Y(s.saldo[i]), yg = Y(s.gastos[i]);
  const hi = s.saldo[i] >= s.gastos[i];
  const px0 = i <= 2 ? X[i] + 8 : X[i] - 66;
  const pill = (y: number, nome: string, cor: string, v: number) => (
    <G>
      <Rect x={px0} y={y} width={58} height={20} rx={6} fill={t.pl} stroke={cor} strokeOpacity={0.5} strokeWidth={0.7} />
      <T x={px0 + 29} y={y + 8} fontSize={5.5} fill={cor} textAnchor="middle">{nome}</T>
      <T x={px0 + 29} y={y + 16} fontSize={6.5} fill={cor} textAnchor="middle">{brl(v)}</T>
    </G>
  );
  return (
    <>
      <Canvas w={w} vh={290}>
        {X.slice(1).map((x) => <Line key={x} x1={x} x2={x} y1={10} y2={250} stroke={t.grid} />)}
        <Line x1={66} x2={66} y1={10} y2={272} stroke={t.axis} strokeWidth={1.5} />
        <Line x1={30} x2={376} y1={250} y2={250} stroke={t.axis} strokeWidth={1.5} />
        <Polyline points={pts(s.gastos)} fill="none" stroke={VERM} strokeWidth={2} strokeLinejoin="round" />
        <Polyline points={pts(s.saldo)} fill="none" stroke={VERDE} strokeWidth={2} strokeLinejoin="round" />
        <Circle cx={X[last]} cy={Y(s.saldo[last])} r={4} fill={VERDE} />
        <Circle cx={X[last]} cy={Y(s.gastos[last])} r={4} fill={VERM} />
        <Circle cx={X[i]} cy={ys} r={3} fill={VERDE} stroke={t.bg} />
        <Circle cx={X[i]} cy={yg} r={3} fill={VERM} stroke={t.bg} />
        {pill(hi ? ys - 25 : ys + 5, 'SALDO', VERDE, s.saldo[i])}
        {pill(hi ? yg + 5 : yg - 25, 'GASTOS', VERM, s.gastos[i])}
        {X.map((x, k) => <Rect key={k} x={x - 13} y={0} width={26} height={272} fill="transparent" onPress={() => setI(k)} />)}
      </Canvas>
      <Legend t={t} items={[{ n: 'Saldo', c: VERDE }, { n: 'Gastos', c: VERM }]} />
    </>
  );
}
