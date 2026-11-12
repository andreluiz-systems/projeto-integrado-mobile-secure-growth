export type Categoria =
  | "Mercado" | "Contas" | "Saldo" | "Bancos" | "Lazer" | "Transporte"
  | "Saúde" | "Educação" | "Moradia" | "Assinaturas" | "Restaurantes" | "Viagens";

export type GastosPorMes = { meses: string[] } & Record<Categoria, number[]>;
export type SaldoSerie = { saldo: number[]; gastos: number[] };
export type Ganho = { n: string; v: number };
export type Ganhos = { mes: string; itens: Ganho[] };
export type Relatorio = { g: GastosPorMes; s: SaldoSerie; n: Ganhos };
export type Visao = "bars" | "line" | "stack" | "area" | "cats";

export interface RelatorioRepository {
  carregar(): Promise<Relatorio>;
}
