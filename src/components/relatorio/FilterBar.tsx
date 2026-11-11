import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Categoria } from '@/lib/relatorio/data/types';
import { CATS, Tema } from '@/constants/relatorio-theme';

type Props = { t: Tema; open: boolean; sel: Categoria[]; desativado: boolean; onToggleOpen: () => void; onToggle: (c: Categoria) => void; onClear: () => void };

export default function FilterBar({ t, open, sel, desativado, onToggleOpen, onToggle, onClear }: Props) {
  const n = sel.length;
  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center', opacity: desativado ? 0.4 : 1 }} pointerEvents={desativado ? 'none' : 'auto'}>
        <Pressable onPress={onToggleOpen} accessibilityLabel="Filtros"
          style={{ width: 54, height: 34, borderRadius: 20, borderWidth: 1, borderColor: open ? t.p : t.pb, backgroundColor: open ? t.p : t.pl, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={20} height={14} viewBox="0 0 20 14">
            <Path d="M2 2h16M5 7h10M8 12h4" stroke={open ? '#fff' : t.p} strokeWidth={2.2} strokeLinecap="round" />
          </Svg>
          {n > 0 && (
            <View style={{ position: 'absolute', top: -6, right: -4, minWidth: 17, height: 17, borderRadius: 9, backgroundColor: '#1E1A3A', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }}>
              <Text style={{ color: '#fff', fontSize: 10 }}>{n}</Text>
            </View>
          )}
        </Pressable>
        {open && CATS.map((c) => {
          const on = sel.includes(c);
          return (
            <Pressable key={c} onPress={() => onToggle(c)}
              style={{ height: 32, paddingHorizontal: 13, borderRadius: 20, borderWidth: 1, borderColor: on ? t.p : t.pb, backgroundColor: on ? t.p : t.pl, justifyContent: 'center' }}>
              <Text style={{ fontSize: 12, color: on ? '#fff' : t.p }}>{c}</Text>
            </Pressable>
          );
        })}
      </View>
      {n > 0 && !desativado && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontSize: 12, color: t.mut }}>{n} {n > 1 ? 'filtros ativos' : 'filtro ativo'}</Text>
          <Pressable onPress={onClear}><Text style={{ fontSize: 12, color: t.p, fontWeight: '500' }}>Limpar</Text></Pressable>
        </View>
      )}
    </View>
  );
}
