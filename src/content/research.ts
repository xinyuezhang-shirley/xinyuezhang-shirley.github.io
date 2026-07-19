import type { ResearchProject } from "./types";

export const researchProjects: ResearchProject[] = [
  {
    slug: "differ",
    title: "Differ: A Platform for Experiential Computing",
    venue: "CHI 2026 (submitted) · Delta Lab, Northwestern University",
    org: "Delta Lab, Northwestern University",
    dates: "Dec 2023 – Sep 2025",
    authors: ["Jiachen He", "Prof. Haoqi Zhang"],
    tags: ["hci-research", "data-viz", "data-systems"],
    abstract:
      "Differ is a platform for reasoning about contextual differences in human experience design — built on the idea that the same context-aware experience can mean something different depending on who encounters it and where. It takes a machine-interpretable definition of an experience and returns a set of visualizations that surface where that experience might break down for particular populations or settings, before a designer ships it.",
    keyFindings: [
      "Four core computational abstractions: concept expressions, accountable perspectives, issues of concern, and visualizations.",
      "Accountable perspectives capture meaning differences across geography (urban/rural, state, neighborhood), demographics (age, budget, wheelchair accessibility), and setting (time of day).",
      "Issue functions score a given perspective for prevalence, conceptual fit, popularity, safety, and affordability.",
      "Reference systems combine Yelp and Foursquare data, public crime datasets, neighborhood data, and census data; visualizations are generated with geopandas and Plotly.",
      "First author on the CHI 2026 submission presenting Differ alongside real-world case studies.",
    ],
    story: [
      "The project grew out of Northwestern's Design, Technology, and Research course inside the Delta Lab, and turned into something I kept building for almost two years: a lightweight data analysis framework that connects how a person expresses a concept to how a machine interprets it, aimed at surfacing actionable insight for designers working on inclusive, context-aware systems. The case studies in the CHI submission use real-world reference systems rather than synthetic data, which is most of why the project took as long as it did — a difference that only shows up across actual Chicago neighborhoods is a much harder thing to render responsibly than one that shows up in a toy dataset.",
    ],
  },
  {
    slug: "airbnb-rating-calibration",
    title:
      "The Illusion of 5 Stars: Cross-City Rating Calibration and Visibility Disparities on Airbnb",
    venue: "CS 281: Ethics of Artificial Intelligence — Spring 2026, Stanford University",
    org: "Stanford University",
    dates: "Spring 2026",
    tags: ["data-systems", "nlp", "social-computing"],
    abstract:
      "Airbnb ratings are often treated as universal measures of quality, but prior work suggests they're inflated and shaped by social context. Using Inside Airbnb data from Berlin, Chicago, Hong Kong, and Tokyo, this project asks whether identical star ratings carry equivalent meaning across cities, and whether differences in calibration translate into measurable differences in platform visibility.",
    keyFindings: [
      "Common thresholds like 4.8 and 4.9 stars correspond to very different positions in the local rating distribution — Hong Kong listings clear them far less often than Chicago or Berlin.",
      "The gap persists within matched cohorts of comparable listings (similar room type, price, occupancy) and after controlling for price, capacity, review volume, room type, Superhost status, and property type in an OLS regression.",
      "Review language differs by city even at matching star ratings — Chicago reviews read as more polite and enthusiastic, Hong Kong reviews as less expressive, even in English.",
      "Re-ranking listings by within-city percentile instead of raw stars changes the top tier substantially: only about 40% of listings in the raw top 1% remain there after city-normalization.",
      "A standardized five-star scale is not a universal measure of quality — local evaluation norms get embedded into platform reputation systems, which can translate directly into unequal visibility and opportunity across markets.",
    ],
    story: [
      "The analysis runs five complementary steps, moving from descriptive rating distributions to a ranking simulation that swaps Airbnb's own ranking logic for a city-normalized version — not because the normalized ranking is obviously correct, but as a counterfactual for measuring how much calibration differences actually matter once they reach a ranking algorithm.",
    ],
    pdfUrl: "/research/airbnb-rating-calibration-poster.pdf",
  },
  {
    slug: "poem-to-song",
    title: "The Sound of a Sonnet: Poem-to-Song Recommendation with Pseudo-Supervision",
    venue: "CS 229: Machine Learning — Spring 2026, Stanford University",
    org: "Stanford University",
    dates: "Spring 2026",
    authors: ["Cheney Sang", "Amelia Sarah Bloom"],
    tags: ["ai-ml", "nlp", "writing"],
    abstract:
      "A retrieval model that predicts which songs are most musically compatible with a given poem, by learning a shared embedding space between poetic and lyrical text. Built on 3,413 poems from PoetryDB and 2,934 song lyrics from Genius and Spotify metadata, the system uses a dual-encoder trained with contrastive learning on pseudo-supervised labels — since no labeled poem-to-song dataset exists — and is evaluated against human judgment of which song best matches a poem's tone, structure, and affect.",
    keyFindings: [
      "No labeled poem–song pairs exist, so training pairs come from a weighted-cosine heuristic over MPNet embeddings, zero-shot emotion/theme classifiers, and structural/lexical features, then trained with symmetric InfoNCE contrastive loss.",
      "A five-branch dual encoder (MPNet, emotion, theme, other semantic, structural/lexical) projects poems and songs into a shared 128-dimensional space.",
      "Evaluated with human triplet judgments — given a poem and two candidate songs, which fits better? A second annotator's agreement with the first (~80%) sets the practical ceiling for any model.",
      "The best feature-aware encoders reach 78–80% agreement with human judgment, matching human-level consistency and beating an MPNet-only cosine baseline (~67%).",
      "Models that lean on emotional tone and structure outperform models that lean on literal word overlap — poem–song similarity seems to live in affect more than in vocabulary.",
    ],
    story: [
      "It's the project where the two halves of this site overlap most directly: a retrieval system that has to learn, computationally, something like what makes a poem and a song feel like they belong together — tone, structure, affect — rather than what words they happen to share.",
    ],
    pdfUrl: "/research/poem-to-song-poster.pdf",
  },
  {
    slug: "pomdp-aid-allocation",
    title: "Budget-Constrained Aid Allocation as a POMDP",
    venue: "Decision Making Under Uncertainty — Spring 2026, Stanford University",
    org: "Stanford University",
    dates: "Spring 2026",
    authors: ["Abi Lopez"],
    tags: ["ai-ml", "social-computing"],
    abstract:
      "A planning framework that treats the allocation of limited food and housing assistance as a partially observable Markov decision process — modeling each family's stability as hidden state that can only be read through noisy signals, and each aid decision as a belief-based action under a shared, binding budget.",
    keyFindings: [
      "Households are modeled on two axes — food and housing need, each Crisis / Moderate / Stable — recovering at different speeds (food responds quickly to aid; housing responds slowly and regresses easily), based on empirically grounded cost-of-living targets.",
      "A compact 9-state POMDP, learned from simulated trajectories, is solved with point-based value iteration (PBVI) and compared against myopic, greedy, random, and spread-allocation baselines.",
      "PBVI achieves the highest median reward and the most stable crisis-belief trajectories, consistently front-loading aid toward a subset of families early rather than spreading it evenly.",
      "Even optimal planning has limits: when housing recovery is structurally slow, no realistic budget reliably keeps crisis rates down — the bottleneck shifts from the policy to the environment itself.",
      "The budget needed to control crisis rates rises sharply with more families but falls with a longer planning horizon — from $85k (15 families, 8-month horizon) down to $15k at the same family count given a 16-month horizon.",
    ],
    story: [
      "The most interesting result wasn't that smarter planning helps — it does — but where it stops helping: once housing recovery is slow and structurally fragile enough, more budget and better algorithms both hit the same wall, which is less a finding about POMDPs than about what algorithmic allocation can and can't substitute for.",
    ],
    pdfUrl: "/research/pomdp-aid-allocation-paper.pdf",
  },
];
