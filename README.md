# Secure Growth

Aplicativo mobile de controle financeiro pessoal. O usuário registra receitas e despesas, organiza os gastos por categoria e acompanha a saúde financeira em um dashboard.

Projeto Integrador do curso de **Engenharia de Software** da **UNICEPLAC** (Centro Universitário do Planalto Central Apparecido dos Santos).

> **Status:** em desenvolvimento (baseline inicial).

## Sobre o projeto

O Secure Growth ajuda pessoas a entender para onde vai o próprio dinheiro. A ideia central é reunir em um só lugar contas, categorias, transações e orçamentos, com autenticação segura e dados isolados por usuário.

### Telas e funcionalidades

| Tela / recurso | Situação |
|---|---|
| Login | Implementada |
| Cadastro | Implementada |
| Dashboard | Implementada (base) |
| Resumo Mensal | Planejada |
| Alertas e Lembretes | Planejada |
| Demais telas do protótipo (Figma) | Em desenvolvimento pela equipe |

### Modelo de dados

O banco de dados é organizado em cinco tabelas principais: **usuários**, **contas**, **categorias**, **transações** e **orçamentos**.

## Tecnologias

- **React Native** com **TypeScript**
- **Expo** (Expo Router para navegação baseada em arquivos)
- **Supabase** como Backend-as-a-Service: autenticação, API sobre **PostgreSQL** e *Row Level Security* (RLS)
- **Git e GitHub** para versionamento, com fluxo baseado em branches e Pull Requests

## Estrutura do repositório

```
.
├── .github/          Templates de Pull Request
├── assets/           Imagens, ícones e logos
├── docs/             Documentação (wireframes, casos de uso, diagramas, regras de negócio)
├── src/
│   ├── app/          Telas e rotas (Expo Router)
│   ├── components/   Componentes reutilizáveis
│   ├── constants/    Constantes e tema
│   ├── hooks/        Hooks customizados
│   └── lib/          Integrações (cliente do Supabase)
├── tests/            Testes
├── .env.example      Modelo das variáveis de ambiente
├── app.json          Configuração do Expo
└── package.json      Dependências e scripts
```

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- [Git](https://git-scm.com/)
- App **Expo Go** no celular (iOS ou Android), ou um navegador para testar a versão web

### Passo a passo

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/andreluiz-systems/projeto-integrado-mobile-secure-growth.git
   cd projeto-integrado-mobile-secure-growth
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o arquivo `.env` a partir do modelo:

   ```bash
   cp .env.example .env
   ```

   No Windows (PowerShell): `Copy-Item .env.example .env`

4. Preencha o `.env` com os dados do projeto no Supabase (**Connect** ou **Project Settings > API Keys**):

   ```
   EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica
   ```

   Use apenas a chave pública (*anon* ou *publishable*). **Nunca** use a `service_role` ou a *secret key*, e **nunca** envie o `.env` para o GitHub (ele já está no `.gitignore`).

5. Inicie o servidor de desenvolvimento:

   ```bash
   npx expo start
   ```

6. Abra o app:
   - **Celular:** escaneie o QR code com o Expo Go (no iPhone, use a câmera do celular). O celular e o computador precisam estar na mesma rede.
   - **Navegador:** pressione `w` no terminal.

> **Atenção:** a versão do **Expo Go** precisa ser compatível com a versão do SDK do Expo usada no projeto (veja `expo` no `package.json`). Se o Expo Go informar incompatibilidade, alinhe as versões antes de testar no celular.

## Fluxo de trabalho (Git Flow simplificado)

| Branch | Função |
|---|---|
| `main` | Reflete o ambiente de produção. Só recebe código testado e aprovado. |
| `develop` | Branch de integração. Onde todas as novas features se encontram. |
| `feature/<nome-da-tarefa>` | Desenvolvimento de funcionalidades. Ex.: `feature/tela-resumo-mensal` |
| `docs/<assunto>` | Documentação. Ex.: `docs/diagrama-classes` |

Regras da equipe:

1. Nunca faça commit direto na `main` ou na `develop`. As duas são protegidas.
2. Crie sua branch a partir da `develop`, trabalhe nela e envie para o GitHub.
3. Abra um **Pull Request para a `develop`** e preencha o template.
4. Outro membro revisa e aprova antes do merge.
5. Não altere o `package.json` nem a versão do Expo sem avisar o líder.
6. Rode o app antes de abrir o PR.

### Padrão de commits

Mensagens no formato `tipo: descrição curta`:

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `style` | Formatação, sem mudar a lógica |
| `refactor` | Reorganização de código |
| `test` | Testes |
| `chore` | Configuração e manutenção |

## Equipe

| Integrante | Papel |
|---|---|
| André Luiz Pereira de Sousa | Líder do grupo (Tech Lead) |
| João Vitor Oliveira Miranda | Desenvolvimento |
| João Pedro Pereira Albuquerque | Desenvolvimento |
| Raí Lugano Louseiro Angelim | Desenvolvimento |
| Alexandre Firmo Pereira Silva | Desenvolvimento |
| Luiz Eduardo Ferreira Trindade | Desenvolvimento |
| Daniel do Nascimento Pires | Desenvolvimento |
| Vitor Hugo Pereira de Oliveira | Desenvolvimento |
| Mathaus | Desenvolvimento |
| Vinicius Lima | Desenvolvimento |

## Contexto acadêmico

Trabalho em grupo do Projeto Integrador, curso de Engenharia de Software, UNICEPLAC, 2026.
