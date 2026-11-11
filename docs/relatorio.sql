-- Tabelas usadas pela tela Relatório Gráfico (rode no SQL Editor do Supabase)
create table if not exists gastos_mensais (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  mes int not null check (mes between 1 and 12),          -- 1 = JAN
  categoria text not null,                                -- Mercado, Contas, Bancos...
  valor numeric(12,2) not null default 0
);
create table if not exists saldo_periodos (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  periodo int not null,
  saldo numeric(12,2) not null,
  gastos numeric(12,2) not null
);
create table if not exists ganhos (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  mes_ref text not null,                                  -- ex.: 'JANEIRO 2026'
  categoria text not null,                                -- Salário, Horas Extras...
  valor numeric(12,2) not null
);

alter table gastos_mensais enable row level security;
alter table saldo_periodos enable row level security;
alter table ganhos enable row level security;

create policy "dono lê gastos" on gastos_mensais for select using (user_id = auth.uid());
create policy "dono escreve gastos" on gastos_mensais for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "dono lê saldo" on saldo_periodos for select using (user_id = auth.uid());
create policy "dono escreve saldo" on saldo_periodos for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "dono lê ganhos" on ganhos for select using (user_id = auth.uid());
create policy "dono escreve ganhos" on ganhos for all using (user_id = auth.uid()) with check (user_id = auth.uid());
