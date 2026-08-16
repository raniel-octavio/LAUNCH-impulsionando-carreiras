-- ============================================
-- Objetivo: viabilizar a exclusão de conta (LGPD Art. 18, direito
-- de eliminação) sem travar por causa de foreign keys nem apagar
-- histórico de mensagens da OUTRA pessoa na conversa.
-- ============================================

-- ------------------------------------------------
-- JOBS: ao excluir o recrutador/empresa, apaga as vagas dele junto
-- ------------------------------------------------
alter table public.jobs
  drop constraint if exists jobs_posted_by_fkey;

alter table public.jobs
  add constraint jobs_posted_by_fkey
  foreign key (posted_by)
  references public.users(id)
  on delete cascade;

-- ------------------------------------------------
-- MESSAGES: ao excluir o usuário, a mensagem continua existindo
-- (a outra pessoa da conversa não perde o histórico), mas o
-- sender_id vira NULL -- ou seja, fica anonimizada.
-- ------------------------------------------------
alter table public.messages
  drop constraint if exists messages_sender_id_fkey;

alter table public.messages
  add constraint messages_sender_id_fkey
  foreign key (sender_id)
  references public.users(id)
  on delete set null;
