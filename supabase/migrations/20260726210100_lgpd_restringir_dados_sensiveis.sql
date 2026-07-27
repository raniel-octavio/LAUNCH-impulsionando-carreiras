-- ============================================
-- Objetivo: dados pessoais sensíveis (email, phone, whatsapp,
-- birth_date, marital_status, salary_expectation) deixam de ser
-- visíveis por qualquer usuário autenticado.
--
-- Modelo novo:
--   - Cada usuário continua vendo TODOS os seus próprios campos.
--   - Para ver outro usuário, só os campos públicos do perfil
--     ficam disponíveis, através de uma view separada.
-- ============================================

-- 1) Restringe a tabela "users": só o dono lê a própria linha inteira
drop policy if exists "Perfis são públicos para autenticados" on public.users;

create policy "Usuário vê o próprio perfil completo"
on public.users for select
to authenticated
using (auth.uid() = id);

-- 2) View só com os campos públicos do perfil (sem dado sensível)
create or replace view public.user_public_profiles as
select
  id,
  name,
  headline,
  avatar,
  role,
  company,
  location,
  connections,
  about,
  skills,
  education,
  experience,
  certifications,
  languages,
  linkedin,
  desired_position,
  portfolio,
  github,
  courses,
  achievements,
  online
from public.users;

grant select on public.user_public_profiles to authenticated;
