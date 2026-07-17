import { ProfileContent } from "@/components/profile/ProfileContent";
import { currentUser } from "@/lib/seed";

export default function PerfilPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <ProfileContent user={currentUser} isOwnProfile />
    </div>
  );
}
