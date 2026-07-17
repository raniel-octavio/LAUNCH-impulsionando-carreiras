import Link from "next/link";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { likePost } from "@/lib/actions";
import { getUserById, formatRelativeDate } from "@/lib/utils";
import type { Post } from "@/types";

const categoryLabels: Record<Post["category"], { label: string; color: string }> = {
  noticia: { label: "Notícia", color: "bg-sky-500/15 text-sky-300" },
  artigo: { label: "Artigo", color: "bg-violet-500/15 text-violet-300" },
  dica: { label: "Dica", color: "bg-emerald-500/15 text-emerald-300" },
  evento: { label: "Evento", color: "bg-amber-500/15 text-amber-300" },
};

export function PostCard({ post }: { post: Post }) {
  const author = getUserById(post.authorId);
  if (!author) return null;
  const cat = categoryLabels[post.category];

  return (
    <article className="w-full card-glass rounded-sm overflow-hidden hover:border-launch-border transition-colors">
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Link href={`/perfil/${author.id}`} className="shrink-0">
            <Avatar user={author} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/perfil/${author.id}`}
                className="font-semibold text-launch-white hover:text-launch-gold text-sm sm:text-base break-words transition-colors"
              >
                {author.name}
              </Link>
              <span className={`text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full ${cat.color}`}>
                {cat.label}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-launch-muted truncate">{author.headline}</p>
            <p className="text-xs text-launch-muted/70 mt-0.5">{formatRelativeDate(post.createdAt)}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm sm:text-[15px] text-launch-soft leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>
      </div>

      <div className="border-t border-launch-border px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs sm:text-sm text-launch-muted">
          <span>{post.likes} curtidas</span>
          <span>
            {post.comments} comentários · {post.shares} compartilhamentos
          </span>
        </div>
      </div>

      <div className="border-t border-launch-border p-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          <form action={likePost}>
            <input type="hidden" name="postId" value={post.id} />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-2 rounded-lg text-xs sm:text-sm font-medium text-launch-muted hover:bg-slate-100 hover:text-launch-gold transition-colors"
            >
              <Heart className="w-4 h-4 shrink-0" />
              <span>Curtir</span>
            </button>
          </form>
          {[
            { icon: MessageCircle, label: "Comentar" },
            { icon: Share2, label: "Compartilhar" },
            { icon: Bookmark, label: "Salvar" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 px-2 rounded-lg text-xs sm:text-sm font-medium text-launch-muted hover:bg-slate-100 hover:text-launch-gold transition-colors"
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
