# Tela Relatório Gráfico

Rota: `/relatorio` (arquivo `src/app/relatorio.tsx`).

## Onde cada coisa está
- `src/app/relatorio.tsx`: a tela
- `src/components/relatorio/`: gráficos, filtros, botões de exportação
- `src/hooks/use-relatorio.ts`: carrega os dados
- `src/constants/relatorio-theme.ts`: cores e temas claro/escuro
- `src/lib/relatorio/`: tipos, dados (mock e Supabase), utilitários e exportação PDF/Excel
- `docs/relatorio.sql`: tabelas do banco (rodar no SQL Editor do Supabase)

## Pacotes que o projeto ainda não tem (avisar o André)
react-native-svg, expo-print, expo-sharing, expo-file-system, xlsx

## Dados
Por padrão a tela usa dados de exemplo. Para usar o banco: rodar `docs/relatorio.sql`
e trocar o export em `src/lib/relatorio/data/repository.ts` para `supabaseRepository`.
