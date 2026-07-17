import { getUsers, CURRENT_USER_ID } from "@/lib/store";
import { notFound } from "next/navigation";
import { CurriculoLayout } from "@/components/curriculoLayout/CurriculoLayout";

export default function CurriculoPage() {
  const user = getUsers().find(u => u.id === CURRENT_USER_ID);
  if (!user) notFound();
  return <CurriculoLayout user={user} />;
}
