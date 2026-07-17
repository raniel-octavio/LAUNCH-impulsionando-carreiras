"use client";

import { Send } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { createPost } from "@/lib/actions";
import { currentUser } from "@/lib/seed";

export function CreatePostForm() {
  return (
    <div className="card-glass rounded-sm p-4">
      <form action={createPost} className="space-y-4">
        <div className="flex gap-3 items-start">
          <Avatar user={currentUser} />
          <textarea
            name="content"
            required
            placeholder="Compartilhe uma notícia, dica ou atualização..."
            className="flex-1 w-full p-3 border border-launch-border rounded-lg resize-none bg-launch-elevated text-launch-white placeholder:text-launch-muted focus:outline-none focus:ring-2 focus:ring-launch-gold/30 text-sm min-h-[90px]"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <select
            name="category"
            defaultValue="noticia"
            className="w-full sm:w-auto text-sm border border-launch-border rounded-lg px-3 py-2 bg-launch-elevated text-launch-white focus:outline-none focus:ring-2 focus:ring-launch-gold/30"
          >
            <option value="noticia">Notícia</option>
            <option value="artigo">Artigo</option>
            <option value="dica">Dica</option>
            <option value="evento">Evento</option>
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-launch-gold hover:bg-launch-gold-bright rounded-full transition-all tracking-wide"
          >
            <Send className="w-4 h-4" />
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}
