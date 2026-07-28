import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, onAnalyticsRouteChange } from "@/lib/analytics";

/** Mount once inside the router to track SPA navigations. */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    onAnalyticsRouteChange(location.pathname, location.search);
  }, [location.pathname, location.search]);

  return <>{children}</>;
}
