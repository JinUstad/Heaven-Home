"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

function generateUserId() {
  if (typeof window !== "undefined") {
    let id = localStorage.getItem("heavenhome_user_id");
    if (!id) {
      id = `anon_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("heavenhome_user_id", id);
    }
    return id;
  }
  return `anon_${Math.random().toString(36).substring(2, 15)}`;
}

export function ActiveUserTracker() {
  const isTracked = useRef(false);

  useEffect(() => {
    if (isTracked.current) return;
    
    // We only want to track once per session/mount
    isTracked.current = true;
    const userId = generateUserId();

    const channel = supabase.channel("online-users", {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      // Intentionally left blank - client just tracking itself
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({
          online_at: new Date().toISOString(),
        });
      }
    });

    return () => {
      channel.unsubscribe();
      isTracked.current = false;
    };
  }, []);

  return null;
}
