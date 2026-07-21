# Portfolio site

## One-sentence description
A personal exhibition site for Shirley Zhang's work, research, and creative practice — each project room uses its own visual dialect rather than a single SaaS case-study template.

## Structure
Public routes include:
- Home
- Work rooms (MuseLab, Echo, Nommi, Tesla, PwC, Ironclad, Systems/Signals / NU Solar, and slug detail pages)
- Research rooms (Differ, Airbnb rating calibration, Poem-to-Song, POMDP, and slug detail pages)
- Creative (art, photography, poetry, dreams)
- About, Resume
- Ask Shirley (`/ask` full page + floating popup)

## Documented design stance (from site content / rooms)
- Project rooms argue through atmosphere and interaction (Echo moonlight, Nommi phone world, Differ instrument, MuseLab dossier, Ironclad pipeline, Tesla diagnostics bay).
- Creative wing (art, photography, poetry, dreams) is presented as part of the same meaning-making practice, not a disconnected side quest.
- About philosophy statement: "I build systems that help people understand information — sometimes that's an AI agent, sometimes a research pipeline, sometimes a poem."
- Amateurism essay on About: amateur as amator / lover — fondness and diligence rather than shame.

## Design worldview (curated patterns for Ask Shirley)
- Representation > presentation: every project should look like itself.
- Exploring a project page should communicate the project's ideas, not only display screenshots.
- Decoration should have purpose; interesting-looking interfaces without meaning feel weak.
- Beauty comes from surprise balanced with coherence — unexpected, yet inevitable.
- Creativity as translation: engineering, research, poetry, and photography as languages for the same curiosity.

## Technical stack (public repo)
React + Vite + TypeScript portfolio hosted on GitHub Pages; Cloudflare Worker used for private view counting (and Ask Shirley API when configured).

## Ask Shirley
Ask Shirley is explicitly labeled as an AI interpretation layer — not actually Shirley. It is grounded in curated identity, voice, knowledge, and example answers.

## Unknown / do not invent
Private analytics totals, unpublished drafts, and personal beliefs not recorded in examples should not be inferred from the site's aesthetic alone.
