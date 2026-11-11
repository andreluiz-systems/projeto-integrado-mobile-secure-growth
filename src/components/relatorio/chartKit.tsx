import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Line, Text as T } from 'react-native-svg';
import { Tema } from '@/constants/relatorio-theme';

export const VW = 390;

export const Canvas = ({ w, vh, children }: { w: number; vh: number; children: React.ReactNode }) => (
  <Svg width={w} height={(vh * w) / VW} viewBox={`0 0 ${VW} ${vh}`}>{children}</Svg>
);

export function Grid({ top, step, W, H0, CH, t }: { top: number; step: number; W: number; H0: number; CH: number; t: Tema }) {
  const ticks: number[] = [];
  for (let v = 0; v <= top; v += step) ticks.push(v);
  return (
    <>
      {ticks.map((v) => {
        const y = H0 + (1 - v / top) * CH;
        return (
          <React.Fragment key={v}>
            <Line x1={46} x2={W - 6} y1={y} y2={y} stroke={t.grid} strokeWidth={1} />
            <T x={4} y={y + 3} fontSize={8.5} fill={t.mut}>{`R$${v}`}</T>
          </React.Fragment>
        );
      })}
    </>
  );
}

export function Legend({ items, t }: { items: { n: string; c: string }[]; t: Tema }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 6 }}>
      {items.map((i) => (
        <View key={i.n} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View style={{ width: 9, height: 9, borderRadius: 2, backgroundColor: i.c }} />
          <Text style={{ fontSize: 10.5, color: t.mut }}>{i.n}</Text>
        </View>
      ))}
    </View>
  );
}
