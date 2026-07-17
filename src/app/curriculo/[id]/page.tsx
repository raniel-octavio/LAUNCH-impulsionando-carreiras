import { getUsers } from "@/lib/store";
import { notFound } from "next/navigation";
import { CurriculoLayout } from "@/components/curriculoLayout/CurriculoLayout";

export default async function CurriculoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // 🔑 descompacta a Promise corretamente

  const user = getUsers().find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  return <CurriculoLayout user={user} />;
}
