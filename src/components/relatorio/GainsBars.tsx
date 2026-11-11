import React from 'react';
import { Text, View } from 'react-native';
import { Ganhos } from '@/lib/relatorio/data/types';
import { GCOR, Tema } from '@/constants/relatorio-theme';
import { brl } from '@/lib/relatorio/utils';

export default function GainsBars({ n, t }: { n: Ganhos; t: Tema }) {
  const it = [...n.itens].sort((a, b) => b.v - a.v);
  const tot = it.reduce((a, b) => a + b.v, 0);
  return (
    <View>
      <Text style={{ fontSize: 12, color: t.mut, marginTop: 10 }}>{`Total ${brl(tot)} · ${n.mes}`}</Text>
      {it.map((x) => (
        <View key={x.n} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14 }}>
          <Text style={{ width: 92, fontSize: 12, color: t.mut }}>{x.n}</Text>
          <View style={{ flex: 1, height: 12, borderRadius: 6, backgroundColor: t.grid, overflow: 'hidden' }}>
            <View style={{ width: `${(x.v / it[0].v) * 100}%`, height: 12, borderRadius: 6, backgroundColor: GCOR[x.n] }} />
          </View>
          <Text style={{ fontSize: 12, color: '#6A24D6' }}>{brl(x.v)}</Text>
        </View>
      ))}
    </View>
  );
}
