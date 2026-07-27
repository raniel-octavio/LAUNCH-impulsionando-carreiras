// src/hooks/useCurrentUser.ts
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getUserById } from "@/lib/api/users";
import { User } from "@/types";

export function useCurrentUser() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        if (active) {
          setProfile(null);
          setLoading(false);
        }
        return;
      }

      const userProfile = await getUserById(authUser.id);
      if (active) {
        setProfile(userProfile);
        setLoading(false);
      }
    }

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { profile, loading };
}