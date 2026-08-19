# Contribuer à Atlas

Le but est de garder un registre utile et réellement utilisé, pas un annuaire géant.
Une entrée qui n'apporte rien de neuf sera refusée, même bien écrite.

## Périmètre éditorial

Lisez cette section avant d'ouvrir une PR : elle vous évitera d'écrire pour rien.

**Atlas s'adresse aux fondateurs et solopreneurs francophones**, sur deux
terrains liés : se comprendre soi (introspection, positionnement, énergie) et
faire avancer son activité (validation, pricing, distribution).

### Ce qui est ouvert aux contributions

- **Les Cartographies** — les entretiens conduits. C'est le cœur du produit et
  c'est là qu'une contribution a le plus de valeur.
- **Les prompts** — toujours acceptés s'ils apportent quelque chose que le
  registre n'a pas.
- **Les guides.**

### Ce qui ne l'est pas

- **Le catalogue d'outils est gelé.** Aucun nouvel outil n'est accepté. Ce n'est
  pas un jugement sur les produits proposés : le catalogue génère une
  maintenance récurrente pour un usage quasi nul, et Atlas se recentre sur les
  entretiens. Les entrées existantes restent servies, elles ne sont plus
  enrichies.
- **Tout ce qui sort du travail d'un fondateur** : divertissement, création
  visuelle grand public, outils de niche technique sans lien avec la promesse.
- **Tout outil dont l'usage principal est de tromper quelqu'un** — se faire
  passer pour une autre personne, fabriquer un document ou une image présentés
  comme authentiques, contourner une vérification d'identité. Indépendamment des
  intentions de l'éditeur, référencer ces outils engage le nom d'Atlas.

### Proposer son propre produit

C'est autorisé, à deux conditions : **le déclarer explicitement dans la PR**, et
accepter d'être jugé sur le même critère que le reste — est-ce que ça apporte
quelque chose que le registre n'a pas déjà. Une contribution honnête et bien
faite peut être refusée pour des raisons de périmètre, sans que ce soit un
reproche.

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
  cartographies/<id>/
    meta.json           structure : catégorie, labels, axes, bornes de tours
    entretien.fr.md     gabarit de conduite + textes de présentation
    entretien.en.md
    carte.fr.md         consignes de la Carte
    carte.en.md
    dossier.fr.md       consignes du Dossier
    dossier.en.md
  guides/<slug>/
    meta.json, fr.md, en.md
  tools/<id>.json       gelé, voir « Périmètre éditorial »
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

## Ajouter une Cartographie

Une Cartographie n'est pas un prompt. Un prompt est un gabarit à trou, rempli en
une fois. Une Cartographie est un **entretien conduit sur plusieurs tours**, qui
produit deux artefacts : une Carte partageable, puis un Dossier développé.

D'où trois documents par langue, parce que ce sont trois appels distincts au
modèle : conduire l'entretien, rendre la Carte, développer le Dossier.

1. `meta.json` :

```json
{
  "id": "ma_cartographie",
  "category": "introspection",
  "difficulty": "beginner",
  "order": 1,
  "labels": ["positioning"],
  "tours": { "min": 8, "max": 40 },
  "axes": ["passion", "talent", "mission", "profession"]
}
```

- `tours` borne l'entretien. Le plafond borne le coût par construction, le
  plancher empêche une conclusion prématurée.
- `axes` est la structure de la carte. Les identifiants sont déclarés **une
  seule fois ici** ; seuls leurs libellés sont traduits, dans le frontmatter de
  chaque `entretien.<langue>.md`. Sans ça, une carte changerait de forme selon
  la langue.

2. `entretien.fr.md` et `entretien.en.md` :

```markdown
---
name: Nom de la Cartographie
hook: Une phrase qui dit le bénéfice
promesse: >-
  Ce que la personne va savoir, ce qu'elle pourra faire, le temps que ça
  coûte, et la tension qu'elle pressent déjà.
description: Ce que fait la Cartographie.
axes:
  passion: Passion
  talent: Talent
---

Le gabarit de conduite : ce que le modèle cherche, comment il mène chaque
tour, ses règles, son calibrage, et quand il s'arrête.
```

La **promesse** est le point de conversion : un entretien coûte vingt minutes à
la personne, elle ne les investit pas sans savoir ce qu'elle obtient. Une
promesse creuse ne se rattrape pas par un bon entretien, puisque l'entretien
n'aura pas lieu. La CI impose une longueur minimale pour cette raison.

3. `carte.fr.md`, `carte.en.md`, `dossier.fr.md`, `dossier.en.md` : les consignes
   de synthèse, avec un frontmatter réduit à `titre`.

### Jetons d'exécution

Le gabarit d'entretien reçoit des valeurs injectées à chaque tour. Le vocabulaire
est **fermé**, comme celui des variables, et pour la même raison : un jeton mal
orthographié serait lu comme une consigne par le modèle, et l'entretien
dériverait sans que rien ne le signale.

| Jeton | Rôle | Obligatoire |
| --- | --- | --- |
| `{{TOURS_MAX}}` | Plafond de tours | oui |
| `{{TOUR_COURANT}}` | Tour en cours | oui |
| `{{CARTE_PRECEDENTE}}` | État de la carte au tour précédent | oui |
| `{{TOURS_MIN}}` | Plancher avant conclusion | non |

Les trois premiers sont exigés dans chaque gabarit : sans eux, l'entretien n'a ni
borne ni mémoire.

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
