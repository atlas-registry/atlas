---
title: Writing a Clear and Actionable PRD
description: The guide to writing Product Requirements Documents that eliminate ambiguity between product and engineering.
---

# Writing a Clear and Actionable PRD

The feature seemed clear in the meeting. Then engineering built something different from what product imagined, QA tested against requirements that did not exist, and the launch slipped by three weeks. The root cause is almost always the same: the PRD was vague, incomplete, or missing entirely.

## Why It Matters

A PRD is the contract between product and engineering. It defines what gets built, why, for whom, and how success is measured. Without it, everyone fills in the blanks with their own assumptions -- and assumptions diverge. A good PRD does not slow down development. It prevents the rework, debates, and scope creep that actually slow things down.

Teams with clear PRDs ship faster, not slower. The time invested upfront in clarity saves multiples in execution.

## The Process

### Step 1: Start with the Why

Before any requirements, answer: What problem are we solving? Who has this problem? How do we know it is a real problem (data, user interviews, support tickets)? What happens if we do not solve it? This section keeps the team aligned on purpose when implementation details get complex.

### Step 2: Write User Stories

Frame requirements from the user's perspective: "As a [user type], I want to [action], so that [outcome]." User stories force you to think about behavior, not features. Each story should be small enough to build in 1-3 days. If it takes longer, break it down.

### Step 3: Define Acceptance Criteria

For each user story, write explicit acceptance criteria: the conditions that must be true for the story to be considered done. Use the format: "Given [context], when [action], then [expected result]." This eliminates the "I thought it should work differently" conversation at the end of a sprint.

### Step 4: Specify What Is Out of Scope

Explicitly list what this PRD does not cover. This is as important as what it includes. Without a clear out-of-scope section, scope creep is inevitable. "We are not building X in this iteration" prevents the mid-sprint "can we also add..." that derails timelines.

### Step 5: Define Success Metrics

How will you know this feature succeeded? Define 1-3 measurable metrics with targets and a measurement timeline. "Reduce onboarding drop-off from 40% to 25% within 30 days of launch." Without metrics, you cannot evaluate the feature after launch -- and you cannot learn.

## Common Mistakes

**Writing a PRD after development starts** -- the PRD should exist before the first line of code. Retrofitting requirements to match what was built defeats the purpose.

**Too much implementation detail** -- the PRD defines what and why, not how. Leave technical architecture to engineering.

**No edge cases** -- the happy path is easy. The PRD's value is in documenting what happens when things go wrong: error states, empty states, permission conflicts.

**Never updating the PRD** -- requirements evolve during development. The PRD should be a living document, not a snapshot.

## Going Further

Use the Atlas prompt to generate a structured PRD with user stories, acceptance criteria, and success metrics from a feature description.

-> [PRD Writer](/prompts/prd_writer)

---

*This guide is part of the Dev Builder series on Atlas.*
