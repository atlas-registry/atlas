# Contribuer à Atlas

Le but est de garder un registre utile et réellement utilisé, pas un annuaire géant.
Une entrée qui n'apporte rien de neuf sera refusée, même bien écrite.

## Prérequis

```bash
npm install
```

Node 20 ou plus.

## Où vit le contenu

La source de vérité est le dossier `content/`. Les fichiers JSON à la racine
(`prompts.fr.json`, `tools.en.json`…) sont **générés** : ne les modifiez jamais à
la main, ils seraient écrasés au prochain build.

```
content/
  prompts/<id>/
    meta.json   structure : catégorie, difficulté, labels, variables
    fr.md       textes français  (frontmatter) + corps du prompt
    en.md       textes anglais   (frontmatter) + corps du prompt
  guides/<slug>/
    meta.json, fr.md, en.md
  tools/<id>.json
```

Cette séparation est délibérée : ce qui est structurel n'existe qu'une fois et ne
peut donc pas diverger d'une langue à l'autre, tandis que ce qui est rédigé
existe dans les deux langues.

## Ajouter un prompt

1. Créez `content/prompts/<id>/` — l'identifiant est en minuscules, mots séparés
   par `_` ou `-`, et doit correspondre au nom du dossier.

2. `meta.json` :

```json
{
  "id": "mon_prompt",
  "category": "business",
  "difficulty": "intermediate",
  "order": 33,
  "labels": ["validation", "pricing"],
  "variables": [
    { "name": "BUSINESS", "type": "textarea" },
    { "name": "USERDATA", "type": "textarea" }
  ]
}
```

- `category` et `labels` puisent dans le vocabulaire de `scripts/taxonomy.mjs`.
  Aucun terme libre n'est accepté : si un label manque, ajoutez-le à la taxonomie
  dans la même PR, en expliquant pourquoi les existants ne suffisent pas.
- `variables` puise dans `scripts/variables.mjs`. Une variable absente de cette
  table doit y être ajoutée avec ses libellés et exemples dans les deux langues.
- `order` positionne le prompt dans les listes du site.

3. `fr.md` et `en.md` :

```markdown
---
name: Nom du prompt
hook: Une phrase qui dit le bénéfice
description: Ce que fait le prompt.
gains: Ce que la personne obtient concrètement.
example_input: "{{BUSINESS}}: une agence de design de 6 personnes"
example_output: |-
  Le résultat attendu, abrégé.
---

ROLE:
…

CONTEXT:
…

GOAL:
…

FORMAT:
…

INSTRUCTIONS:
…

RULES:
…

{{BUSINESS}}

{{USERDATA}}
```

## Règles sur les variables

- `{{…}}` est **strictement réservé aux saisies de l'utilisateur**. Pour montrer
  un champ à personnaliser dans un exemple de sortie, utilisez des crochets :
  `[Prénom]`, `[Entreprise]`.
- Les deux langues doivent utiliser **exactement les mêmes variables**. C'est
  vérifié par la CI, parce que le site en génère un formulaire : des variables
  différentes produiraient deux formulaires différents selon la langue.
- `{{USERDATA}}` termine tout prompt qui attend une saisie.

## Avant d'ouvrir la PR

```bash
npm run validate   # schémas, vocabulaire, parité des locales
npm run build      # régénère les artefacts JSON
```

Committez les artefacts régénérés : la CI vérifie qu'ils correspondent à la source.

## Convention de commit

Commits conventionnels, lus par `git-cliff` :
`feat:` `fix:` `doc:` `perf:` `refactor:` `chore:`
