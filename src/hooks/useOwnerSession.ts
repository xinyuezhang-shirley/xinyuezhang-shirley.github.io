import { useCallback, useEffect, useState } from "react";
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

export function useOwnerSession() {
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
  }, []);

  const markOwnerInactive = useCallback(() => {
    setSession(INITIAL);
  }, []);

  return {
    ...session,
    loading,
    refresh,
    endSession,
    markOwnerActive,
    markOwnerInactive,
  };
}
