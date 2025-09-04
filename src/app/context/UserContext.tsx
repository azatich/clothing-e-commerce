"use client";

import { supabase } from "@/utils/supabase/clients";
import { User, Session } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type UserContextType = {
  user: User | null;
  username: string;
  setUsername: (name: string) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  initialSession,
}: {
  children: ReactNode;
  initialSession: Session | null;
}) {
  const [user, setUser] = useState<User | null>(initialSession?.user ?? null);
  const [username, setUsername] = useState<string>(
    initialSession?.user?.user_metadata?.username || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // The `onAuthStateChange` listener is now the only source of truth
    // for state changes after the initial server-side render.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Ignore the initial session event to prevent overwriting the server state
      if (event === "INITIAL_SESSION") {
        return;
      }
      
      console.log("Auth state changed:", event, session);
      setLoading(true);

      if (session?.user) {
        setUser(session.user);
        setUsername(session.user.user_metadata?.username || "");
      } else {
        setUser(null);
        setUsername("");
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, username, setUsername, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
