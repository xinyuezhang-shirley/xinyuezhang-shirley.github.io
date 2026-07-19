export type NommiScene = "feed" | "chat" | "map" | "insight" | "reflect";

const NAV = [
  { id: "map", label: "Map" },
  { id: "feed", label: "Feed" },
  { id: "chat", label: "Social" },
  { id: "insight", label: "You" },
] as const;

function navActive(scene: NommiScene): string {
  if (scene === "map") return "map";
  if (scene === "chat") return "chat";
  if (scene === "insight" || scene === "reflect") return "insight";
  return "feed";
}

export function NommiPhone({ scene }: { scene: NommiScene }) {
  const active = navActive(scene);

  return (
    <div className="nommi-phone" aria-hidden={false} aria-label="Nommi living product preview">
      <div className="nommi-phone__bezel">
        <div className="nommi-phone__notch" />
        <div className="nommi-phone__status">
          <span>9:41</span>
          <span>Nommi</span>
        </div>
        <div className="nommi-phone__screen">
          <div className="nommi-scene is-live" key={scene}>
            {scene === "feed" && <FeedScene />}
            {scene === "chat" && <ChatScene />}
            {scene === "map" && <MapScene />}
            {(scene === "insight" || scene === "reflect") && (
              <InsightScene reflect={scene === "reflect"} />
            )}
          </div>
        </div>
        <div className="nommi-phone__nav">
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

function FeedScene() {
  return (
    <>
      <div className="nommi-card">
        <div className="nommi-card__meta">
          <div className="nommi-avatar" />
          <div>
            <div className="nommi-card__who">alexis · CS278</div>
            <div className="nommi-card__when">12m ago · Tresidder</div>
          </div>
          <span className="nommi-pill free">Free food</span>
        </div>
        <div className="nommi-card__media" />
        <p className="nommi-card__body">
          Leftover catering from the design review — sandwiches + fruit, next to the south doors.
          Going fast.
        </p>
        <div className="nommi-card__actions">
          <span>♥ 18</span>
          <span>💬 6</span>
          <span>🔖 Save</span>
        </div>
      </div>
      <div className="nommi-card">
        <div className="nommi-card__meta">
          <div className="nommi-avatar" />
          <div>
            <div className="nommi-card__who">aditya</div>
            <div className="nommi-card__when">1h ago · Coupa</div>
          </div>
          <span className="nommi-pill">Rec</span>
        </div>
        <p className="nommi-card__body">
          Quiet corner + reliable oat latte. Best place to rewrite a section without Wi-Fi drama.
        </p>
        <div className="nommi-card__actions">
          <span>♥ 9</span>
          <span>📍 Map</span>
        </div>
      </div>
    </>
  );
}

function ChatScene() {
  return (
    <div className="nommi-chat">
      <div className="nommi-bubble them">anyone near Huang? free pizza from a club fair leftover</div>
      <div className="nommi-bubble me">on my way — pinning it</div>
      <div className="nommi-bubble them">posted in Free Food Radar too so it doesn’t die in the chat</div>
      <div className="nommi-bubble me">that’s the whole point of Nommi 🧋</div>
      <div className="nommi-bubble them">circle: Stanford Free Food Radar · 14 online</div>
    </div>
  );
}

function MapScene() {
  return (
    <div className="nommi-map">
      <span className="nommi-pin nommi-pin--a" />
      <span className="nommi-pin nommi-pin--b" />
      <div className="nommi-map-sheet">
        <strong>Free food · Tresidder south</strong>
        <div style={{ color: "#6b7280", marginTop: 4 }}>0.2 mi · ends ~20m · 18 saves</div>
      </div>
    </div>
  );
}

function InsightScene({ reflect }: { reflect: boolean }) {
  return (
    <div className="nommi-insight">
      <strong>{reflect ? "What shipped taught us" : "Launch pulse"}</strong>
      {reflect ? (
        <>
          Recommendations were 74% of posts. Free-food was only 16% — and still won engagement per
          post. Circles never reached critical mass. Schema is easy. Community is the product.
        </>
      ) : (
        <>
          31 organic users · 30 verified · 20 took a real action. Every post carried location.
          Location wasn’t a filter — it was the content.
        </>
      )}
    </div>
  );
}
