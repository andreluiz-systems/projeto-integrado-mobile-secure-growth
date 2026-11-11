import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Text as T } from 'react-native-svg';
import { Categoria, GastosPorMes } from '@/lib/relatorio/data/types';
import { COR, GASTO, Tema } from '@/constants/relatorio-theme';
import { brl, serie } from '@/lib/relatorio/utils';

export default function CategoryRing({ g, sel, t }: { g: GastosPorMes; sel: Categoria[]; t: Tema }) {
  const filtrado = sel.filter((k) => k !== 'Saldo');
  const ks = filtrado.length >= 2 ? filtrado : GASTO;
  const items = ks
    .map((k) => ({ n: k as string, v: serie(g, k).reduce((a, b) => a + b, 0), c: COR[k] }))
    .filter((x) => x.v > 0)
    .sort((a, b) => b.v - a.v);
  const total = items.reduce((a, b) => a + b.v, 0);
  const cx = 100, cy = 85, r = 56, C = 2 * Math.PI * r;
  let off = 0;
  return (
    <View>
      <Svg width={220} height={187} viewBox="0 0 200 170" style={{ alignSelf: 'center' }}>
        {items.map((it) => {
          const len = (it.v / total) * C;
          const el = (
            <Circle key={it.n} cx={cx} cy={cy} r={r} fill="none" stroke={it.c} strokeWidth={24}
              strokeDasharray={`${Math.max(len - 1.5, 0)} ${C - len + 1.5}`} strokeDashoffset={-off}
              rotation={-90} originX={cx} originY={cy} />
          );
          off += len;
          return el;
        })}
        <T x={cx} y={cy - 3} fontSize={9} fill={t.mut} textAnchor="middle">Gastos JAN–MAI</T>
        <T x={cx} y={cy + 13} fontSize={12.5} fill="#6F3DF4" textAnchor="middle">{brl(total)}</T>
      </Svg>
      {items.map((it) => (
        <View key={it.n} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: t.grid }}>
          <View style={{ width: 9, height: 9, borderRadius: 2, backgroundColor: it.c }} />
          <Text style={{ flex: 1, fontSize: 12, color: t.ink }}>{it.n}</Text>
          <Text style={{ fontSize: 12, color: t.mut }}>{Math.round((it.v / total) * 100)}%</Text>
          <Text style={{ fontSize: 12, color: t.ink }}>{brl(it.v)}</Text>
        </View>
      ))}
    </View>
  );
}
