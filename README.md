<<<<<<< HEAD
# ALVO RH — Rede Social (Next.js)

Plataforma profissional tipo LinkedIn para a **ALVO RH**, construída com **Next.js puro**:

- **Server Components** — renderização no servidor por padrão
- **Server Actions** — mutações via formulários (`createPost`, `createJob`, `sendMessage`, etc.)
- **App Router** — rotas nativas do Next.js
- **Sem Context API** — estado gerenciado no servidor (`lib/store.ts`)

## Funcionalidades

| Rota | Descrição |
|------|-----------|
| `/` | Feed + vagas em destaque |
| `/vagas` | Listagem e publicação de vagas |
| `/contatos` | Diretório de contatos com WhatsApp, e-mail e telefone |
| `/mensagens` | Lista de conversas |
| `/mensagens/[id]` | Chat estilo WhatsApp |
| `/perfil` | Perfil do usuário logado |

## Executar

```bash
cd alvo-rh
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Arquitetura

```
src/
├── app/              # Rotas (Server Components)
├── components/       # UI (majoritariamente Server Components)
├── lib/
│   ├── actions.ts    # Server Actions
│   ├── seed.ts       # Dados iniciais
│   ├── store.ts      # Store em memória (servidor)
│   └── utils.ts      # Helpers e queries estáticas
└── types/            # Tipos TypeScript
```

## Próximos passos para produção

- Substituir `lib/store.ts` por banco de dados (PostgreSQL + Prisma)
- Adicionar autenticação (NextAuth.js)
- Persistir dados entre reinicializações do servidor
=======
# RH-Solucao-em-gestao-de-pessoas
>>>>>>> b7f70c8a65e305e5215a5aad8584080355b64dbb
