import { User } from "@/types";

interface AvatarProps {
  user: Pick<User, "name" | "avatar" | "online">;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ user, size = "md" }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl",
  };

  const dotSizes = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
  };

  return (
    <div className="relative shrink-0">
      <div
        className={`${sizes[size]} rounded-full bg-gradient-to-br from-launch-gold to-launch-gold-dim flex items-center justify-center font-semibold text-white ring-2 ring-launch-gold/20`}
      >
        {user.avatar}
      </div>
      {user.online && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizes[size]} bg-emerald-400 border-2 border-white rounded-full`}
        />
      )}
    </div>
  );
}
