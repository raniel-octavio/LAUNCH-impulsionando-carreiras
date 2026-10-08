"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { NotRegisteredModal } from "@/components/auth/NotRegisteredModal";

export function NotRegisteredNotice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");
  const returnTo = searchParams.get("returnTo");
  const role = searchParams.get("role");

  if (notice !== "nao-cadastrado") return null;

  function handleClose() {
    router.replace("/");
  }

  return (
    <NotRegisteredModal returnTo={returnTo} role={role} onClose={handleClose} />
  );
}