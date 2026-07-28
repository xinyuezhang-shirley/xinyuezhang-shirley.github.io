import { Link } from "react-router-dom";
import "@/work/archive/thoughts-foyer.css";

const rooms = [
  {
    to: "/thoughts/passing",
    numeral: "I",
    title: "Temporary",
    subtitle: "Passing scraps",
    description:
      "Short notes that surface on a desk — encounter them, then they leave this visit's table.",
    meta: ["Desk", "Passing · public · permanent", "Ephemeral"],
  },
  {
    to: "/thoughts/longer",
    numeral: "II",
    title: "Longer",
    subtitle: "Filed pieces",
    description:
      "Thoughts that grew into essays and documents — kept on purpose, not as a feed.",
    meta: ["Archive", "Essays · notes", "Deliberate"],
  },
] as const;

export default function ThoughtsFoyer() {
  return (
    <div className="thoughts-foyer">
      <div className="thoughts-foyer__rail">
        <header className="thoughts-foyer__head">
          <p className="thoughts-foyer__eyebrow">Thoughts</p>
          <h1 className="thoughts-foyer__statement">
            Two kinds of keeping.
            <br />
            <em>One foyer.</em>
          </h1>
          <p className="thoughts-foyer__deck">
            Temporary scraps on the desk, or longer pieces filed away — enter
            whichever pace you want.
          </p>
        </header>

        <ol className="thoughts-foyer__rooms">
          {rooms.map((room) => (
            <li key={room.to} className="thoughts-foyer-room">
              <Link to={room.to} className="thoughts-foyer-room__link">
                <span className="thoughts-foyer-room__numeral" aria-hidden="true">
                  {room.numeral}
                </span>
                <div className="thoughts-foyer-room__body">
                  <h2 className="thoughts-foyer-room__title">{room.title}</h2>
                  <p className="thoughts-foyer-room__subtitle">{room.subtitle}</p>
                  <p className="thoughts-foyer-room__desc">{room.description}</p>
                  <p className="thoughts-foyer-room__meta">
                    {room.meta.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </p>
                  <span className="thoughts-foyer-room__enter">Enter</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        <p className="thoughts-foyer__colophon">Foyer · Temporary · Longer</p>
      </div>
    </div>
  );
}
