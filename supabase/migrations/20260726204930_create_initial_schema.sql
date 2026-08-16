-- ============================================
-- TABELAS
-- ============================================

-- USERS (perfil, ligado ao auth.users)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  headline text,
  avatar text,
  role text check (role in ('candidato','recrutador','empresa')) not null,
  company text,
  location text,
  connections integer default 0,
  about text,
  skills text[],
  education text,
  experience text,
  certifications text[],
  languages text[],
  linkedin text,
  desired_position text,
  salary_expectation text,
  birth_date date,
  marital_status text,
  portfolio text,
  github text,
  courses text[],
  achievements text[],
  online boolean default false,
  email text not null,
  phone text,
  whatsapp text,
  created_at timestamptz default now()
);

-- POSTS
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.users(id) on delete cascade,
  content text not null,
  image text,
  likes integer default 0,
  comments integer default 0,
  shares integer default 0,
  category text check (category in ('noticia','artigo','dica','evento')),
  created_at timestamptz default now()
);

-- JOBS
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text,
  type text check (type in ('CLT','PJ','Estágio','Temporário')),
  modality text check (modality in ('Presencial','Remoto','Híbrido')),
  salary text,
  description text,
  requirements text[],
  benefits text[],
  posted_by uuid references public.users(id),
  applicants integer default 0,
  posted_at timestamptz default now()
);

-- CONVERSATIONS
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  last_message_at timestamptz default now()
);

-- CONVERSATION_PARTICIPANTS
create table public.conversation_participants (
  conversation_id uuid references public.conversations(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  primary key (conversation_id, user_id)
);

-- MESSAGES
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  sender_id uuid references public.users(id),
  content text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- RLS: USERS
-- ============================================
alter table public.users enable row level security;

create policy "Perfis são públicos para autenticados"
on public.users for select
to authenticated
using (true);

create policy "Usuário cria o próprio perfil"
on public.users for insert
to authenticated
with check (auth.uid() = id);

create policy "Usuário edita o próprio perfil"
on public.users for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Usuário apaga o próprio perfil"
on public.users for delete
to authenticated
using (auth.uid() = id);

-- ============================================
-- RLS: POSTS
-- ============================================
alter table public.posts enable row level security;

create policy "Posts são públicos para autenticados"
on public.posts for select
to authenticated
using (true);

create policy "Usuário cria post como autor"
on public.posts for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Autor edita o próprio post"
on public.posts for update
to authenticated
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "Autor apaga o próprio post"
on public.posts for delete
to authenticated
using (auth.uid() = author_id);

-- ============================================
-- RLS: JOBS
-- ============================================
alter table public.jobs enable row level security;

create policy "Vagas são públicas para autenticados"
on public.jobs for select
to authenticated
using (true);

create policy "Recrutador cria vaga"
on public.jobs for insert
to authenticated
with check (
  auth.uid() = posted_by
  and exists (
    select 1 from public.users u
    where u.id = auth.uid()
    and u.role in ('recrutador', 'empresa')
  )
);

create policy "Autor edita a própria vaga"
on public.jobs for update
to authenticated
using (auth.uid() = posted_by)
with check (auth.uid() = posted_by);

create policy "Autor apaga a própria vaga"
on public.jobs for delete
to authenticated
using (auth.uid() = posted_by);

-- ============================================
-- RLS: CONVERSATIONS
-- ============================================
alter table public.conversations enable row level security;

create policy "Participante vê a conversa"
on public.conversations for select
to authenticated
using (
  exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = conversations.id
    and cp.user_id = auth.uid()
  )
);

create policy "Autenticado cria conversa"
on public.conversations for insert
to authenticated
with check (true);

create policy "Participante atualiza a conversa"
on public.conversations for update
to authenticated
using (
  exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = conversations.id
    and cp.user_id = auth.uid()
  )
);

-- ============================================
-- RLS: CONVERSATION_PARTICIPANTS
-- ============================================
alter table public.conversation_participants enable row level security;

create policy "Participante vê outros participantes"
on public.conversation_participants for select
to authenticated
using (
  exists (
    select 1 from public.conversation_participants cp2
    where cp2.conversation_id = conversation_participants.conversation_id
    and cp2.user_id = auth.uid()
  )
);

create policy "Usuário se adiciona como participante"
on public.conversation_participants for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Usuário sai da conversa"
on public.conversation_participants for delete
to authenticated
using (auth.uid() = user_id);

-- ============================================
-- RLS: MESSAGES
-- ============================================
alter table public.messages enable row level security;

create policy "Participante vê as mensagens"
on public.messages for select
to authenticated
using (
  exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = messages.conversation_id
    and cp.user_id = auth.uid()
  )
);

create policy "Participante envia mensagem"
on public.messages for insert
to authenticated
with check (
  sender_id = auth.uid()
  and exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = messages.conversation_id
    and cp.user_id = auth.uid()
  )
);

create policy "Participante marca mensagem como lida"
on public.messages for update
to authenticated
using (
  exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = messages.conversation_id
    and cp.user_id = auth.uid()
  )
);