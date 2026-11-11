import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AreaChart from '@/components/relatorio/AreaChart';
import BarChart from '@/components/relatorio/BarChart';
import CategoryRing from '@/components/relatorio/CategoryRing';
import ExportButtons from '@/components/relatorio/ExportButtons';
import FilterBar from '@/components/relatorio/FilterBar';
import GainsBars from '@/components/relatorio/GainsBars';
import GainsDonut from '@/components/relatorio/GainsDonut';
import LineChart from '@/components/relatorio/LineChart';
import StackedChart from '@/components/relatorio/StackedChart';
import ViewDropdown from '@/components/relatorio/ViewDropdown';
import { Categoria, Visao } from '@/lib/relatorio/data/types';
import { useRelatorio } from '@/hooks/use-relatorio';
import { dark, light } from '@/constants/relatorio-theme';
import { Chave } from '@/lib/relatorio/utils';

export default function RelatorioScreen() {
  const { width } = useWindowDimensions();
  const w = width - 36;
  const { dados, erro } = useRelatorio();
  const [escuro, setEscuro] = useState(false); // começa no fundo branco
  const [abertos, setAbertos] = useState(true);
  const [sel, setSel] = useState<Categoria[]>(['Mercado']);
  const [visao, setVisao] = useState<Visao>('bars');
  const [gv, setGv] = useState<'ring' | 'bars'>('ring');
  const t = escuro ? dark : light;

  const toggle = (c: Categoria) => setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  const keys: Chave[] = sel.length ? sel : ['Total'];
  const keysStack: Chave[] = sel.length ? sel : ['Mercado', 'Contas', 'Bancos'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 48 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <Text style={{ fontSize: 28, fontWeight: '600', color: t.ink }}>Relatório Gráfico</Text>
          <Pressable onPress={() => setEscuro(!escuro)} style={{ width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: t.pb, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16 }}>{escuro ? '☀️' : '🌙'}</Text>
          </Pressable>
        </View>

        {!dados && !erro && <ActivityIndicator color={t.p} />}
        {erro && <Text style={{ color: '#d33' }}>{erro}</Text>}

        {dados && (
          <>
            <FilterBar t={t} open={abertos} sel={sel} desativado={visao === 'line'}
              onToggleOpen={() => setAbertos(!abertos)} onToggle={toggle} onClear={() => setSel([])} />
            <ViewDropdown t={t} valor={visao} onChange={setVisao} />

            {visao === 'bars' && <BarChart g={dados.g} keys={keys} t={t} />}
            {visao === 'line' && <LineChart s={dados.s} t={t} w={w} />}
            {visao === 'stack' && <StackedChart g={dados.g} keys={keysStack} t={t} w={w} />}
            {visao === 'area' && <AreaChart g={dados.g} keys={keys} t={t} w={w} />}
            {visao === 'cats' && <CategoryRing g={dados.g} sel={sel} t={t} />}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 26 }}>
              <Text style={{ fontSize: 20, fontWeight: '500', color: t.mut }}>Ganhos</Text>
              <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: t.pb, borderRadius: 16, overflow: 'hidden' }}>
                {(['ring', 'bars'] as const).map((k) => (
                  <Pressable key={k} onPress={() => setGv(k)} style={{ paddingVertical: 6, paddingHorizontal: 12, backgroundColor: gv === k ? t.p : 'transparent' }}>
                    <Text style={{ fontSize: 11, color: gv === k ? '#fff' : t.p }}>{k === 'ring' ? 'Rosca' : 'Barras'}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            {gv === 'ring' ? <GainsDonut n={dados.n} t={t} w={w} /> : <GainsBars n={dados.n} t={t} />}

            <ExportButtons dados={dados} t={t} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
