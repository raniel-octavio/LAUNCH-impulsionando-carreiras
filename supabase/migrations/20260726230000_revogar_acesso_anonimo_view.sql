-- ============================================
-- Reforço: garante que a view user_public_profiles só é
-- acessível por usuários LOGADOS -- nunca por visitantes anônimos.
-- ============================================

revoke all on public.user_public_profiles from anon;
revoke all on public.user_public_profiles from public;

grant select on public.user_public_profiles to authenticated;