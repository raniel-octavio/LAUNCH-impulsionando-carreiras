import { CreatePostForm } from "@/components/feed/CreatePostForm";
import { PostCard } from "@/components/feed/PostCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { getPosts } from "@/lib/store";

export default function FeedPage() {
  const posts = getPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-4">
          <CreatePostForm />
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
