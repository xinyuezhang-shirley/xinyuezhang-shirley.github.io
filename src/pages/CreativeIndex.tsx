import { Link } from "react-router-dom";
import { catalogue } from "@/work/art/catalogue";
import { poems } from "@/content/creative";
import { photoCollections } from "@/work/photography/collections";
import { dreamsCatalog } from "@/work/dreams/loadCatalog";
import "@/work/creative/creative-foyer.css";

const rooms = [
  {
    to: "/creative/art",
    numeral: "I",
    title: "Art",
    subtitle: "A quiet monograph",
    description:
      "Digital paintings, original characters, and design studies arranged as plates rather than posts.",
    meta: [`${catalogue.length} plates`, "2023 — 2026", "Digital painting"],
  },
  {
    to: "/creative/photography",
    numeral: "II",
    title: "Photography",
    subtitle: "Prints as studies",
    description:
      "Glass, coast, film, stage, stone, and faces — visual essays held with the patience of a contact sheet.",
    meta: [
      `${photoCollections.length} collections`,
      "California · Shanghai · Chicago",
      "Photography",
    ],
  },
  {
    to: "/creative/poetry",
    numeral: "III",
    title: "Poetry",
    subtitle: "Lyric in two languages",
    description:
      "Poems in English and Chinese, entered as a zine of finished lyrics rather than a feed of drafts.",
    meta: [`${poems.length} poems`, "2020 — 2024", "English / 中文"],
  },
  {
    to: "/creative/dreams",
    numeral: "IV",
    title: "Dreams",
    subtitle: "A research notebook of nights",
    description:
      "An evolving archive of motifs, roles, and patterns — studied as data and literature, not dumped as diary.",
    meta: [`${dreamsCatalog.dreamCount} entries`, "Derived study", "Notes archive"],
  },
] as const;

export default function CreativeIndex() {
  return (
    <div className="creative-foyer">
      <div className="creative-foyer__rail">
        <header className="creative-foyer__head">
          <p className="creative-foyer__eyebrow">Creative</p>
          <h1 className="creative-foyer__statement">
            Four rooms.
            <br />
            <em>One exhibition.</em>
          </h1>
          <p className="creative-foyer__deck">
            Entered as chapters in a single gallery — not as separate portfolio
            projects.
          </p>
        </header>

        <ol className="creative-foyer__rooms">
          {rooms.map((room) => (
            <li key={room.to} className="foyer-room">
              <Link to={room.to} className="foyer-room__link">
                <span className="foyer-room__numeral" aria-hidden="true">
                  {room.numeral}
                </span>
                <div className="foyer-room__body">
                  <h2 className="foyer-room__title">{room.title}</h2>
                  <p className="foyer-room__subtitle">{room.subtitle}</p>
                  <p className="foyer-room__desc">{room.description}</p>
                  <p className="foyer-room__meta">
                    {room.meta.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </p>
                  <span className="foyer-room__enter">Enter</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        <p className="creative-foyer__colophon">Foyer · Contents · Open</p>
      </div>
    </div>
  );
}
