/**
 * Local/mock Ask Shirley responder.
 * Swap `respondAskShirley` for a real LLM endpoint later — keep the same signature.
 */

import { ASK_SHIRLEY_QUESTIONS } from "@/data/askShirleyQuestions";

export type AskShirleyChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};

export type AskShirleyRespondArgs = {
  messages: AskShirleyChatMessage[];
  signal?: AbortSignal;
};

const WELCOME =
  "Ask me anything about Shirley — projects, research, design philosophy, or the strange overlap between systems and art. This is an interpretation layer, not a person.";

const ANSWERS: Record<string, string> = {
  "personal-project":
    "A project feels personal when it carries a private obsession into public form — when the system has to honor something I already care about outside of work. MuseLab started because I wanted critique that treated poems like manuscripts, not tickets. Echo started because words felt unfinished as text alone. If the work only exists to pad a resume, it dies the moment the deadline passes. If it starts from a question I would still ask on a Sunday, it stays alive.",
  "portfolio-design":
    "This site is a reading room, not a product dashboard. Each project gets its own dialect — Echo is moonlight black, Nommi is a living phone, Differ is an instrument — because the interface should argue for the idea, not just describe it. Flat cards and identical case-study templates erase difference. I want someone to feel the texture of the work before they read the bullets. Controlled chaos: structure underneath, atmosphere on top.",
  "problems-enjoy":
    "I like problems where meaning is slippery — where a machine has to represent something a person meant, faithfully enough to act on. Rating calibration across cities. Brake health from fleet telemetry. A poem that wants a song. Contextual experiences that break differently by neighborhood. The best problems sit between human experience and machine interpretation, and punish shallow metrics.",
  "tech-art":
    "Technology and art are not parallel hobbies that share a calendar. They're the same instinct pointed in different directions: how do you make something that holds attention, carries affect, and survives contact with another mind? Code is a material. So is ink. So is a dream log. When I build AI systems for writing, I'm not decorating engineering with creativity — I'm asking whether computation can be literary without becoming kitsch.",
  "good-ai-design":
    "Good AI design refuses the chat box as the default destiny of every product. It shows its work, grounds claims, and leaves room for disagreement. MuseLab's dossier format exists because a poem deserves interpretation structure, not a blob of praise. Echo's five afterlives exist because meaning is plural. If the interface hides uncertainty, cites nothing, and flatters the user, it isn't design — it's costume.",
  "proud-projects":
    "Differ, for lasting almost two years and insisting on real Chicago data instead of toy neighborhoods. Echo, for making words continue breathing across five renderers. MuseLab, for treating literary critique as a workshop instead of autocomplete. Nommi, for turning ephemeral group-chat knowledge into community memory. Pride tracks with how honestly the artifact argues for its own premise.",
  "echo-learn":
    "Echo taught me that generative systems need afterlives, not just outputs. One analysis spine, five renderers — the meaning isn't in the chat transcript; it's in how the poem keeps changing shape. Also: collaboration under constraint (CS146J, three people, ten weeks) forces ruthless prioritization. If a visualization doesn't change how you hear the text, cut it.",
  "nommi-inspire":
    "Nommi came from campus life: free-food tips, quiet study corners, pop-ups — useful knowledge dying in group chats and disappearing screenshots. The problem is structural ephemerality. Nommi turns that into contribute → discover → reuse: posts that persist, comments that refine, a mobile-first loop that treats community tips as infrastructure instead of scroll fodder.",
  "research-vs-build":
    "Research asks whether a claim is true under scrutiny. Building asks whether a system can survive contact with users. Differ lived in both: abstractions (concept expressions, accountable perspectives) and a platform designers could actually poke. I don't treat them as a pipeline where research finishes and product begins — I prototype early enough that the research question can still change.",
  "work-environment":
    "I thrive where ideas can be argued with evidence, ambiguity is allowed on the whiteboard, and craft isn't treated as decoration. Small teams with high trust. People who care about both the model and the sentence. Environments that punish vibes-only AI demos and reward systems that can be inspected. I like rooms where someone will say 'show me the failure case.'",
  "design-principles":
    "One composition per viewport. Brand and concept before decoration. Interfaces should reveal structure, not hide it behind chrome. Prefer dialects over templates. Motion for hierarchy, not noise. For AI surfaces: show provenance, refuse ungrounded confidence, and design for interpretation over generation when the domain is cultural. If removing a card's border doesn't hurt understanding, remove the card.",
  "next-opportunity":
    "I'm looking for work at the intersection of AI systems, product craft, and human meaning — places building interpretation layers, agent workflows, or research-informed products where design isn't a coat of paint. Teams that ship, measure, and still care about language. Roles where I can move between systems thinking and interface making without picking a false binary.",
  "creativity-systems":
    "Systems thinking is how I keep creativity from becoming fog. Creativity is how I keep systems from becoming bureaucracy. Differ's abstractions are creative acts dressed as formalism. A poetry atlas is a data structure with feeling. I balance them by forcing every poetic move to answer a structural question, and every schema to leave room for affect.",
  "memorable-portfolio":
    "Memorability comes from commitment to a point of view. Identical SaaS case studies blur together. A site that makes you feel the project's world — even briefly — sticks. Specificity beats polish theater. Also: honesty about amateurism, dreams, poems, and unfinished edges. People remember the person who risked being particular.",
  "currently-curious":
    "How to design AI that argues with you instead of agreeing. Contract and procurement agents that preserve provenance. Cross-context meaning — ratings, neighborhoods, literary tone — as something models can reason about without flattening. Also: dream archives as interfaces, and whether a portfolio can be an instrument rather than a brochure.",
  "money-no-matter":
    "A long-form literary AI workshop that never collapses into chat. A public atlas of dreams and poems as computational objects. More Differ-like instruments for designers who care about who gets left out of 'context-aware' experiences. I'd still write. I'd still build strange black-and-white rooms. The economic constraint changes the scale, not the appetite.",
  "uncertainty":
    "I name the unknowns early, build the smallest probe that can kill a bad assumption, and keep a parallel track for the story the data might refuse to tell. In Differ, real neighborhoods were harder and more honest than synthetic ones — uncertainty became the research. In product work, I prefer visible confidence intervals over fake certainty in the UI.",
  "past-self":
    "Stop treating amateurism as a shame word — it means lover. Ship the weird dialect before the safe template. Don't wait until you feel 'good enough' to put poems and systems on the same shelf. And when a chat box is the path of least resistance, ask what structure would honor the material better.",
  "shaped-by":
    "HCI and experiential computing from Delta Lab / Differ. Literary magazines and the habit of close reading. The idea that amateur means amator — lover. Work on interpretation stacks rather than generation demos. People who demand both rigor and taste. Books and essays that treat interfaces as arguments. Also: my own dream logs — private data that taught me atmosphere is information.",
  "misunderstand":
    "People sometimes read the creative work as separate from the engineering, or the pixel/glitch rooms as aesthetic cosplay. They're the same practice. I'm not 'the fun one' or 'the systems one' depending on the room — I'm trying to make machines represent human meaning without lying about how hard that is. Also: this chat is an interpretation. Not actually Shirley.",
};

const KEYWORD_FALLBACKS: { keys: string[]; answer: string }[] = [
  {
    keys: ["muselab", "muse lab", "literary", "poem critique"],
    answer:
      "MuseLab is a literary workshop dossier — interpretation over generation. You deposit a manuscript and receive structured critique, not a chat bubble of vague praise. The premise: poems deserve an analysis spine, not autocomplete flattery.",
  },
  {
    keys: ["echo"],
    answer:
      "Echo is a generative poetry system where words continue breathing across five afterlives — one analysis spine, multiple renderers. Built with Clare Lei and Rita Xiang for CS146J. Live at the course deployment linked from the Work room.",
  },
  {
    keys: ["nommi", "nonmi", "food"],
    answer:
      "Nommi (sometimes mistyped Nonmi) turns ephemeral campus food and place knowledge into persistent community memory — contribute, discover, reuse — instead of letting tips die in group chats.",
  },
  {
    keys: ["differ", "chi"],
    answer:
      "Differ is a platform for experiential computing: concept expressions, accountable perspectives, issues of concern, visualizations. It surfaces where a context-aware experience might break for particular populations or settings — CHI 2026 submission from Delta Lab work.",
  },
  {
    keys: ["tesla", "brake"],
    answer:
      "At Tesla I worked on brake-health diagnostics from fleet telemetry — treating vehicle signals as a living diagnostics bay rather than a static report. Production data, ML/data engineering, high stakes for false confidence.",
  },
  {
    keys: ["ironclad", "contract", "procurement"],
    answer:
      "At Ironclad I'm working on chat-native procurement into provenance-aware contract workflows — agent orchestration that turns utterances into structured contracting processes without losing the audit trail.",
  },
  {
    keys: ["pwc", "rag", "azure"],
    answer:
      "At PwC I built multi-agent RAG mission control: Langflow orchestration where a supervisor routes documentation questions to knowledge retrieval (Azure AI Search) instead of ungrounded chat.",
  },
  {
    keys: ["dream", "poetry", "art", "photo"],
    answer:
      "The Creative wing — art, photography, poetry, dreams — isn't a side quest. It's the same meaning-making practice as the AI systems work: archives, atlases, and rooms that treat affect as data worth structuring.",
  },
  {
    keys: ["resume", "hire", "job", "intern"],
    answer:
      "Shirley studies at Stanford, with experience across Tesla, PwC, Ironclad, Delta Lab research, and independent systems like MuseLab and Echo. For the living resume and contact path, use /resume on this site — or ask a sharper question about a specific project.",
  },
  {
    keys: ["who are you", "are you shirley", "real"],
    answer:
      "I am Ask Shirley: an AI interpretation layer over Shirley's public work and philosophy. AI INTERPRETATION — NOT ACTUALLY SHIRLEY. Useful for orientation. Not a substitute for talking to the person.",
  },
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function matchCurated(question: string): string | null {
  const n = normalize(question);
  const exact = ASK_SHIRLEY_QUESTIONS.find((q) => normalize(q.text) === n);
  if (exact && ANSWERS[exact.id]) return ANSWERS[exact.id];

  const fuzzy = ASK_SHIRLEY_QUESTIONS.find((q) => {
    const qt = normalize(q.text);
    return n.includes(qt.slice(0, 28)) || qt.includes(n.slice(0, 28));
  });
  if (fuzzy && ANSWERS[fuzzy.id]) return ANSWERS[fuzzy.id];
  return null;
}

function matchKeywords(question: string): string | null {
  const n = normalize(question);
  for (const row of KEYWORD_FALLBACKS) {
    if (row.keys.some((k) => n.includes(k))) return row.answer;
  }
  return null;
}

function defaultAnswer(question: string): string {
  return [
    "I don't have a canned dissection for that exact question, but here's the orientation layer:",
    "",
    `You asked: “${question.trim()}”`,
    "",
    "Shirley's work clusters around systems that help people understand information — AI agents, research pipelines, literary tools, and creative archives. Try a curated prompt (Echo, Nommi, Differ, AI design, portfolio philosophy), or open the full window for categorized questions.",
    "",
    "AI INTERPRETATION — NOT ACTUALLY SHIRLEY.",
  ].join("\n");
}

export function getWelcomeMessage(): AskShirleyChatMessage {
  return {
    id: "welcome",
    role: "assistant",
    content: WELCOME,
    createdAt: Date.now(),
  };
}

export function craftAskShirleyReply(userText: string): string {
  return (
    matchCurated(userText) ?? matchKeywords(userText) ?? defaultAnswer(userText)
  );
}

/** Pluggable responder — replace body with fetch('/api/ask-shirley') later. */
export async function respondAskShirley(
  args: AskShirleyRespondArgs
): Promise<string> {
  const lastUser = [...args.messages].reverse().find((m) => m.role === "user");
  const text = lastUser?.content?.trim() || "";

  await new Promise<void>((resolve, reject) => {
    const t = window.setTimeout(() => resolve(), 480 + Math.random() * 420);
    args.signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(t);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true }
    );
  });

  if (args.signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }

  return craftAskShirleyReply(text);
}
