import { AuthModal } from "@/components/auth/AuthModal";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginModal({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <AuthModal eyebrow="Bem-vindo de volta" title="Entre na sua conta">
      <LoginForm callbackUrl={callbackUrl || "/"} />
    </AuthModal>
  );
}
