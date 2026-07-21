# Tesla · Brake health

## One-sentence description
Internship work framed as fleet telemetry as a living diagnostics bay for brake-health risk — early flags upstream of late fluid alerts.

## The original motivation
Operational failure mode described publicly: chassis brake line damage from salt and stones leading to fluid leaks; low brake fluid alerts arrive too late and sometimes fail. Early flags exist to move service work upstream.

## The problem being explored
How to turn fleet-scale braking telemetry into a daily brake-health metric and precision-oriented service flags without relying on proprietary screenshots on a public site.

## Shirley's role
Data Analyst Intern, ML & Data Engineering · Tesla · Mar–Jun 2025.

## Important technical decisions
(As documented in the public Tesla room — schematic, not proprietary coefficients.)
- Pipeline stages: telemetry → filter/clean signals → brake health features → logistic regression risk → SQL threshold/consecutive-day rules → dashboard → service.
- Logistic regression chosen for onboard practicality (simple, low memory), not novelty.
- Intermediate results retained so thresholds can be retuned without replaying full fleet history.
- Optimization target cited: precision for service decisions (~96.6% on the validated sample).
- Outcome framing on a ~200 vehicle serviced sample: ~25% flagged up to two months early; most of the remainder within about two weeks of service.
- Tools listed: Python, SQL, Spark.

## Important visual or experiential decisions
- Portfolio presents an immersive dashboard/diagnostics bay world with staged explanation rather than leaking proprietary UI.

## What changed during development
[Unknown in public materials.]

## What failed or felt weak
[Unknown — not published as a failure postmortem.]

## What Shirley learned
[Unknown as a first-person lesson beyond the public pipeline framing. Do not invent.]

## What Shirley would do differently now
[Unknown.]

## Public links
- Portfolio room: /work/tesla
