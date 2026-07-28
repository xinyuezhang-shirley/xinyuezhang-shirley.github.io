import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  fetchOwnerSession,
  logoutOwnerSession,
  type OwnerSessionState,
} from "@/lib/askShirleyOwnerApi";

const INITIAL: OwnerSessionState = {
  ownerMode: false,
  role: "public",
  userId: null,
};

type OwnerSessionContextValue = OwnerSessionState & {
  loading: boolean;
  refresh: () => Promise<OwnerSessionState>;
  endSession: () => Promise<void>;
  markOwnerActive: () => void;
  markOwnerInactive: () => void;
};

const OwnerSessionContext = createContext<OwnerSessionContextValue | null>(null);

export function OwnerSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<OwnerSessionState>(INITIAL);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const next = await fetchOwnerSession();
    setSession(next);
    setLoading(false);
    return next;
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const endSession = useCallback(async () => {
    await logoutOwnerSession();
    setSession(INITIAL);
  }, []);

  const markOwnerActive = useCallback(() => {
    setSession({ ownerMode: true, role: "owner", userId: "shirley" });
    // Cookie may already be set by the chat/auth response — sync when possible
    void fetchOwnerSession().then((next) => {
      if (next.ownerMode) setSession(next);
    });
  }, []);

  const markOwnerInactive = useCallback(() => {
    setSession(INITIAL);
  }, []);

  const value = useMemo(
    () => ({
      ...session,
      loading,
      refresh,
      endSession,
      markOwnerActive,
      markOwnerInactive,
    }),
    [session, loading, refresh, endSession, markOwnerActive, markOwnerInactive],
  );

  return (
    <OwnerSessionContext.Provider value={value}>{children}</OwnerSessionContext.Provider>
  );
}

export function useOwnerSession(): OwnerSessionContextValue {
  const ctx = useContext(OwnerSessionContext);
  if (!ctx) {
    throw new Error("useOwnerSession must be used within OwnerSessionProvider");
  }
  return ctx;
}
