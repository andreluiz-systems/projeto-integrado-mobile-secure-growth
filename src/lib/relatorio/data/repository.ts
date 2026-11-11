import { mockRelatorio } from './mock';
import { RelatorioRepository } from './types';

/**
 * Camada de dados da tela. Hoje usa dados de exemplo.
 * Para usar o banco: importe `supabaseRepository` de './repository.supabase'
 * e troque o export abaixo.
 */
export const relatorioRepository: RelatorioRepository = {
  async carregar() {
    return mockRelatorio;
  },
};
