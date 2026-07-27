// src/app/perfil/page.tsx
"use client";

import { ProfileContent } from "@/components/profile/ProfileContent";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function PerfilPage() {
  const { profile, loading } = useCurrentUser();

  if (loading) {
    return <p className="text-center py-12 text-launch-muted">Carregando...</p>;
  }

  if (!profile) {
    return <p className="text-center py-12 text-launch-muted">Perfil não encontrado.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <ProfileContent user={profile} isOwnProfile />
    </div>
  );
}