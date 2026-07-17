import { users, currentUser, CURRENT_USER_ID } from "./seed";
import type { User, UserRole } from "@/types";

export { currentUser, CURRENT_USER_ID };

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getAllUsers(): User[] {
  return users;
}

export function getContacts(currentUserId: string = CURRENT_USER_ID): User[] {
  return users.filter((u) => u.id !== currentUserId);
}

export function getContactsFiltered(
  search?: string,
  role?: UserRole | "todos"
): User[] {
  let contacts = getContacts();

  if (role && role !== "todos") {
    contacts = contacts.filter((c) => c.role === role);
  }

  if (search) {
    const q = search.toLowerCase();
    contacts = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.headline.toLowerCase().includes(q) ||
        c.company?.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }

  return contacts;
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Agora";
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatChatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return "Hoje";
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Ontem";
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}
