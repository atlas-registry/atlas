# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atlas is a public, curated database of AI tools, structured prompts, and educational guides. It powers the site [atlas.voidcorp.io](https://atlas.voidcorp.io). There is no backend — GitHub is the source of truth. The front-end fetches JSON files via `raw.githubusercontent.com`.

Content exists in **French** (`.fr.json`) and **English** (`.en.json`).

## i18n Strategy

- Each data file exists in two locales: `*.fr.json` and `*.en.json`
- Both locales share the same IDs in the same order (enforced by CI)
- Slugs (guides) are identical across locales
- The front-end selects the correct file based on the user's locale

## Repository Structure

- `tools.fr.json` / `tools.en.json` — Curated AI tools (id, name, category, link, description, why)
- `prompts.fr.json` / `prompts.en.json` — Reusable AI prompts (id, name, hook, category, labels, description, prompt, example_input, example_output, gains)
- `guides.fr.json` / `guides.en.json` — Educational guides with full markdown content (id, title, description, category, content, readTime, difficulty, slug, date)
- `.github/workflows/lint-json.yml` — CI: validates JSON syntax with `jq` + verifies FR/EN ID sync
- `.github/workflows/changelog.yml` — Auto-generates CHANGELOG.md via `git-cliff`
- `.github/cliff.toml` — Changelog config (conventional commits, French categories)

## Validation

```bash
# Validate all JSON files locally
for f in *.json; do jq empty "$f" && echo "✓ $f" || echo "✗ $f"; done
```

CI runs `jq empty` on all `*.json` files for PRs and pushes to `main`.

## Commit Convention

Uses **conventional commits** parsed by `git-cliff`:
- `feat:` → Ajouté
- `fix:` → Corrigé
- `doc:` → Documentation
- `perf:` → Performance
- `refactor:` → Refactoring
- `chore:` → Autres

## Prompt Structure

All prompts in `prompts.json` follow a standard format:

```
ROLE — Who the AI is (expertise, posture)
CONTEXT — Situation, what the AI receives
GOAL — Clear objective and expected result
FORMAT — Response structure (list, table, sections, JSON…)
INSTRUCTIONS — Tone, style, detail level
RULES — Constraints (language, limits, validations)
{{USERDATA}} — Placeholder for user input
```

## Tool Categories

Tools in `tools.json` use these category values: `penser_decider`, `construire_vite`, `automatiser`, `qualite_clarte`.

## Content Rules

- No emojis in JSON data
- French content in `*.fr.json`, English content in `*.en.json`
- Both locales must have the same IDs in the same order
- No affiliate links or marketing spam
- One tool/prompt per PR when possible (add to both FR and EN files)
- JSON must be valid (enforced by CI)
