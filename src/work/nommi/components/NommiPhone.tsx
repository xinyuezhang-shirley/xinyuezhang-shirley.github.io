export type NommiScene =
  | "chat"
  | "fade"
  | "compose"
  | "feed"
  | "map"
  | "thread"
  | "save"
  | "memory";

const NAV = [
  { id: "map", label: "Map" },
  { id: "feed", label: "Feed" },
  { id: "chat", label: "Social" },
  { id: "you", label: "You" },
] as const;

function navActive(scene: NommiScene): string {
  if (scene === "map") return "map";
  if (scene === "chat" || scene === "fade" || scene === "thread") return "chat";
  if (scene === "save" || scene === "memory") return "you";
  return "feed";
}

const STILLS = {
  feed: "/work/nommi/stills/feed_populated.jpg",
  skeleton: "/work/nommi/stills/feed_skeleton.jpg",
} as const;

/**
 * Sticky phone preview — real Nommi stills + faithful chrome, not invented cards.
 */
export function NommiPhone({ scene }: { scene: NommiScene }) {
  const active = navActive(scene);

  return (
    <div className="nommi-phone" aria-label="Nommi product preview">
      <div className="nommi-phone__bezel">
        <div className="nommi-phone__notch" />
        <div className="nommi-phone__status">
          <span>9:41</span>
          <img src="/work/nommi/nommi-logo.png" alt="" className="nommi-phone__logo" />
        </div>
        <div className="nommi-phone__screen">
          <div className="nommi-scene is-live" key={scene}>
            {scene === "chat" && <ChatOverlay fading={false} />}
            {scene === "fade" && <ChatOverlay fading />}
            {scene === "compose" && (
              <StillScene
                src={STILLS.skeleton}
                label="Structured Nommi post"
                caption="The same tip becomes a post with place, time, and type — not another disappearing message."
              />
            )}
            {scene === "feed" && (
              <StillScene
                src={STILLS.feed}
                label="Community feed"
                caption="Real Nommi feed UI from the CS278 deployment."
              />
            )}
            {scene === "map" && (
              <StillScene
                src={STILLS.feed}
                label="Map surface"
                caption="Location is first-class: the same contribution can appear as a pin (see live app for interactive map)."
                badge="Map"
              />
            )}
            {scene === "thread" && (
              <StillScene
                src={STILLS.feed}
                label="Conversation on a post"
                caption="Peers add context without forcing the knowledge back into a private chat."
              />
            )}
            {scene === "save" && (
              <StillScene
                src={STILLS.skeleton}
                label="Saved resource"
                caption="Students keep useful campus knowledge for later — reciprocity starts with reuse."
              />
            )}
            {scene === "memory" && (
              <StillScene
                src={STILLS.feed}
                label="Community memory"
                caption="The post remains reachable as shared infrastructure, not a buried screenshot."
              />
            )}
          </div>
        </div>
        <div className="nommi-phone__nav" aria-hidden="true">
          {NAV.map((tab) => (
            <span key={tab.id} className={active === tab.id ? "is-active" : undefined}>
              <i />
              {tab.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StillScene({
  src,
  label,
  caption,
  badge,
}: {
  src: string;
  label: string;
  caption: string;
  badge?: string;
}) {
  return (
    <div className="nommi-still">
      <img src={src} alt={label} />
      {badge ? <span className="nommi-still__badge">{badge}</span> : null}
      <div className="nommi-still__caption">
        <strong>{label}</strong>
        <p>{caption}</p>
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
