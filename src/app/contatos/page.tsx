import { ContactsHeader, ContactsList } from "@/components/contacts/ContactsList";
import type { UserRole } from "@/types";

interface Props {
  searchParams: Promise<{ q?: string; role?: UserRole | "todos" }>;
}

export default async function ContatosPage({ searchParams }: Props) {
  const { q, role = "todos" } = await searchParams;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <ContactsHeader />
      <ContactsList search={q} role={role} />
    </div>
  );
}
