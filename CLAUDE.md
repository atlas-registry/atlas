# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atlas is a public, curated database of AI tools, structured prompts, and educational guides. It powers the site [atlas.voidcorp.io](https://atlas.voidcorp.io). There is no backend — GitHub is the source of truth. The front-end fetches JSON files via `raw.githubusercontent.com`.

Content exists in **French** (`.fr.json`) and **English** (`.en.json`).

## Doctrine d'exécution

Règles de l'art, jamais de rustine : aucune donnée fabriquée, aucun terme inventé
hors vocabulaire, aucun contournement de la validation. Vérifier la documentation
réelle d'une bibliothèque avant de l'utiliser plutôt que de s'en remettre à la
mémoire. Toute modification laisse le dépôt validé : `npm run check` doit passer.

## Structure

**La source de vérité est `content/`.** Les fichiers JSON de la racine sont des
artefacts générés par `scripts/build.mjs`, versionnés uniquement parce que
raw.githubusercontent.com les sert directement au site. Ne jamais les éditer.

```
content/prompts/<id>/{meta.json,fr.md,en.md}
content/guides/<slug>/{meta.json,fr.md,en.md}
content/tools/<id>.json
```

Le partage est délibéré : `meta.json` porte ce qui est structurel et n'existe
qu'une fois (catégorie, difficulté, labels, variables) ; les `.md` portent ce qui
est rédigé et existe par langue. Une divergence FR/EN sur la structure est donc
impossible par construction.

## Vocabulaire contrôlé

- `scripts/taxonomy.mjs` — catégories et labels autorisés, avec leurs libellés
  d'affichage. Fermé : un label absent doit y être ajouté explicitement.
- `scripts/variables.mjs` — variables de prompt : nom canonique, type de champ,
  libellé et exemple par langue.

Les identifiants ne sont jamais traduits. Seuls leurs libellés le sont.

## Variables de prompt

`{{…}}` est réservé aux saisies utilisateur, et les deux langues doivent porter
exactement le même jeu de variables — le site en génère un formulaire. Pour
illustrer un champ à personnaliser dans un exemple de sortie, utiliser des
crochets (`[Prénom]`).

## Commandes

```bash
npm run validate   # schémas, vocabulaire, parité des locales
npm run build      # régénère les artefacts JSON de la racine
npm run check      # validate + build + contrôle que les artefacts sont à jour
```

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
