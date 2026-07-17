"use client";

import Link from "next/link";
import { Mail, MessageCircle, Phone, Users } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { openConversation } from "@/lib/actions";
import { getContactsFiltered } from "@/lib/utils";
import type { User, UserRole } from "@/types";
const RECRUITER_IMAGE = "/job4.png";

const roleFilters: { value: UserRole | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "candidato", label: "Candidatos" },
  { value: "recrutador", label: "Recrutadores" },
  { value: "empresa", label: "Empresas" },
];

function ContactCard({ contact }: { contact: User }) {
  const whatsapp = contact.whatsapp ?? contact.phone;

  return (
    <Link
      href={`/perfil/${contact.id}`}
      className="block card-glass rounded-sm hover:border-launch-gold/30 transition-all duration-300 p-4 sm:p-5"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex justify-center sm:block">
          <Avatar user={contact} size="lg" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-launch-white text-base break-words">{contact.name}</h3>
              <p className="text-sm text-launch-muted break-words">{contact.headline}</p>
              {contact.company && (
                <p className="text-xs text-launch-gold mt-1 break-words">{contact.company}</p>
              )}
            </div>
            <span className="self-start text-[10px] font-medium px-2 py-1 rounded-full bg-slate-100 text-launch-soft capitalize shrink-0">
              {contact.role}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <a
              href={`mailto:${contact.email}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-xs sm:text-sm text-launch-muted hover:text-launch-gold break-all"
            >
              <Mail className="w-4 h-4 shrink-0" />
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-xs sm:text-sm text-launch-muted hover:text-launch-gold"
            >
              <Phone className="w-4 h-4 shrink-0" />
              {contact.phone}
            </a>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <form action={openConversation} onClick={(e) => e.stopPropagation()}>
              <input type="hidden" name="participantId" value={contact.id} />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-launch-gold hover:bg-launch-gold-bright rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Mensagem
              </button>
            </form>
            <a
              href={`https://wa.me/55${whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full hover:bg-emerald-500/20"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${contact.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-launch-gold border border-launch-gold/30 rounded-full hover:bg-launch-gold/10"
            >
              <Phone className="w-4 h-4" />
              Ligar
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface ContactsListProps {
  search?: string;
  role?: UserRole | "todos";
}

export function ContactsList({ search, role = "todos" }: ContactsListProps) {
  const contacts = getContactsFiltered(search, role);

  return (
    <>
      <form action="/contatos" method="GET" className="card-glass rounded-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            name="q"
            defaultValue={search}
            placeholder="Buscar contatos..."
            className="flex-1 px-4 py-2.5 border border-launch-border rounded-lg text-sm bg-launch-elevated text-launch-white placeholder:text-launch-muted/60 focus:outline-none focus:ring-2 focus:ring-launch-gold/30"
          />
          <select
            name="role"
            defaultValue={role}
            className="w-full md:w-52 px-4 py-2.5 border border-launch-border rounded-lg text-sm bg-launch-elevated text-launch-white focus:outline-none focus:ring-2 focus:ring-launch-gold/30"
          >
            {roleFilters.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full md:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-launch-gold rounded-full hover:bg-launch-gold-bright"
          >
            Buscar
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="card-glass rounded-sm py-12 text-center">
          <p className="text-launch-muted">Nenhum contato encontrado.</p>
        </div>
      )}
    </>
  );
}

export function ContactsHeader() {
  return (
   <div className="relative overflow-hidden rounded-sm border border-launch-border bg-blue-900/20 p-4 sm:p-6 mb-6 animate-fade-up" style={{ backgroundImage: `url(${RECRUITER_IMAGE})` }}>
     <div className="absolute inset-0 hero-mesh opacity-40 pointer-events-none" />
      <div className="relative flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-launch-gold/15 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-xl sm:text-3xl font-bold  text-white uppercase tracking-wide">Contatos</h1>
          <p className="text-launch-muted text-white text-[10px] sm:text-[20px]">
            Sua rede de candidatos, recrutadores e empresas
          </p>
        </div>
      </div>
    </div>
  );
}
