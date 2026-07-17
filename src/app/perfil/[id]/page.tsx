import { ProfileContent } from "@/components/profile/ProfileContent";
import { getUserById } from "@/lib/utils";
import { CURRENT_USER_ID } from "@/lib/seed";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PerfilUsuarioPage({ params }: Props) {
  const { id } = await params;
  const user = getUserById(id);

  if (!user) {
    return <p className="text-center py-12 text-launch-muted">Perfil não encontrado.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <ProfileContent user={user} isOwnProfile={id === CURRENT_USER_ID} />
    </div>
  );
}
