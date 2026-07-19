export type NommiScene =
  | "chat"
  | "fade"
  | "compose"
  | "feed"
  | "map"
  | "thread"
  | "save"
  | "memory";

const STILLS = {
  feed: "/work/nommi/stills/feed_populated.jpg",
  skeleton: "/work/nommi/stills/feed_skeleton.jpg",
} as const;

const SCENE: Record<
  NommiScene,
  { kind: "chat" | "still"; src?: string; label: string; caption: string }
> = {
  chat: {
    kind: "chat",
    label: "Group chat",
    caption: "Useful campus tips start here — and usually die here.",
  },
  fade: {
    kind: "chat",
    label: "Knowledge disappearing",
    caption: "Newer messages bury the tip before it becomes shared infrastructure.",
  },
  compose: {
    kind: "still",
    src: STILLS.skeleton,
    label: "Structured Nommi post",
    caption: "The same tip becomes a post with place, time, and type.",
  },
  feed: {
    kind: "still",
    src: STILLS.feed,
    label: "Community feed",
    caption: "Real Nommi feed UI from the CS278 deployment.",
  },
  map: {
    kind: "still",
    src: STILLS.feed,
    label: "Map surface",
    caption: "Location is first-class — open the live app for the interactive map.",
  },
  thread: {
    kind: "still",
    src: STILLS.feed,
    label: "Conversation on a post",
    caption: "Peers add context without forcing knowledge back into a private chat.",
  },
  save: {
    kind: "still",
    src: STILLS.skeleton,
    label: "Saved resource",
    caption: "Students keep useful campus knowledge for later.",
  },
  memory: {
    kind: "still",
    src: STILLS.feed,
    label: "Community memory",
    caption: "The post remains reachable as shared infrastructure.",
  },
};

/**
 * Device frame only. Real Nommi screenshots fill the screen edge-to-edge —
 * no second status bar or tab bar wrapped around them.
 */
export function NommiPhone({ scene }: { scene: NommiScene }) {
  const meta = SCENE[scene];
  const isStill = meta.kind === "still";

  return (
    <div className="nommi-phone-wrap">
      <div
        className={`nommi-phone${isStill ? " nommi-phone--shot" : " nommi-phone--chat"}`}
        aria-label={`Nommi preview: ${meta.label}`}
      >
        <div className="nommi-phone__bezel">
          {isStill && meta.src ? (
            <img
              className="nommi-phone__shot"
              src={meta.src}
              alt={meta.label}
            />
          ) : (
            <ChatOverlay fading={scene === "fade"} />
          )}
        </div>
      </div>
      <div className="nommi-phone__caption">
        <strong>{meta.label}</strong>
        <p>{meta.caption}</p>
      </div>
    </div>
  );
}

function ChatOverlay({ fading }: { fading: boolean }) {
  return (
    <div className={`nommi-chat-real${fading ? " is-fading" : ""}`}>
      <p className="nommi-chat-real__title">CS278 group chat</p>
      <div className="nommi-bubble them">anyone near Huang? free pizza leftover from a club fair</div>
      <div className="nommi-bubble them">going fast — south doors</div>
      <div className="nommi-bubble me">screenshotting before it scrolls away…</div>
      {fading ? (
        <p className="nommi-chat-real__warn">Newer messages push useful tips out of reach.</p>
      ) : (
        <p className="nommi-chat-real__hint">Temporary knowledge — not yet community infrastructure.</p>
      )}
    </div>
  );
}
