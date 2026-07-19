import { AuthModal } from "@/components/auth/AuthModal";
import { RegistroForm } from "@/components/auth/RegistroForm";

export default async function RegistroModal({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const hintedRole = role === "member" || role === "recruiter" ? role : null;

  return (
    <AuthModal eyebrow="Crie sua conta" title="Complete seu cadastro">
      <RegistroForm hintedRole={hintedRole} />
    </AuthModal>
  );
}
