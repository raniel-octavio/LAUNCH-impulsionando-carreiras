-- ============================================
-- CORREÇÃO 1: conversation_participants
-- Problema: qualquer usuário autenticado conseguia se
-- auto-adicionar em QUALQUER conversa (mesmo sem ser convidado),
-- ganhando acesso de leitura às mensagens privadas dela.
--
-- Regra nova: só permite entrar numa conversa se:
--   (a) a conversa ainda não tem nenhum participante (conversa nova, sendo criada agora)
--   (b) OU quem está inserindo já é participante dessa conversa
-- ============================================

drop policy if exists "Usuário se adiciona como participante" on public.conversation_participants;

create policy "Usuário entra em conversa nova ou é adicionado por participante"
on public.conversation_participants for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    not exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = conversation_participants.conversation_id
    )
    or
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = conversation_participants.conversation_id
      and cp.user_id = auth.uid()
    )
  )
);

-- ============================================
-- CORREÇÃO 2: messages
-- Problema: a policy de UPDATE não limitava quais colunas podiam
-- ser alteradas -- um participante podia reescrever o "content"
-- de mensagens enviadas por outra pessoa, não só marcar como lida.
--
-- Correção: usar permissão de coluna do Postgres. A partir de agora,
-- usuários autenticados só podem alterar a coluna "read".
-- ============================================

revoke update on public.messages from authenticated;
grant update (read) on public.messages to authenticated;
