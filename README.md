![Lang](https://img.shields.io/badge/lang-FR-blue)
![IA](https://img.shields.io/badge/focus-IA%20%2F%20LLM-purple)
![Contributions](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Status](https://img.shields.io/badge/status-liste%20vivante-orange)

# Atlas

Atlas est une base de données publique d’outils IA et de prompts, utilisée pour alimenter
le mini-site : [https://atlas.voidcorp.io](https://atlas.voidcorp.io).

- Pas de SaaS caché
- Pas de tracking invasif
- Juste des fichiers JSON versionnés sur GitHub

L’objectif : garder une liste **utile, compacte et réellement utilisée**, plutôt qu’un annuaire
infini impossible à maintenir.

---

## 📂 Structure du dépôt

Le dépôt contient des fichiers de données en deux langues (FR / EN) :

- `tools.fr.json` / `tools.en.json`
  → Liste d'outils IA (frameworks d'agents, automatisation, LLM providers, etc.)

- `prompts.fr.json` / `prompts.en.json`
  → Liste de prompts IA structurés pour des usages concrets (productivité, dev, business…).

- `guides.fr.json` / `guides.en.json`
  → Guides pédagogiques avec contenu markdown complet.

Chaque paire FR/EN partage les mêmes IDs dans le même ordre. La CI vérifie la synchronisation.

Ces fichiers sont consommés par le site `atlas.voidcorp.io` qui les affiche avec une interface
filtrable.

---

## 🔍 Comment c’est utilisé ?

1. Les fichiers `*.fr.json` et `*.en.json` sont hébergés ici sur GitHub.
2. Le site front (`atlas-site`) les récupère en lecture seule (via `raw.githubusercontent.com`) selon la locale choisie.
3. À chaque Pull Request mergée :
   - les données sont mises à jour
   - le site est automatiquement synchronisé

Aucune logique complexe côté back : **GitHub est la source de vérité.**

---

## 🤝 Contribuer

Les contributions sont les bienvenues 🎉

Tu peux :

- proposer un **nouvel outil IA**
- proposer un **nouveau prompt**
- améliorer une description, une catégorie, des labels, etc.

👉 Tout se fait via Pull Request.
Les détails du format et des règles se trouvent dans [`CONTRIBUTING.md`](./CONTRIBUTING.md).

En résumé :

- Un outil / prompt = **une PR** si possible
- JSON propre, descriptif en français
- Pas de spam ni de lien affilié

---

## 🧱 Structure des prompts

Les prompts de l’Atlas suivent tous la même structure pour rester lisibles, réutilisables
et faciles à adapter dans des outils (agents, workflows, etc.) :

```txt
ROLE
Définis qui est l’IA (expertise, posture).

CONTEXT
Explique la situation, ce que l’IA reçoit, pour qui elle répond.

GOAL
Objectif clair du prompt (ce qu’on attend comme résultat).

FORMAT
Structure attendue de la réponse (liste, tableau, sections, JSON, etc.).

INSTRUCTIONS
Détails pratiques : ton, style, niveau de détail, ce qu’il faut éviter.

RULES
Contraintes strictes (langue, interdits, limites, validations, etc.).

{{USERDATA}}
Bloc final qui décrit ce que l’utilisateur doit fournir (idée, texte, code, liste de tâches…).
```

Dans prompts.json, le champ prompt contient donc un texte structuré
selon ce modèle, par exemple :

```txt
ROLE:
Tu es un investisseur VC très exigeant spécialisé dans les SaaS B2B.

CONTEXT:
On te soumet une idée de SaaS à analyser rapidement...

GOAL:
Évaluer la solidité de l'idée et donner une recommandation claire...

FORMAT:
1/ ...
2/ ...

INSTRUCTIONS:
- ...

RULES:
- ...

{{USERDATA}}
Idée de SaaS à analyser : {{IDEE_SAAS}}

```

Quand tu proposes un nouveau prompt, essaie de respecter ce format autant que possible.
Ça permet :

- de comprendre rapidement à quoi il sert
- de le brancher plus facilement dans des workflows (n8n, agents, etc.)
- de garder une qualité homogène dans tout l’Atlas

---

## 🧰 Où voir le rendu ?

L’interface qui consomme ces données est disponible ici :

➡️ **Site** : <https://atlas.voidcorp.io>

---

## 🗺️ Roadmap (indicative)

- [ ] Enrichir la liste d’outils IA (agents, automation, RAG, local LLM…)
- [ ] Développer la partie prompts (use cases concrets, productivité, dev)
- [ ] Ajouter des tags plus fins (stack, self-host, pricing…)
- [ ] Exposer des stats publiques (outils les plus consultés, clics, etc.)
- [ ] Automatiser la création de PR à partir d’un formulaire sur le site

Si tu veux donner un coup de main, tu peux :

- ouvrir une issue avec des idées d’évolution
- proposer une PR d’amélioration (données ou docs)

Merci d’aider à faire d’Atlas une ressource vraiment utile 🙏
