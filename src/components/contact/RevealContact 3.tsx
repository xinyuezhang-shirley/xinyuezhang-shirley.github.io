import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { trackContactReveal } from "@/lib/trackContactReveal";
import "./reveal-contact.css";

export type RevealContactProps = {
  label: string;
  value: string;
  /** Analytics payload type, e.g. "email" | "phone" */
  analyticsEvent: "email" | "phone";
  copyEnabled?: boolean;
  /** Optional href when revealed (mailto: / tel:) */
  href?: string;
  compact?: boolean;
};

export function RevealContact({
  label,
  value,
  analyticsEvent,
  copyEnabled = true,
  href,
  compact = false,
}: RevealContactProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const valueId = useId();
  const copyTimer = useRef<number | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setCopied(false);
    triggerRef.current?.focus();
  }, []);

  const reveal = useCallback(() => {
    setOpen(true);
    trackContactReveal(analyticsEvent);
  }, [analyticsEvent]);

  useEffect(() => {
    if (!open) return;
    // Move focus into the archive panel for screen readers / keyboard users.
    const panel = rootRef.current?.querySelector<HTMLElement>(
      ".reveal-contact__copy, .reveal-contact__value a, .reveal-contact__close",
    );
    panel?.focus();
  }, [open]);

  const toggle = useCallback(() => {
    if (open) close();
    else reveal();
  }, [open, close, reveal]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };

    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setCopied(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [open, close]);

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    };
  }, []);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be unavailable — leave value visible for manual copy */
    }
  }, [value]);

  return (
    <div
      ref={rootRef}
      className={`reveal-contact${compact ? " reveal-contact--compact" : ""}`}
    >
      <div className="reveal-contact__row">
        <p className="reveal-contact__label">{label}</p>
        <button
          ref={triggerRef}
          type="button"
          className="reveal-contact__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
        >
          {open ? "Hide ←" : "Reveal →"}
        </button>
      </div>

      <div
        id={panelId}
        className="reveal-contact__drawer"
        data-open={open}
        aria-hidden={!open}
      >
        <div className="reveal-contact__drawer-inner">
          {open ? (
            <div
              className="reveal-contact__panel"
              role="region"
              aria-labelledby={valueId}
            >
              <p className="reveal-contact__meta">Archive reference</p>
              <p className="reveal-contact__heading" id={valueId}>
                {label}
              </p>
              <p className="reveal-contact__note">
                This information is intentionally hidden until requested.
              </p>
              <p className="reveal-contact__value" aria-live="polite">
                {href ? (
                  <a href={href}>{value}</a>
                ) : (
                  value
                )}
              </p>
              <div className="reveal-contact__actions">
                {copyEnabled ? (
                  <button
                    type="button"
                    className="reveal-contact__copy"
                    onClick={onCopy}
                  >
                    Copy
                  </button>
                ) : null}
                {copied ? (
                  <span className="reveal-contact__copied" role="status">
                    Copied
                  </span>
                ) : null}
                <button
                  type="button"
                  className="reveal-contact__close"
                  onClick={close}
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
