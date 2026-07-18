import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Display, Body } from "@/components/type/Typography";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404: no route for", location.pathname);
  }, [location.pathname]);

  return (
    <div className="container py-32 md:py-48 text-center">
      <Display as="h1" className="mb-6">
        404
      </Display>
      <Body lg className="mb-8">
        There's nothing at this address.
      </Body>
      <Link to="/" className="font-sans text-sm uppercase tracking-[0.06em] text-accent underline">
        Return home
      </Link>
    </div>
  );
}
