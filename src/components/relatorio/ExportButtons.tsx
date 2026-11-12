import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { Relatorio } from '@/lib/relatorio/data/types';
import { exportarExcel } from '@/lib/relatorio/export/exportExcel';
import { exportarPdf } from '@/lib/relatorio/export/exportPdf';
import { Tema } from '@/constants/relatorio-theme';

export default function ExportButtons({ dados, t }: { dados: Relatorio; t: Tema }) {
  const [busy, setBusy] = useState<'pdf' | 'xls' | null>(null);
  const run = (tipo: 'pdf' | 'xls') => async () => {
    try {
      setBusy(tipo);
      await (tipo === 'pdf' ? exportarPdf(dados) : exportarExcel(dados));
    } catch (e: any) {
      Alert.alert('Não foi possível exportar', String(e?.message ?? e));
    } finally {
      setBusy(null);
    }
  };
  const btn = (tipo: 'pdf' | 'xls', label: string) => (
    <Pressable onPress={run(tipo)} disabled={!!busy}
      style={{ flex: 1, height: 36, borderRadius: 18, backgroundColor: t.p, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, opacity: busy && busy !== tipo ? 0.5 : 1 }}>
      {busy === tipo ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontSize: 13, fontWeight: '500' }}>{label}  ⬇</Text>}
    </Pressable>
  );
  return (
    <View style={{ marginTop: 34, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: '500', color: t.ink, marginBottom: 16 }}>Relatório Gráfico</Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {btn('pdf', 'Exporta PDF')}
        {btn('xls', 'Exporta Excel')}
      </View>
    </View>
  );
}
