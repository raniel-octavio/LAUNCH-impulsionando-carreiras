import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { sendMessage } from "@/lib/actions";
import { getConversationById, markConversationAsRead } from "@/lib/store";
import { CURRENT_USER_ID } from "@/lib/seed";
import { getUserById, formatTime, formatChatDate } from "@/lib/utils";

interface ChatViewProps {
  conversationId: string;
}

export function ChatView({ conversationId }: ChatViewProps) {
  markConversationAsRead(conversationId, CURRENT_USER_ID);

  const conv = getConversationById(conversationId);

  if (!conv) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center text-launch-muted">
        Conversa não encontrada.
      </div>
    );
  }

  const otherId = conv.participantIds.find((id) => id !== CURRENT_USER_ID);
  const otherUser = otherId ? getUserById(otherId) : undefined;
  if (!otherUser) return null;

  return (
    <div className="flex flex-col h-full min-h-0 bg-launch-ink">
      <div className="bg-launch-surface border-b border-launch-border">
        <div className="px-3 sm:px-4 py-3 flex items-center gap-3">
          <Link href="/mensagens" className="md:hidden text-launch-white flex items-center justify-center shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Avatar user={otherUser} size="sm" />
          <div className="min-w-0 flex-1">
            <h3 className="text-launch-white font-medium text-sm sm:text-base truncate">{otherUser.name}</h3>
            <p className="text-launch-muted text-xs truncate">
              {otherUser.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 space-y-3 min-h-0 bg-launch-void">
        {conv.messages.map((msg, idx) => {
          const isMine = msg.senderId === CURRENT_USER_ID;
          const showDate =
            idx === 0 || formatChatDate(msg.timestamp) !== formatChatDate(conv.messages[idx - 1].timestamp);

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center my-3">
                  <span className="text-[10px] sm:text-xs font-medium text-launch-muted bg-launch-surface px-3 py-1 rounded-full">
                    {formatChatDate(msg.timestamp)}
                  </span>
                </div>
              )}
              <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] px-3 sm:px-3.5 py-2 rounded-2xl break-words ${
                    isMine
                      ? "bg-launch-gold text-white rounded-br-md"
                      : "bg-launch-surface text-launch-soft rounded-bl-md border border-launch-border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                  <p
                    className={`text-[10px] mt-1 text-right ${
                      isMine ? "text-white/60" : "text-launch-muted"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form action={sendMessage} className="bg-launch-surface border-t border-launch-border p-2 sm:p-3">
        <input type="hidden" name="conversationId" value={conversationId} />
        <div className="flex items-center gap-2">
          <input
            name="content"
            required
            placeholder="Digite uma mensagem..."
            className="flex-1 min-w-0 px-4 py-2.5 rounded-full border border-launch-border bg-launch-elevated text-launch-white text-sm placeholder:text-launch-muted/60 focus:outline-none focus:ring-2 focus:ring-launch-gold/30"
          />
          <button
            type="submit"
            className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-launch-gold text-white hover:bg-launch-gold-bright transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
