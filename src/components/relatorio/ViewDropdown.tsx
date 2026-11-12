import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Visao } from '@/lib/relatorio/data/types';
import { Tema, VIEWS } from '@/constants/relatorio-theme';

export default function ViewDropdown({ t, valor, onChange }: { t: Tema; valor: Visao; onChange: (v: Visao) => void }) {
  const [aberto, setAberto] = useState(false);
  const atual = VIEWS.find((v) => v[0] === valor)!;
  return (
    <View style={{ height: 42, marginTop: 14, marginBottom: 6, zIndex: 10 }}>
      <View style={{ position: 'absolute', left: 0, top: 0, minWidth: 140, borderWidth: 1, borderColor: t.pb, backgroundColor: t.pl, borderRadius: 22, paddingHorizontal: 16 }}>
        <Pressable onPress={() => setAberto(!aberto)} style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
          <Text style={{ fontSize: 17, fontWeight: '500', color: t.mut }}>{atual[1]}</Text>
          <Text style={{ color: t.mut }}>{aberto ? '⌃' : '⌄'}</Text>
        </Pressable>
        {aberto && VIEWS.filter((v) => v[0] !== valor).map((v) => (
          <Pressable key={v[0]} onPress={() => { onChange(v[0]); setAberto(false); }} style={{ height: 34, justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: t.mut }}>{v[1]}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
