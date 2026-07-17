import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { getConversations } from "@/lib/store";
import { CURRENT_USER_ID } from "@/lib/seed";
import { getUserById, formatTime } from "@/lib/utils";
import type { Conversation } from "@/types";

function getOtherParticipant(conv: Conversation) {
  const otherId = conv.participantIds.find((id) => id !== CURRENT_USER_ID);
  return otherId ? getUserById(otherId) : undefined;
}

function getLastMessage(conv: Conversation) {
  return conv.messages[conv.messages.length - 1];
}

function getUnread(conv: Conversation) {
  return conv.messages.filter((m) => m.senderId !== CURRENT_USER_ID && !m.read).length;
}

export function ConversationList({ activeId }: { activeId?: string }) {
  const conversations = getConversations();

  return (
    <div className="w-full md:w-[380px] lg:w-[420px] xl:w-[450px] bg-launch-surface border-r border-launch-border flex flex-col min-h-0">
      <div className="bg-gradient-to-r from-launch-gold to-launch-ink p-4 sm:p-5 shrink-0 border-b border-launch-border">
        <h2 className="font-display text-white font-semibold text-lg sm:text-xl uppercase tracking-wide">
          Mensagens
        </h2>
        <p className="text-launch-muted text-xs sm:text-sm mt-1">Canal Launch</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const other = getOtherParticipant(conv);
          if (!other) return null;
          const lastMsg = getLastMessage(conv);
          const unread = getUnread(conv);
          const isActive = conv.id === activeId;

          return (
            <Link
              key={conv.id}
              href={`/mensagens/${conv.id}`}
              className={`flex items-center gap-3 px-3 sm:px-4 py-3 border-b border-launch-border transition-colors hover:bg-slate-100 ${
                isActive ? "bg-launch-gold/10 border-l-4 border-l-launch-gold" : ""
              }`}
            >
              <Avatar user={other} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-sm text-launch-white truncate">{other.name}</span>
                  {lastMsg && (
                    <span className="text-[10px] sm:text-xs text-launch-muted shrink-0">
                      {formatTime(lastMsg.timestamp)}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-launch-muted truncate mt-0.5">
                  {lastMsg?.content ?? "Nova conversa"}
                </p>
              </div>
              {unread > 0 && (
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-launch-gold text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </Link>
          );
        })}

        {conversations.length === 0 && (
          <div className="p-8 text-center text-launch-muted">
            <p className="text-sm">Nenhuma conversa encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}
