import { useEffect, useState } from 'react';
import { relatorioRepository } from '@/lib/relatorio/data/repository';
import { Relatorio } from '@/lib/relatorio/data/types';

export function useRelatorio() {
  const [dados, setDados] = useState<Relatorio | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  useEffect(() => {
    relatorioRepository.carregar().then(setDados).catch((e) => setErro(String(e?.message ?? e)));
  }, []);
  return { dados, erro };
}
