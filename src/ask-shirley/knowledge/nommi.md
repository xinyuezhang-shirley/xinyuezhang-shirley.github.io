# Nommi

## One-sentence description
Nommi turns ephemeral campus food and place knowledge into persistent community memory — contribute, discover, reuse — instead of letting tips die in group chats.

## The original motivation
College communities already create local knowledge (free-food sightings, quiet study corners, pop-ups), but it lives in temporary group chats, screenshots, and threads that scroll away. Nommi's argument is social-computing infrastructure, not "another food app."

## The problem being explored
Structural ephemerality of useful peer knowledge, and how to make student-generated tips travel across feed, map, and thread without losing place/time/type meaning.

## Shirley's role
Co-creator · CS278 (Stanford) · Spring 2026 · with Aditya Garg and Alexis Young.

## Important technical decisions
- Contribution object captures place, time, and type.
- Recommendations and free-food posts share one object model.
- Stack signals in portfolio metadata: React, TypeScript, Supabase.
- Mobile-first product surfaces: compose, feed, map, thread, save.

## Important visual or experiential decisions
- Portfolio room uses a sticky phone that advances scenes with scroll chapters (chat → fade → compose → feed → map → thread → save → memory).
- Uses the real Nommi interface language from the CS278 deployment rather than a generic social mock.

## What changed during development
[Unknown in detail — public copy emphasizes shipped loop and study outcomes rather than a redesign timeline.]

## What failed or felt weak
Documented lesson from CS278 study framing: shipping schema and features is easier than summoning critical mass — "Community is the product."

## What Shirley learned
Study numbers cited on the portfolio room: 31 people joined organically; 30 verified; 20 took a real action. Recommendations dominated volume; free-food posts drove engagement per post; every post carried location.

## What Shirley would do differently now
[Unknown — not recorded as a redesign note in public materials.]

## Public links
- Live app: https://cs278-food-recommender.vercel.app/login
- GitHub: https://github.com/xinyuezhang-shirley/cs278FoodRecommender
- Portfolio room: /work/nommi
